import { Injectable } from '@angular/core';
import { Article } from '../types/article.types';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly STORAGE_KEY = 'articles';
  private articles: Article[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Article[];
        this.articles = parsed.map((article) => ({
          ...article,
          publicationDate: new Date(article.publicationDate),
        }));
      } catch (e) {
        console.error('Ошибка загрузки статей из localStorage', e);
        this.articles = [];
      }
    } else {
      this.articles = [];
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.articles));
  }

  getArticles(): Article[] {
    return [...this.articles];
  }

  getArticlesCount(): number {
    return this.articles.length;
  }

  addArticle(article: Article): void {
    this.articles.push(article);
    this.saveToStorage();
  }

  deleteArticle(id: string): void {
    this.articles = this.articles.filter((article) => article.id !== id);
    this.saveToStorage();
  }

  updateArticle(updatedArticle: Article): void {
    const index = this.articles.findIndex((a) => a.id === updatedArticle.id);
    if (index !== -1) {
      this.articles[index] = updatedArticle;
      this.saveToStorage();
    }
  }
}
