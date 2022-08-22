var state = 0; //Define the present state, 0 for the welcome page, 1 for the drawing screen
let button; //Define the Start button
var pg; //Defining the drawing interface
var choosePan = 3; //Defines the selected drawing mode, the default is Line
var colorIndex = 0; //Define the serial number of the color
var img; //Define brush image png
var starX = []; //Define the array of horizontal coordinates of stars
var starY = []; //Define the array of vertical coordinates of stars
var houseHeight = []; //Define the height of the house
var startB = []; //Define the size of the star
var snow = []; //Define snow class


function preload() {
  img = loadImage("pic.png");//Loading images
}
function setup() {
  createCanvas(540, 700); 
  colorMode(HSB, 100, 100, 100, 255);//color Molde is hsb
  pg = createGraphics(width - 40, height - 120);//Define the drawing board size
  pg.colorMode(HSB, 100, 100, 100, 255);//the color Molde of drawing board is HSB
  //pg.background(60, 80, 20);
  rectMode(CENTER); //Centering a rectangle
  textAlign(CENTER, CENTER); //Write text in the center
  imageMode(CENTER);//Centered image display
  img.resize(40, 40);//Paintbrush pic. size
  button = createButton("WELCOME"); //text of Start button
  button.style("font-size", "25px"); //Font size of Start button
  button.style("color", color(0)); //Text color of the start button
  button.size(200, 90); //Size of Start button
  button.position(width / 2 - 100, height / 2 - 45); //Location of the Start button
  button.mousePressed(changeBG); //Click the Start button to switch the status to the drawing interface

  //Initialize the coordinates and dimensions of the star
  for (let i = 0; i < 80; i++) {
    starX[i] = random(30, width - 30);
    starY[i] = random(70, height / 2);
    startB[i] = random(100, 255);
  }

  //Initialize the height of the house
  for (let i = 0; i < width / 100; i++) {
    houseHeight[i] = random(height / 15, height / 3);
  }

  //Initialize snow class
  for (let i = 0; i < width / 5; i++) {
    snow.push(
      new Snow(
        random(30, width - 30),
        random(-height, 0),
        random(1, 3),
        random(5,8)
      )
    );
  }
}

function draw() {
  background(50); //Grey background
  rectMode(CENTER); //Centering a rectangle
  Screen(); //Call the function and draw the interface
  if (state === 1) {//When the cut button is clicked to change to the drawing screen
    drawStar();//show star
    drawHouse();//show house
    drawBoard2();//Run the drawing function
    drawTree();//show tree
    image(pg, width / 2, height / 2);//Display the drawing board

    //Traverse all snow
    for (let i = 0; i < snow.length; i++) {
      snow[i].update();//Snow Movement
      snow[i].show();//Snow show
      snow[i].checkEdge();//check edge 
    }
    
    image(img, mouseX + 12, mouseY - 12);//Show the brush tool icon at the mouse position
  }
}


//Constructor to draw flowers and stars
function drawBoard1() {
  let b = random(100, 255);//Define transparency as an arbitrary value
  pg.noStroke();
  pg.fill(colorIndex * 10, 80, 100, b);//Fill with the currently selected color
  if (choosePan === 1) {//When the flower option is selected
    let randomT = random(TWO_PI);//Define the angle at which the flower starts to be drawn as arbitrary
    let r = random(4, 10);//size of flowers is randomly from 4 to 10
    for (let i = 0; i < 5; i++) {//Traversing 5 petals
      let theta = randomT + (TWO_PI / 5) * i;//Calculation angle
      let x = mouseX - 20 + r * cos(theta);//Calculate petal horizontal coordinates
      let y = mouseY - 60 + r * sin(theta);//Calculate petal longitudinal coordinates
      pg.ellipse(x, y, r, r);//Drawing flowers
    }
  }

  if (choosePan === 2) {//When the star option is selected
    let r;//Define the radius of the star
    let sc = random(0.5, 1);//Define the size of the star
    pg.beginShape();//Start drawing stars
    for (let j = 0; j < 8; j++) {//Traverse the 8 corner points of the star
      let theta = (j * TWO_PI) / 8;//calculation angle
      if (j % 2 == 0) {
        r = 16 * sc;
      } else {
        r = 6 * sc;//Calculate the radius of the star
      }
      let x = r * cos(theta) + mouseX - 20;
      let y = r * sin(theta) + mouseY - 60;//Calculate the horizontal and vertical coordinates of the corner points
      pg.vertex(x, y);//Drawing Stars
    }
    pg.endShape(CLOSE);//Finished drawing
  }
}

