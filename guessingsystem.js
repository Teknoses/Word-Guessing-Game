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

class points{
  constructor(x,y,playerNumber,){
    this.x = x
    this.y = y
    this.playerNumber = playerNumber
    this.points = 0
  }
drawpoints(){
  push()
  textSize(50)
  text('Player ' + this.playerNumber + ' Points: ' + this.points, this.x, this.y)
  pop() 
}
addpoints(){
  this.points = this.points + 50
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
  new puzzle('sticks','snowman','winter','medium'),
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
  let currentplayers = [
  Player1points = new points(100, 50, 1),
  Player2points = new points(1200,50, 2),
  Player3points = new points(100,1000, 3),
  Player4points = new points(1200,1000, 4),
  ]
  let playerNumber = 4
//point system


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
      switchPuzzle()
  }
  else if(currentGameState == 'guessing letter'){
      checkPuzzleCompletion()
      clear() 
      drawBackground()
    	drawPuzzle()  
      drawHint()  
      drawLives()
      for(let i = 0; i < playerNumber; i++){
         currentplayers[i].drawpoints()
      }
      guessWordButton.drawButton() 
  }
  else if(currentGameState == 'guessing word'){
      clear()
      drawBackground()
    	drawPuzzle()  
      drawHint()  
      drawLives()
      for(let i = 0; i < playerNumber; i++){
      currentplayers[i].drawpoints()
      }
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
      currentplayers[turn - 1].addpoints()
			guesses[i] = letter
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
    else if(checkGuessWord() == true){
      print('correct')
      switchPuzzle()
    }
    else if(checkGuessWord() == false){
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
  push()
  textSize(50)
  text("Lives: ", 700, 50)
  pop()
  if (lives == 3) {
    drawHeart(850, 20, 50, 50)

  }
  if (lives >= 2) {
    drawHeart(910, 20, 50, 50)
  }
  if (lives >=1) {
    drawHeart(970, 20, 50, 50)
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
  if(wordGuess.length == 0)
  {
    print('nothing')
    return 'nothing'
  }
  let correctletter = 0
  for(let i = 0; i < wordGuess.length; i++){
    letter = currentphrase[i]
    if(letter == wordGuess[i]){
      correctletter++
    }
    }
  if(correctletter == wordGuess.length){
    print('yes')
    return true 
  }
  else{
    print('no')
    return false
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