import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindScoreByLinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(optionId: string, criterionId: string) {
    return this.prisma.score.findFirst({
      where: {
        optionId,
        criterionId,
      },
    });
  }
}
