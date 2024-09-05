import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/projects';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  featuredProject: Project;

  constructor(private titleService: Title, private projectService: ProjectsService){
    this.titleService.setTitle('Jonathan Lemon - Home');
  }
  
  ngOnInit(): void {
    this.featuredProject = this.projectService.getProjectByID(0);
  }
}
