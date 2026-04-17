import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/jwt/role.guard';
import { Roles } from 'src/auth/jwt/role.decorator';
import { User } from './entities/user.entity';
import { UpdateRoleDto } from './dto/updateAdmin.Dto';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
@UseGuards(RolesGuard)
@Roles('ADMIN')
  @Get('many')
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  findOne(@Req() req , @Param('id', ParseIntPipe) id: number) {
   
    return this.usersService.findOne( id);
  }

  @Patch(':id')
  update(@Req() req , @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id
    return this.usersService.update(userId , id, updateUserDto);
  }
@UseGuards(RolesGuard)
@Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
  
   @UseGuards(RolesGuard)
   @Roles('ADMIN')
  @Patch('role')
  roleUpdateByAdmin(@Body() Body : UpdateRoleDto){
      
    return this.usersService.userUpdateByAdmin( Body)
  }

}
