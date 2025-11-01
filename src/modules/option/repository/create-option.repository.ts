import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateOptionDto } from '../dto/create-option.dto';

/**
 * Repositório responsável por persistir opções vinculadas a um cenário.
 */
@Injectable()
export class CreateOptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria uma nova opção e carrega os critérios relacionados.
   * @param scenarioId Identificador do cenário proprietário da opção.
   * @param data Dados da opção.
   */
  async create(scenarioId: string, data: CreateOptionDto) {
    return this.prisma.option.create({
      data: {
        ...data,
        scenarioId,
      },
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
