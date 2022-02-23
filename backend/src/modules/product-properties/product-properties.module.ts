import { Module } from '@nestjs/common';
import { ProductPropertiesService } from './product-properties.service';
import { ProductPropertiesResolver } from './product-properties.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProperties } from './models/product-properties.entity';
import { AuthModule } from 'src/utils/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductProperties]),
    AuthModule,
  ],
  providers: [ProductPropertiesService, ProductPropertiesResolver],
})
export class ProductPropertiesModule { }
