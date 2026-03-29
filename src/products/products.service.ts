import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private db : PrismaService){}
 async create(createProductDto: CreateProductDto) {
    await this.db.product.create({data : {name : createProductDto.name,
        description : createProductDto.description,
        price : createProductDto.price,
        stock : createProductDto.stock,
    }})
  }

  async findAll() {
    return await this.db.product.findMany()
  }

  async findOne(id: number) {
    return `This action returns a #${id} product`;
  }

   async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

 async  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
