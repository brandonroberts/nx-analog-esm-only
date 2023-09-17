import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { PageServerLoad } from './route-types';
export declare function injectLoad<T extends (pageServerLoad: PageServerLoad) => Promise<any>>(options?: {
    injector?: Injector;
}): Observable<Awaited<ReturnType<T>>>;
