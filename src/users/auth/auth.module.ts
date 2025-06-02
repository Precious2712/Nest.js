import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users.module'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: { expiresIn: '2d' },
    }),
    forwardRef(() => UsersModule), 
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}