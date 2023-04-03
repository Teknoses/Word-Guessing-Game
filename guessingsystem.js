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
  let currentpuzzle
  let guesses
	let guessPositionX = 200
	let guessPositionY = 200
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
