import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { highlightKeyWords } from '../shared/utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles$!: Observable<any>;
  searchControl = new FormControl('');
  result: number | undefined;

  constructor(
    private articleService: ArticleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.articles$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((key: string) =>
        this.articleService
          .searchArticles(key)
          .pipe(map((res) => highlightKeyWords(key, res, this.sanitizer)))
      ),
      tap((val) => (this.result = val.length)),
      tap((res) => {
        console.log('res', res);
      })
    );
  }
}
