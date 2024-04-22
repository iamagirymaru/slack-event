import { Module } from '@nestjs/common';

import { SlackEventService } from './slack-event.service';
import { EmployeeAnswerModule } from '../employee-answer/employee-answer.module';
import { SlackEventController } from './slack-event.controller';

@Module({
    providers: [SlackEventService],
    controllers: [SlackEventController],
    imports: [
        EmployeeAnswerModule,
    ],
    exports: [
		SlackEventService,
	]
})
export class SlackEventModule {}
