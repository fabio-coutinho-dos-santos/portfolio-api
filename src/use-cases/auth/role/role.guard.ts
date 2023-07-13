import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: any = this.reflector.get('roles', context.getHandler());
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.roles == roles;
  }
}
