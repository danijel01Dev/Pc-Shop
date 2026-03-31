import { BadRequestException, ConflictException, Injectable, Req, UnauthorizedException } from '@nestjs/common';

import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/createorderDto';

@Injectable()
export class OrdersService {
  constructor( private db: PrismaService){}
  async create(userId : number ,dto : CreateOrderDto) {
   return await this.db.$transaction((async (tx) => {
       
         const getId = dto.items.map(x => x.productId)
         const products = await tx.product.findMany({
          where : {
            id : { in : getId}
          }
         })
         const orderProduct = new Map( products.map( p => [p.id, p]));
         const  productSum = new Map<number , number>()
          for(const item of dto.items){
            const items = orderProduct.get(item.productId)
            
            if(!items){ throw new BadRequestException('invalid product occured') };
            const existing = productSum.get(item.productId) || 0
             productSum.set(item.productId , existing + item.quantity)
            
           }
              let totalPrice = 0 ;
              let  orderItemsData :{
                productId : number ;
                quantity : number ;
                price : number ;
              } [] = []
          for(const  [ productId, totalQuantity] of productSum){
              const  product = orderProduct.get(productId)
              
              if(!product){throw new BadRequestException('invalid product')}
               if(totalQuantity > product.stock){throw new ConflictException('out of stock ')}
              totalPrice +=  totalQuantity * product.price
              orderItemsData.push({
                productId : product.id,
                quantity : totalQuantity,
                price : product.price,
          })
           }
          for( const [productId , totalQuantity] of productSum){
             const updated = await tx.product.updateMany({
              where : {id : productId,
                stock : {gte : totalQuantity},},
                data : {
                  stock : {
                    decrement : totalQuantity
                  }
                }
              
             })
             if(updated.count === 0){throw new ConflictException('out of stock during update')}
          }

          
          const orderCreate = await tx.order.create({data : {
            userId : userId,
            total : totalPrice,
            orderNumber :  Date.now() + Math.floor(Math.random() * 10000),

            items : {
              create :  orderItemsData ,

              
            } 
          }})
         
          
          
          return orderCreate
         

   }))
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
