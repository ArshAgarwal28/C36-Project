var database;
var allPaintings;

var drawing;
var currentPath;

var username;

var appState = "begin";

var saveButton, buttonSprite;

var mousePos;

function setup(){
    var canvas = createCanvas(600,600);
    canvas.mousePressed(startPath);

    database = firebase.database();

    drawing = [];
    currentPath = [];

    username = prompt("Please enter your username");

    fetchInfo();
    createSaveButton();

    mousePos = createSprite(mouseX, mouseY, 1, 1);
    mousePos.visible = false;
}

function draw() {
    background("black")

    mousePos.x = mouseX;
    mousePos.y = mouseY;

    if (appState === "begin" && allPaintings !== undefined) {
      nameCheck();
    }

    //Datebase functions
    if (allPaintings !== undefined && username !== null && appState === "drawState") {
      getMouseLocate();
      drawLocations();
    }

    saveButton.mousePressed(savePressed);
  }


//All functions
function startPath() {
    currentPath = [];
    drawing.push(currentPath);
}
function getMouseLocate() {
  if (mouseIsPressed) {
    if (mousePos.isTouching(buttonSprite) === false) {
      var position = {
          x: mouseX,
          y: mouseY
      };

      currentPath.push(position);
    }
  }
}
function drawLocations() {
  stroke(255);
  strokeWeight(2);
  noFill();
  for(var i=0; i<drawing.length; i++){
      var path = drawing[i];
      beginShape();

      for(var j=0; j<path.length; j++){
          vertex(path[j].x, path[j].y);
      }
      endShape();
  }
}
function createSaveButton() {
  saveButton = createButton("SAVE");
  saveButton.position(0, 0);
  saveButton.size(50);

  buttonSprite = createSprite(25, 12.5, 50, 25);
  buttonSprite.visible = false;
}
