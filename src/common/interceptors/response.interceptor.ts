import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: response.statusCode,
        message: this.getMessage(request.method, request.url),
        data,
      })),
    );
  }

  private getMessage(method: string, url: string): string {
    const resource = this.getResource(url);

    const messages: Record<string, string> = {
      GET: `${resource} fetched successfully`,
      POST: `${resource} created successfully`,
      DELETE: `${resource} deleted successfully`,
      PUT: `${resource} updated successfully`,
      PATCH: `${resource} updated successfully`,
    };

    return messages[method] || 'Request successful';
  }

  private getResource(url: string): string {
    
    const parts = url.split('/').filter(Boolean);
    const resource = parts[1] || 'Resource'; 
    return resource.charAt(0).toUpperCase() + resource.slice(1, -1); 
  }
}