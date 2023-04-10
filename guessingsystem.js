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
  constructor(x,y,width,height, text,colour){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.text = text
    this.colour = colour
}
  drawButton(){
  push()
  fill(this.colour)
  strokeWeight(10)
  rect(this.x, this.y ,this.width ,this.height)
  fill('black')
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
//creates all variables for a turn 
  let currentpuzzle
  let guesses
	let currentphrase
  let wrongLetters
  let wordGuess
  let currentCategory
  //all Buttons
  let guessWordButton = new Button(710,700,500,75, "Guess Word",'white')
  let closeGuessWindow = new Button(1340,680,250,75,'Close','white')
  let submitWord = new Button(760,850,300,100,'Submit','white')
  let gradeOneMode = new Button(460,240,500,500,'Grade One','red')
  let SecondGameMode = new Button(960,240,500,500,'N/A','Green')
  let onePlayer = new Button(60,240,450,450,'One Player','Cyan')
  let twoPlayer = new Button(510,240,450,450,'Two Player','Pink')
  let threePlayer = new Button(960,240,450,450,'Three Player','Orange')
  let fourPlayer = new Button(1410,240, 450,450,'Four Player','Brown')
  let fiveRounds = new Button(240,240,500,500,'5 Rounds','#2596be')
  let tenRounds = new Button(740,240,500,500,'10 Rounds','#5e1da3')
  let infiniteRounds = new Button(1240,240,500,500,'Infinite Rounds','#ff00aa')
  let startgame = new Button(860,540,200,125,'Start','white')
  //currentGameState allows for game to switch between modes
  let currentGameState
   
  //creates rounds and turns
  let round = 1
  let turn = 0
  let roundlimit
  //creates players up to 4 & how many players during a game
  let currentplayers = [
  Player1points = new points(100, 50, 1),
  Player2points = new points(1200,50, 2),
  Player3points = new points(100,1000, 3),
  Player4points = new points(1200,1000, 4),
  ]
  let playerNumber = 2


//player lives counter per turn
let lives

function setup() {
  createCanvas(1920, 1080);
  background(100);
  currentCategory = random(allPuzzles)
  switchPuzzle()
  textFont(ComicSans)
  currentGameState = 'main menu'
}

function draw() {
if(currentGameState == 'main menu'){
  clear()
  drawImage(backgroundimage,0,0,1920,1080)
  push()
  strokeWeight(10)
  textSize(75)
  rectMode(CORNERS)
  rect(460,20,1460, 120)
  text('Orthographer Capitalists', 500,90)
  pop()
  startgame.drawButton()
}
if(currentGameState == 'gamemode selection'){
  clear()
  drawImage(backgroundimage,0,0,1920,1080)
  gradeOneMode.drawButton()
  SecondGameMode.drawButton()
}
else if(currentGameState == 'player selection'){
  clear()
  drawImage(backgroundimage,0,0,1920,1080)
  onePlayer.drawButton()
  twoPlayer.drawButton()
  threePlayer.drawButton()
  fourPlayer.drawButton()
}
else if(currentGameState == 'round selection'){
  clear()
  drawImage(backgroundimage,0,0,1920,1080)
  fiveRounds.drawButton()
  tenRounds.drawButton()
  infiniteRounds.drawButton()
}
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
  if(currentGameState == 'main menu'){
   if(startgame.checkButtonPressed() == 'Pressed'){
     currentGameState = 'player selection'
   }
  }
  else if(currentGameState == 'gamemode selection'){
     if(gradeOneMode.checkButtonPressed() == 'Pressed'){
      currentGameState = 'player selection'
    }
  }
  else if(currentGameState == 'player selection'){
    if(onePlayer.checkButtonPressed() == 'Pressed'){
      playerNumber = 1
      currentGameState = 'round selection'
    }
     if(twoPlayer.checkButtonPressed() == 'Pressed'){
      playerNumber = 2
      currentGameState = 'round selection'
    }
     if(threePlayer.checkButtonPressed() == 'Pressed'){
      playerNumber = 3
      currentGameState = 'round selection'
    }
     if(fourPlayer.checkButtonPressed() == 'Pressed'){
      playerNumber = 4
      currentGameState = 'round selection'
    }
  }  
  else if(currentGameState == 'round selection'){
    if(fiveRounds.checkButtonPressed() == 'Pressed'){
      roundlimit = 5
      currentGameState = 'guessing letter'
    }
     if(tenRounds.checkButtonPressed() == 'Pressed'){
     roundlimit = 10
      currentGameState = 'guessing letter'
    }
     if(infiniteRounds.checkButtonPressed() == 'Pressed'){
      roundlimit = 9999
      currentGameState = 'guessing letter'
    }
  
  }
  else if(currentGameState == 'guessing letter'){
     if(guessWordButton.checkButtonPressed() == 'Pressed'){
       currentGameState = 'guessing word'
    }
  }
  else if(currentGameState == 'guessing word'){
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
    text('Game Over!', 660, 125)
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

