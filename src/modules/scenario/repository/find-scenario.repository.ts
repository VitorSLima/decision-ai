import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório responsável por recuperar um cenário específico.
 */
@Injectable()
export class FindScenarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca um cenário pelo identificador incluindo suas opções e critérios.
   * @param id Identificador do cenário.
   */
  async findById(id: string) {
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
}
