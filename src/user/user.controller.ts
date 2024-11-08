import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseService } from '../shared/response.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResponseDto,
  })
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return this.responseService.success(
        user,
        'User created successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      return this.responseService.error(
        error.message || 'Failed to create user',
        HttpStatus.BAD_REQUEST,
        error.stack,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users.',
    type: [UserResponseDto],
  })
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return this.responseService.success(
        users,
        'Users retrieved successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.responseService.error(
        error.message || 'Failed to retrieve users',
        HttpStatus.BAD_REQUEST,
        error.stack,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The found user.',
    type: UserResponseDto,
  })
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.userService.findOne(id);
      return this.responseService.success(
        user,
        'User retrieved successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.responseService.error(
        error.message || 'User not found',
        HttpStatus.NOT_FOUND,
        error.stack,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserResponseDto,
  })
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      return this.responseService.success(
        updatedUser,
        'User updated successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.responseService.error(
        error.message || 'Failed to update user',
        HttpStatus.BAD_REQUEST,
        error.stack,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserResponseDto,
  })
  async remove(@Param('id') id: number) {
    try {
      const deletedUser = await this.userService.remove(id);
      return this.responseService.success(
        deletedUser,
        'User deleted successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.responseService.error(
        error.message || 'Failed to delete user',
        HttpStatus.BAD_REQUEST,
        error.stack,
      );
    }
  }
}
