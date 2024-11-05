import { Injectable } from '@angular/core';
import { Tag } from '../models/Tag';
import { Project } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [
    {id: 0, name: "Code Analysis Application", pictures: ["srt_analyze.PNG","srt_differentiate.PNG","srt_htmlreport.PNG", "srt_progress.PNG", "srt_settings.PNG"], projectLink: "https://github.com/Jonathanlemon/Code_Analyzer", summary: "Internship project designed to provide GUI based static code analysis on local source files.", description: "As an intern, I was given the opportunity to plan, design, develop, and test a project to benefit this organization. The project is an application integrated with the Open Source 'CPPCheck' Static Code Analysis tool to provide the engineering team an automated method for code reviews. It has several different features such as state-based settings, different granularities of analysis, and PDF document generation to highlight areas of concern in the code and provide statistics.", tags: [Tag.PYTHON, Tag.PERL, Tag.SHELL]},
    {id: 1, name: "AI: Marketplace Rating Prediction Model", pictures: ["ai_img1.PNG","ai_img2.PNG","ai_img3.PNG"], projectLink: "https://github.com/Jonathanlemon/Marketplace-Rating-Neural-Network", summary: "A feed-forward perceptron neural network, trained on marketplace product review text to predict the overall ratings of the product.", description: "During my time at Clemson Univeristy, I had the privilege of taking a graduate course in Artificial Intelligence. This provided me the opportunity to work with graduate students on developing a neural network model to solve some particular problem. In our case, we tried our hand at language intepretation with this Rating Prediction model. It is a 4 layer feed-forward neural network that uses product review text as its input, and then predicts a score of 1-5 in various categories based on the categorical sentiment the model could distinguish. Additionally, we wrote a research paper presenting our findings along with the model's accuracy, error, and testing protocol.", tags: [Tag.PYTHON]},
    {id: 2, name: "Pizza Salesforce", pictures: ["pizzaSchema.png"], projectLink: "https://github.com/Jonathanlemon/Pizza_Salesforce", summary: "A complete back-end database to manage pizza sales.", description: "This project was for a semester-long database class, in which we had to design a 3NF Database Schema for a Pizza Restaurant. This involved designing a schema to handle customer data, order types, pizza sizes, toppings, discounts, delivery addresses, and sales data. By using Microsoft Sql Server, I designed this back-end solution writing the necessary tables, stored procedures, and triggers to optimize performance while maintaining best practices for database design. I additionally used Java to serve a front-end application allowing a user to create new orders, update pizza details, apply promotional discounts, and more.", tags: [Tag.SQL, Tag.JAVA]},
    {id: 3, name: "TwentyHQ", pictures: ["twenty_main.png"], projectLink: "https://github.com/twentyhq/twenty", summary: "Open-Source CRM Software that I have contributed to.", description: "TwentyHQ is a business operations platform built for startups and SMBs, consolidating tools like CRM, project management, and analytics into one interface. Developed using a modern tech stack, TwentyHQ employs React for the front end, Node.js and Express for backend services, and PostgreSQL for data management. It supports real-time collaboration with WebSocket integration and offers API access for seamless integration with platforms like Slack and Google Workspace. With an emphasis on modularity and ease of customization, TwentyHQ streamlines workflows by automating tasks and consolidating key business operations in a single, intuitive UI.", tags: [Tag.CSHARP, Tag.PHP]},
    {id: 4, name: "MIPS Compiler and CPU Simulator", pictures: ["mips_CPU.PNG","mips_img1.PNG","mips_img2.png"], projectLink: "https://github.com/Jonathanlemon/MIPS_Compiler", summary: "A compiler for MIPS instruction set written in C, and a CPU simulator to run the output.", description: "Low-level computer science has always been a topic that has fascinated me. For that reason, this project is particularly special to me. It is a 2-part project: The 1st is a MIPS instruction set compiler (written in C) that takes a user specified input file of MIPS assembly code and compiles it into a binary file. The 2nd is a CPU simulator (written in Python) which takes the output binary file of the 1st part as input. It then generates a text-based representation of the binary's execution. This highlights register contents, instruction execution details, operation codes, and provides statistics for each simulated clock cycle.", tags: [Tag.C, Tag.PYTHON]},
    {id: 5, name: "Trucker Rewards Web Application", pictures: ["truck_schema.png","truck_login.PNG"], projectLink: "https://github.com/Jonathanlemon/Trucker_Web_App", summary: "Class project to design a full-stack web application with authentication, external API calls, and session storage.", description: "I served as the Scrum Master and Lead Developer with 3 other peers working as a team using Agile principles to design a Rewards Program for Commercial Truck Drivers. In only a few months, we designed a full-stack web application using PHP, HTML, JS, CSS, MYSQL, and AWS infrastructure. This web app featured external API integration with eBay, PHP server-side logic, and session-based authentication and authorization. As the Scrum Master, planning sprints and feature deadlines was key to success. My leadership directed us toward higher priority items such as strong database design and authentication. This resulted in the team meeting stakeholder provided deadlines and implementing all required functionality.", tags: [Tag.HTML, Tag.PHP, Tag.NODEJS, Tag.SQL]}
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
