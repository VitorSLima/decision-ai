import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por excluir critérios.
 */
@Injectable()
export class DeleteCriterionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Remove um critério pelo identificador.
   * @param id Identificador do critério.
   */
  async delete(id: string) {
    await this.prisma.criterion.delete({
      where: { id },
    });
  }
}
