import { ArticleDetailsService } from './../../services/article-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$!: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private detailservice: ArticleDetailsService
  ) {}

  ngOnInit(): void {
    let articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.article$ = this.detailservice.getArticleDetails(articleId);
    }
  }
}
