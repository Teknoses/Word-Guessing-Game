let heart
function preload(){
  backgroundimage = loadImage('background.jpg')
  heart = loadImage('heart.png')
  ComicSans = loadFont('COMIC.TTF')
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
    strokeWeight(10)
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
  text('Player ' + this.playerNumber + ' Money: $' + this.points, this.x, this.y)
  pop() 
}
addpoints(amount){
  this.points = this.points + amount
}
}
//Creates a bunch of puzzles
  const allPuzzles = [
  new puzzle('snow','water','Winter','easy'),
  new puzzle('ice','water','Winter','easy'),
  new puzzle('boots','something you put on','Winter','easy'),
  new puzzle('coat','something you put on','Winter','easy'),
  new puzzle('gloves','something you put on','Winter','easy'),
  new puzzle('hat','something you put on','Winter','easy'),
  new puzzle('scarf','something you put on','Winter','easy'),
  new puzzle('salt','removes ice','Winter','easy'),
  new puzzle('shovel','removes snow','Winter','medium'),
  new puzzle('snow pants','something you put on','Winter','medium'),
  new puzzle('snowman','water','Winter','medium'),
  new puzzle('carrot','snowman','Winter','medium'),
  new puzzle('sticks','snowman','Winter','medium'),
  new puzzle('snow plow','removes snow','Winter','medium'),
  new puzzle('tobogganing','hills','Winter','hard'),
  new puzzle('winter tires','car','Winter','hard'),
  new puzzle('windshield wiper fluid','car','Winter','hard'),
  new puzzle('ontario','South','Provinces and Territories','easy'),
  new puzzle('quebec','Français','Provinces and Territories','easy'),
  new puzzle('manitoba','Touches Ontario','Provinces and Territories','easy'),
  new puzzle('newfoundland and labrador','Above Quebec','Provinces and Territories','hard'),
  new puzzle('yukon','Territory','Provinces and Territories','easy'),
  new puzzle('new brunswick','Small Place','Provinces and Territories','medium'),
  new puzzle('nova scotia','Small Place','Provinces and Territories','medium'),
  new puzzle('prince edward island','Island','Provinces and Territories','hard'),
  new puzzle('saskatchewan','Name never fits inside the province','Provinces and Territories','medium'),
  new puzzle('alberta','Next to British Columbia','Provinces and Territories','easy'),
  new puzzle('british columbia','Most Western Province','Provinces and Territories','medium'),
  new puzzle('northwest territories','Territory','Provinces and Territories','hard'),
  new puzzle('nunavut','Largest Place in Canada','Provinces and Territories','easy'),
  new puzzle('hand','Arms','Body Part','easy'),
  new puzzle('foot','Legs','Body Part','easy'),
  new puzzle('head','Top of the Human','Body Part','easy'),
  new puzzle('nose','Face','Body Part','easy'),
  new puzzle('arm','Limbs','Body Part','easy'),
  new puzzle('leg','Limbs','Body Part','easy'),
  new puzzle('face','Head','Body Part','easy'),
  new puzzle('mouth','Face','Body Part','easy'),
  new puzzle('teeth','Dirtiest Bones','Body Part','easy'),
  new puzzle('knee','Middle of Leg','Body Part','easy'),
  new puzzle('heart','Middle of the Body','Body Part','easy'),
  new puzzle('ankle','You can Roll them','Body Part','easy'),
  new puzzle('thigh','Popular Piece of Chicken','Body Part','easy'),
  new puzzle('neck','Holds Necklaces','Body Part','easy'),
  new puzzle('beard','Adults have them','Body Part','easy'),
  new puzzle('finger','Typing','Body Part','easy'),
  ]  
  let currentpuzzle
  let guesses
	let currentphrase
  let guessWordButton = new Button(710,700,500,75, "Guess Word")
  let closeGuessWindow = new Button(1340,680,250,75,'Close')
  let submitWord = new Button(760,850,300,100,'Submit')
  let roundlimit
  let wrongLetters
  let currentGameState
  let wordGuess 
  let currentCategory
  let round = 1
  let turn = 0
  let currentplayers = [
  Player1points = new points(100, 50, 1),
  Player2points = new points(1200,50, 2),
  Player3points = new points(100,1000, 3),
  Player4points = new points(1200,1000, 4),
  ]
  let playerNumber = 2
//point system


//player lives counter
let lives

//menuscreens

function setup() {
  createCanvas(1920, 1080);
  background(100);
  roundlimit = 10
  currentCategory = random(allPuzzles)
  switchPuzzle()
  textFont(ComicSans)
  currentGameState = 'guessing letter'
}

