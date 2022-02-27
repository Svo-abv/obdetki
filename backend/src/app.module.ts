import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './modules/users/users.module';
import { PagesModule } from './modules/pages/pages.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrdersRowsModule } from './modules/orders-rows/orders-rows.module';
import { BasketModule } from './modules/basket/basket.module';
import { BasketRowsModule } from './modules/basket-rows/basket-rows.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductBrandsModule } from './modules/product-brands/product-brands.module';
import { ProductImagesModule } from './modules/product-images/product-images.module';
import { ProductPropertiesModule } from './modules/product-properties/product-properties.module';
import { ProductPropertiesRowsModule } from './modules/product-properties-rows/product-properties-rows.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/models/users.entity';
import { ConfigModule } from '@nestjs/config';
import { Pages } from './modules/pages/models/pages.entity';
import { Orders } from './modules/orders/models/orders.entity';
import { OrdersRows } from './modules/orders-rows/models/orders-rows.entity';
import { Basket } from './modules/basket/models/basket.entity';
import { BasketRows } from './modules/basket-rows/models/basket-rows.entity';
import { Cargo } from './modules/cargo/models/cargo.entity';
import { Products } from './modules/products/models/products.entity';
import { ProductCategories } from './modules/product-categories/models/product-categories.entity';
import { ProductBrands } from './modules/product-brands/models/product-brands.entity';
import { ProductImages } from './modules/product-images/models/product-images.entity';
import { ProductProperties } from './modules/product-properties/models/product-properties.entity';
import { ProductPropertiesRows } from './modules/product-properties-rows/models/product-properties-rows.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Upload } from './utils/types/Upload.scalar';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local',],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gpl',
      uploads: {
        maxFileSize: 20000000,
        maxFiles: 5,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_LOGIN,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      entities: [
        Users, Pages, Orders, OrdersRows,
        Basket, BasketRows, Cargo, Products, ProductCategories,
        ProductBrands, ProductImages, ProductProperties, ProductPropertiesRows
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api*'],
    }),
    UsersModule, PagesModule,
    OrdersModule, OrdersRowsModule,
    BasketModule, BasketRowsModule,
    CargoModule, ProductsModule,
    ProductCategoriesModule, ProductBrandsModule,
    ProductImagesModule, ProductPropertiesModule,
    ProductPropertiesRowsModule, MailModule,
  ],
  providers: [Upload,],
})
export class AppModule { }
