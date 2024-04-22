import { Body, Headers, Controller, Post, Res } from '@nestjs/common';
import * as crypto from 'crypto';

import { SlackEventService } from './slack-event.service';

@Controller('slack-event')
export class SlackEventController {

    constructor(private slackEventService: SlackEventService) {}

    /** Получение информации об ответе работника */
    @Post('/')
    async getEmployeeAnswers(@Res() res: any, @Headers() requestHeaders: any, @Body() requestBody: any): Promise<void> {
        const signature = requestHeaders['x-slack-signature'];
        const timestamp = requestHeaders['x-slack-request-timestamp'];
        const signingSecret = process.env.SLACK_SIGNING_SECRET;

        // TODO Сделать верификацию запроса slack
        const request = JSON.parse(requestBody.payload);
        await this.slackEventService.saveEmployeeAnswerInfo(request);

        return;
    }
}
