import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateCriterionDto } from '../dto/create-criterion.dto';

@Injectable()
export class CreateCriterionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCriterionDto) {
    return this.prisma.criterion.create({
      data,
    });
  }
}
