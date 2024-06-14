import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleDetailsService {
  constructor(private http: HttpClient) {}

  getArticleDetails(id: string) {
    return this.http.get(`${environment.apiUrl}${id}`);
  }
}
