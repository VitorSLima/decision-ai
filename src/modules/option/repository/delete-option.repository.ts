import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

/**
 * Repositório que remove opções do armazenamento.
 */
@Injectable()
export class DeleteOptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Exclui uma opção pelo identificador.
   * @param id Identificador da opção.
   */
  async delete(id: string) {
    await this.prisma.option.delete({
      where: { id },
    });
  }
}
