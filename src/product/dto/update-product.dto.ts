import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    example: 'Product A Updated',
    description: 'Name of the product',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'This is an updated description of Product A',
    description: 'Description of the product',
  })
  description?: string;

  @ApiPropertyOptional({ example: 34.99, description: 'Price of the product' })
  @Transform(({ value }) => (value !== undefined ? parseFloat(value) : value))
  price?: number;

  @ApiPropertyOptional({
    example: 'Electronics',
    description: 'Category of the product',
  })
  category?: string;
}
