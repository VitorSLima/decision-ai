import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório que carrega uma única opção com seus metadados de pontuação.
 */
@Injectable()
export class FindOptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Recupera uma opção pelo identificador incluindo os critérios associados.
   * @param id Identificador da opção.
   */
  async findById(id: string) {
    return this.prisma.option.findUnique({
      where: { id },
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
