import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/jwt/role.guard';
import { Roles } from '../auth/jwt/role.decorator';
import { UpdateRoleDto } from './dto/updateAdmin.Dto';
import { UserResponseDto, UserEmailDto, UserRoleDto } from './dto/ApiUser.Dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('create')
  @ApiOperation({summary  : 'User Create'})
  @ApiResponse({
    status : 200 ,
    description : 'User Created Succesfully',
    type : [UserResponseDto],
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
@UseGuards(RolesGuard)
@Roles('ADMIN')
  @Get('many')
@ApiOperation({summary : 'Get All Users'})
@ApiResponse({status : 200,
  description : 'Users loaded successfully',
  type : [UserEmailDto]
})
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  @ApiOperation({summary : ' Get User By Id'})
  @ApiResponse({
    status : 200,
    description : 'User loaded Successfully',
    type : [UserResponseDto]
  })
  findOne(@Req() req , @Param('id', ParseIntPipe) id: number) {
   
    return this.usersService.findOne( id);
  }

  @Patch(':id')
  @ApiOperation({summary : 'Update user By Id '})
  @ApiResponse({status : 200 ,
    description : 'User Updated Successfully',
    type : [UserResponseDto]
  })
  update(@Req() req , @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id
    return this.usersService.update(userId , id, updateUserDto);
  }
@UseGuards(RolesGuard)
@Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({summary : 'Delete User '})
  @ApiResponse({status : 200,
    description : 'User Deleted Successfully'
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
  
   @UseGuards(RolesGuard)
   @Roles('ADMIN')
  @Patch('role')
  @ApiOperation({summary : 'Update Admin Role'})
  @ApiResponse({status : 200,
    description : 'User Role Updated Successfully',
    type : [UserRoleDto]
  })
  roleUpdateByAdmin(@Body() Body : UpdateRoleDto){
      
    return this.usersService.userUpdateByAdmin( Body)
  }

}
