import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NenjasModule } from './nenjas/nenjas.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './users/auth/auth.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.mongooseDB_URL || 'mongodb://localhost:27017/transfer-market'),
    NenjasModule,
    UsersModule,
    AuthModule,
    WalletModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}