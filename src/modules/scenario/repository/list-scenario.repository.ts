import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class ListScenarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.scenario.findMany({
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
