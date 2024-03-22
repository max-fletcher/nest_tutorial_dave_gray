import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  // This is how you use dependency injection in Nest
  constructor (private readonly databaseService: DatabaseService){}
  // remember to add async to the function using the database service class. Remember that you used "await" the service so you don't need to
  // "await" here when you use the service.
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto
    })
  }

  // remember to add async to the function using the database service class. Remember that you used "await" the service so you don't need to
  // "await" here when you use the service.
  async findAll(role? : "INTERN" | "ENGINEER" | "ADMIN") {
    if(role) 
      return this.databaseService.employee.findMany({ 
        where: { role: role } 
      })

    return this.databaseService.employee.findMany()
  }

  // remember to add async to the function using the database service class. Remember that you used "await" the service so you don't need to
  // "await" here when you use the service.
  async findOne(id: number) {
    return this.databaseService.employee.findUnique({ 
      where: { id: id } 
    })
  }

  // remember to add async to the function using the database service class. Remember that you used "await" the service so you don't need to
  // "await" here when you use the service.
  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: { id: id },
      data: updateEmployeeDto
    })
  }

  // remember to add async to the function using the database service class. Remember that you used "await" the service so you don't need to
  // "await" here when you use the service.
  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: { id: id } 
    })
  }
}
