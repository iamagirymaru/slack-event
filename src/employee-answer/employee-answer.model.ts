import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface EmployeeAnswerCreationAttrs {
    name: string;
    email: string;
    isGoingCorporate: boolean;
}

@Table({ tableName: 'employee_answer' })
export class EmployeeAnswer extends Model<EmployeeAnswer, EmployeeAnswerCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.BOOLEAN })
    isGoingCorporate: boolean;
}