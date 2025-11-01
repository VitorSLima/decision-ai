import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateCriterionDto } from '../dto/create-criterion.dto';

/**
 * Repositório responsável por criar critérios de avaliação.
 */
@Injectable()
export class CreateCriterionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Persiste um novo critério.
   * @param data Dados do critério.
   */
  async create(data: CreateCriterionDto) {
    return this.prisma.criterion.create({
      data,
    });
  }
}
