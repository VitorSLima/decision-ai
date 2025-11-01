import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por remover vínculos entre opção e critério.
 */
@Injectable()
export class DeleteScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Exclui um vínculo pelo identificador.
   * @param id Identificador do score.
   */
  async delete(id: string) {
    await this.prisma.score.delete({
      where: { id },
    });
  }
}
