import * as Joi from 'joi';
import { ENV_VALUES } from './constants';

export const configValidationSchema = Joi.object({
  PORT: Joi.number()
    .port()
    .default(ENV_VALUES.DEFAULT_VALUES.PORT)
    .description('Application port number'),

  NODE_ENV: Joi.string()
    .valid(...Object.values(ENV_VALUES.NODE_ENVIRONMENTS))
    .default(ENV_VALUES.DEFAULT_VALUES.NODE_ENV)
    .description('Node environment'),

  // RabbitMQ Configuration
  AMQP_EXCHANGE: Joi.string().required().description('RabbitMQ exchange name'),
  AMQP_USER: Joi.string().required().description('RabbitMQ username'),
  AMQP_PASSWORD: Joi.string().required().description('RabbitMQ password'),
  AMQP_HOSTNAME: Joi.string().required().description('RabbitMQ host'),
  AMQP_QUEUE: Joi.string().required().description('RabbitMQ queue name'),
});
