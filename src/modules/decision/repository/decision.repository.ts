import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class DecisionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getScenarioWithOptions(id: string) {
    return this.prisma.scenario.findUnique({
      where: { id },
      include: {
        options: {
          include: {
            scores: {
              include: {
                criterion: true,
              },
            },
          },
        },
      },
    });
  }
}
