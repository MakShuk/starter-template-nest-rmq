import { BadRequestException, Body, Controller, InternalServerErrorException, NotFoundException, Query} from "@nestjs/common";
import { RMQService } from "nestjs-rmq";
import { DeleteCronJob, GetAllCronJob, SetCronJob } from "@makshuk/rmq-broker-contracts";
import {  ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TopicPath } from "decorators/topic.decorator";
import { GetAllCronJobOperation, StartCronJobOperation, DeleteCronJobOperation, CronResponses, DeleteCronJobQuery, StartCronJobBody } from "./cron.swagger";

@ApiTags('Cron')
@Controller('cron')
export class CronController {
    constructor(private readonly rmqService: RMQService) {}

    @ApiOperation(GetAllCronJobOperation)
    @ApiResponse(CronResponses[200])
    @ApiResponse(CronResponses[500])
    @TopicPath(GetAllCronJob)
    async getAllCronJob() {
        try {
            const response = await this.rmqService.send<GetAllCronJob.Request, GetAllCronJob.Response>(GetAllCronJob.topic, {});
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Произошла ошибка при получении списка cron задач');
        }
    }

    @ApiOperation(StartCronJobOperation)
    @ApiResponse(CronResponses[200])
    @ApiResponse(CronResponses[400])
    @ApiResponse(CronResponses[500])
    @ApiBody(StartCronJobBody)
    @TopicPath(SetCronJob, 'POST')
    async startCronJob(@Body() body: SetCronJob.Request) {
        try {
            if (!body.name || !body.interval || !body.reqTopic || !body.resTopic) {
                throw new BadRequestException('Все поля обязательны для заполнения');
            }

            const response = await this.rmqService.send<SetCronJob.Request, SetCronJob.Response>(SetCronJob.topic, body);
            return response;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Произошла ошибка при создании cron задачи');
        }
    }

    @ApiOperation(DeleteCronJobOperation)
    @ApiResponse(CronResponses[200])
    @ApiResponse(CronResponses[400])
    @ApiResponse(CronResponses[500])
    @ApiQuery(DeleteCronJobQuery)
    @TopicPath(DeleteCronJob, 'DELETE')
    async deleteCronJob(@Query('name') name: string): Promise<DeleteCronJob.Response> {
        try {
            if (!name || name.trim() === '') {
                throw new BadRequestException('Имя задачи не может быть пустым');
            }

            const response = await this.rmqService.send<DeleteCronJob.Request, DeleteCronJob.Response>(
                DeleteCronJob.topic, 
                {name: name}
            );

            if (response.status === 'not-found') {
                throw new BadRequestException(`Задача с именем ${name} не найдена`);
            }

            return response;
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Произошла ошибка при удалении задачи');
        }
    }
}