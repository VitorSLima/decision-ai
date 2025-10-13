import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.score.findUnique({
      where: { id },
      include: {
        criterion: true,
        option: true,
      },
    });
  }
}
