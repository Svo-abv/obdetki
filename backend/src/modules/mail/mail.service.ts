import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OrdersRows } from '../orders-rows/models/orders-rows.entity';
import { OrdersDto } from '../orders/dto/orders.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class MailService {
    constructor(private mailerSErvice: MailerService) { }

    async newOrderToAdmin(order: OrdersDto, user: UserDto, rows: OrdersRows[], cargo: string, comment: string) {
        this.mailerSErvice.sendMail({
            to: process.env.ADMIN_MAIL, // list of receivers
            subject: `[ООО "ОбувьДетки"]: Новый заказ #${order.number}`,
            template: 'new-order-admin', // HTML body content
            context: {
                number: order.number,
                name: user.name,
                orderRows: rows,
                nameCargo: cargo,
                comment: comment,
            },
        })
            .then(() => { })
            .catch((e) => { console.log(e) });
    }

    async newOrderToUser(order: OrdersDto, user: UserDto, rows: OrdersRows[], cargo: string, comment: string) {
        this.mailerSErvice.sendMail({
            to: user.email, // list of receivers
            subject: `[ООО "ОбувьДетки"]: Ваш заказ #${order.number}`,
            template: 'new-order-user', // HTML body content
            context: {
                number: order.number,
                orderRows: rows,
                nameCargo: cargo,
                comment: comment,
            },
        })
            .then(() => { })
            .catch((e) => { console.log(e) });
    }

    async userRegistredToAdmin(user: any) {
        this.mailerSErvice.sendMail({
            to: process.env.ADMIN_MAIL, // list of receivers
            subject: `[ООО "ОбувьДетки"]: Регистрация нового пользователя`,
            template: 'new-user-admin', // HTML body content
            context: {
                user: user,
            },
        });
    }

    async userRegistredToUser(name: string, pwd: string) {
        this.mailerSErvice.sendMail({
            to: name, // list of receivers
            subject: `[ООО "ОбувьДетки"]: Регистрация на сайте`,
            template: 'new-user-user', // HTML body content
            context: {
                name: name,
                pwd: pwd,
            },
        });
    }
}



