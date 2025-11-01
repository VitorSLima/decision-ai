import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por listar cenários com suas opções e critérios.
 */
@Injectable()
export class ListScenarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retorna todos os cenários carregando opções e critérios vinculados.
   */
  async list() {
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
