var top1 = 0,
    left = 0,
    interval,
    topPressed = false,
    leftPressed = false,
    rightPressed = false,
    bottomPressed = false,
    snake = document.querySelector('.snake'),
    table = document.querySelector('.table'),
    food = document.querySelector('.food'),
    snakeBody = document.getElementsByClassName('snake'),
    score = document.querySelector('.score'),
    wrapper = document.querySelector('.wrapper'),
    congratulations = document.querySelector('p'),
    newGame = document.querySelector('.newGame'),
    mode = document.querySelector('.mode'),
    easy = document.querySelector('.easy'),
    medium = document.querySelector('.medium'),
    hard = document.querySelector('.hard'),
    pOfMode = document.querySelectorAll('.mode p'),
    body = document.querySelector('body'),
    arrOfWidth = [],
    arrOfHeight = [],
    snakeBodyArr = [],
    strOfPositionSnake = '',
    strOfPosFood = '',
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    div,
    snakeLength = 0,
    intervaTwoClicks,
    counterBetweenTwoClicks = 0,
    value = 0,
    keyCode
for (i = 0, j = 0; i < 60; i++) {
    if (i % 2 == 0) {
        arrOfWidth[l] = i * 10
        l++
    }
}
for (i = 0, j = 0; i < 30; i++) {
    if (i % 2 == 0) {
        arrOfHeight[k] = i * 10
        k++
    }
}
food.style.left = arrOfWidth[Math.floor(Math.random() * l)] + 'px'
food.style.top = arrOfHeight[Math.floor(Math.random() * k)] + 'px'
snake.style.top = top1 + 'px'
snake.style.left = left + 'px'
score.style.display = 'none'
body.style.backgroundColor = 'white'

for (i = 0; i < pOfMode.length; i++) {
    (function (i) {
        pOfMode[i].addEventListener('click', () => {
            if (pOfMode[i].textContent == 'Easy') {
                counterBetweenTwoClicks = 60
                value = 60
                mode.style.display = 'none'
                score.style.display = 'block'
                body.style.backgroundColor = 'rgba(195, 222, 231, 0.89)'
            } else if (pOfMode[i].textContent == 'Medium') {
                counterBetweenTwoClicks = 40
                value = 40
                mode.style.display = 'none'
                score.style.display = 'block'
                body.style.backgroundColor = 'rgba(195, 222, 231, 0.89)'
            } else {
                counterBetweenTwoClicks = 20
                value = 20
                mode.style.display = 'none'
                score.style.display = 'block'
                body.style.backgroundColor = 'rgba(195, 222, 231, 0.89)'
            }
        })
    })(i)
}

function updatePosition(directionValue, positionCss) {
    (positionCss == 'left') ? left += directionValue : top1 += directionValue
    snake.style[positionCss] = (positionCss == 'left') ? left + 'px' : top1 + 'px'

    for (i = 0, j = 1; i < snakeLength; i++ , j++) {
        snakeBody[j].style.left = snakeBodyArr[i].left + 'px'
        snakeBody[j].style.top = snakeBodyArr[i].top + 'px'
    }
}

function biteTail() {
    for (i = 1; i < snakeBody.length; i++) {
        if (snake.style.left == snakeBody[i].style.left && snake.style.top == snakeBody[i].style.top) {
            snake.style.backgroundColor = 'green'
            snake.style.zIndex = 10
            wrapper.style.display = 'block'
            congratulations.textContent = `Congratulations!  Score is ${snakeLength}`
            newGame.addEventListener('click', repeatGame)
            clearInterval(interval)
            window.removeEventListener('keydown', Game)
        }
    }
}

function createTail() {
    if (parseInt(snake.style.left) == parseInt(food.style.left) && parseInt(snake.style.top) == parseInt(food.style.top)) {
        div = document.createElement('div')
        div.setAttribute('class', 'snake')
        snake.after(div)
        div.style.left = snakeBodyArr[snakeLength].left + 'px'
        div.style.top = snakeBodyArr[snakeLength].top + 'px'
        snakeLength++
        score.textContent = 'Your score is: ' + snakeLength
        foodPosition()
    }
}

