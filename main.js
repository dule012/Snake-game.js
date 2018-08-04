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
    arrOfWidth = [],
    arrOfHeight = [],
    snakeBodyArr = [],
    i = 0,
    j = 0,
    div,
    snakeLength = 0,
    intervaTwoClicks,
    counterBetweenTwoClicks = 41
for (i = 0, j = 0; i < 59; i++) {
    if (i % 2 == 0) {
        arrOfWidth[j] = i * 10
        j++
    }
}
for (i = 0, j = 0; i < 29; i++) {
    if (i % 2 == 0) {
        arrOfHeight[j] = i * 10
        j++
    }
}
food.style.left = arrOfWidth[Math.floor(Math.random() * 30)] + 'px'
food.style.top = arrOfHeight[Math.floor(Math.random() * 15)] + 'px'
snake.style.top = top1 + 'px'
snake.style.left = left + 'px'

function Game(e) {

    if (e.keyCode == 37 && rightPressed == false && counterBetweenTwoClicks == 41) { // LEFT arrow uslov ako se krece desno da ne moze levo nego samo gore i dole
        if (leftPressed == false) { // uslov da kada se drzi pritisnuto u jednom trenutku ukopa se u mestu snake jer stalnim clearInterval i davanjem intervala se ukopa 
            clearInterval(interval)
            counterBetweenTwoClicks = 0
            setTimeout(() => {
                counterBetweenTwoClicks = 41
            }, 41)
            interval = setInterval(() => {
                snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
                if (parseInt(snake.style.left) <= 0) {
                    snake.style.left = table.offsetWidth - 20 + 'px'
                    left = table.offsetWidth - 20 // da bih se odmah pojavila u polju ne kockicu ispred polja
                } else {
                    left -= 20
                    snake.style.left = left + 'px'
                    for (i = 0, j = 1; i < snakeLength; i++ , j++) {
                        snakeBody[j].style.left = snakeBodyArr[i].left + 'px'
                        snakeBody[j].style.top = snakeBodyArr[i].top + 'px'
                    }
                }
                if (parseInt(snake.style.left) == parseInt(food.style.left) && parseInt(snake.style.top) == parseInt(food.style.top)) {
                    food.style.left = arrOfWidth[Math.floor(Math.random() * 30)] + 'px'
                    food.style.top = arrOfHeight[Math.floor(Math.random() * 15)] + 'px'
                    div = document.createElement('div')
                    div.setAttribute('class', 'snake')
                    snake.after(div)
                    div.style.left = snakeBodyArr[snakeLength].left + 'px'
                    div.style.top = snakeBodyArr[snakeLength].top + 'px'
                    snakeLength++
                    score.textContent = 'Your score is: ' + snakeLength
                }
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
            }, 40)
        }
        leftPressed = true
        topPressed = false
        bottomPressed = false
        rightPressed = false
    } else if (e.keyCode == 38 && bottomPressed == false && counterBetweenTwoClicks == 41) { // TOP arrow

        if (topPressed == false) {
            clearInterval(interval)
            counterBetweenTwoClicks = 0
            setTimeout(() => {
                counterBetweenTwoClicks = 41
            }, 41)
            interval = setInterval(() => {
                snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
                if (parseInt(snake.style.top) <= 0) {
                    snake.style.top = table.offsetHeight - 20 + 'px'
                    top1 = table.offsetHeight - 20
                } else {
                    top1 -= 20
                    snake.style.top = top1 + 'px'
                    for (i = 0, j = 1; i < snakeLength; i++ , j++) {
                        snakeBody[j].style.left = snakeBodyArr[i].left + 'px'
                        snakeBody[j].style.top = snakeBodyArr[i].top + 'px'
                    }
                }
                if (parseInt(snake.style.left) == parseInt(food.style.left) && parseInt(snake.style.top) == parseInt(food.style.top)) {
                    food.style.left = arrOfWidth[Math.floor(Math.random() * 30)] + 'px'
                    food.style.top = arrOfHeight[Math.floor(Math.random() * 15)] + 'px'
                    div = document.createElement('div')
                    div.setAttribute('class', 'snake')
                    snake.after(div)
                    div.style.left = snakeBodyArr[snakeLength].left + 'px'
                    div.style.top = snakeBodyArr[snakeLength].top + 'px'
                    snakeLength++
                    score.textContent = 'Your score is: ' + snakeLength
                }
                for (i = 1; i < snakeBody.length; i++) {
                    if (snake.style.left == snakeBody[i].style.left && snake.style.top == snakeBody[i].style.top) {
                        snake.style.backgroundColor = 'green'
                        snake.style.zIndex = 10
                        congratulations.textContent = `Congratulations!  Score is ${snakeLength}`
                        wrapper.style.display = 'block'
                        newGame.addEventListener('click', repeatGame)
                        clearInterval(interval)
                        window.removeEventListener('keydown', Game)
                    }
                }
            }, 40)
        }
        leftPressed = false
        topPressed = true
        bottomPressed = false
        rightPressed = false
    } else if (e.keyCode == 39 && leftPressed == false && counterBetweenTwoClicks == 41) { // RIGHT arrow
        if (rightPressed == false) {
            clearInterval(interval)
            counterBetweenTwoClicks = 0
            setTimeout(() => {
                counterBetweenTwoClicks = 41
            }, 41)
            interval = setInterval(() => {
                snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
                if (parseInt(snake.style.left) + 20 >= table.offsetWidth) {
                    snake.style.left = 0 + 'px'
                    left = 0
                } else {
                    left += 20
                    snake.style.left = left + 'px'
                    for (i = 0, j = 1; i < snakeLength; i++ , j++) {
                        snakeBody[j].style.left = snakeBodyArr[i].left + 'px'
                        snakeBody[j].style.top = snakeBodyArr[i].top + 'px'
                    }
                }
                if (parseInt(snake.style.left) == parseInt(food.style.left) && parseInt(snake.style.top) == parseInt(food.style.top)) {
                    food.style.left = arrOfWidth[Math.floor(Math.random() * 30)] + 'px'
                    food.style.top = arrOfHeight[Math.floor(Math.random() * 15)] + 'px'
                    div = document.createElement('div')
                    div.setAttribute('class', 'snake')
                    snake.after(div)
                    div.style.left = snakeBodyArr[snakeLength].left + 'px'
                    div.style.top = snakeBodyArr[snakeLength].top + 'px'
                    snakeLength++
                    score.textContent = 'Your score is: ' + snakeLength
                }
                for (i = 1; i < snakeBody.length; i++) {
                    if (snake.style.left == snakeBody[i].style.left && snake.style.top == snakeBody[i].style.top) {
                        snake.style.backgroundColor = 'green'
                        snake.style.zIndex = 10
                        congratulations.textContent = `Congratulations!  Score is ${snakeLength}`
                        wrapper.style.display = 'block'
                        newGame.addEventListener('click', repeatGame)
                        clearInterval(interval)
                        window.removeEventListener('keydown', Game)
                    }
                }
            }, 40)
        }
        leftPressed = false
        topPressed = false
        bottomPressed = false
        rightPressed = true

    } else if (e.keyCode == 40 && topPressed == false && counterBetweenTwoClicks == 41) { // BOTTOM arrow
        if (bottomPressed == false) {
            clearInterval(interval)
            counterBetweenTwoClicks = 0
            setTimeout(() => {
                counterBetweenTwoClicks = 41
            }, 41)
            interval = setInterval(() => {
                snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
                if (parseInt(snake.style.top) + 20 >= table.offsetHeight) {
                    snake.style.top = 0 + 'px'
                    top1 = 0
                } else {
                    top1 += 20
                    snake.style.top = top1 + 'px'
                    for (i = 0, j = 1; i < snakeLength; i++ , j++) {
                        snakeBody[j].style.left = snakeBodyArr[i].left + 'px'
                        snakeBody[j].style.top = snakeBodyArr[i].top + 'px'
                    }
                }
                if (parseInt(snake.style.left) == parseInt(food.style.left) && parseInt(snake.style.top) == parseInt(food.style.top)) {
                    food.style.left = arrOfWidth[Math.floor(Math.random() * 30)] + 'px'
                    food.style.top = arrOfHeight[Math.floor(Math.random() * 15)] + 'px'
                    div = document.createElement('div')
                    div.setAttribute('class', 'snake')
                    snake.after(div)
                    div.style.left = snakeBodyArr[snakeLength].left + 'px'
                    div.style.top = snakeBodyArr[snakeLength].top + 'px'
                    snakeLength++
                    score.textContent = 'Your score is: ' + snakeLength
                }
                for (i = 1; i < snakeBody.length; i++) {
                    if (snake.style.left == snakeBody[i].style.left && snake.style.top == snakeBody[i].style.top) {
                        snake.style.backgroundColor = 'green'
                        snake.style.zIndex = 10
                        congratulations.textContent = `Congratulations!  Score is ${snakeLength}`
                        wrapper.style.display = 'block'
                        newGame.addEventListener('click', repeatGame)
                        clearInterval(interval)
                        window.removeEventListener('keydown', Game)
                    }
                }
            }, 40)
        }
        leftPressed = false
        topPressed = false
        bottomPressed = true
        rightPressed = false
    }

}

