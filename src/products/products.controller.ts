import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.Dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/jwt/role.guard';
import { Roles } from 'src/auth/jwt/role.decorator';
import { ApiQuery } from '@nestjs/swagger';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
       
  ) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('ADMIN')
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()

  findAll(@Query() pagDto: PaginationDto) {
    return this.productsService.findAll(pagDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
 @UseGuards(JwtAuthGuard,RolesGuard)
 @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number ){
    return this.productsService.remove(id);
  }
}
