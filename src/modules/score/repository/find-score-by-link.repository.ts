import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por localizar vínculos a partir da combinação opção/critério.
 */
@Injectable()
export class FindScoreByLinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca um vínculo existente entre uma opção e um critério.
   * @param optionId Identificador da opção.
   * @param criterionId Identificador do critério.
   */
  async find(optionId: string, criterionId: string) {
    return this.prisma.score.findFirst({
      where: {
        optionId,
        criterionId,
      },
    });
  }
}
