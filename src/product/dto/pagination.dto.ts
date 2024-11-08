import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaginationOptions {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({ example: 20, description: 'Number of items per page' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  limit: number = 10;
}

export class SortOptions {
  @ApiPropertyOptional({
    example: 'createdAt',
    description: 'Field to sort by',
  })
  @IsString()
  @IsOptional()
  sortField: string = 'createdAt';

  @ApiPropertyOptional({
    example: 'desc',
    enum: ['asc', 'desc'],
    description: 'Sort order',
  })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  sortOrder: 'asc' | 'desc' = 'desc';
}

export class FilterOptions {
  @ApiPropertyOptional({
    example: 'Electronics',
    description: 'Category to filter by',
  })
  @IsString()
  @IsOptional()
  category: string;

  @ApiPropertyOptional({
    example: 'product',
    description: 'Fulltext search field',
  })
  @IsOptional()
  @IsString()
  search: string = 'product';
}