function foodPosition() {
    for (i = 0; i < snakeBody.length; i++) {
        strOfPositionSnake += parseInt(snakeBody[i].style.left) + ' ' + parseInt(snakeBody[i].style.top) + '    '
    }
    strOfPosFood = arrOfWidth[Math.floor(Math.random() * (arrOfWidth.length - 1))] + ' ' + arrOfHeight[Math.floor(Math.random() * (arrOfHeight.length - 1))]
    var find = true
    while (find) {
        if (strOfPositionSnake.indexOf(strOfPosFood) == -1) {
            find = false
            food.style.left = strOfPosFood.split(' ')[0] + 'px'
            food.style.top = strOfPosFood.split(' ')[1] + 'px'
        } else {
            strOfPosFood = arrOfWidth[Math.floor(Math.random() * (arrOfWidth.length - 1))] + ' ' + arrOfHeight[Math.floor(Math.random() * (arrOfHeight.length - 1))]
        }
    }
    strOfPositionSnake = ''
}

function pressedArrow(leftArrow, topArrow, rightArrow, bottomArrow) {
    leftPressed = leftArrow
    topPressed = topArrow
    rightPressed = rightArrow
    bottomPressed = bottomArrow
}

function moveDirection(directionValue, directionString, positionCss) {
    clearInterval(interval)
    counterBetweenTwoClicks = 0
    setTimeout(function () {
        counterBetweenTwoClicks = value
    }, value)
    interval = setInterval(function () {

        snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
        snakeBodyArr.length = snakeLength + 1

        if (directionString == 'left') { // ne mogu napraviti f-ju koja je prototip za update pozicije snake zato sto znak <= ili >= ne moze se menjati npr parseInt(snake.style.left) <= 0 u parseInt(snake.style.left) >= table.offsetWidth
            if (parseInt(snake.style.left) <= 0) {
                snake.style.left = table.offsetWidth - 20 + 'px';
                (positionCss == 'left') ? left = table.offsetWidth - 20 : top1 = table.offsetWidth - 20 // da bih se odmah pojavila u tabli ne kockicu iza table
            } else {
                updatePosition(directionValue, positionCss)
            }
        }

        if (directionString == 'top') {
            if (parseInt(snake.style.top) <= 0) {
                snake.style.top = table.offsetHeight - 20 + 'px';
                (positionCss == 'left') ? left = table.offsetHeight - 20 : top1 = table.offsetHeight - 20
            } else {
                updatePosition(directionValue, positionCss)
            }
        }

        if (directionString == 'right') {
            if (parseInt(snake.style.left) >= table.offsetWidth - 20) {
                snake.style.left = 0 + 'px';
                (positionCss == 'left') ? left = 0 : top1 = 0
            } else {
                updatePosition(directionValue, positionCss)
            }
        }

        if (directionString == 'bottom') {
            if (parseInt(snake.style.top) >= table.offsetHeight - 20) {
                snake.style.top = 0 + 'px';
                (positionCss == 'left') ? left = 0 : top1 = 0;
            } else {
                updatePosition(directionValue, positionCss)
            }
        }
        createTail()
        biteTail()
    }, value)
}
function Game(e) {

    if (e.keyCode == 37 && rightPressed == false && counterBetweenTwoClicks == value && leftPressed == false) { // LEFT arrow uslov ako se krece desno da ne moze levo nego samo gore i dole,counterBetweenClicks == value je da ako ide desno i pritiskom istovremeno gore i levo ne promeni smer levo

        // leftPressed == false uslov da kada se drzi pritisnuto u jednom trenutku ukopa se u mestu snake jer stalnim clearInterval i davanjem intervala se ukopa 
        moveDirection(-20, 'left', 'left')
        pressedArrow(true, false, false, false)

    } else if (e.keyCode == 38 && bottomPressed == false && counterBetweenTwoClicks == value && topPressed == false) { // TOP arrow
        moveDirection(-20, 'top', 'top')
        pressedArrow(false, true, false, false)

    } else if (e.keyCode == 39 && leftPressed == false && counterBetweenTwoClicks == value && rightPressed == false) { // RIGHT arrow
        moveDirection(20, 'right', 'left')
        pressedArrow(false, false, true, false)

    } else if (e.keyCode == 40 && topPressed == false && counterBetweenTwoClicks == value && bottomPressed == false) { // BOTTOM arrow
        moveDirection(20, 'bottom', 'top')
        pressedArrow(false, false, false, true)
    }

}

function repeatGame() {
    location.reload()
}

window.addEventListener('keydown', Game)


var a = 0
function b(x) {
    x = 20
    console.log(x)
}
b(a)
console.log(a)

var c = 0
function d(x) {
    var n = x
    n = 20
    x = n
}
d(c)
console.log(c)