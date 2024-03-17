import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // '/users' routes
export class UsersController {
  // using dependency injection(i.e like what you do in laravel, to inject UsersService into this class)
  constructor(private readonly usersService: UsersService){}

  @Get() // GET /users
  // the @Query decorator gets the query param named "role"(as defined in brackets), which is optional(i.e the question mark beside it)
  // and stored in a var called "role" which is a string type.
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){

    return this.usersService.findAll(role)
  }

  // if you declare this route after 'findOne' route, nest will think that 'interns' is a route param and grab 'findone' method
  // instead and return an object that liks like this: { id: 'interns' }. So be careful of your route ordering.
  // Rule of thumb is that your static routes need to be before dynamic routes.
  @Get('interns')
  findAllInterns(){
    return this.usersService.findAll('INTERN')
  }

  @Get(':id') // GET /users/:id
  // the @Param decorator gets the route param named "id"(as defined in brackets) and stored in a var called "id" which is a string type.
  // If you said " @Param('id') kek: 'string' ", it would get the param called 'id' ans store it in a var called 'kek'
  // The ParseIntPipe is a pipe(a middleware that either transforms data, or validates data. See docs) that converts string/other type to integer. 
  // It is accepted as the 2nd param to @Param decorator.
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.usersService.findOne(id)
  }

  @Post() // POST /users
  // the @Body decorator defines it accepts a request body. The body is stored in a variable called body(type-hinted).
  // We are also swapping the type definition(i.e @Body(ValidationPipe) body: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'})
  // with a dto here, which is defined as per the imported class at the top.
  // The @Body decorator is accepting a ValidationPipe object that instructs the DTO to validate the data before it reaches this controller
  // If the validation fails, it will throw an error response
  // The whitelist:true filters out extra data that is passed along with the data that is validated (i.e like $request->validated() in Laravel)
  store(@Body(new ValidationPipe({whitelist: true})) body: CreateUserDto){
    return this.usersService.store(body)
  }

  @Post('formdata') // POST /users
  // The @UseInterceptors decorator states we are using body-parser to get a file from formdata
  @UseInterceptors(FileInterceptor('file'))
  // The @UploadedFile() is used to get the file fetched from formdata(as stated above) and store it in a var called 'file'.
  // the @Body defines it accepts a request body. The body is stored in a variable called body(type-hinted).
  // "user: {}" just declares a variable with a type-hint and nothing more.
  storeFormdata(@UploadedFile() file, @Body() body: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}, user: {}){
    console.log(file); // logs file data as buffer
    user = {...body, file: file}
    return user
  }

  @Patch(':id') // PATCH /users/:id
  // the @Param decorator gets the route param named "id"(as defined in brackets) and stored in a var called "id" which is a string type.
  // If you said " @Param('id') kek: 'string' ", it would get the param called 'id' ans store it in a var called 'kek'
  // the @Body defines it accepts a request body. The body is stored in a variable called body(type-hinted).
  // The ParseIntPipe is a pipe(a middleware that either transforms data, or validates data. See docs) that converts string/other type to integer. 
  // It is accepted as the 2nd param to @Param decorator.
  // We are also swapping the type definition(i.e @Body() body: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'})
  // with a dto here, which is defined as per the imported class at the top
  // The @Body decorator is accepting a ValidationPipe object that instructs the DTO to validate the data before it reaches this controller
  // If the validation fails, it will throw an error response
  // The whitelist:true filters out extra data that is passed along with the data that is validated (i.e like $request->validated() in Laravel)
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({whitelist: true})) body: UpdateUserDto){
    return this.usersService.update(id, body)
  }

  @Delete(':id') // DELETE /users/:id
  // the @Param decorator gets the route param named "id"(as defined in brackets) and stored in a var called "id" which is a string type.
  // If you said " @Param('id') kek: 'string' ", it would get the param called 'id' ans store it in a var called 'kek'
  // The ParseIntPipe is a pipe(a middleware that either transforms data, or validates data. See docs) that converts string/other type to integer. 
  // It is accepted as the 2nd param to @Param decorator.
  delete(@Param('id', ParseIntPipe) id: number){
    return this.usersService.delete(id)
  }
}
