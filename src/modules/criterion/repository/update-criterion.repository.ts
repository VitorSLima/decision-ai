import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdateCriterionDto } from '../dto/update-criterion.dto';

/**
 * Repositório responsável por atualizar critérios existentes.
 */
@Injectable()
export class UpdateCriterionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Atualiza um critério pelo identificador.
   * @param id Identificador do critério.
   * @param data Campos a serem atualizados.
   */
  async update(id: string, data: UpdateCriterionDto) {
    return this.prisma.criterion.update({
      where: { id },
      data,
    });
  }
}
