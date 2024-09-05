import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SketchService {

  sketches = [
    (p: any) => {
      var angle = 10;
      var slider: any;

      p.setup = () => {
        p.createCanvas(500, 500);
        slider = p.createSlider(p.pi/2, p.PI, p.PI/10, 0.1);
      };

      const branch = (len: any) => {
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        if(len>4){
          p.push();
          p.rotate(angle);
          branch(len*0.67);
          p.pop();
          p.push();
          p.rotate(-angle);
          branch(len*0.67);
          p.pop();
        }
      };

      p.draw = () => {
        p.background(41);
        angle=slider.value();
        p.translate(p.width/2, p.height);
        p.stroke(255);
        branch(150);
      };
    },

    (p: any) => {
      var scl=25;//scale factor to multiple coordinates by
      var trail = [] as any[];//array to hold all segments
      var xVel=0;//head x vel
      var yVel=0;//head y vel
      var aX=Math.round(Math.random()*19);//apple x
      var aY=Math.round(Math.random()*19);//apple y

      class Segment{//constructor for segments
        x: any;
        y: any;
        constructor(paramx: any, paramy: any){
          this.x=paramx;
          this.y=paramy;
        }
      };

      p.setup= () => {
        p.createCanvas(500, 500);//make 20x20 board
        trail.push(new Segment(10,10));//make first segment at (10,10) aka (200,200)
        p.frameRate(15);
      };

      p.draw = () =>{
          p.background(41);
          p.fill(255,0,0);

          p.rect(trail[0].x*scl,trail[0].y*scl,scl,scl);

          for(let i=1; i<trail.length;i++){//draw all segments
            p.rect(trail[i].x*scl,trail[i].y*scl,scl,scl);
            if(trail[0].x==trail[i].x&&trail[0].y==trail[i].y){//check for collision
                restart();
            }
          }

          if(trail[0].x==aX&&trail[0].y==aY){//check if head got the apple
            trail.push(new Segment(trail[trail.length-1].x,trail[trail.length-1].y));//add segment to end of snake
            aX=p.round(Math.random()*19);//spawn new food
            aY=p.round(Math.random()*19);

          }

          for(let i=trail.length-1; i>0;i--){//update trail locations
            trail[i].x=trail[i-1].x;
            trail[i].y=trail[i-1].y;
          }

          p.fill(0,255,0);//draw food
          p.rect(aX*scl,aY*scl,scl,scl);

          trail[0].x+=xVel;//move head
          trail[0].y+=yVel;

          if(trail[0].x<0){trail[0].x=19}//Checking for off the board
          if(trail[0].x>19){trail[0].x=0}
          if(trail[0].y<0){trail[0].y=19}
          if(trail[0].y>19){trail[0].y=0}
      }

      const restart = () =>{//if the snake hits itself
        xVel=0;
        yVel=0;
        trail=[];
        trail.push(new Segment(10,10));
      };

      window.addEventListener("keydown",function(event){//detect and change velocities based on User input
        if(event.key=="ArrowUp"){
          xVel=0;
          yVel=-1;
        }
        if(event.key=="ArrowDown"){
          xVel=0;
          yVel=1;
        }
        if(event.key=="ArrowLeft"){
          xVel=-1;
          yVel=0;
        }
        if(event.key=="ArrowRight"){
          xVel=1;
          yVel=0;
        }
      });

    },

    (p: any) => {
      let w: number;
      let columns: any;
      let rows: any;
      let board: any;
      let next: any;

      p.setup = () => {
        // Set simulation framerate to 10 to avoid flickering
        p.frameRate(10);
        p.createCanvas(500, 500);
        w = 10;
        // Calculate columns and rows
        columns = 50;
        rows = 50;
        // Wacky way to make a 2D array is JS
        board = new Array(columns);
        for (let i = 0; i < columns; i++) {
          board[i] = new Array(rows);
        }
        // Going to use multiple 2D arrays and swap them
        next = new Array(columns);
        for (let i = 0; i < columns; i++) {
          next[i] = new Array(rows);
        }
        init();
      }

      p.draw = () => {
        p.background(41);
        generate();
        for ( let i = 0; i < columns;i++) {
          for ( let j = 0; j < rows;j++) {
            if ((board[i][j] == 1)) p.fill(255);
            else p.fill(41);
            p.stroke(41);
            p.rect(i * w, j * w, w-1, w-1);
          }
        }

      }

      // Fill board randomly
      const init = () => {
        for (let i = 0; i < columns; i++) {
          for (let j = 0; j < rows; j++) {
            // Lining the edges with 0s
            if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
            // Filling the rest randomly
            else board[i][j] = p.floor(p.random(2));
            next[i][j] = 0;
          }
        }
      }

      // reset board when mouse is pressed
      window.addEventListener("click", init);

      // The process of creating the new generation
      const generate = () => {

        // Loop through every spot in our 2D array and check spots neighbors
        for (let x = 1; x < columns - 1; x++) {
          for (let y = 1; y < rows - 1; y++) {
            // Add up all the states in a 3x3 surrounding grid
            let neighbors = 0;
            for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                neighbors += board[x+i][y+j];
              }
            }

            // A little trick to subtract the current cell's state since
            // we added it in the above loop
            neighbors -= board[x][y];
            // Rules of Life
            if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
            else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
            else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
            else                                             next[x][y] = board[x][y]; // Stasis
          }
        }

        // Swap!
        let temp = board;
        board = next;
        next = temp;
      }


    },

    (p: any) => {

      p.setup = () => {
        p.createCanvas(500,500, p.WEBGL);
        p.angleMode(p.DEGREES);
        
      }

      p.draw = () => {
        p.rotateX(60);
        p.background(41);
        p.noFill();
        p.stroke(255);

        for(let i=0; i<50; i++){
          p.rotate(p.frameCount/100);
          p.beginShape();
          let r = p.map(p.sin(p.frameCount), -1, 1, 0, 255);
          let g = p.map(i, 0, 50, 0, 255);
          let b = p.map(p.cos(p.frameCount), -1, 1, 0, 255);


          for(let j=0;j<=360;j+=60){
            let rad = i*5;
            let x=rad*p.cos(j);
            let y=rad*p.sin(j);
            let z=p.sin(p.frameCount*3+i*5)*100;
            
            p.stroke(r,g,b);
            p.vertex(x, y, z);
          }

          p.endShape();
        }
        
      }
    },

    (p: any) => {

      p.setup = () => {
        
      }

      p.draw = () => {
        p.background(255);
        
      }
    }
  ];

  sketchDetails = [
    {id: 0, name: "Fractal Tree", description: "Interact using the slider"},
    {id: 1, name: "Snake", description: "Use WASD to play"},
    {id: 2, name: "Game of Life", description: "Click to generate a new pattern"},
    {id: 3, name: "3D Graphics", description: "Elegant 3D animation"}
  ];

  constructor() { }

  getSketch(id: number){
    return this.sketches[id];
  }

  getSketchDetails(){
    return this.sketchDetails;
  }
}
