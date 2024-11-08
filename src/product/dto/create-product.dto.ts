import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Product A', description: 'Name of the product' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This is a description of Product A',
    description: 'Description of the product',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 29.99, description: 'Price of the product' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Electronics',
    description: 'Category of the product',
  })
  @IsNotEmpty()
  @IsString()
  category: string;
}
