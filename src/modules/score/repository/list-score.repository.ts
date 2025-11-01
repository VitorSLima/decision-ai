import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por listar todos os vínculos entre opções e critérios.
 */
@Injectable()
export class ListScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retorna todos os scores com informações de opção, cenário e critério.
   */
  async list() {
    return this.prisma.score.findMany({
      include: {
        option: {
          include: {
            scenario: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        criterion: true,
      },
    });
  }
}
