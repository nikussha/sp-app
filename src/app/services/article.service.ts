import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  searchBySummary(text: string) {
    const SUMMARY_URL = `${environment.apiUrl}?summary_contains_one=${text}&limit=6`;
    return this.http.get<any>(SUMMARY_URL).pipe(catchError(() => of([])));
  }

  searchByTitle(text: string) {
    const TITLE_URL = `${environment.apiUrl}?title_contains_one=${text}&limit=6`;
    return this.http.get<any>(TITLE_URL).pipe(catchError(() => of([])));
  }

  searchArticles(text: string) {
    return this.searchByTitle(text).pipe(
      switchMap((titleResults) => {
        const titleArticles = titleResults.results;
        if (titleArticles.length >= 6) {
          return of(titleArticles);
        } else {
          return this.searchBySummary(text).pipe(
            map((summaryResults) => {
              const summaryArticles = summaryResults.results;
              const combinedResults = [
                ...titleArticles,
                ...summaryArticles,
              ].slice(0, 6);
              return combinedResults;
            }),

            catchError(() => of([]))
          );
        }
      }),
      catchError(() => of([]))
    );
  }
}
