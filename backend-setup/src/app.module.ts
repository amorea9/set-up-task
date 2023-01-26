import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsFactsModule } from './catfacts/catfacts.module';

@Module({
  imports: [CatsFactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
