import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import {
  FilterOptions,
  PaginationOptions,
  SortOptions,
} from './dto/pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private databaseService: DatabaseService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.databaseService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create product');
    }
  }

  async findAll(
    paginationOptions: PaginationOptions,
    sortOptions: SortOptions,
    filterOptions: FilterOptions,
  ): Promise<{ items: Product[]; total: number }> {
    const { page, limit } = paginationOptions;
    const { sortField, sortOrder } = sortOptions;
    const { category } = filterOptions;

    const where: Prisma.ProductWhereInput = {
      category: category ? { equals: category } : undefined,
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      [sortField]: sortOrder,
    };

    try {
      const items = await this.databaseService.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      });
      const total = await this.databaseService.product.count({ where });

      return { items, total };
    } catch (error) {
      throw new BadRequestException('Failed to retrieve products');
    }
  }

  async findOne(id: number): Promise<Product | null> {
    try {
      const product = await this.databaseService.product.findUnique({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new NotFoundException(`Failed to find product with ID ${id}`);
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.databaseService.product.update({
        where: { id },
        data: updateProductDto,
      });
      return product;
    } catch (error) {
      throw new NotFoundException(`Failed to update product with ID ${id}`);
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      const product = await this.databaseService.product.delete({
        where: { id },
      });
      return product;
    } catch (error) {
      throw new NotFoundException(`Failed to delete product with ID ${id}`);
    }
  }
}
