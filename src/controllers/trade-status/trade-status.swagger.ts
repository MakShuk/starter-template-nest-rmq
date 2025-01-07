import { ApiResponseOptions, ApiOperationOptions, ApiQueryOptions } from '@nestjs/swagger';

export const TradeStatusOperation: ApiOperationOptions = {
  summary: 'Получение статуса торговли',
  description: 'Получение статуса торговли по FIGI'
};

export const TradeStatusQuery: ApiQueryOptions = {
  name: 'figi',
  required: true,
  description: 'FIGI инструмента',
  example: 'BBG000000001'
};

export const TradeStatusResponses: Record<number, ApiResponseOptions> = {
  200: {
    status: 200,
    description: 'Статус торговли успешно получен',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'boolean',
          example: 'true',
          description: 'Текущий статус торговли'
        },
      }
    }
  },
  400: {
    status: 400,
    description: 'Неверный запрос или отсутствует FIGI'
  },
  500: {
    status: 500,
    description: 'Внутренняя ошибка сервера'
  }
}; 