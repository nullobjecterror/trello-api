import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        API_PORT: Joi.number().required(),
        CONNECTION: Joi.string().required(),
        USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-data-api'>('CONNECTION'),
        username: config.get<string>('USERNAME'),
        password: config.get<string>('PASSWORD'),
        database: config.get<string>('DATABASE'),
        port: config.get<number>('PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    AuthModule,
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
})
export class AppModule {}
