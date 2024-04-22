import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { EmployeeAnswerI, EmployeeAnswerService } from './employee-answer.service';

@Controller('employee-answer')
export class EmployeeAnswerController {

    constructor(private employeeAnswerService: EmployeeAnswerService) {}

    /** Получение записей с пагианцией */
    @Get('/get-employee-answers/:limit/:page')
    async getEmployeeAnswers(@Param('limit') limit: number, @Param('page') page: number): Promise<EmployeeAnswerI[]> {

        return await this.employeeAnswerService.getEmployeeAnswers({ limit: limit, page: page });
    }

    /** Получение общего количества записей с ответами */
    @Get('/get-employee-answers-count')
    async getEmployeeAnswersCount(): Promise<{ employeeAnswersCount: number }> {

        return await this.employeeAnswerService.getEmployeeAnswersCount();
    }
}
