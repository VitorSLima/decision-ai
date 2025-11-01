import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por excluir cenários.
 */
@Injectable()
export class DeleteScenarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Remove um cenário pelo identificador.
   * @param id Identificador do cenário.
   */
  async delete(id: string) {
    await this.prisma.scenario.delete({
      where: { id },
    });
  }
}