function repeatGame() {
    // setTimeout(() => { 
    //     snakeBody = document.getElementsByClassName('snake')  // NE BRISE  SVE OBJEKTE NEGO POLOVINU!!! NIKO MI NIJE JASNO
    //     console.log(snakeBody.length)
    //     for (i = 1; i < snakeBody.length; i++) {
    //         table.removeChild(snakeBody[i])
    //     }
    //     console.log(snakeBody.length)
    //     window.addEventListener('keydown', Game)
    //     top1 = 0,
    //         left = 0,
    //         interval,
    //         topPressed = false,
    //         leftPressed = false,
    //         rightPressed = false,
    //         bottomPressed = false,
    //         arrOfWidth = [],
    //         arrOfHeight = [],
    //         snakeBodyArr = [],
    //         i = 0,
    //         j = 0,
    //         div,
    //         snakeLength = 0,
    //         intervaTwoClicks,
    //         counterBetweenTwoClicks = 41
    //     wrapper.style.display = 'none'
    //     wrapper.style.animation = ''
    //     snake.style.backgroundColor = 'yellow'

    //     i = 0
    // }, 30)
    location.reload()
}

window.addEventListener('keydown', Game)

setInterval(() => { // brise na 10s niz napunjen pozicijama
    snakeBodyArr.splice(snakeLength, snakeBodyArr.length - snakeLength)
}, 10000)
