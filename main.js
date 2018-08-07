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
    splicedWidth = [],
    splicedHeight = [],
    snakeBodyArr = [],
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
                body.style.backgroundColor = 'rgba(195, 222, 231, 0.89)'            }
        })
    })(i)
}

function Game(e) {

    if (e.keyCode == 37 && rightPressed == false && counterBetweenTwoClicks == value) { // LEFT arrow uslov ako se krece desno da ne moze levo nego samo gore i dole
        if (leftPressed == false) { // uslov da kada se drzi pritisnuto u jednom trenutku ukopa se u mestu snake jer stalnim clearInterval i davanjem intervala se ukopa 
            clearInterval(interval)
            counterBetweenTwoClicks = 0
            setTimeout(() => {
                counterBetweenTwoClicks = value
            }, value)
            interval = setInterval(() => {
                snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
                snakeBodyArr.length = snakeLength + 1

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
                    div = document.createElement('div')
                    div.setAttribute('class', 'snake')
                    snake.after(div)
                    div.style.left = snakeBodyArr[snakeLength].left + 'px'
                    div.style.top = snakeBodyArr[snakeLength].top + 'px'
                    snakeLength++
                    score.textContent = 'Your score is: ' + snakeLength
                    for (i = 0; i < snakeBody.length; i++) {
                        for (j = 0; j < arrOfWidth.length; j++) {
                            if (parseInt(snakeBody[i].style.left) == arrOfWidth[j]) {
                                splicedWidth.push(arrOfWidth[j])
                                arrOfWidth.splice(j, 1)
                                j--
                            }
                        }
                        for (j = 0; j < arrOfHeight.length; j++) {
                            if (parseInt(snakeBody[i].style.top) == arrOfHeight[j]) {
                                splicedHeight.push(arrOfHeight[j])
                                arrOfHeight.splice(j, 1)
                                j--
                            }
                        }
                    }

                    food.style.left = arrOfWidth[Math.floor(Math.random() * (arrOfWidth.length - 1))] + 'px'
                    food.style.top = arrOfHeight[Math.floor(Math.random() * (arrOfHeight.length - 1))] + 'px'

                    for (i = 0; i < splicedWidth.length; i++) {
                        arrOfWidth.push(splicedWidth[i])
                        splicedWidth.shift()
                        i--
                    }
                    for (i = 0; i < splicedHeight.length; i++) {
                        arrOfHeight.push(splicedHeight[i])
                        splicedHeight.shift()
                        i--
                    }

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
            }, value)
        }
        leftPressed = true
        topPressed = false
        bottomPressed = false
        rightPressed = false
    } else if (e.keyCode == 38 && bottomPressed == false && counterBetweenTwoClicks == value) { // TOP arrow

        if (topPressed == false) {
            clearInterval(interval)
            counterBetweenTwoClicks = 0
            setTimeout(() => {
                counterBetweenTwoClicks = value
            }, value)
            interval = setInterval(() => {
                snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
                snakeBodyArr.length = snakeLength + 1
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
                    div = document.createElement('div')
                    div.setAttribute('class', 'snake')
                    snake.after(div)
                    div.style.left = snakeBodyArr[snakeLength].left + 'px'
                    div.style.top = snakeBodyArr[snakeLength].top + 'px'
                    snakeLength++
                    score.textContent = 'Your score is: ' + snakeLength
                    for (i = 0; i < snakeBody.length; i++) {
                        for (j = 0; j < arrOfWidth.length; j++) {
                            if (parseInt(snakeBody[i].style.left) == arrOfWidth[j]) {
                                splicedWidth.push(arrOfWidth[j])
                                arrOfWidth.splice(j, 1)
                                j--
                            }
                        }
                        for (j = 0; j < arrOfHeight.length; j++) {
                            if (parseInt(snakeBody[i].style.top) == arrOfHeight[j]) {
                                splicedHeight.push(arrOfHeight[j])
                                arrOfHeight.splice(j, 1)
                                j--
                            }
                        }
                    }

                    food.style.left = arrOfWidth[Math.floor(Math.random() * (arrOfWidth.length - 1))] + 'px'
                    food.style.top = arrOfHeight[Math.floor(Math.random() * (arrOfHeight.length - 1))] + 'px'

                    for (i = 0; i < splicedWidth.length; i++) {
                        arrOfWidth.push(splicedWidth[i])
                        splicedWidth.shift()
                        i--
                    }
                    for (i = 0; i < splicedHeight.length; i++) {
                        arrOfHeight.push(splicedHeight[i])
                        splicedHeight.shift()
                        i--
                    }

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
            }, value)
        }
        leftPressed = false
        topPressed = true
        bottomPressed = false
        rightPressed = false
    } else if (e.keyCode == 39 && leftPressed == false && counterBetweenTwoClicks == value) { // RIGHT arrow
        if (rightPressed == false) {
            clearInterval(interval)
            counterBetweenTwoClicks = 0
            setTimeout(() => {
                counterBetweenTwoClicks = value
            }, value)
            interval = setInterval(() => {
                snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
                snakeBodyArr.length = snakeLength + 1
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
                    div = document.createElement('div')
                    div.setAttribute('class', 'snake')
                    snake.after(div)
                    div.style.left = snakeBodyArr[snakeLength].left + 'px'
                    div.style.top = snakeBodyArr[snakeLength].top + 'px'
                    snakeLength++
                    score.textContent = 'Your score is: ' + snakeLength
                    for (i = 0; i < snakeBody.length; i++) {
                        for (j = 0; j < arrOfWidth.length; j++) {
                            if (parseInt(snakeBody[i].style.left) == arrOfWidth[j]) {
                                splicedWidth.push(arrOfWidth[j])
                                arrOfWidth.splice(j, 1)
                                j--
                            }
                        }
                        for (j = 0; j < arrOfHeight.length; j++) {
                            if (parseInt(snakeBody[i].style.top) == arrOfHeight[j]) {
                                splicedHeight.push(arrOfHeight[j])
                                arrOfHeight.splice(j, 1)
                                j--
                            }
                        }
                    }

                    food.style.left = arrOfWidth[Math.floor(Math.random() * (arrOfWidth.length - 1))] + 'px'
                    food.style.top = arrOfHeight[Math.floor(Math.random() * (arrOfHeight.length - 1))] + 'px'

                    for (i = 0; i < splicedWidth.length; i++) {
                        arrOfWidth.push(splicedWidth[i])
                        splicedWidth.shift()
                        i--
                    }
                    for (i = 0; i < splicedHeight.length; i++) {
                        arrOfHeight.push(splicedHeight[i])
                        splicedHeight.shift()
                        i--
                    }

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
            }, value)
        }
        leftPressed = false
        topPressed = false
        bottomPressed = false
        rightPressed = true

    } else if (e.keyCode == 40 && topPressed == false && counterBetweenTwoClicks == value) { // BOTTOM arrow
        if (bottomPressed == false) {
            clearInterval(interval)
            counterBetweenTwoClicks = 0
            setTimeout(() => {
                counterBetweenTwoClicks = value
            }, value)
            interval = setInterval(() => {
                snakeBodyArr.unshift({ left: parseInt(snake.style.left), top: parseInt(snake.style.top) })
                snakeBodyArr.length = snakeLength + 1
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
                    div = document.createElement('div')
                    div.setAttribute('class', 'snake')
                    snake.after(div)
                    div.style.left = snakeBodyArr[snakeLength].left + 'px'
                    div.style.top = snakeBodyArr[snakeLength].top + 'px'
                    snakeLength++
                    score.textContent = 'Your score is: ' + snakeLength
                    for (i = 0; i < snakeBody.length; i++) {
                        for (j = 0; j < arrOfWidth.length; j++) {
                            if (parseInt(snakeBody[i].style.left) == arrOfWidth[j]) {
                                splicedWidth.push(arrOfWidth[j])
                                arrOfWidth.splice(j, 1)
                                j--
                            }
                        }
                        for (j = 0; j < arrOfHeight.length; j++) {
                            if (parseInt(snakeBody[i].style.top) == arrOfHeight[j]) {
                                splicedHeight.push(arrOfHeight[j])
                                arrOfHeight.splice(j, 1)
                                j--
                            }
                        }
                    }

                    food.style.left = arrOfWidth[Math.floor(Math.random() * (arrOfWidth.length - 1))] + 'px'
                    food.style.top = arrOfHeight[Math.floor(Math.random() * (arrOfHeight.length - 1))] + 'px'

                    for (i = 0; i < splicedWidth.length; i++) {
                        arrOfWidth.push(splicedWidth[i])
                        splicedWidth.shift()
                        i--
                    }
                    for (i = 0; i < splicedHeight.length; i++) {
                        arrOfHeight.push(splicedHeight[i])
                        splicedHeight.shift()
                        i--
                    }

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
            }, value)
        }
        leftPressed = false
        topPressed = false
        bottomPressed = true
        rightPressed = false
    }

}

function repeatGame() {
    // setTimeout(() => { 
    //     snakeBody = document.getElementsByClassName('snake')  // NE BRISE  SVE OBJEKTE NEGO POLOVINU!!! NIKO MI NIJE JASNO (Resenje je u splice-u)
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
    //         counterBetweenTwoClicks = value
    //     wrapper.style.display = 'none'
    //     wrapper.style.animation = ''
    //     snake.style.backgroundColor = 'yellow'

    //     i = 0
    // }, 30)
    location.reload()
}

window.addEventListener('keydown', Game)

// setInterval(() => { // brise na 10s niz napunjen pozicijama
//     snakeBodyArr.splice(snakeLength + 1, snakeBodyArr.length - snakeLength)
//     setTimeout(() => {
//         console.log(snakeBodyArr)
//     }, 1)
// }, 10000)
