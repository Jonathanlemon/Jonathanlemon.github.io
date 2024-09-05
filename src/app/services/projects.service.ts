import { Injectable } from '@angular/core';
import { Tag } from '../models/Tag';
import { Project } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [
    {id: 0, name: "Code Analysis Application", pictures: ["srt_analyze.PNG","srt_differentiate.PNG","srt_htmlreport.PNG", "srt_progress.PNG", "srt_settings.PNG"], projectLink: "//www.github.com", summary: "Internship project designed to provide GUI based static code analysis on local source files.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.PYTHON, Tag.PERL, Tag.SHELL]},
    {id: 1, name: "AI: Marketplace Rating Prediction Model (use screenshots from paper)", pictures: ["Image1.jpg","Image2.jpg","Image3.jpg"], projectLink: "//www.github.com", summary: "A feed-forward perceptron neural network, trained on marketplace product review text to predict the overall ratings of the product.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.PYTHON]},
    {id: 2, name: "Pizza app using the backend drawio", pictures: ["Image1.jpg","Image2.jpg","Image3.jpg"], projectLink: "//www.github.com", summary: "Fullstack web app developed using React and ASP.NET", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.SQL, Tag.JAVA]},
    {id: 3, name: "TwentyHQ", pictures: ["Image1.jpg","Image2.jpg","Image3.jpg"], projectLink: "//www.github.com", summary: "Web API Project that was developed for a class project.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.CSHARP, Tag.PHP]},
    {id: 4, name: "MIPS Compiler (Use pictures of data graphs and other sites, not just screenshots of terminal", pictures: ["Image1.jpg","Image2.jpg","Image3.jpg"], projectLink: "//www.github.com", summary: "Developed a chrome extension that tracks the prices of furniture.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.CPLUSPLUS]},
    {id: 5, name: "Trucker Web App", pictures: ["Image1.jpg","Image2.jpg","Image3.jpg"], projectLink: "//www.github.com", summary: "Mobile app developed in java that tracks the departure and arrival of trains.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.HTML, Tag.PHP, Tag.NODEJS]}
  ];

  constructor() { }

  getProjects(){
    return this.projects;
  }

  getProjectByID(id: number){
    let project = this.projects.find(project => project.id === id);
    if (project === undefined){
      throw new TypeError("No project found with the specified ID");
    }
    return project;
  }
}
