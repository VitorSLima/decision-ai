import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório que recupera todas as opções pertencentes a um cenário.
 */
@Injectable()
export class ListOptionByScenarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista opções de um cenário com suas informações de pontuação.
   * @param scenarioId Identificador do cenário.
   */
  async list(scenarioId: string) {
    return this.prisma.option.findMany({
      where: { scenarioId },
      include: {
        scores: {
          include: {
            criterion: true,
          },
        },
      },
    });
  }
}
