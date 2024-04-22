import { Module } from '@nestjs/common'
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from '@nestjs/config';

import { EmployeeAnswer } from './employee-answer/employee-answer.model';
import { SlackEventModule } from './slack-event/slack-event.module';
import { EmployeeAnswerModule } from './employee-answer/employee-answer.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [EmployeeAnswer],
            autoLoadModels: true,
        }),
        EmployeeAnswerModule,
        SlackEventModule,
    ]
})
export class AppModule {}