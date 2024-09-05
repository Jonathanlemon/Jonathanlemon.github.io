import { Component, Input, ElementRef } from '@angular/core';
import p5 from 'p5'
import { SketchService } from '../services/sketch.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent {

  @Input() sketchID: number;
  @Input() parentID: string;
  private p5Instance: any;

  constructor(private elementRef: ElementRef, private sketchService: SketchService){  }

  ngOnInit() {

  }

  ngOnChanges(){
    if (this.p5Instance) {
      this.p5Instance.remove();
    }

    this.initP5();
  }

  ngOnDestroy() {
    if (this.p5Instance) {
      this.p5Instance.remove();
    }
  }

  private initP5() {
    this.p5Instance = new (p5 as any)(this.sketchService.getSketch(this.sketchID), this.parentID);
  }

}
