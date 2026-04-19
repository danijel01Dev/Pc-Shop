import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.Dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/jwt/role.guard';
import { Roles } from '../auth/jwt/role.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/ApiProduct.Dto';
import { PaginatedProductsDto } from './dto/ApiProduct.Dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
              
  ) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('ADMIN')
  @Post()
  @ApiOperation({summary : 'Create Prodcut'})
  @ApiResponse({
    status : 201 ,
    description : 'Product created',
    type :  [ProductResponseDto],
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
   @ApiOperation({summary : 'Get all Products'})
   @ApiResponse({status : 200 ,
     type : [PaginatedProductsDto],
   })
  findAll(@Query() pagDto: PaginationDto) {
    return this.productsService.findAll(pagDto);
  }

  @Get(':id')
  @ApiOperation({summary : 'Find Product by Id'})
  @ApiResponse({status : 201,
    description : 'Product succesfully loaded',
    type : [ProductResponseDto],
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({summary : 'Update Product by Id'})
  @ApiResponse({status : 201,
    description : 'Prodcut Updated Successfully',
    type : [ProductResponseDto],
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
 @UseGuards(JwtAuthGuard,RolesGuard)
 @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({summary : 'Delete Prodcut By Id'})
  @ApiResponse({status : 201,
    description : 'Prodcut Deleted Successfully'})
  remove(@Param('id', ParseIntPipe) id: number ){
    return this.productsService.remove(id);
  }
}
