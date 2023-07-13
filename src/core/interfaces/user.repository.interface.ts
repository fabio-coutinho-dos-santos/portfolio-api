import { User } from '../entities/user.entity';
import { BaseInterfaceRepository } from './base.interface.repository';

export type UserRepositoryInterface = BaseInterfaceRepository<User>;
