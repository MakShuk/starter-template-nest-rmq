import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export namespace SummaryCreate {
  export const topic = 'summary.create.query';

  export class Request {
    @IsNumber()
    @IsNotEmpty()
    // @ts-ignore
    messageId: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(300, {
      message: 'Text to summarize must be at least 300 characters long',
    })
    // @ts-ignore
    originalText: string;
  }

  export class Response {
    @IsString()
    @IsNotEmpty()
    // @ts-ignore
    summary: string;

    @IsNumber()
    // @ts-ignore
    messageId: number;
  }
}
