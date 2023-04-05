let heart
function preload(){
  heart = loadImage('heart.png')
}

//Defines what a puzzle is
  class puzzle{
  constructor(phrase,hint,category,difficulty)
    {
    this.phrase = phrase
    this.hint = hint
    this.category = category
    this.difficulty = difficulty
  }
  }

class GuessButton{
  constructor(x,y,width,height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  drawButton(){
      push()
  rect(this.x, this.y ,this.width ,this.height)
  textSize(20)
  text('Guess Word',this.x,this.y + this.height)
  pop()
  }
  checkButtonPressed(){
    if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
      return 'Pressed'
    }
  }
  GuessWordScreen(){
    
  }
}
//Creates a bunch of puzzles
  const allPuzzles = [
  new puzzle('snow','water','winter','easy'),
  new puzzle('ice','water','winter','easy'),
  new puzzle('boots','something you put on','winter','easy'),
  new puzzle('coat','something you put on','winter','easy'),
  new puzzle('gloves','something you put on','winter','easy'),
  new puzzle('hat','something you put on','winter','easy'),
  new puzzle('scarf','something you put on','winter','easy'),
  new puzzle('salt','removes ice','winter','easy'),
  new puzzle('shovel','removes snow','winter','medium'),
  new puzzle('snow pants','something you put on','winter','medium'),
  new puzzle('snowman','water','winter','medium'),
  new puzzle('carrot','snowman','winter','medium'),
  new puzzle('sticks','removes snow','winter','medium'),
  new puzzle('snow plow','removes snow','winter','medium'),
  new puzzle('tobogganing','hills','winter','hard'),
  new puzzle('winter tires','car','winter','hard'),
  new puzzle('windshield wiper fluid','car','winter','hard'),
  ]  
  let currentHint
  let currentpuzzle
  let guesses
	let guessPositionX = 500
	let guessPositionY = 400
	let guessLetterGap = 40	
	let currentphrase

//point system
let points = 0

//player lives counter
let lives = 3

//menuscreens
let gameover = false

  let Button = new GuessButton(400,125,125,25)
  let wrongGuess
  let currentGameState

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  switchPuzzle()
  currentGameState = 'guessing letter'
}

function draw() {
  gameoverscreen()
  if (gameover == false) {
	clear() 
  drawBackground()
  if(currentGameState == 'guessing letter'){
    	drawPuzzle()  
      drawHint()  
      drawLives()
  Button.drawButton() 
  push()
  textSize(50)
  text("game points: " + points, 100, 50)
  text("lives: ", 1200, 50)
  pop()
  }
  }
  }
	
function drawBackground() {
  push()
  fill('gray')
  rect(0, 0, windowWidth, windowHeight)
  pop()
  }
=======
  


function drawPuzzle() {
	for (let i = 0; i < guesses.length; i++) {
		letter = guesses[i]
    push()
    textSize(50)
		text(letter, guessPositionX + i * guessLetterGap, guessPositionY)
    pop()
	}
}

function keyPressed() {
  if(currentGameState = 'guessing letter'){
    
  
  if (key.match(/^[a-z0-9]$/i))
  {
    let correctCount = 0
    	for (let i = 0; i < currentphrase.length; i++) {
		letter = currentphrase[i]
		if (key == letter) {

       			correctCount++
        if(key == guesses[i]){
          print(`You already guessed "${key}"`)
          break
        }
      points = points + 50
			guesses[i] = letter

    checkPuzzleCompletion()

		}
  }
	if (correctCount == 0) { 
   
    if (lives > 0) {
      lives = lives - 1
    }
    if(lives == 0){
      gameover = true
       print("out of lives")
    }
   else{ 
     print(`Wrong! there is no "${key}"`)
   }
	}


	if (correctCount == 0) {
    if(wrongGuess.includes(key)){
       print(`You already guessed "${key}"`)
    }
    else{
      		print(`Wrong! there is no "${key}"`)
      wrongGuess.push(key)
      
	}
    }  
  }
  }

}

function checkPuzzleCompletion(){
if(!guesses.includes('_') ){
  
   switchPuzzle()
}
}
function mousePressed(){
  if(Button.checkButtonPressed() == 'Pressed'){
  currentGameState = 'guessing word'
  }
}
function switchPuzzle(){
    currentpuzzle = random(allPuzzles)
  guesses = []
  wrongGuess = []
	currentphrase = currentpuzzle.phrase
  currentHint = currentpuzzle.hint
  for (let i = 0; i < currentphrase.length; i++) {
		letter = currentphrase[i]
		if (letter == ' ') guesses.push(letter)
		else guesses.push('_')
	}

  switchCurrentPuzzle = false;
}

function gameoverscreen() {
  if (gameover == true)
    fill('red')
    rect(0, 0, windowWidth, windowHeight)
    text('Game Over!', 150, 125)
    text('Out of Lives </3', 150, 175)
}

function drawHeart (posx, posy, length, height) {

   image(heart, posx, posy, length, height)

}

function drawLives() {
  if (lives == 3) {
    drawHeart(1500, 40, 20, 20)

  }
  if (lives >= 2) {
    drawHeart(1550, 40, 20, 20)
  }
  if (lives >=1) {
    drawHeart(1600, 40, 20, 20)
  }
}

function drawHint(){
  if(lives <= 2){
    text(currentHint, 200, 200)
  }
}

