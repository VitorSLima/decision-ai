import { randomUUID } from 'crypto';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/shared/databases/prisma.database';
import { ScenarioService } from '../src/modules/scenario/scenario.service';
import { OptionService } from '../src/modules/option/option.service';
import { CriterionService } from '../src/modules/criterion/criterion.service';
import { ScoreService } from '../src/modules/score/score.service';
import { DecisionService } from '../src/modules/decision/decision.service';

type ScenarioEntity = {
  id: string;
  title: string;
  description?: string | null;
  createdAt: Date;
};

type OptionEntity = {
  id: string;
  name: string;
  description?: string | null;
  scenarioId: string;
};

type CriterionEntity = {
  id: string;
  name: string;
  weight: number;
  active: boolean;
  createdAt: Date;
};

type ScoreEntity = {
  id: string;
  optionId: string;
  criterionId: string;
};

class InMemoryPrismaService {
  private scenarios: ScenarioEntity[] = [];
  private options: OptionEntity[] = [];
  private criteria: CriterionEntity[] = [];
  private scores: ScoreEntity[] = [];

  scenario = {
    create: ({ data }) => {
      const scenario: ScenarioEntity = {
        id: randomUUID(),
        createdAt: new Date(),
        description: data.description ?? null,
        title: data.title,
      };
      this.scenarios.push(scenario);
      return { ...scenario };
    },
    findMany: ({ include } = { include: undefined }) =>
      this.scenarios.map((scenario) => this.mapScenario(scenario, include)),
    findUnique: ({ where, include }) => {
      const scenario = this.scenarios.find((item) => item.id === where.id);
      return scenario ? this.mapScenario(scenario, include) : null;
    },
    update: ({ where, data, include }) => {
      const scenario = this.scenarios.find((item) => item.id === where.id);
      if (!scenario) {
        throw new Error('Scenario not found');
      }
      Object.assign(scenario, data);
      return this.mapScenario(scenario, include);
    },
    delete: ({ where }) => {
      const index = this.scenarios.findIndex((item) => item.id === where.id);
      if (index === -1) {
        throw new Error('Scenario not found');
      }
      const [removed] = this.scenarios.splice(index, 1);
      this.options = this.options.filter((option) => option.scenarioId !== removed.id);
      this.scores = this.scores.filter((score) => {
        const optionExists = this.options.some((option) => option.id === score.optionId);
        return optionExists;
      });
    },
  };

  option = {
    create: ({ data, include }) => {
      const scenarioExists = this.scenarios.some((scenario) => scenario.id === data.scenarioId);
      if (!scenarioExists) {
        throw { code: 'P2003' };
      }
      const option: OptionEntity = {
        id: randomUUID(),
        name: data.name,
        description: data.description ?? null,
        scenarioId: data.scenarioId,
      };
      this.options.push(option);
      return this.mapOption(option, include);
    },
    findMany: ({ where, include }) =>
      this.options
        .filter((option) => option.scenarioId === where.scenarioId)
        .map((option) => this.mapOption(option, include)),
    findUnique: ({ where, include }) => {
      const option = this.options.find((item) => item.id === where.id);
      return option ? this.mapOption(option, include) : null;
    },
    update: ({ where, data, include }) => {
      const option = this.options.find((item) => item.id === where.id);
      if (!option) {
        throw new Error('Option not found');
      }
      Object.assign(option, data);
      return this.mapOption(option, include);
    },
    delete: ({ where }) => {
      const index = this.options.findIndex((item) => item.id === where.id);
      if (index === -1) {
        throw new Error('Option not found');
      }
      const [removed] = this.options.splice(index, 1);
      this.scores = this.scores.filter((score) => score.optionId !== removed.id);
    },
  };

  criterion = {
    create: ({ data }) => {
      const criterion: CriterionEntity = {
        id: randomUUID(),
        name: data.name,
        weight: data.weight,
        active: data.active ?? true,
        createdAt: new Date(),
      };
      this.criteria.push(criterion);
      return { ...criterion };
    },
    findMany: () => this.criteria.map((criterion) => ({ ...criterion })),
    findUnique: ({ where }) =>
      this.criteria.find((criterion) => criterion.id === where.id) ?? null,
    update: ({ where, data }) => {
      const criterion = this.criteria.find((item) => item.id === where.id);
      if (!criterion) {
        throw new Error('Criterion not found');
      }
      Object.assign(criterion, data);
      return { ...criterion };
    },
    delete: ({ where }) => {
      const index = this.criteria.findIndex((item) => item.id === where.id);
      if (index === -1) {
        throw new Error('Criterion not found');
      }
      this.criteria.splice(index, 1);
      this.scores = this.scores.filter((score) => score.criterionId !== where.id);
    },
  };