//Constructor, drawing lines
function drawBoard2() {
  pg.stroke(colorIndex * 10, 80, 100);//Line color is the currently selected color
  if (choosePan === 3 && mouseIsPressed) {
    pg.line(mouseX - 20, mouseY - 60, pmouseX - 20, pmouseY - 60);//Draws a continuous line when the mouse is pressed
  }
}

//Constructor to draw the trunk
function drawTree() {
  stroke(0);
  push();
  translate(0, -60);
  strokeWeight(10);
  line(20, 450, 50, 400);
  line(50, 400, 60, 340);
  line(50, 400, 100, 360);
  strokeWeight(7);
  line(100, 360, 120, 300);
  line(100, 360, 200, 320);
  strokeWeight(5);
  line(120, 300, 200, 270);
  line(120, 300, 150, 260);
  line(200, 320, 300, 300);
  strokeWeight(3);
  line(250, 310, 300, 270);
  line(200, 320, 280, 330);
  line(300, 300, 350, 310);
  line(300, 300, 330, 290);
  pop();
  strokeWeight(10);
  line(525, 600, 490, 480);
  line(490, 480, 500, 440);
  line(490, 480, 440, 450);
  strokeWeight(7);
  line(440, 450, 400, 370);
  line(440, 450, 360, 420);
  strokeWeight(5);
  line(360, 420, 300, 440);
  line(400, 435, 350, 460);
  strokeWeight(3);
  line(400, 435, 350, 400);
  line(360, 420, 300, 390);//Drawing tree trunks with lines
  strokeWeight(2);
}

//Constructor, drawing interface
function Screen() {
  stroke(80);
  strokeWeight(2);
  fill(0);
  rect(width / 2, height / 2, width - 10, height - 10, 30);//Black base color
  fill(50);
  noStroke();
  rect(width / 2, height / 2, width - 40, height - 40, 10); //Drawing ipad interface
  if (state === 1) {
    //When the drawing interface
    fill(60, 80, 20);
    rect(width / 2, height / 2, width - 40, height - 120); //Draw light green interface
    drawScreen(); //Drawing the background of the drawing interface
  } else {
    //When starting the interface
    fill(22, 30, 80); 
    rect(width / 2, height / 2, width - 40, height - 120); //Draw blue background interface
  }
}

//Draw the brush in the upper left corner and the cleanup button in the upper right corner
function drawScreen() {
  fill(0); 
  for (let i = 50; i < 200; i += 50) {
    ellipse(i, 40, 30, 30); //Draw the black bottom circle of the brush
  }

  fill(254, 67, 101); 
  ellipse(choosePan * 50, 40, 30, 30); //Draw the red bottom circle of the selected brush

  noFill();
  stroke(100);
  //Start drawing the flower brush icon
  for (let i = 0; i < 5; i++) {
    let theta = (TWO_PI / 5) * i;//Calculation angle
    push();
    translate(50, 40);
    rotate(theta);
    let x = 10 * cos(0);
    let y = 10 * sin(0);//Calculate the horizontal and vertical coordinates of the petals
    ellipse(x, y, 8, 8);//Drawing petals
    pop();
  } //Drawing Petal Brush Icon
  
  beginShape();//Start drawing the star brush icon
  for (let i = 0; i < 8; i++) {//Traversing 8 corner points
    let r = 10;
    let theta = (TWO_PI / 8.0) * i;//Calculation angle
    if (i % 2 === 0) {
      r = 10;
    } else {
      r = 5;
    }
    let sx = 100 + r * cos(theta);
    let sy = 40 + r * sin(theta);//Calculate coordinates
    vertex(sx, sy);//Drawing
  }
  endShape(CLOSE);//Finished drawing

  line(140, 30, 160, 50); //Draw line brush icon

  if (
    mouseX < width - 70 &&
    mouseX > width - 130 &&
    mouseY > 25 &&
    mouseY < 55
  ) {
    //When the mouse is over the clean icon
    fill(254, 67, 101); //Cleanup screen
  } else {
    fill(0); //Otherwise the icon is black
  }

  noStroke();
  rect(width - 100, 40, 60, 30, 4);//Draw clean icon
  fill(255);
  textSize(15);
  text("CLEAN", width - 100, 40); //Draw clean icon and text

  //The color selection field is displayed at the bottom
  for (let i = 0; i < 10; i++) {//Iterate through 10 colors
    fill(i * 10, 80, 100);
    noStroke();
    ellipse(100 + i * 40, height - 40, 20, 20);//Drawing color circles
  }
  stroke(100); 
  noFill();
  ellipse(100 + colorIndex * 40, height - 40, 30, 30);//Drawing the selection box
}

