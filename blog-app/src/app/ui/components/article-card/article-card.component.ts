import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../../types/article.types';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent {
  @Input() article!: Article;
  @Input() isBig: boolean = false;

  @Output() delete = new EventEmitter<string>();

  get formattedDate(): string {
    const date = this.article.publicationDate;
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  onDeleteClick(): void {
    this.delete.emit(this.article.id);
  }
}
