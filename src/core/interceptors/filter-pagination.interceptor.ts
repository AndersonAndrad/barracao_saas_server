import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FilterPaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;

    this.manipulateFilter(query);

    return next.handle();
  }

  private manipulateFilter(filter: any): any {
    if (!filter?.page) {
      filter.page = 1;
    } else {
      filter.page = filter.page === '0' ? 1 : Number(filter.page);
    }

    if (!filter?.size) {
      filter.size = 10;
    } else {
      filter.size = filter.size === '0' ? 1 : Number(filter.page);
    }

    if (filter.size >= 100) {
      filter.size = 100;
    }

    return filter;
  }
}
