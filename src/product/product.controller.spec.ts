import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ResponseService } from '../shared/response.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Role } from '../shared/role-enum';
import { HttpStatus } from '@nestjs/common';
import {
  PaginationOptions,
  SortOptions,
  FilterOptions,
} from './dto/pagination.dto';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let responseService: ResponseService;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    category: 'Test Category',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPaginatedResponse = {
    items: [mockProduct],
    total: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            findAll: jest.fn().mockResolvedValue(mockPaginatedResponse),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            update: jest.fn().mockResolvedValue(mockProduct),
            remove: jest.fn().mockResolvedValue(mockProduct),
          },
        },
        {
          provide: ResponseService,
          useValue: {
            success: jest.fn((data) => ({ data, message: 'Success' })),
            error: jest.fn((message, status, details) => ({
              message,
              status,
              details,
            })),
            paginated: jest.fn((items, total, page, limit, message) => ({
              items,
              total,
              page,
              limit,
              message,
            })),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    responseService = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product and return success response', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        category: 'Test Category',
      };
      const result = await productController.create(createProductDto);
      expect(productService.create).toHaveBeenCalledWith(createProductDto);
      expect(responseService.success).toHaveBeenCalledWith(
        mockProduct,
        'Product created successfully',
        HttpStatus.CREATED,
      );
      expect(result).toEqual({
        data: mockProduct,
        message: 'Success',
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const result = await productController.findOne('1');
      expect(productService.findOne).toHaveBeenCalledWith(1);
      expect(responseService.success).toHaveBeenCalledWith(
        mockProduct,
        'Product retrieved successfully',
        HttpStatus.OK,
      );
      expect(result).toEqual({
        data: mockProduct,
        message: 'Success',
      });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of products', async () => {
      const paginationOptions: PaginationOptions = { page: 1, limit: 10 };
      const sortOptions: SortOptions = {
        sortField: 'createdAt',
        sortOrder: 'desc',
      };
      const filterOptions: FilterOptions = {
        search: 'Test',
        category: 'Test Category',
      };
      const result = await productController.findAll(
        paginationOptions,
        sortOptions,
        filterOptions,
      );
      expect(productService.findAll).toHaveBeenCalledWith(
        paginationOptions,
        sortOptions,
        filterOptions,
      );
      expect(responseService.paginated).toHaveBeenCalledWith(
        mockPaginatedResponse.items,
        mockPaginatedResponse.total,
        paginationOptions.page,
        paginationOptions.limit,
        'Products retrieved successfully',
        HttpStatus.OK,
      );
      expect(result).toEqual({
        items: mockPaginatedResponse.items,
        total: mockPaginatedResponse.total,
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        message: 'Products retrieved successfully',
      });
    });
  });

  describe('update', () => {
    it('should update a product and return success response', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 150,
        category: 'Updated Category',
      };
      const result = await productController.update('1', updateProductDto);
      expect(productService.update).toHaveBeenCalledWith(1, updateProductDto);
      expect(responseService.success).toHaveBeenCalledWith(
        mockProduct,
        'Product updated successfully',
        HttpStatus.OK,
      );
      expect(result).toEqual({
        data: mockProduct,
        message: 'Success',
      });
    });
  });

  describe('remove', () => {
    it('should delete a product and return success response', async () => {
      const result = await productController.remove('1');
      expect(productService.remove).toHaveBeenCalledWith(1);
      expect(responseService.success).toHaveBeenCalledWith(
        mockProduct,
        'Product deleted successfully',
        HttpStatus.OK,
      );
      expect(result).toEqual({
        data: mockProduct,
        message: 'Success',
      });
    });
  });
});
