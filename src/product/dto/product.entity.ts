import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: 1, description: 'The unique identifier' })
  id: number;

  @ApiProperty({ example: 'Product A', description: 'The name of the product' })
  name: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'The description of the product',
  })
  description: string;

  @ApiProperty({ example: 29.99, description: 'The price of the product' })
  price: number;

  @ApiProperty({
    example: 'Electronics',
    description: 'The category of the product',
  })
  category: string;

  @ApiProperty({
    example: '2024-03-08T12:00:00Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-08T12:00:00Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
