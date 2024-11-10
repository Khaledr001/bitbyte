import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilterOptions, PaginationOptions, SortOptions } from './dto/pagination.dto';

describe('ProductService', () => {
  let productService: ProductService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: DatabaseService,
          useValue: {
            product: {
              create: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Product A',
        description: 'Description of Product A',
        price: 100,
        category: 'Category 1',
      };
      const createdProduct = { id: 1, ...createProductDto };

      jest
        .spyOn(databaseService.product, 'create')
        .mockResolvedValue(createdProduct as any);

      const result = await productService.create(createProductDto);

      expect(databaseService.product.create).toHaveBeenCalledWith({
        data: createProductDto,
      });
      expect(result).toEqual(createdProduct);
    });

    it('should throw BadRequestException if product creation fails', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Product A',
        description: 'Description of Product A',
        price: 100,
        category: 'Category 1',
      };

      jest
        .spyOn(databaseService.product, 'create')
        .mockRejectedValue(new Error());

      await expect(productService.create(createProductDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const paginationOptions: PaginationOptions = { page: 1, limit: 10 };
      const sortOptions: SortOptions = { sortField: 'createdAt', sortOrder: 'dsc' };
      const filterOptions = { category: 'Category 1', search: 'Product' };

      const products = [{ id: 1, name: 'Product A', category: 'Category 1' }];
      const total = 1;

      jest
        .spyOn(databaseService.product, 'findMany')
        .mockResolvedValue(products as any);
      jest.spyOn(databaseService.product, 'count').mockResolvedValue(total);

      const result = await productService.findAll(
        paginationOptions,
        sortOptions,
        filterOptions,
      );

      expect(result).toEqual({ items: products, total });
    });

    it('should throw BadRequestException if retrieval fails', async () => {
      const paginationOptions: PaginationOptions = { page: 1, limit: 10 };
      const sortOptions: SortOptions = {};
      const filterOptions: FilterOptions = {};

      jest
        .spyOn(databaseService.product, 'findMany')
        .mockRejectedValue(new Error());

      await expect(
        productService.findAll(paginationOptions, sortOptions, filterOptions),
      ).rejects.toThrow(BadRequestException);
    });
  });


  describe('findOne', () => {
    it('should return a product if found', async () => {
      const product = { id: 1, name: 'Product A' };

      jest
        .spyOn(databaseService.product, 'findUnique')
        .mockResolvedValue(product as any);

      const result = await productService.findOne(1);

      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(databaseService.product, 'findUnique').mockResolvedValue(null);

      await expect(productService.findOne(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the product', async () => {
      const updateProductDto: UpdateProductDto = { name: 'Updated Product' };
      const updatedProduct = { id: 1, name: 'Updated Product' };

      jest
        .spyOn(databaseService.product, 'update')
        .mockResolvedValue(updatedProduct as any);

      const result = await productService.update(1, updateProductDto);

      expect(databaseService.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateProductDto,
      });
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product update fails', async () => {
      jest
        .spyOn(databaseService.product, 'update')
        .mockRejectedValue(new Error());

      await expect(
        productService.update(1, { name: 'Updated Product' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return the product', async () => {
      const deletedProduct = { id: 1, name: 'Deleted Product' };

      jest
        .spyOn(databaseService.product, 'delete')
        .mockResolvedValue(deletedProduct as any);

      const result = await productService.remove(1);

      expect(databaseService.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(deletedProduct);
    });

    it('should throw NotFoundException if product deletion fails', async () => {
      jest
        .spyOn(databaseService.product, 'delete')
        .mockRejectedValue(new Error());

      await expect(productService.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
