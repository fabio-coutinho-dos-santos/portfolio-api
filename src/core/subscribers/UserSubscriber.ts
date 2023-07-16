import {
  EventSubscriber,
  EntitySubscriberInterface,
  DataSource,
  InsertEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';
import { Logger } from '@nestjs/common';
import { hashSync, genSaltSync } from 'bcrypt';

@EventSubscriber()
export default class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const user = event.entity;
    user.password = await hashSync(user.password, genSaltSync(10));
    Logger.log(
      'Encrypt the password using subscriber before insert User',
      'UserSubscriber',
    );
  }
}
