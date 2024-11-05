import { Injectable } from '@angular/core';
import { NextNotification } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SketchService {

  sketches = [
    (p: any) => {
    let scale = 25;  // Adjust to control grid density
    let w = 1000;
    let h = 1000;
    let cols = w / scale;
    let rows = h / scale;
    
    let dist = 0;
    let z = [] as any;
    
    p.setup = () => {
      p.createCanvas(500, 500, p.WEBGL);
      
      // Initialize `z` array with noise values
      z = Array.from({ length: cols }, () => Array(rows).fill(0));
      let yoff = dist;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          z[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -250, 250);
          xoff += 0.05;
        }
        yoff += 0.05;
      }
    }
    
    p.draw = () => {
      p.background(41);
      p.stroke(0);
      p.pointLight(255, 255, 255, 0, -200, 100);
      p.ambientLight(10);
      p.fill(74, 103, 65);
      p.rotateX(p.PI / 2.5);
      p.translate(-w / 2, -h / 2, -100);
    
      // Calculate new noise row for the "leading edge"
      let newRow = [];
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        newRow[x] = p.map(p.noise(xoff, dist), 0, 1, -250, 250);
        xoff += 0.05;
      }
      
      // Shift rows in `z` and insert new row at the beginning
      for (let y = rows - 1; y > 0; y--) {
        for (let x = 0; x < cols; x++) {
          z[x][y] = z[x][y - 1];
        }
      }
      for (let x = 0; x < cols; x++) {
        z[x][0] = newRow[x];
      }
    
      // Render the terrain
      for (let y = 0; y < rows - 1; y++) {
        p.beginShape(p.TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
          p.vertex(x * scale, y * scale, z[x][y]);
          p.vertex(x * scale, (y + 1) * scale, z[x][y + 1]);
        }
        p.endShape();
      }
    
      // Update `dist` to move forward in the noise space
      dist += 0.05;
    }},

    (p: any) => {
      let rows: number;
      let cols: number;
      let scale: number;
      let nodes = [[]] as any[][];
      let target: any;
      let home: any;
      let nextUp: any;
      let drawing = false;
      let speed: any;
      let respawnBtn: any;
      let playBtn: any;

      class Node{//constructor for segments
        x: any;
        y: any;
        parent: Node;
        constructor(paramx: any, paramy: any, p: any){
          this.x=paramx;
          this.y=paramy;
          this.parent=p;
        }
      };

      const drawHome = () => {
        p.fill(255,0,0)
        p.noStroke();
        p.rect(home.x*scale, home.y*scale, scale, scale);
      };

      const drawTarget = () => {
        p.fill(0,255,0)
        p.noStroke();
        p.rect(target.x*scale, target.y*scale, scale, scale);
      };

      const drawNeighbors = (n: Node) => {
        p.noFill();
        p.stroke(0,0,255);
        p.rect(n.x*scale, n.y*scale, scale, scale);
      };

      class Queue {
        qList = [] as any[];
        head = -1;
        tail = -1;
        
        enqueue = (item: any) => {
          if (this.head == -1) {
            this.head++;
          }
          this.tail++;
          this.qList.push(item);
        };
        
        dequeue = () => {
          if (this.head == -1) {
            console.log("Queue underflow!");
            return 0;
          } else if (this.head == this.tail) {
            const p = this.qList.splice(0, 1)[0];
            this.head--;
            this.tail--;
            return p;
          } else {
            this.tail--;
            return this.qList.splice(0, 1)[0];
          }
        };
        
        size = () => {
          return this.qList.length;
        };
        
        peek = () => {
          if (this.head == -1) {
            console.log("Queue is empty!");
          } else {
            return this.qList[this.head];
          }
        };
        
        list = () => {
          return this.qList;
        };
      }

      const respawn = () => {
        p.background(41);
        p.fill(0);
        scale=10;
        speed=0;
        nextUp = new Queue();
        rows = p.height / scale;
        cols = p.width / scale;

        //Initialize two nodes
        target=new Node(p.floor(p.random(0, cols)), p.floor(p.random(0, cols)), null);
        home=new Node(p.floor(p.random(0, cols)), p.floor(p.random(0, cols)), null);

        nodes =  (Array.from(Array(cols), () => new Array(rows)));

        //Build board and initialize all nodes as unvisited
        for(let i=0; i<rows; i++){
          for(let j=0; j<cols; j++){
            p.rect(j*scale, i*scale, 20, 20);
            nodes[j][i] = 0;
          }
        }

        //Draw two nodes and begin
        drawHome();
        drawTarget();
        nextUp.enqueue(home);
      };

      const play = () => {
        speed=2;
      }


      p.setup = () => {
        p.createCanvas(500,500);
        respawnBtn = p.createButton("Restart");
        respawnBtn.addClass("btn btn-outline-primary mb-2 me-2 mt-2");
        respawnBtn.mousePressed(respawn);

        playBtn = p.createButton("Play");
        playBtn.addClass("btn btn-outline-primary mb-2 me-2 mt-2");
        playBtn.mousePressed(play);
        speed=0;
        p.background(41);
        p.fill(0);
        scale=10;

        nextUp = new Queue();
        rows = p.height / scale;
        cols = p.width / scale;

        //Initialize two nodes
        target=new Node(p.floor(p.random(0, cols)), p.floor(p.random(0, cols)), null);
        home=new Node(p.floor(p.random(0, cols)), p.floor(p.random(0, cols)), null);

        nodes =  (Array.from(Array(cols), () => new Array(rows)));

        //Build board and initialize all nodes as unvisited
        for(let i=0; i<rows; i++){
          for(let j=0; j<cols; j++){
            p.rect(j*scale, i*scale, 20, 20);
            nodes[j][i] = 0;
          }
        }

        //Draw two nodes and begin
        drawHome();
        drawTarget();
        nextUp.enqueue(home);
      }

      const drawShortestPath = () => {
        let n = target;
        p.noStroke()
        p.fill(255, 255, 0);
        while(n != home){  
          p.rect(n.x*scale, n.y*scale, scale, scale);
          n = n.parent;
        }
      }

      //Main BFS program
      const getNeighbors = (n: Node) => {
        if(n.x == target.x && n.y == target.y){
          target.parent = n;
          drawShortestPath();
          nextUp = new Queue();
          return;
        }
        nodes[n.x][n.y] = 1;
        drawNeighbors(n);
        if( n.x-1 >= 0){
          if(nodes[n.x-1][n.y] == 0){
            nextUp.enqueue(new Node(n.x-1, n.y, n));
            nodes[n.x-1][n.y] = 1;
          }

        }
        if( n.x+1 < cols){
          if(nodes[n.x+1][n.y] == 0){
            nextUp.enqueue(new Node(n.x+1, n.y, n));
            nodes[n.x+1][n.y] = 1;
          }

        }
        if( n.y-1 >= 0){
          if(nodes[n.x][n.y-1] == 0){
            nextUp.enqueue(new Node(n.x, n.y-1, n));
            nodes[n.x][n.y-1] = 1;
          }

        }
        if( n.y+1 < rows){
          if(nodes[n.x][n.y+1] == 0){
            nextUp.enqueue(new Node(n.x, n.y+1, n));
            nodes[n.x][n.y+1] = 1;
          }

        }
      };

      p.draw = () => {
        //Draw animation based on speed
        for(let i=0;i<speed;i++){
          if(nextUp.size()>0){
            getNeighbors(nextUp.dequeue());
          }
        }
        
        //Handle mouse drawing wall
        if(drawing){
          let x = p.floor(p.floor(p.mouseX)/scale);
          let y = p.floor(p.floor(p.mouseY)/scale);
          if(x < cols && y < rows && x >= 0 && y >= 0){
            nodes[x][y] = 2;
            p.fill(200);
            p.noStroke();
            p.rect(x*scale, y*scale, scale, scale);
          }
        }
        drawHome();
        drawTarget();
        if(speed!=0){
          speed=p.floor(nextUp.size()/3)+1;
        }
      }

      window.addEventListener("mousedown", ()=>{drawing = true;});
      window.addEventListener("mouseup", ()=>{drawing = false;});
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
        //Ensure apple can't spawn ontop of snake
        while(aX == 10 && aY == 10){
          aX=Math.round(Math.random()*19);//apple x
          aY=Math.round(Math.random()*19);//apple y
        }
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
                break;
            }
            if(trail[i].x==aX&&trail[i].y==aY){//check if snake got the apple
              trail.push(new Segment(trail[trail.length-1].x,trail[trail.length-1].y));//add segment to end of snake
              aX=p.round(Math.random()*19);//spawn new food
              aY=p.round(Math.random()*19);
            }
          }

          if(trail[0].x==aX&&trail[0].y==aY){//check if snake got the apple
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
        while(aX == 10 && aY == 10){
          aX=Math.round(Math.random()*19);//apple x
          aY=Math.round(Math.random()*19);//apple y
        }
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
    }
  ];

  sketchDetails = [
    {id: 0, name: "3D Terrain Generator", description: "Perlin Noise Terrain Generation."},
    {id: 1, name: "Pathfinding", description: "Click and drag to make walls. Click restart to generate a new source and target location. Click play to begin pathfinding."},
    {id: 2, name: "Snake", description: "Use WASD to play."},
    {id: 3, name: "Game of Life", description: "Click to generate a new pattern."},
    {id: 4, name: "3D Graphics", description: "Elegant 3D animation."},

  ];

  constructor() { }

  getSketch(id: number){
    return this.sketches[id];
  }

  getSketchDetails(){
    return this.sketchDetails;
  }
}
