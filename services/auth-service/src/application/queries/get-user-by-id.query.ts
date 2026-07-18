import { Query, IQueryResult } from '../query/Query';

export class GetUserByIdQuery extends Query {
  readonly userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }

  get queryType(): string {
    return 'GET_USER_BY_ID';
  }
}

export interface GetUserByIdResult extends IQueryResult {
  id: string;
  email: string;
  role: string;
}
