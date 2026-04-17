import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyPostsComponent } from './recently-posts.component';

describe('RecentlyPostsComponent', () => {
  let component: RecentlyPostsComponent;
  let fixture: ComponentFixture<RecentlyPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentlyPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
