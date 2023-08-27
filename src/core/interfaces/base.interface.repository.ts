import { DeleteResult, UpdateResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;
  findOneById(id: number): Promise<T>;
  findByCondition(filterCondition: any): Promise<T>;
  findAll(): Promise<T[]>;
  remove(id: number): Promise<DeleteResult>;
  updateOne(id: number, object: any): Promise<UpdateResult>;
  findWithRelations(relations: any): Promise<T[]>;
  findOneWithRelations(relations: any): Promise<T>;
}
