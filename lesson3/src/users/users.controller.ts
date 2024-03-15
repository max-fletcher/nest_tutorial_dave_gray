import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users') // '/users' routes
export class UsersController {
  @Get() // GET /users
  // the @Query decorator gets the query param named "role"(as defined in brackets) and stored in a var called "role" which is a string type.
  findAll(@Query('role') role?: string){
    return { data:[], role: role }
  }

  // if you declare this route after 'findOne' route, nest will think that 'interns' is a route param and grab 'findone' method
  // instead and return an object that liks like this: { id: 'interns' }. So be careful of your route ordering.
  // Rule of thumb is that your static routes need to be before dynamic routes.
  @Get('interns')
  findAllInterns(){
    return []
  }

  @Get(':id') // GET /users/:id
  // the @Param decorator gets the route param named "id"(as defined in brackets) and stored in a var called "id" which is a string type.
  // If you said " @Param('id') kek: 'string' ", it would get the param called 'id' ans store it in a var called 'kek'
  findOne(@Param('id') id: string){
    return { id }
  }

  @Post() // POST /users
  // the @Body decorator defines it accepts a request body. The body is stored in a variable called body(type-hinted).
  store(@Body() body: {}){
    return body
  }

  @Post('formdata') // POST /users
  // The @UseInterceptors decorator states we are using body-parser to get a file from formdata
  @UseInterceptors(FileInterceptor('file'))
  // The @UploadedFile() is used to get the file fetched from formdata(as stated above) and store it in a var called 'file'.
  // the @Body defines it accepts a request body. The body is stored in a variable called body(type-hinted).
  // "user: {}" just declares a variable with a type-hint and nothing more.
  storeFormdata(@UploadedFile() file, @Body() body: {}, user: {}){
    console.log(file); // logs file data as buffer
    user = { ...body }
    return user
  }

  @Patch(':id') // PATCH /users/:id
  // the @Param decorator gets the route param named "id"(as defined in brackets) and stored in a var called "id" which is a string type.
  // If you said " @Param('id') kek: 'string' ", it would get the param called 'id' ans store it in a var called 'kek'
  // the @Body defines it accepts a request body. The body is stored in a variable called body(type-hinted).
  // "user: {}" just declares a variable with a type-hint and nothing more.
  update(@Param('id') id: string, @Body() body, user: {}){
    user = {...body, id: id}
    return user
  }

  @Delete(':id') // DELETE /users/:id
  // the @Param decorator gets the route param named "id"(as defined in brackets) and stored in a var called "id" which is a string type.
  // If you said " @Param('id') kek: 'string' ", it would get the param called 'id' ans store it in a var called 'kek'
  delete(@Param('id') id: string){
    return id
  }
}
