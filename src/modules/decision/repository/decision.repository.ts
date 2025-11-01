import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por carregar o cenário com suas opções e critérios.
 */
@Injectable()
export class DecisionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Recupera um cenário completo para cálculo da decisão.
   * @param id Identificador do cenário.
   */
  async getScenarioWithOptions(id: string) {
    return this.prisma.scenario.findUnique({
      where: { id },
      include: {
        options: {
          include: {
            scores: {
              include: {
                criterion: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Retorna todos os cenários com suas opções e critérios para cálculo em lote.
   */
  async listScenariosWithOptions() {
    return this.prisma.scenario.findMany({
      include: {
        options: {
          include: {
            scores: {
              include: {
                criterion: true,
              },
            },
          },
        },
      },
    });
  }
}
