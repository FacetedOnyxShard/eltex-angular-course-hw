import { Component } from '@angular/core';
import { AboutMeComponent } from '../about-me/about-me.component';
import { RecentlyPostsComponent } from '../recently-posts/recently-posts.component';
import { SkillsComponent } from '../skills/skills.component';
import { JobExperienceComponent } from '../job-experience/job-experience.component';
import { HobbyComponent } from '../hobby/hobby.component';

@Component({
  selector: 'app-main-content',
  imports: [
    AboutMeComponent,
    RecentlyPostsComponent,
    SkillsComponent,
    JobExperienceComponent,
    HobbyComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