function draw() {

  if(round > roundlimit){
    clear()
    gameoverscreen()
  }
  else if(currentGameState == 'out of lives'){
    switchPuzzle()
  }
  else if(currentGameState == 'guessing letter'){
      checkPuzzleCompletion()
      clear() 
      drawImage(backgroundimage,0,0,1920,1080)
    	drawPuzzle()  
      drawHint()  
      drawLives()
      drawTurnsAndRounds()
      for(let i = 0; i < playerNumber; i++){
         currentplayers[i].drawpoints()
      }
      guessWordButton.drawButton() 
  }
  else if(currentGameState == 'guessing word'){
      clear()
      drawImage(backgroundimage,0,0,1920,1080)
    	drawPuzzle()  
      drawHint()  
      drawLives()
      drawTurns()
      for(let i = 0; i < playerNumber; i++){
      currentplayers[i].drawpoints()
      }
      GuessWordWindow()
  }
  }

function drawPuzzle() {
  let guessPositionX = 1920/2
	let guessPositionY = 1080/2
	let guessLetterGap = 40	
    push()
    strokeWeight(10)
    rectMode(CORNERS)
    rect(400,300,1560,780)
    pop()
//Draws Letters Guessing/ Correct Guesses
	for (let i = 0; i < guesses.length; i++) {
		letter = guesses[i]
    push()
    textSize(50)
		text(letter, guessPositionX + i * guessLetterGap - ((currentphrase.length/2) * guessLetterGap), guessPositionY)
    pop()
//Draws Category
      push()
  strokeWeight(10)
  rectMode(CORNERS)
  rect(400,125,1560,250)
    textSize(50)
    text('Category: ' + currentCategory.category, 410, 200)
   pop()
	}
}

function keyPressed() {
  if(currentGameState == 'guessing letter'){
  if (key.match(/^[a-zA-Z0-9]$/i))
  {
    let typedletter = key.toLowerCase()
    let correctCount = 0
    	for (let i = 0; i < currentphrase.length; i++) {
		letter = currentphrase[i]
		if (typedletter == letter) {
       			correctCount++
        if(typedletter == guesses[i]){
          print(`You already guessed "${typedletter}"`)
          break
        }
      
      if(currentpuzzle.difficulty == 'easy'){
        currentplayers[turn - 1].addpoints(50)
      }
      else if(currentpuzzle.difficulty == 'medium'){
        currentplayers[turn - 1].addpoints(35)
      }
      else if(currentpuzzle.difficulty == 'hard'){
        currentplayers[turn - 1].addpoints(25)
      }
   
			guesses[i] = letter
		}
  }

	if (correctCount == 0) {
    if(wrongLetters.includes(typedletter)){
       print(`You already guessed "${typedletter}"`)
    }
    else{
      		print(`Wrong! there is no "${typedletter}"`)
      wrongLetters.push(typedletter) 
      if (lives > 0) {
      lives = lives - 1
    }
    if(lives == 0){
      currentGameState = 'out of lives'
       print("out of lives")
    }
	}
    }  
  }
  }
  else if(currentGameState == 'guessing word'){
    if (key.match(/^[a-zA-Z0-9 ]$/i)){
      print(`Typed "${key}"`)
      let typedletter = key.toLowerCase()
      wordGuess.push(typedletter)
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
  turnSwitch()
  currentGameState = 'guessing letter'
    currentpuzzle = random(allPuzzles)
  while(currentpuzzle.category !== currentCategory.category){
     currentpuzzle = random(allPuzzles)
  }
  guesses = []
  wordGuess = []
  wrongLetters = []
  lives = 5
	currentphrase = currentpuzzle.phrase
  for (let i = 0; i < currentphrase.length; i++) {
		letter = currentphrase[i]
		if (letter == ' ') guesses.push(letter)
		else guesses.push('_')
	}
  
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

function drawImage (imagename,posx, posy, length, height) {
   image(imagename, posx, posy, length, height)
}

function drawLives() {
  let livesPosx = 850
  let livesPosY = 20
  let livesGap = 60
  push()
  textSize(50)
  text("Lives: ", 700, 50)
  pop()
  for(let i = 0;i < lives; i++)
    {
    drawImage(heart,livesPosx + livesGap * i, livesPosY, 50, 50)
    }
  
}

function drawHint(){
  let currentHint = currentpuzzle.hint
  if(lives <= 2){
    push()
    textSize(50)
    text('Hint: ' + currentHint, 450, 400)
    pop()
  }
}

function GuessWordWindow(){
    push()
    strokeWeight(10)
    rect(560, 700 ,800,200)
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
    push()
    print('Turn' + turn)
    print('Round:' + round)
    pop()
  }
  else{
    turn = 1
    round++
    currentCategory = random(allPuzzles)
  }

}

function drawTurnsAndRounds(){
push()
strokeWeight(10)
rectMode(CORNERS)
//draws Turns
rect(10,530,380,605)
textSize(50)
text('Player ' + turn + "'s Turn", 15, 585)  
//draws Rounds
rect(10,430,380,505)
text('Round ' + round + '/' + roundlimit, 15, 485)
pop()
}

