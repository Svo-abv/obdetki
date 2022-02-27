import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerSErvice: MailerService) {

    }

    async newOrderToAdmin(to: string, number: string) {
        this.mailerSErvice.sendMail({
            to: to, // list of receivers
            //from: 'info@obdetki.ru', // sender address
            subject: `[ООО "ОбувьДетки"]: Новый заказ #${number}`,
            template: 'welcome', // HTML body content
        })
            .then(() => { })
            .catch((e) => { console.log(e) });
    }

    async newOrderToUser(to: string, number: string) {
        this.mailerSErvice.sendMail({
            to: to, // list of receivers
            from: 'info@obdetki.ru', // sender address
            subject: `[ООО "ОбувьДетки"]: Новый заказ #${number}`,
            template: 'welcome', // HTML body content
        })
            .then(() => { })
            .catch(() => { });
    }

    async userRegistred(to: string, user: any) {
        this.mailerSErvice.sendMail({
            to: to, // list of receivers
            from: 'info@obdetki.ru', // sender address
            subject: `[ООО "ОбувьДетки"]: Регистрация нового пользователя`,
            html: '<b>welcome</b>', // HTML body content
        })
            .then(() => { })
            .catch(() => { });
    }
}
