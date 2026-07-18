import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserEntity } from '../persistence/user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: Repository<UserEntity>
  ) {}

  async findById(id: string): Promise<User | null> {
    const entity = await this.ormRepository.findOneBy({ id });
    if (!entity) return null;

    return User.restore(entity.id, entity.email, entity.passwordHash, entity.role, entity.status);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.ormRepository.findOneBy({ email });
    if (!entity) return null;

    return User.restore(entity.id, entity.email, entity.passwordHash, entity.role, entity.status);
  }

  async save(user: User): Promise<void> {
    const entity = this.ormRepository.create({
      id: user.id,
      email: user.getEmail().getValue(),
      passwordHash: user.getPasswordHash(),
      role: user.getRole(),
      status: user.getStatus(),
      metadata: {},
    });
    await this.ormRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
