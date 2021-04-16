import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.model';
import { TransactionInterceptor } from 'src/interceptors/TransactionInterceptor';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a pagniated list of employees' })
  findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<{ rows: Employee[]; count: number }> {
    return this.employeesService.findAll(offset, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the employee based on its identifier' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Employee,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({ summary: 'Update the employee based on its identifier' })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({ summary: 'Delete the employee based on its identifier' })
  remove(@Param('id') id: string): Promise<void> {
    return this.employeesService.remove(+id);
  }
}
