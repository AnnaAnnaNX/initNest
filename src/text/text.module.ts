import { Module } from '@nestjs/common';
import TextController from './text.controller';
import TextService from './text.service';
import Text from '../database/text.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
 
@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {}