// Board
var blockSize = 25
var rows = 20
var cols = 20
var board
var context

// snake head
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var velocityX = 0
var velocityY = 0

var snakeBody = []

// Food
var foodX
var foodY

var score = 0

var gameOver = false

window.onload = function() {
    board = document.getElementById('board')
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext('2d')

    placeFood()
    document.addEventListener('keyup', (event) => {
        changeDirection(event)
        update()
    })
    setInterval(update, 1000/10)
}

function update() {
    if (gameOver) {
        document.getElementById("btn").hidden = false
        return
    }

    // background
    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)

    // food
    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize)

    // hit food
    if (snakeX === foodX && snakeY === foodY) {
        increaseScore()

        snakeBody.push([foodX, foodY])
        placeFood()
    }

    // move snake body
    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }

    // move snake head
    if (snakeBody.length > 0) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = 'lime'
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    // draw snake body
    for (var i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    if (checkSnakeIsOutOfBounds() || checkSnakeHitItself()) {
        gameOver = true
        alert('Game Over')
    }
}

function changeDirection(event) {
    if (event.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (event.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

function checkSnakeIsOutOfBounds() {
    return snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize
}

function checkSnakeHitItself() {
    for (var i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            return true
        }
    }

    return false
}

function increaseScore() {
    score++
    document.getElementById('score').innerText = score
}

function handleTryAgain() {
    window.location.reload()
}