import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash';

import { EmployeeAnswer } from './employee-answer.model';
import { CreateEmployeeAnswerDto } from './dto/create-employee-answer.dto';

export interface EmployeeAnswerI {
    id?: number;
    name: string;
    email: string;
    isGoingCorporate: boolean;
    createdAt?: string;
    updatedAt?: string; 
}

@Injectable()
export class EmployeeAnswerService {

    constructor(
        @InjectModel(EmployeeAnswer) private employeeAnswerRepository: typeof EmployeeAnswer,
    ) {}

    /** Запись ответа */
    async createEmployeeAnswer(dto: CreateEmployeeAnswerDto): Promise<EmployeeAnswerI> {
        const employeeAnswer = await this.employeeAnswerRepository.create(dto);
        return employeeAnswer;
    }

    /** Получение списка ответов с пагинацей */
    async getEmployeeAnswers(params: { limit: number, page: number }): Promise<EmployeeAnswerI[]> {
        const employeeAnswers = await this.employeeAnswerRepository.findAll({ raw: true });
        const employeeAnswersPagination = employeeAnswers.slice((params.page - 1) * params.limit, params.page * params.limit);
        return employeeAnswersPagination;
    }

    /** Получаем информацию о количестве записей */
    async getEmployeeAnswersCount(): Promise<{ employeeAnswersCount: number }> {
        const employeeAnswersCount = await this.employeeAnswerRepository.count();
    
        return { employeeAnswersCount: employeeAnswersCount };
    }
}
