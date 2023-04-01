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
  let currentpuzzle
  let guesses
	let guessPositionX = 100
	let guessPositionY = 100
	let guessLetterGap = 10	
	let currentphrase  
  let wrongGuess
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  switchPuzzle()
}

function draw() {
	clear()
  checkPuzzleCompletion()
	drawPuzzle()
}

function drawPuzzle() {
	for (let i = 0; i < guesses.length; i++) {
		letter = guesses[i]
		text(letter, guessPositionX + i * guessLetterGap, guessPositionY)
	}
}

function keyPressed() {
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
		guesses[i] = letter
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

function checkPuzzleCompletion(){
if(!guesses.includes('_') ){
   switchPuzzle()
}
}

function switchPuzzle(){
    currentpuzzle = random(allPuzzles)
  guesses = []
  wrongGuess = []
	currentphrase = currentpuzzle.phrase
  for (let i = 0; i < currentphrase.length; i++) {
		letter = currentphrase[i]
		if (letter == ' ') guesses.push(letter)
		else guesses.push('_')
	}
}

function mousePressed(){
  switchPuzzle()
}