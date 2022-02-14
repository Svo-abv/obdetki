import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { MyGraphQl } from './models/my-graph-ql.model';
import { MyGraphQlService } from './my-graph-ql.service';

@Resolver()
export class MyGraphQlResolver {

    constructor(private readonly myGraphQlService: MyGraphQlService) { }

    @Query(returns => MyGraphQl)
    async mygraphql(@Args('id') id: string): Promise<MyGraphQl> {

        const mygraphql = await this.myGraphQlService.findOneById(id);
        if (!mygraphql) {
            throw new NotFoundException(id);
        }
        return mygraphql;
    }
}
