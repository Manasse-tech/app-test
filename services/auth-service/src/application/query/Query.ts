export abstract class Query {
  abstract readonly queryType: string;
}

export interface IQueryResult {
  // Marker interface for query results
}

export interface IQueryHandler<T extends Query, R extends IQueryResult> {
  execute(query: T): Promise<R>;
}

export interface IQueryBus {
  execute<T extends Query, R extends IQueryResult>(query: T): Promise<R>;
}
