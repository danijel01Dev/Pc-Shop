import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';

// ==== Whole service is covered by Admin guard in controller  except findAll and  findOne===

@Injectable()
export class ProductsService {
  constructor(private db: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return await this.db.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
      },
    });
  }

  async findAll(pagDto: PaginationDto) {
    const page = pagDto.page || 1;
    const limit = pagDto.limit || 10;
    const skip = (page - 1) * limit;
    const where = {
      deletedAt: null,
      ...(pagDto.search
        ? {
            name: {
              contains: pagDto.search,
              mode: 'insensitive' as const,
            },
          }
        : {}),
    };
    const total = await this.db.product.count({
      where,
    });
    const products = await this.db.product.findMany({
      where,
      orderBy: pagDto.sortBy
        ? {
            [pagDto.sortBy]: pagDto.order,
          }
        : undefined,
      skip,
      take: limit,
    });
    return {
      data: products,
      meta: {
        total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return await this.db.product.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.db.product.update({
        where: { id },
        data: {
          name: updateProductDto.name,
          description: updateProductDto.description,
          price: updateProductDto.price,
          stock: updateProductDto.stock,
        },
      });
    } catch (error) {
      console.log('failed to update product', error);
      throw new NotFoundException('failed to update product');
    }
  }

  async remove(id: number) {
    try {
      await this.db.product.delete({ where: { id } });
    } catch (error) {
      console.log('failed to delete product', error);
      throw new NotFoundException('failed to delete product');
    }
  }
}
