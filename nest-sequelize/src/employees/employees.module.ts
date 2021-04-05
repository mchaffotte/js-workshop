import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
