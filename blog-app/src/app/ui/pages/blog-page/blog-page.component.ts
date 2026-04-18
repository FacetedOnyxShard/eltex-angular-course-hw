import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService, Article } from '../../../services/article.service';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { ArticleFormComponent } from '../../components/article-form/article-form.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent, ArticleFormComponent],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit {
  articles: Article[] = [];
  isLoading: boolean = true;
  showFormDialog: boolean = false;
  showStatsDialog: boolean = false;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  private async loadArticles(): Promise<void> {
    this.showLoader();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    this.articles = this.articleService.getArticles();
    this.hideLoader();
  }

  private showLoader(): void {
    this.isLoading = true;
  }

  private hideLoader(): void {
    this.isLoading = false;
  }

  getArticlesCount(): number {
    return this.articleService.getArticlesCount();
  }

  onDelete(articleId: string): void {
    this.articleService.deleteArticle(articleId);
    this.articles = this.articleService.getArticles();
  }

  onArticleAdded(article: Article): void {
    this.articleService.addArticle(article);
    this.articles = this.articleService.getArticles();
    this.showFormDialog = false;
  }

  openFormDialog(): void {
    this.showStatsDialog = false;
    this.showFormDialog = true;
  }

  closeFormDialog(): void {
    this.showFormDialog = false;
  }

  openStatsDialog(): void {
    this.showFormDialog = false;
    this.showStatsDialog = true;
  }

  closeStatsDialog(): void {
    this.showStatsDialog = false;
  }

  onDialogBackdropClick(event: MouseEvent, dialogType: 'form' | 'stats'): void {
    if (
      (event.target as HTMLElement).classList.contains('dialog-container') ||
      (event.target as HTMLElement).classList.contains('stats-dialog-container')
    ) {
      if (dialogType === 'form') {
        this.closeFormDialog();
      } else {
        this.closeStatsDialog();
      }
    }
  }
}
