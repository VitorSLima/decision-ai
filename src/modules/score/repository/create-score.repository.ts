import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateScoreDto } from '../dto/create-score.dto';

@Injectable()
export class CreateScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateScoreDto) {
    return this.prisma.score.create({
      data,
      include: {
        criterion: true,
        option: true,
      },
    });
  }
}
