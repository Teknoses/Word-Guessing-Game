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
  constructor(x,y,width,height, text){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.text = text
  }
  drawButton(){
      push()
  rect(this.x, this.y ,this.width ,this.height)
  textSize(50)
  text(this.text,this.x,this.y + this.height)
  pop()
  }
  checkButtonPressed(){
    if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
      return 'Pressed'
    }
  }
  GuessWordWindow(){
    rect(1920/2 - 400, 700 ,800,200)
    push()
    textSize(50)
    text('What Is Your Guess?', 1920/2 -300, 750)
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
	let guessPositionX = 1920/2
	let guessPositionY = 1080/2
	let guessLetterGap = 40	
	let currentphrase

//point system
let points = 0

//player lives counter
let lives = 3

//menuscreens

  let Button = new GuessButton(900,800,500,75, "Guess Word")
  let wrongGuess
  let currentGameState

function setup() {
  createCanvas(1920, 1080);
  background(100);
  switchPuzzle()
  currentGameState = 'guessing letter'
}

function draw() {
  if(currentGameState == 'game over'){
     gameoverscreen()
  }
  else if(currentGameState == 'guessing letter'){
    clear() 
  drawBackground()
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
  else if(currentGameState == 'guessing word'){
    clear()
      drawBackground()
    	drawPuzzle()  
      drawHint()  
      drawLives()
      push()
  textSize(50)
  text("game points: " + points, 100, 50)
  text("lives: ", 1200, 50)
  pop()
    Button.GuessWordWindow()
  }
  }
	
function drawBackground() {
  push()
  fill('gray')
  rect(0, 0, 1920, 1080)
  pop()
  }

function drawPuzzle() {
	for (let i = 0; i < guesses.length; i++) {
		letter = guesses[i]
    push()
    textSize(50)
		text(letter, guessPositionX + i * guessLetterGap - (currentphrase.length * guessLetterGap), guessPositionY)
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
      currentGameState = 'game over'
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
    if(currentGameState == 'guessing letter'){
       currentGameState = 'guessing word'
    }
  else{
       currentGameState = 'guessing letter'
  }
    }
}

function switchPuzzle(){
    currentpuzzle = random(allPuzzles)
  guesses = []
  wrongGuess = []
  lives = 3
	currentphrase = currentpuzzle.phrase
  currentHint = currentpuzzle.hint
  for (let i = 0; i < currentphrase.length; i++) {
		letter = currentphrase[i]
		if (letter == ' ') guesses.push(letter)
		else guesses.push('_')
	}
}

function gameoverscreen() {

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

