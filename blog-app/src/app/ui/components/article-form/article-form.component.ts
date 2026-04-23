import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Article } from '../../../types/article.types';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  @Output() submit = new EventEmitter<Article>();
  @Output() cancel = new EventEmitter<void>();

  articleForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.articleForm.invalid) {
      Object.keys(this.articleForm.controls).forEach((key) => {
        const control = this.articleForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newArticle: Article = {
      id: crypto.randomUUID(),
      image: 'assets/images/empty-picture.png',
      title: this.articleForm.value.title.trim(),
      content: this.articleForm.value.content.trim(),
      publicationDate: new Date(),
    };

    this.submit.emit(newArticle);
    this.articleForm.reset();
    this.isSubmitting = false;
  }

  onCancel(): void {
    this.articleForm.reset();
    this.cancel.emit();
  }

  get titleControl() {
    return this.articleForm.get('title');
  }

  get contentControl() {
    return this.articleForm.get('content');
  }
}
