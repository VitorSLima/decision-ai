import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class ListOptionByScenarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(scenarioId: string) {
    return this.prisma.option.findMany({
      where: { scenarioId },
      include: {
        scores: {
          include: {
            criterion: true,
          },
        },
      },
    });
  }
}
