// src/shared/response.service.ts
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success<T>(data: T, message = 'Success', statusCode = HttpStatus.OK) {
    return {
      statusCode,
      status: 'success',
      message,
      data,
    };
  }

  paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Success',
    statusCode = HttpStatus.OK,
  ) {
    return {
      statusCode,
      status: 'success',
      message,
      data: {
        items: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  error(message: string, statusCode = 400, errors: any = null) {
    return {
      statusCode,
      status: 'error',
      message,
      errors,
    };
  }
}
