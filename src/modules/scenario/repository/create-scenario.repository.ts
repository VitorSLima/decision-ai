import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateScenarioDto } from '../dto/create-scenario.dto';

/**
 * Repositório responsável por criar cenários de decisão.
 */
@Injectable()
export class CreateScenarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Persiste um novo cenário.
   * @param data Dados do cenário.
   */
  async create(data: CreateScenarioDto) {
    const scenario = await this.prisma.scenario.create({
      data,
    });
    return scenario;
  }
}
