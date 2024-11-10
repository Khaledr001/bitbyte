import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  PaginationOptions,
  SortOptions,
  FilterOptions,
} from './dto/pagination.dto';
import { Product } from './dto/product.entity';
import { ResponseService } from '../shared/response.service';
import {
  PaginatedResponse,
  SuccessResponse,
} from '../shared/dto/success-response.dto';
import { ErrorResponse } from '../shared/dto/error-response.dto';
import { Roles } from '../auth/decorator/role.decorator';
import { Role } from '../shared/role-enum';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: SuccessResponse<Product>,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to create product.',
    type: ErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.create(createProductDto);
      return this.responseService.success(
        product,
        'Product created successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      return this.responseService.error(
        'Failed to create product',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The found product.',
    type: SuccessResponse<Product>,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorResponse,
  })
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findOne(+id);
      return this.responseService.success(
        product,
        'Product retrieved successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.responseService.error(
        `Failed to retrieve product with ID ${id}`,
        HttpStatus.NOT_FOUND,
        error.message,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ type: PaginationOptions })
  @ApiQuery({ type: SortOptions })
  @ApiQuery({ type: FilterOptions })
  @ApiResponse({
    status: 200,
    description: 'List of products with pagination.',
    type: PaginatedResponse<Product>,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorResponse,
  })
  @UsePipes(ValidationPipe)
  async findAll(
    @Query(ValidationPipe) paginationOptions: PaginationOptions,
    @Query(ValidationPipe) sortOptions: SortOptions,
    @Query(ValidationPipe) filterOptions: FilterOptions,
  ) {
    try {
      const result = await this.productService.findAll(
        paginationOptions,
        sortOptions,
        filterOptions,
      );
      return this.responseService.paginated(
        result.items,
        result.total,
        paginationOptions.page,
        paginationOptions.limit,
        'Products retrieved successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.responseService.error(
        'Failed to retrieve products',
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: SuccessResponse<Product>,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.productService.update(+id, updateProductDto);
      return this.responseService.success(
        product,
        'Product updated successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.responseService.error(
        `Failed to update product with ID ${id}`,
        HttpStatus.NOT_FOUND,
        error.message,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
    type: SuccessResponse<Product>,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    try {
      const product = await this.productService.remove(+id);
      return this.responseService.success(
        product,
        'Product deleted successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return this.responseService.error(
        `Failed to delete product with ID ${id}`,
        HttpStatus.NOT_FOUND,
        error.message,
      );
    }
  }
}
