import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  id: number;

  @ApiProperty({ example: 'admin', description: 'User role' })
  role: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
  email: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Date when the user was created',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Date when the user was last updated',
  })
  updatedAt: string;
}
