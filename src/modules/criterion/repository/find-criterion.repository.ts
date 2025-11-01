import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por recuperar um critério específico.
 */
@Injectable()
export class FindCriterionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca um critério pelo identificador.
   * @param id Identificador do critério.
   */
  async findById(id: string) {
    return this.prisma.criterion.findUnique({
      where: { id },
    });
  }
}
