import { Observable } from 'rxjs';
export declare function waitFor<T>(prom: Promise<T> | Observable<T>): Promise<T>;
