import { Get, Patch, Put, Post, Delete } from "@nestjs/common";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export function TopicPath(contract: { topic: string }, method: HttpMethod = 'GET') {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        // Извлекаем название операции из топика
        const path = contract.topic
            .split('.')
            .filter(part => part !== 'queue')
            .pop() || '';

        // Сохраняем оригинальный топик в метаданных
        Reflect.defineMetadata('topic', contract.topic, target, propertyKey);
        
        // Выбираем нужный декоратор на основе метода
        const decorators = {
            'GET': Get,
            'POST': Post,
            'PUT': Put,
            'DELETE': Delete,
            'PATCH': Patch,
        };

        const methodDecorator = decorators[method];
        return methodDecorator(path)(target, propertyKey, descriptor);
    };
}
