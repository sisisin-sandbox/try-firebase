import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { delay } from 'rxjs/operators';

interface HttpResponse<T> {
  status: number;
  body: T;
}

class HttpClient {
  get<Body>(path: string, params = {}): Observable<HttpResponse<Body>> {
    return of({ status: 200, body: params as Body }).pipe(delay(500));
  }
  get2(path: string) {
    return ajax.get(path);
  }
}

export const httpClient = new HttpClient();
