import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por listar critérios cadastrados.
 */
@Injectable()
export class ListCriterionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retorna todos os critérios.
   */
  async list() {
    return this.prisma.criterion.findMany();
  }
}
