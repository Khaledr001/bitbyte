import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation successful' })
  message: string;

  @ApiProperty()
  data: T;
}

export class PaginatedData<T> {
  @ApiProperty({ description: 'Items on the current page', isArray: true })
  items: T[];

  @ApiProperty({ example: 100, description: 'Total number of items' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Items per page' })
  limit: number;

  @ApiProperty({ example: 10, description: 'Total number of pages' })
  totalPages: number;
}

export class PaginatedResponse<T> {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({ example: 'Success', description: 'Response message' })
  message: string;

  @ApiProperty({ type: PaginatedData })
  data: PaginatedData<T>;
}
