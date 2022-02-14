import { Injectable } from '@nestjs/common';
import { MyGraphQl } from './models/my-graph-ql.model';

@Injectable()
export class MyGraphQlService {

    async findOneById(id: string): Promise<MyGraphQl> {
        return { id: "1", title: "hello toto" } as any;
    }
}