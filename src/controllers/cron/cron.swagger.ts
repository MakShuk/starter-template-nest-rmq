import { ApiOperationOptions, ApiResponseOptions, ApiQueryOptions, ApiBodyOptions } from '@nestjs/swagger';

// Операции
export const GetAllCronJobOperation: ApiOperationOptions = {
  summary: 'Получить все cron задачи'
};

export const StartCronJobOperation: ApiOperationOptions = {
  summary: 'Запустить cron задачу'
};

export const DeleteCronJobOperation: ApiOperationOptions = {
  summary: 'Удалить cron задачу'
};

// Ответы
export const CronResponses: Record<number, ApiResponseOptions> = {
  200: {
    status: 200,
    description: 'Операция успешно выполнена'
  },
  400: {
    status: 400,
    description: 'Некорректные данные запроса'
  },
  500: {
    status: 500,
    description: 'Внутренняя ошибка сервера'
  }
};

// Query параметры
export const DeleteCronJobQuery: ApiQueryOptions = {
  name: 'name',
  type: String,
  required: true,
  description: 'Имя cron задачи для удаления'
};

// Body схемы
export const StartCronJobBody: ApiBodyOptions = {
  schema: {
    properties: {
      name: { type: 'string' },
      interval: { type: 'string' },
      reqTopic: { type: 'string' },
      resTopic: { type: 'string' }
    },
    example: {
      name: 'test1',
      interval: '1',
      reqTopic: 'test.req',
      resTopic: 'test.res'
    }
  }
}; 