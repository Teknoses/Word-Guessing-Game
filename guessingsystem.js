let heart
function preload(){
  heart = loadImage('heart.png')
}

//Defines what a puzzle is
  class puzzle{
  constructor(phrase,hint,category,difficulty){
    this.phrase = phrase
    this.hint = hint
    this.category = category
    this.difficulty = difficulty
  }

}  
//Creates a bunch of puzzles
  const allPuzzles = [
  new puzzle('computer screen','LEDS','technology','medium'),
	new puzzle('snake','long animal','animial','easy'),
  ]  
  let currentHint
  let currentpuzzle
  let guesses
	let guessPositionX = 500
	let guessPositionY = 400
	let guessLetterGap = 40	
	let currentphrase
  let switchCurrentPuzzle = true;

//point system
let points = 0

//player lives counter
let lives = 3

//menuscreens
let gameover = false

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);

}

function draw() {
  gameoverscreen()
  if (gameover == false) {
	clear()
  drawBackground()
    
  if(switchCurrentPuzzle == true){
     switchPuzzle()
  }
	
  drawPuzzle()
  drawHint()
  push()
  textSize(50)
  text("game points: " + points, 100, 50)
  text("lives: ", 1200, 50)
  pop()
  drawLives()
  }
}

function drawBackground() {
  push()
  fill('gray')
  rect(0, 0, windowWidth, windowHeight)
  pop()
}

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

}

function switchPuzzle(){
    currentpuzzle = random(allPuzzles)
  guesses = []
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