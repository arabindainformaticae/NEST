import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'souvick',
        database: 'Souvick',
        ssl: {
          rejectUnauthorized: false, // You can set this to true in production with a valid certificate
        },
        
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}