//Constructor, when the button of the start screen is tapped, the state is switched
function changeBG() {
  state = 1;
  button.position(-width / 2 - 90, height / 2 - 45);
}

//When clicking the mouse
function mouseClicked() {
  let dis1 = dist(mouseX, mouseY, 50, 40);
  let dis2 = dist(mouseX, mouseY, 100, 40);
  let dis3 = dist(mouseX, mouseY, 150, 40); //Calculate the distance from the mouse to the three paintbrush icons
  if (dis1 < 15) {
    choosePan = 1; //If the mouse is clicked on the first icon, the drawing status switches to 1 and starts drawing a flower
  }
  if (dis2 < 15) {
    choosePan = 2; //If the mouse is clicked on the second icon, the drawing status switches to 2 and starts drawing the star
  }
  if (dis3 < 15) {
    choosePan = 3; //If the mouse is clicked on the third icon, the drawing status switches to 3 and starts drawing lines
  }

  //Iterate through 10 colors and calculate the distance from the mouse to the color
  for (let i = 0; i < 10; i++) {
    let dis = dist(mouseX, mouseY, 100 + i * 40, height - 40);
    if (dis < 10) {//If the distance is less than 10
      colorIndex = i;//change color
    }
  }
  
  //When the clean button is clicked
  if (
    mouseX < width - 70 &&
    mouseX > width - 130 &&
    mouseY > 25 &&
    mouseY < 55
  ) {
    pg.clear();//Clean up the canvas
  }

  drawBoard1();
}

//Constructor, drawing stars
function drawStar() {
  for (var i = 0; i < 20; i++) {//Traversing 20 stars
    fill(20, 80, 80, startB[i]);//fill color 
    noStroke();
    let r;// define size of stars
    beginShape();//Start drawing
    for (let j = 0; j < 8; j++) {
      var theta = (j * TWO_PI) / 8;
      if (j % 2 == 0) {
        r = 8;
      } else {
        r = 3;
      }
      let x = r * cos(theta) + starX[i];
      let y = r * sin(theta) + starY[i];//Calculate the horizontal and vertical coordinates of the star
      vertex(x, y);//Drawing Stars
    }
    endShape(CLOSE);//end drawing
  }
}


//Constructor, draw house
function drawHouse() {
  push();
  translate(0, -60);
  rectMode(CORNER); //Corner drawing rectangle
  for (let i = 0; i < (width - 20) / 100 - 1; i++) {
    fill(0);
    let housex = 25 + i * 100;//Calculate the horizontal coordinates of the house
    rect(housex, height - houseHeight[i], 90, houseHeight[i]);//Draw the rectangle for each house-body
    triangle(
      housex,
      height - houseHeight[i],
      housex + 90,
      height - houseHeight[i],
      housex + 45,
      height - houseHeight[i] - houseHeight[i] / 4
    );//Drawing a triangular roof
    for (let j = 20; j < houseHeight[i] - 10; j += 20) {
      for (let i = housex + 15; i <= housex + 75; i += 20) {//Iterate over the width and height of the house
        if (noise(j, i) < 0.6) {
          fill(20, 80, 80, noise(j, i) * 255 + 50);
        } else {
          fill(0);
        }
        rect(i - 5, height - j, 8, 8);//Drawing windows
      }
    }
  }
  pop();
}


//Create snow
class Snow {
  constructor(x, y, v, size) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.size = size;//Initialize the horizontal and vertical coordinates, velocity and size of the snow
  }
  
  //Constructors, snow movement
  update() {
    this.y += this.v;
  }
  
  //Constructor, snow display
  show() {
    fill(100, 200);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);//Draw the falling snow
  }
  
  //Constructor, Edge Detection
  checkEdge() {
    if (this.y > height + 20) {//When the vertical coordinate of the snow exceeds the screen
      this.y = random(-height, 0);//Snow back to starting position
    }
  }
}

