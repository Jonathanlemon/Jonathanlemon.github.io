import { Component } from '@angular/core';
import { SketchService } from '../services/sketch.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  activeCanvas: number;
  inSelection: boolean;
  canvasList: any;

  constructor(private sketchService: SketchService, private titleService: Title){
    this.activeCanvas = 0;
    this.inSelection = true;
    this.canvasList = this.sketchService.getSketchDetails();
    this.titleService.setTitle('Jonathan Lemon - Demo');
  }

  handleClick(id: any){
    this.activeCanvas = id;
    this.inSelection = true;
  }
}
