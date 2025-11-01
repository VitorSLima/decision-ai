import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdateOptionDto } from '../dto/update-option.dto';

/**
 * Repositório responsável por atualizar opções existentes.
 */
@Injectable()
export class UpdateOptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Atualiza uma opção pelo identificador e retorna com os critérios ligados.
   * @param id Identificador da opção.
   * @param data Campos que serão atualizados.
   */
  async update(id: string, data: UpdateOptionDto) {
    return this.prisma.option.update({
      where: { id },
      data,
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
