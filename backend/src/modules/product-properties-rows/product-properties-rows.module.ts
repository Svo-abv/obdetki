import { Module } from '@nestjs/common';
import { ProductPropertiesRowsService } from './product-properties-rows.service';
import { ProductPropertiesRowsResolver } from './product-properties-rows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPropertiesRows } from './models/product-properties-rows.entity';
import { AuthModule } from 'src/utils/auth/auth.module';

@Module({
  imports:
    [TypeOrmModule.forFeature([ProductPropertiesRows,]),
      AuthModule,
    ],
  providers: [ProductPropertiesRowsService, ProductPropertiesRowsResolver]
})
export class ProductPropertiesRowsModule { }
