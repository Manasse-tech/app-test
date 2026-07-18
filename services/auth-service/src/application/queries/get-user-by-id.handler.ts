import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler } from '../query/Query';
import { GetUserByIdQuery, GetUserByIdResult } from './get-user-by-id.query';
import { IUserRepository, USER_REPOSITORY } from '../../domain/repositories/IUserRepository';

@Injectable()
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery, GetUserByIdResult> {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<GetUserByIdResult> {
    const user = await this.userRepository.findById(query.userId);
    if (!user) {
      throw new Error(`User with id ${query.userId} not found`);
    }

    return {
      id: query.userId,
      email: user.getEmail().getValue(),
      role: user.getRole(),
    };
  }
}