  score = {
    findFirst: ({ where }) =>
      this.scores.find(
        (score) =>
          score.optionId === where.optionId && score.criterionId === where.criterionId,
      ) ?? null,
    create: ({ data, include }) => {
      const optionExists = this.options.some((option) => option.id === data.optionId);
      const criterionExists = this.criteria.some((criterion) => criterion.id === data.criterionId);

      if (!optionExists || !criterionExists) {
        throw { code: 'P2003' };
      }

      const score: ScoreEntity = {
        id: randomUUID(),
        optionId: data.optionId,
        criterionId: data.criterionId,
      };
      this.scores.push(score);
      return this.mapScore(score, include);
    },
    findUnique: ({ where, include }) => {
      const score = this.scores.find((item) => item.id === where.id);
      return score ? this.mapScore(score, include) : null;
    },
    delete: ({ where }) => {
      const index = this.scores.findIndex((item) => item.id === where.id);
      if (index === -1) {
        throw new Error('Score not found');
      }
      this.scores.splice(index, 1);
    },
  };

  async onModuleInit() {
    return;
  }

  private mapScenario(scenario: ScenarioEntity, include?: any) {
    const result: any = { ...scenario };

    if (include?.options) {
      const optionInclude = include.options.include;
      result.options = this.options
        .filter((option) => option.scenarioId === scenario.id)
        .map((option) => this.mapOption(option, optionInclude));
    }

    return result;
  }

  private mapOption(option: OptionEntity, include?: any) {
    const result: any = { ...option };

    if (include?.scores) {
      const scoreInclude = include.scores.include;
      result.scores = this.scores
        .filter((score) => score.optionId === option.id)
        .map((score) => this.mapScore(score, scoreInclude));
    }

    return result;
  }

  private mapScore(score: ScoreEntity, include?: any) {
    const result: any = { ...score };

    if (include?.criterion) {
      result.criterion = this.criteria.find((criterion) => criterion.id === score.criterionId) ?? null;
    }

    if (include?.option) {
      result.option = this.options.find((option) => option.id === score.optionId) ?? null;
    }

    return result;
  }
}

describe('Decision AI flow (e2e)', () => {
  let app: INestApplication;
  let scenarioService: ScenarioService;
  let optionService: OptionService;
  let criterionService: CriterionService;
  let scoreService: ScoreService;
  let decisionService: DecisionService;

  beforeEach(async () => {
    const prisma = new InMemoryPrismaService();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    scenarioService = app.get(ScenarioService);
    optionService = app.get(OptionService);
    criterionService = app.get(CriterionService);
    scoreService = app.get(ScoreService);
    decisionService = app.get(DecisionService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('persists entities and computes decision scores end-to-end', async () => {
    const life = await criterionService.create({ name: 'PRIORITIZE_LIFE', weight: 0.45 });
    const law = await criterionService.create({ name: 'FOLLOW_LAW', weight: 0.3 });
    const passenger = await criterionService.create({ name: 'PROTECT_PASSENGER', weight: 0.25 });

    const scenario = await scenarioService.create({
      title: 'Dilema do carro autônomo',
      description: 'Escolha ética em colisão inevitável',
    });

    const optionA = await optionService.create(scenario.id, {
      name: 'Desviar e arriscar passageiro',
    });

    const optionB = await optionService.create(scenario.id, {
      name: 'Seguir e atingir pedestre',
    });

    const scoreA1 = await scoreService.create({ optionId: optionA.id, criterionId: life.id });
    await scoreService.create({ optionId: optionA.id, criterionId: law.id });
    await scoreService.create({ optionId: optionB.id, criterionId: passenger.id });
    await scoreService.create({ optionId: optionB.id, criterionId: law.id });

    const decision = await decisionService.decide({ scenarioId: scenario.id });

    expect(decision.bestOptions[0].id).toBe(optionA.id);
    expect(decision.bestOptions[0].totalScore).toBeCloseTo(0.75);
    expect(decision.options).toHaveLength(2);

    const storedScenario = await scenarioService.findOne(scenario.id);
    expect(storedScenario.options).toHaveLength(2);
    expect(storedScenario.options[0].scores).toBeDefined();

    await scoreService.remove(scoreA1.id);
    const afterRemoval = await optionService.findOne(optionA.id);
    expect(afterRemoval.scores).toHaveLength(1);

    const criteria = await criterionService.findAll();
    expect(criteria).toHaveLength(3);
  });
});
