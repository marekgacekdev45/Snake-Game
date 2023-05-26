const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

class SnakePart {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

let speed = 7

let titleCount = 20
let titleSize = canvas.width / titleCount - 2

let headX = 10
let headY = 10
const snakeParts = []
let tailLength = 0

let appleX = 5
let appleY = 5

let xVelocity = 0
let yVelocity = 0

let score = 0

//game loop
function drawGame() {
	changeSnakePosition()
let result = isGameOver()
if(result){
	return
}

	clearScreen()

	checkAppleCollision()
	drawApple()
	drawSnake()

	drawScore()

	if(score >20){
		speed =11
	}
	if(score>50){
		speed =15
	}

	if(SVGFEColorMatrixElement)

	setTimeout(drawGame, 1000 / speed)
}

function clearScreen() {
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake() {
	

//draw snake tail
	ctx.fillStyle = 'green'
	for (let i=0;i<snakeParts.length;i++){
		let part = snakeParts[i]
		ctx.fillRect(part.x *titleCount, part.y *titleCount, titleSize,titleSize)
	}

	snakeParts.push(new SnakePart(headX,headY));
	if(snakeParts.length >tailLength){
		snakeParts.shift()

	}

	//draw snake head
	ctx.fillStyle = 'orange'
	ctx.fillRect(headX * titleCount, headY * titleCount, titleSize, titleSize)
}

function drawApple() {
	ctx.fillStyle = 'red'
	ctx.fillRect(appleX * titleCount, appleY * titleCount, titleSize, titleSize)
}

function checkAppleCollision() {
	if (appleX === headX && appleY === headY) {
		appleX = Math.floor(Math.random() * titleCount)
		appleY = Math.floor(Math.random() * titleCount)
		tailLength++
		score+=10
	}
}

function drawScore(){
	ctx.fillStyle='white'
	ctx.font = '15px Verdana'
	ctx.fillText('Score ' + score,canvas.width-90,20)

}

function isGameOver(){
	let gameOver = false

	if(yVelocity ===0 && xVelocity ===0){
		return false
	}

	//walls
	if(headX <0 || headX===titleCount||headY<0 ||headY===titleCount){
		gameOver=true
	}

	//tail
	for(let i=0;i<snakeParts.length;i++){
		let part = snakeParts[i]
		if(part.x ===headX &&part.y ===headY){
			gameOver=true
			break
		}
	}

	if(gameOver){
		ctx.fillStyle = 'white'
		ctx.font = '50px Verdana'
		ctx.fillText('Game Over',canvas.width/6.5,canvas.height/2)
	}

	return gameOver
}

function changeSnakePosition() {
	headX = headX + xVelocity
	headY = headY + yVelocity
}

function keyDown(event) {
	//up
	if (event.keyCode == 38) {
		if (yVelocity == 1) {
			return
		}
		yVelocity = -1
		xVelocity = 0
	}
	//down
	if (event.keyCode == 40) {
		if (yVelocity == -1) {
			return
		}
		yVelocity = 1
		xVelocity = 0
	}
	//left
	if (event.keyCode == 37) {
		if (xVelocity == 1) {
			return
		}
		yVelocity = 0
		xVelocity = -1
	}
	//right
	if (event.keyCode == 39) {
		if (xVelocity == -1) {
			return
		}
		yVelocity = 0
		xVelocity = 1
	}
}

document.addEventListener('keydown', keyDown)

drawGame()
