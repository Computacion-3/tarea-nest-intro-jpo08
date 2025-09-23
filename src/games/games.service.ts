import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateGameDto): Promise<Game> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const game = this.gameRepository.create({
      title: dto.title,
      genre: dto.genre,
      releaseDate: dto.releaseDate,
      user,
    });
    return this.gameRepository.save(game);
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Game | null> {
    return this.gameRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, dto: UpdateGameDto): Promise<Game | null> {
    await this.gameRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ id: number } | null> {
    const result = await this.gameRepository.delete(id);
    return result.affected ? { id } : null;
  }
}
