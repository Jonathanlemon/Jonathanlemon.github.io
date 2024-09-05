import { Component } from '@angular/core';
import { SketchService } from '../services/sketch.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  activeCanvas: number;
  inSelection: boolean;
  canvasList: any;

  constructor(private sketchService: SketchService){
    this.activeCanvas = 0;
    this.inSelection = true;
    this.canvasList = this.sketchService.getSketchDetails();
  }

  handleClick(id: any){
    this.activeCanvas = id;
    this.inSelection = true;
    console.log(id);
  }
}
