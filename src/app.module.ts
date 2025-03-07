import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AuthApiService } from './api-services/auth-api/auth-api.service';
import { JwtStrategy } from './core/jwt-auth-guard/jwt.strategy';
import { RabbitMqConfigModule } from './config/rabbitmq-config.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchAppExceptionsFilter } from './core/error-handling/error.filter';
import { ConfigModule } from '@nestjs/config';
import { AvailabilityController } from './controllers/availability.controller';
import { AppointmentController } from './controllers/appointment.controller';
import { AvailabilityService } from './services/availability.service';
import { AppointmentService } from './services/appointment.service';
import { Appointment, AppointmentSchema } from './models/appointment';
import { Availability, AvailabilitySchema } from './models/availability';
import { MongodbModule } from './config/mongodb.module';
import { PayPalService } from './services/paypal.service';
import { GoogleApis } from 'googleapis';
import { ApiService } from './core/api/api.service';
// @Get('success')
//   async capturePayment(@Query() query: { token: string }) {
//     const captureResponse = await this.paypalService.capturePayment(
//       query.token,
//     );
//     return captureResponse;
//   }
//   @Get('cancel')
//   async cancel() {
//     return { status: 'order failed' };
//   }
@Module({
  imports: [
    MongodbModule,
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Availability.name, schema: AvailabilitySchema },
    ]),
    HttpModule,
    RabbitMqConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AvailabilityController, AppointmentController],
  providers: [
    PayPalService,
    GoogleApis,
    AvailabilityService,
    AuthApiService,
    AppointmentService,
    ApiService,
    JwtStrategy,
    { provide: APP_FILTER, useClass: CatchAppExceptionsFilter },
  ],
})
export class AppModule {}
