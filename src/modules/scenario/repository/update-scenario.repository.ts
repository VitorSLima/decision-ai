import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdateScenarioDto } from '../dto/update-scenario.dto';

/**
 * Repositório responsável por atualizar cenários existentes.
 */
@Injectable()
export class UpdateScenarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Atualiza um cenário trazendo as opções e critérios associados.
   * @param id Identificador do cenário.
   * @param data Campos que serão alterados.
   */
  async update(id: string, data: UpdateScenarioDto) {
    return this.prisma.scenario.update({
      where: { id },
      data,
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
