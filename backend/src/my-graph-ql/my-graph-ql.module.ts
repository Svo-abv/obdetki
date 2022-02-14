import { Module } from '@nestjs/common';
import { MyGraphQlService } from './my-graph-ql.service';
import { MyGraphQlResolver } from './my-graph-ql.resolver';

@Module({
  providers: [MyGraphQlService, MyGraphQlResolver]
})
export class MyGraphQlModule {}
