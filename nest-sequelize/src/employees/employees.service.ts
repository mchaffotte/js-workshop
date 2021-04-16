import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Employee } from './employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee();
    employee.firstName = createEmployeeDto.firstName;
    employee.lastName = createEmployeeDto.lastName;

    return employee.save();
  }

  findAll(
    offset = 0,
    limit = 10,
  ): Promise<{ rows: Employee[]; count: number }> {
    return this.employeeModel.findAndCountAll({
      limit: Math.max(10, limit),
      offset: Math.max(0, offset),
      order: ['id'],
    });
  }

  findOne(id: number): Promise<Employee> {
    return this.employeeModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const updated = await this.employeeModel.update(updateEmployeeDto, {
      where: { id: id },
    });
    if (updated[0] != 1) {
      throw new Error('Unable to update the employee');
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await employee.destroy();
  }
}
