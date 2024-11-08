import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class PaginationOptions {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @ApiPropertyOptional({ example: 20, description: 'Number of items per page' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  limit: number;
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
