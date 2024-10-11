import { Injectable } from '@angular/core';
import { Tag } from '../models/Tag';
import { Project } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [
    {id: 0, name: "Code Analysis Application", pictures: ["srt_analyze.PNG","srt_differentiate.PNG","srt_htmlreport.PNG", "srt_progress.PNG", "srt_settings.PNG"], projectLink: "https://github.com/Jonathanlemon/Code_Analyzer", summary: "Internship project designed to provide GUI based static code analysis on local source files.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.PYTHON, Tag.PERL, Tag.SHELL]},
    {id: 1, name: "AI: Marketplace Rating Prediction Model", pictures: ["ai_img1.PNG","ai_img2.PNG","ai_img3.PNG"], projectLink: "https://github.com/Jonathanlemon/Marketplace-Rating-Neural-Network", summary: "A feed-forward perceptron neural network, trained on marketplace product review text to predict the overall ratings of the product.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.PYTHON]},
    {id: 2, name: "Pizza Salesforce", pictures: ["pizzaSchema.png"], projectLink: "https://github.com/Jonathanlemon/Pizza_Salesforce", summary: "A complete back-end database to manage pizza sales.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.SQL, Tag.JAVA]},
    {id: 3, name: "TwentyHQ", pictures: ["twenty_main.png"], projectLink: "https://github.com/twentyhq/twenty", summary: "Open-Source CRM Software that I have made contributions to.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.CSHARP, Tag.PHP]},
    {id: 4, name: "MIPS Compiler and CPU Simulator", pictures: ["mips_CPU.PNG","mips_img1.PNG","mips_img2.png"], projectLink: "https://github.com/Jonathanlemon/MIPS_Compiler", summary: "A compiler for MIPS instruction set written in C, and a CPU simulator to run the output.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.C, Tag.PYTHON]},
    {id: 5, name: "Trucker Rewards Web Application", pictures: ["truck_schema.png","truck_login.PNG"], projectLink: "https://github.com/Jonathanlemon/Trucker_Web_App", summary: "Class project to design a full-stack web application with authentication, external API calls, and session storage.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.HTML, Tag.PHP, Tag.NODEJS, Tag.SQL]}
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
