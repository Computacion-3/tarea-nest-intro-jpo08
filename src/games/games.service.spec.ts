import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { User } from 'src/users/entities/user.entity';

const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: getRepositoryToken(Game), useValue: mockRepo },
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
