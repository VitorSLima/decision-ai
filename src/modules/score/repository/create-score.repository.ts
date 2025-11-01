import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateScoreDto } from '../dto/create-score.dto';

/**
 * Repositório responsável por vincular opções e critérios.
 */
@Injectable()
export class CreateScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria um vínculo entre opção e critério com seus relacionamentos carregados.
   * @param data Dados do vínculo.
   */
  async create(data: CreateScoreDto) {
    return this.prisma.score.create({
      data,
      include: {
        criterion: true,
        option: true,
      },
    });
  }
}
