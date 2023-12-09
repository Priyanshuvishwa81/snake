let snake = document.getElementById("snakeHead");
let food = document.getElementById("food");
let score = document.getElementById("score");
let x = 1;
let y = 2;
let speed = 100;
let myscore = 0;
let colourBody = 0;
snake.style.gridRowStart = x;
snake.style.gridColumnStart = y;
let interval, randomX, randomY;
let nextBoxX, nextBoxY;
let game_event = true;
let face_Direction = "right";
snake.style.transform = "rotate(0deg)";

let keykey = true;

// console.log(direction.x);
let connect = [[]];


let randomFood = () => {
    randomX = Math.floor(Math.random() * (21 - 1) + 1);
    randomY = Math.floor(Math.random() * (21 - 1) + 1);


    food.style.gridRowStart = randomX;
    food.style.gridColumnStart = randomY;
}
randomFood();



let eating_food = () => {
    if (randomX == x && randomY == y) {
        randomFood();
        for (let i = 0; i < connect.length; i++) {
            if (connect[i][0] == randomX && connect[i][1] == randomY) {
                randomFood();
            }
        }
        console.table(connect)
        connect.push([]);
        increaseSpeed();
        myscore = myscore + 1;
        score.innerText = myscore;
        let newDiv = document.createElement("div");
        newDiv.id = "snakeTail" + myscore;
        newDiv.className = "snakeTail";
        let parentElement = document.getElementById("box_container");
        parentElement.appendChild(newDiv);
        let snakeTail = document.getElementById("snakeTail" + myscore);
        snakeTail.style.backgroundColor = " rgb(" + colourBody + ", " + colourBody + ", " + colourBody + ")"
        colourBody = colourBody + 2;
    }
}
let grow = () => {

    for (let i = 1; i < connect.length; i++) {
        let snakeTail = document.getElementById("snakeTail" + i);
        snakeTail.style.gridRowStart = connect[i][0];
        snakeTail.style.gridColumnStart = connect[i][1];
    }

}


let attached = () => {
    for (let index = connect.length - 1; index > 0; index--) {
        connect[index][0] = connect[index - 1][0];
        connect[index][1] = connect[index - 1][1];
    }
}





let keyPressed = (key) => {

    value = key;
    interval = setInterval(() => {
        attached();

        for (let i = 0; i < connect.length; i++) {
            if (x == connect[i][0] && y == connect[i][1]) {
                endGame();
            }
        }


        if (x > 20 || y > 20 || x <= 0 || y <= 0) {
            endGame();
        }


        if (value == "top") {
            connect[0][0] = x--;
            connect[0][1] = y;

        } else if (value == "bottom") {

            connect[0][0] = x++;
            connect[0][1] = y;
        }
        else if (value == "left") {

            connect[0][0] = x;
            connect[0][1] = y--;
        }
        else if (value == "right") {

            connect[0][0] = x;
            connect[0][1] = y++;
        }

        snake.style.gridRowStart = connect[0][0];
        snake.style.gridColumnStart = connect[0][1];

        eating_food();
        grow();



    }, speed);




}
let increaseSpeed = () => {
    speed = speed - 1;
}

let direction_snake = (event,code) => {

    // alert(code)

    if (game_event) {

        clearInterval(interval);
        let Mykey;

        if (code == 0) {
            Mykey = event.keyCode;
        } else {
            Mykey = code;
        }

        // alert(event.keyCode);
        switch (Mykey) {
            case 37:
                if (face_Direction == "right") {
                    snake.style.transform = "rotate(0deg)";
                    keyPressed("right");
                }
                else {
                    snake.style.transform = "rotate(180deg)";
                    face_Direction = "left"
                    keyPressed("left");
                }
                break;

            case 38:
                if (face_Direction == "bottom") {
                    snake.style.transform = "rotate(90deg)";
                    keyPressed("bottom");
                }
                else {
                    snake.style.transform = "rotate(270deg)";
                    face_Direction = "top"
                    keyPressed("top");
                }


                break;
            case 39:
                if (face_Direction == "left") {
                    snake.style.transform = "rotate(180deg)";
                    keyPressed("left");
                }
                else {
                    snake.style.transform = "rotate(0deg)";
                    face_Direction = "right"
                    keyPressed("right");
                }


                break;
            case 40:
                if (face_Direction == "top") {
                    snake.style.transform = "rotate(270deg)";
                    keyPressed("top");
                } else {
                    snake.style.transform = "rotate(90deg)";
                    face_Direction = "bottom"
                    keyPressed("bottom");
                }
                break;

            default:
                keyPressed(face_Direction);
                break;
        }
    }

}

let endGame = () => {
    clearInterval(interval);
    game_event = false;
    let res = window.confirm("restart game");
    if (res) {

        for (let i = 1; i < connect.length; i++) {
            let snakeTail = document.getElementById("snakeTail" + i);
            snakeTail.parentNode.removeChild(snakeTail);
        }

        x = 1;
        y = 2;
        game_event = true;
        myscore = 0;
        speed = 100;
        connect = [[]];
        colourBody = 0;
        face_Direction = "right";

        snake.style.transform = "rotate(0deg)";
        score.innerText = myscore;
        keyPressed("right");


    }
}