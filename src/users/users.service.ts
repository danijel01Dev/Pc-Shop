import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRoleDto } from './dto/updateAdmin.Dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db : PrismaService
  ){}
 async  createUser(createUserDto: CreateUserDto) {
     try{ const hash = await bcrypt.hash(createUserDto.password, 10)
       return await this.db.user.create({data : {email : createUserDto.email , password : hash , refreshToken : createUserDto.refreshToken}})
     }     
     catch(error){
      console.log(' failed to create user', error)
      throw new NotFoundException(' Something went wrong , try again')
     }
  }

  async findByEmail(email : string){
   try {return this.db.user.findUnique({
      where : 
      {email},
      select: {
        id: true ,
        email : true,
        password: true,
        role : true,
      }})}
      catch(error){
        console.log('failed to find user', error)
        throw new NotFoundException('User not found')
      }
  }
  async updateRefreshToken (id : number , token : string){
   try{ return  this.db.user.update({where : {id},
    data : {refreshToken : token}})
   }
  catch(error){console.log('failed to update token',error)
    throw new NotFoundException('Token not found')
  }}
  findAll() {
    try{return this.db.user.findMany({select : { 
      email: true,
      
    }})}
    catch(error){
      console.log('failed to load users', error)
      throw new NotFoundException(' Loading Users failed')

    }
  }

  async findOne(id: number) {
    try {return await this.db.user.findUnique({where : {id}
    })
  }
catch(error){
  console.log('failed to find user',error)
throw new NotFoundException('invalid user')

  
}}

  async update(userId : number , id: number, updateUserDto: UpdateUserDto) {
  try{  const findUser = await this.db.user.findUnique({where : {id}});
     if(!findUser){throw new UnauthorizedException('invalid user , failed to update')}
     if( findUser.id !== userId ) {throw new UnauthorizedException('access denied ')}
    
    
    return await this.db.user.update({where : {id : findUser.id},
    data : {
        email : updateUserDto.email,
        password : updateUserDto.password
    }})
  }
 catch(error){
  console.log('failed to update user')
  throw new UnauthorizedException('something went wrong , failed to update user')

 }}

 async  remove(id: number) {
   try{ return await this.db.user.delete({where: {id}})
  }
catch(error){
  console.log('failed to delete user', error)
  throw new NotFoundException('failed to delete user ')
}}
    async userUpdateByAdmin (dto : UpdateRoleDto){
      try{const findUser = await this.db.user.findUnique({where : {email : dto.email }});
          if(!findUser){ throw new UnauthorizedException('invalid user ')};
         return await  this.db.user.update({where : {id : findUser.id},
          data : {
            role : dto.role,
          }})
          }
      catch(error){
        console.log('failed to update user by Admin ', error)
        throw new UnauthorizedException(' failed to update user By Admin')
      }


    }
}
