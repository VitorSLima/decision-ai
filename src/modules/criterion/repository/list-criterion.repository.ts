import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class ListCriterionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.criterion.findMany();
  }
}
