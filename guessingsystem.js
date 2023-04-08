let heart
function preload(){
  heart = loadImage('heart.png')
  ComicSans = loadFont('comic-sans-ms/COMIC.TTF')
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

class Button{
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
  text(this.text,this.x+this.width/4,this.y + this.height/2 +this.height/4)
  pop()
  }
  checkButtonPressed(){
    if(mouseX > this.x && mouseX < (this.x + this.width) && mouseY > this.y && mouseY < (this.y + this.height)){
      print('Pressed')
      return 'Pressed'
    }
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
	let currentphrase
  let guessWordButton = new Button(710,700,500,75, "Guess Word")
  let closeGuessWindow = new Button(1340,680,250,50,'Close')
  let submitWord = new Button(760,850,300,100,'Submit')

  let wrongLetters
  let currentGameState
  let wordGuess 

  let round = 1
  let turn = 0
  let playerNumber = 2
//point system
let points = 0

//player lives counter
let lives = 3

//menuscreens

function setup() {
  createCanvas(1920, 1080);
  background(100);
  switchPuzzle()
  textFont(ComicSans)
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
  guessWordButton.drawButton() 
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
      GuessWordWindow()
  }
  }
	
function drawBackground() {
  push()
  fill('gray')
  rect(0, 0, 1920, 1080)
  pop()
  }

function drawPuzzle() {
  let guessPositionX = 1920/2
	let guessPositionY = 1080/2
	let guessLetterGap = 40	
	for (let i = 0; i < guesses.length; i++) {
		letter = guesses[i]
    push()
    textSize(50)
		text(letter, guessPositionX + i * guessLetterGap - ((currentphrase.length/2) * guessLetterGap), guessPositionY)
    pop()
	}
}

function keyPressed() {
  if(currentGameState == 'guessing letter'){
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
    if(wrongLetters.includes(key)){
       print(`You already guessed "${key}"`)
    }
    else{
      		print(`Wrong! there is no "${key}"`)
      wrongLetters.push(key) 
      if (lives > 0) {
      lives = lives - 1
    }
    if(lives == 0){
      currentGameState = 'game over'
       print("out of lives")
    }
	}
    }  
  }
  }
  else if(currentGameState == 'guessing word'){
    if (key.match(/^[a-z0-9 ]$/i)){
      print(`Typed "${key}"`)
      wordGuess.push(key)
    }
    if (keyCode == BACKSPACE){
      print('pp')
      wordGuess.splice(wordGuess.length - 1,1,)
    }
  }
}

function checkPuzzleCompletion(){
if(!guesses.includes('_') ){
  switchPuzzle()
}
}

function mousePressed(){
  if(currentGameState == 'guessing letter'){
     if(guessWordButton.checkButtonPressed() == 'Pressed'){
       currentGameState = 'guessing word'
    }
  }
  if(currentGameState == 'guessing word'){
      if(closeGuessWindow.checkButtonPressed() == 'Pressed'){
    wordGuess = []
    currentGameState = 'guessing letter'
  }
    if(submitWord.checkButtonPressed() == 'Pressed'){
    if(checkGuessWord() == 'nothing'){
      print('nothing was written')
    }
    else if(checkGuessWord() == 'correct'){
      switchPuzzle()
    }
    else{
    print('incorrect')
    switchPuzzle()
    }
  }
   
  }
}

function switchPuzzle(){
  currentGameState = 'guessing letter'
  currentpuzzle = random(allPuzzles)
  guesses = []
  wordGuess = []
  wrongLetters = []
  lives = 3
	currentphrase = currentpuzzle.phrase
  currentHint = currentpuzzle.hint
  for (let i = 0; i < currentphrase.length; i++) {
		letter = currentphrase[i]
		if (letter == ' ') guesses.push(letter)
		else guesses.push('_')
	}
  turnSwitch()
}

function gameoverscreen() {
    push()
    fill('red')
    rect(0, 0, 1920, 1080)
    fill('black')
    textSize(50)
    text('Game Over!', 150, 125)
    text('Out of Lives </3', 150, 175)
    pop()
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
    push()
    textSize(50)
    text('Hint: ' + currentHint, 760, 200)
  }
}

function GuessWordWindow(){
    rect(560, 700 ,800,200)
    push()
    textSize(50)
    text('What Is Your Guess?', 670, 750)
    closeGuessWindow.drawButton()
    submitWord.drawButton()
    pop()  
    	for (let i = 0; i < wordGuess.length; i++) {
		letter = wordGuess[i]
      let guessPositionX = 600
	   let guessPositionY = 800
	   let guessLetterGap = 35	
    push()
    textSize(50)
		text(letter, guessPositionX + i * guessLetterGap, guessPositionY)
    pop()
	}
}

function checkGuessWord(){
  let correctletter = 0
  for(let i = 0; i < wordGuess.length; i++){
    letter = currentphrase[i]
    if(letter == wordGuess[i]){
      correctletter++
    }
    else{
      correctletter--
    }
  }
  if(correctletter == 0)
  {
    return 'nothing'
  }
  else if(correctletter == wordGuess.length){
    wordGuess = []
    return 'correct' 
  }
  else{
    wordGuess = []
  }
}

function turnSwitch(){
  if(turn < playerNumber){
     turn++
    print('Current Turn is:' + turn)
    print('Round:' + round)
  }
  else{
    turn = 1
    round++
    print('Current Turn is:' + turn)
    print('Round:' + round)
  }
}