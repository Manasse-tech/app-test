export class SemanticCacheService {
  constructor(
    private readonly redisClient: {
      vectorSearch(indexName: string, vector: number[], tenantId: string): Promise<string | null>;
    },
    private readonly embeddingClient: {
      generate(prompt: string): Promise<number[]>;
    }
  ) {}

  async get(prompt: string, tenantId: string): Promise<string | null> {
    const vector = await this.embeddingClient.generate(prompt);
    return await this.redisClient.vectorSearch('idx:cache', vector, tenantId);
  }
}
