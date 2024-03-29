import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
// To say the least, PrismaClient and Prisma is the same. We are using a different alisa that's all
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

// Skip throttling for the entire controller(same as : @SkipThrottle({ default: true })). NOTE: This DOES NOT SKIP named rate limiters
@SkipThrottle()
@Controller('v1/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  // instantiating an instance of the custom logger you made to this controller. Also, the param is the name of this controller(i.e "EmployeeController")
  // so we have some context as to where the error is occuring
  private readonly logger = new MyLoggerService(EmployeesController.name)

  @Post()
  // Prisma.EmployeeCreateInput was created by prisma automatically when we ran migration. We swapped out the DTO with this
  // because it is faster than creating and setting up the DTO.
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  // This overrides the @SkipThrottle() defined above so rate-limiting WILL WORK for this one ONLY IF you are using the default rate-limiter.
  // For named rate-limiters, you cannot completely skip them but you can override them using @Throttle({ short: { ttl: ???, limit: ??? } })
  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role? : "INTERN" | "ENGINEER" | "ADMIN") {
    this.logger.log(`Request for ALL Employees \t${ip}`, EmployeesController.name)
    return this.employeesService.findAll(role);
  }

  // If you want to override the default rate-limiter WHILE using the @SkipThrottle() at the top of the controller, you have to use this format.
  @SkipThrottle({ default: false })
  @Throttle({ default: { ttl: 60000, limit: 2 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
