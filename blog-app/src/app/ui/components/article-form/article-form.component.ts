import {
  Component,
  Output,
  Input,
  EventEmitter,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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
  @Output() update = new EventEmitter<Article>();

  @Input() articleToEdit: Article | null = null;

  articleForm: FormGroup;
  isSubmitting: boolean = false;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(25)]],
      content: ['', [Validators.required, Validators.minLength(25)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articleToEdit'] && this.articleToEdit) {
      this.isEditMode = true;
      this.articleForm.patchValue({
        title: this.articleToEdit.title,
        content: this.articleToEdit.content,
      });
    } else if (changes['articleToEdit'] && !this.articleToEdit) {
      this.isEditMode = false;
      this.articleForm.reset();
    }
  }

  async addArticleLogic() {
    const newArticle: Article = {
      id: crypto.randomUUID(),
      image: 'assets/images/empty-picture.png',
      title: this.articleForm.value.title.trim(),
      content: this.articleForm.value.content.trim(),
      publicationDate: new Date(),
    };
    this.submit.emit(newArticle);
  }

  async updateArticleLogic() {
    if (this.articleToEdit !== null) {
      const updatedArticle: Article = {
        ...this.articleToEdit,
        title: this.articleForm.value.title.trim(),
        content: this.articleForm.value.content.trim(),
        publicationDate: new Date(),
      };
      this.update.emit(updatedArticle);
    }
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

    if (this.isEditMode && this.articleToEdit) {
      this.updateArticleLogic();
    } else {
      this.addArticleLogic();
    }

    this.articleForm.reset();
    this.isSubmitting = false;
    this.isEditMode = false;
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
