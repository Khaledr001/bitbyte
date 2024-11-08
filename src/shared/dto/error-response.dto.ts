import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'Error occurred' })
  message: string;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Error details here' })
  error: string;
}
