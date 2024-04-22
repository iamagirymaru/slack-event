import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EmployeeAnswerService } from './employee-answer.service';
import { EmployeeAnswerController } from './employee-answer.controller';
import { EmployeeAnswer } from './employee-answer.model';


@Module({
  	providers: [EmployeeAnswerService],
  	controllers: [EmployeeAnswerController],
	imports: [
		SequelizeModule.forFeature([EmployeeAnswer]),
	],
	exports: [
		EmployeeAnswerService,
	]
})
export class EmployeeAnswerModule {}
