
let ABeginning = 0

let BGamemode = 0

let CGame = 0

let menuPlayerSelect = 0
let menuPlayerGamemode = 0

let resolutionX = 1920
let resolutionY = 1080

let centreOfSquaresX = resolutionX / 2
let centreOfSquaresY = resolutionY / 2
let squareSideLength = 500
let squareCurve = 10

function setup() {
  createCanvas(resolutionX, resolutionY);
}



function gamemodeSelect()  {
  let topOfSquares = centreOfSquaresY - squareSideLength
  push()
  fill(255, 0, 0)
  rect(centreOfSquaresX, topOfSquares, squareSideLength, squareSideLength * 2, squareCurve)
  pop()
  push()
  fill(0, 255, 0)
  rect(centreOfSquaresX, topOfSquares, -squareSideLength, squareSideLength * 2, squareCurve)
  pop()

} //two 'square' visuals
function MCGamemodeSelect()  {
    if (menuPlayerGamemode == 0)  {
    if (mouseX < centreOfSquaresX + squareSideLength && mouseX > centreOfSquaresX)  {
       if (mouseY > centreOfSquaresY - squareSideLength  && mouseY < centreOfSquaresY + squareSideLength)  {  
         //right side
      menuPlayerGamemode = 1
         print('gamemode 1')
       }
    }
   
      if (mouseX > centreOfSquaresX - squareSideLength && mouseX < centreOfSquaresX )  {
      if (mouseY > centreOfSquaresY - squareSideLength  && mouseY < centreOfSquaresY + squareSideLength)  { 
        //left side
      menuPlayerGamemode = 2
        print('gamemode 2')
       }
    }
  }

} //Mouse conditions for gamemodeSelect visuals
function playerSelect()  {
  push();
  fill(255, 0, 0);
  rect(centreOfSquaresX, centreOfSquaresY, squareSideLength, squareSideLength, squareCurve);
  pop();
  push();
  fill(0, 0, 255);
  rect(centreOfSquaresX, centreOfSquaresY, -squareSideLength, squareSideLength, squareCurve);
  pop();
  push();
  fill(0, 255, 0);
  rect(centreOfSquaresX, centreOfSquaresY, squareSideLength, -squareSideLength, squareCurve);
  pop();
  push();
  fill(255, 0, 255);
  rect(centreOfSquaresX, centreOfSquaresY, -squareSideLength, -squareSideLength, squareCurve);
  pop();
}  //four 'square' visuals
function MCPlayerSelect()  {
  if (menuPlayerSelect == 0)  {
    if (mouseX < centreOfSquaresX + squareSideLength && mouseX > centreOfSquaresX)  {
       if (mouseY > centreOfSquaresY && mouseY < centreOfSquaresY + squareSideLength)  {  
         //red button mouse condition
      menuPlayerSelect = 1
         print('player 1')
       }
      if (mouseY < centreOfSquaresY && mouseY > centreOfSquaresY - squareSideLength)  {
        //green button mouse condition
        menuPlayerSelect = 2
        print('player 2')
      }
    }
    if (mouseX > centreOfSquaresX - squareSideLength && mouseX < centreOfSquaresX )  {
      if (mouseY > centreOfSquaresY && mouseY < centreOfSquaresY + squareSideLength)  { 
        //blue buttion mouse condition
      menuPlayerSelect = 3
        print('player 3')
       }
      if (mouseY < centreOfSquaresY && mouseY > centreOfSquaresY - squareSideLength)  {
        //magenta button mouse condition
        menuPlayerSelect = 4
        print('player 4')
      }
    }
  }
}  //mouse conditions for playerSelect visuals

function draw() {
  clear()
  changeScreen()
}

function mousePressed()  {
  if (ABeginning == 1 && BGamemode == 1)  {
    CGame = 1 //does not do anything but can prompt the game if placed in changeScreen() and also, mouse conditions for MCGamemodeSelect and MCPlayerSelect should determine variables in place to set the right archetype of game.
    MCPlayerSelect()
  }
  else if (ABeginning == 1 && BGamemode == 0)  {
    BGamemode = 1 
    MCGamemodeSelect()
    } 
  else if (ABeginning == 0 && BGamemode == 0)  {
    // for 
    ABeginning = 1
  }
} //runs backwards according to changeScreen



function changeScreen()  {
  if (ABeginning == 0 && BGamemode == 0)  {
    background  ('red')
    //we need display here all over the place
      }
  else if (ABeginning == 1 && BGamemode == 0)  {
    background  ('orange')
    gamemodeSelect()
  }
  else if (ABeginning == 1 && BGamemode == 1)  {  
    background  ('yellow')
     playerSelect()
    }
} //runs alongside mousePressed()