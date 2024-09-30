import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(
        'Token de autenticación erróneo/faltante',
      );
    }

    const token = authHeader.split(' ')[1]; // Obtiene el token del encabezado

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Almacena el usuario decodificado en la solicitud
      return true; // Permitir el acceso
    } catch (error) {
      console.error('Error de validación del token:', error);
      throw new UnauthorizedException('Token Inválido');
    }
  }
}
