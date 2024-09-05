import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Project } from '../models/projects';
import { Tag } from '../models/Tag';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit{
  
  projects: Project[];

  constructor(private titleService: Title, private projectService: ProjectsService){
    this.titleService.setTitle('Jonathan Lemon - Portfolio');
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
}
