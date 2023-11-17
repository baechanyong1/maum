import { Test, TestingModule } from '@nestjs/testing';
import { CompletedResolver } from './completed.resolver';
import { CompletedService } from './completed.service';

describe('CompletedResolver', () => {
  let resolver: CompletedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedResolver, CompletedService],
    }).compile();

    resolver = module.get<CompletedResolver>(CompletedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
