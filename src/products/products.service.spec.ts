import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PaginationDto } from './dto/pagination.Dto';
import { Search } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should return filtered products ', async () => {
      const dto = {page : '1' , limit : '3' , search : 'Mouse' , sortBy : 'asc' , }
  
       
    const call = service.findAll(dto)
  expect(call)
  });
});
