import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por carregar um vínculo entre opção e critério.
 */
@Injectable()
export class FindScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca um score pelo identificador trazendo os relacionamentos.
   * @param id Identificador do score.
   */
  async findById(id: string) {
    return this.prisma.score.findUnique({
      where: { id },
      include: {
        criterion: true,
        option: true,
      },
    });
  }
}
