import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role: any = this.reflector.get('role', context.getHandler());
    if (!role) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.role == role;
  }
}
