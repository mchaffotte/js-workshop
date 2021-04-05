import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Employee extends Model<Employee> {
  @Column
  firstName: string;

  @Column
  lastName: string;
}
