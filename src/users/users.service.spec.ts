import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: any;
  const mockPrisma = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService);
  });
  it('should create user ', async () => {
    const dto = { email: 'danijeltest@gmail.com', password: '1234567' };
    prisma.user.create.mockResolvedValue({ id: 1, ...dto });
    const test = await service.createUser(dto);
    expect(test.email).toBe('danijeltest@gmail.com');
    expect(prisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: dto.email,
          password: expect.any(String),
        }),
      }),
    );
  });
});
