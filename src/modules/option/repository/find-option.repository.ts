import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindOptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.option.findUnique({
      where: { id },
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
