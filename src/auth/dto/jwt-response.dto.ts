import { ApiProperty } from '@nestjs/swagger';

export class JwtResponseDto {
  @ApiProperty({ example: 'some-jwt-token', description: 'JWT access token' })
  access_token: string;
}
