import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [],
  controllers: [],
})
export class GamesModule {}
