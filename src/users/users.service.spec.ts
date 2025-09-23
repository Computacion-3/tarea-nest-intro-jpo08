import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RolesService } from '../roles/roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('UsersService', () => {
    let service: UsersService;

    const mockRolesService = {
        findByName: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: RolesService, useValue: mockRolesService },
                { provide: getRepositoryToken(User), useValue: mockRepository },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
