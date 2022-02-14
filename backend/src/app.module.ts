import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MyGraphQlModule } from './my-graph-ql/my-graph-ql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gpl',
    }),
    MyGraphQlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
