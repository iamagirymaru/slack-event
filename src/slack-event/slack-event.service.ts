import { Injectable, OnModuleInit } from '@nestjs/common';
import { Block, WebClient } from '@slack/web-api';

import { EmployeeAnswerService } from '../employee-answer/employee-answer.service';

@Injectable()
export class SlackEventService implements OnModuleInit {
    private client: WebClient
	constructor(
	    private employeeAnswerService: EmployeeAnswerService,
	) {
        this.client = new WebClient(process.env.SLACK_BOT_TOKEN);
    }

    /** Сохранить информацию об ответе пользователя */
    public async saveEmployeeAnswerInfo(data: any): Promise<void> {

        if (data?.user?.id) {
            const userInfo = await this.getUserById(data.user.id);

            await this.employeeAnswerService.createEmployeeAnswer({
                name: data.user.name,
                email: userInfo.user.profile.email,
                isGoingCorporate: data.actions[0].action_id === '0' ? true : false,
            });
            
            let blocks = [];
            if (data.actions[0].action_id === '0') {
                blocks = [
                    {
                        "type": "section",
                        "text": {
                            "type": "plain_text",
                            "text": "Спасибо за ответ!\n Ждем тебя на летнем корпоративе!",
                            "emoji": true
                        }
                    }
                ]
            } else {
                blocks = [
                    {
                        "type": "section",
                        "text": {
                            "type": "plain_text",
                            "text": "Спасибо за ответ!\n Очень жаль что ты не сможешь приехать =(",
                            "emoji": true
                        }
                    }
                ]
            }

            await this.updateMessage(data.container.channel_id, data.container.message_ts, blocks);
        }
        
        return;
    }

    /** Отправка сообщений пользователям */
    async onModuleInit() {
        setImmediate(async () => {

            // const domain = 'gmail.com';
            const domain = 'foxford.ru';

            const blocks = [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "Привет!\n Планируешь ли ты ехать на летний корпоратив?",
                        "emoji": true
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Да",
                                "emoji": true
                            },
                            "value": "click_me_123",
                            "action_id": "0"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Нет",
                                "emoji": true
                            },
                            "value": "click_me_123",
                            "action_id": "1"
                        }
                    ]
                }
            ]

            const users = await this.getUsers();
            const usersEmailFiltered = users.filter(user => user.profile?.email?.endsWith(domain));

            const sendMessagePromises = usersEmailFiltered.map(user => {
                return this.sendMessageToUser(user.id, blocks);
            });
            await Promise.all(sendMessagePromises);
        });
    }

    /** Получение всех пользователей */
    private async getUsers(): Promise<any> {
        let users = [];
        try {
            users = (await this.client.users.list({}))?.members;
        } catch (e) {
            console.log(e);
        }
        
        return users;
    }

    /** Получение пользователя по id */
    private async getUserById(idUser: string): Promise<any> {
        let user = null;
        try {
            user = await this.client.users.info({ user: idUser });
        } catch (e) {
            console.log(e);
        }
        
        return user;
    }
    
    /** Отправка сообщения пользователю */ 
    private async sendMessageToUser(idUser: string, blocks: Block[]): Promise<any> {
        let resp: any = null;

        try {
            resp = await this.client.chat.postMessage({
                channel: idUser,
                blocks: blocks,
            });
        } catch (e) {
            console.log(e);
        }

        return resp;
    }

    /** Изменить текст сообщения по id */
    private async updateMessage(idChannel: string, messageTimestamp: string, blocks: Block[]): Promise<any> {
        let resp: any = null;

        try {
            resp = await this.client.chat.update({
                channel: idChannel,
                ts: messageTimestamp,
                blocks: blocks,
            });
        } catch (e) {
            console.log(e);
        }

        return resp;
    }
}
