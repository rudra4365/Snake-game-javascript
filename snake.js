const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//Create a unit for game
const box = 32;

//Load images
const ground = new Image();
ground.src = "img/ground1.png";

const food_img = new Image();
food_img.src = "img/food3.png";

//Loading audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";

//Create the snake
let snake =  [];
snake[0] = 
{
	x : 9*box,
	y : 10*box
};

//Create food
let food = 
{
	x : Math.floor(Math.random()*17+1)*box,
	y : Math.floor(Math.random()*15+3)*box
}

let score = 0;


//Control snake
let d;
document.addEventListener("keydown", direction);

function direction(event)
{
	let key = event.keyCode;
	if(key == 37 && d != "RIGHT")
	{
		left.play();
		d = "LEFT";
	}
	else if(key == 38 && d != "DOWN")
	{
		up.play();
		d = "UP";
	}
	else if(key == 39 && d != "LEFT")
	{
		right.play();
		d = "RIGHT";
	}
	else if(key == 40 && d != "UP")
	{
		down.play();
		d = "DOWN";
	}
}

//Checking collision
function collision(head, array)
{
	for(let i = 0; i < array.length; i++)
	{
		if(head.x == array[i].x && head.y == array[i].y)
		{
			return true;
		}
	}
	return false;
}

//Draw to canvas
function draw()
{
	ctx.drawImage(ground, 0, 0);
	for(let i = 0; i < snake.length; i++)
	{
		ctx.fillStyle = (i == 0) ? "green" : "black";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}
	ctx.drawImage(food_img, food.x, food.y);

	//Old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	//direction ???
	if(d == "LEFT") snakeX -= box;
	if(d == "RIGHT") snakeX += box;
	if(d == "UP") snakeY -= box;
	if(d == "DOWN") snakeY += box;

	//snake eating the food
	if(snakeX == food.x && snakeY == food.y)
	{
		eat.play();
		score++;
		food = 
		{
			x : Math.floor(Math.random()*17+1)*box,
			y : Math.floor(Math.random()*15+3)*box 
		}
	}
	else
	{
		snake.pop();
	}

	//Adding new head
	let newHead = 
	{
		x : snakeX,
		y : snakeY
	}


	//game up
	if(collision(newHead, snake) || snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box)
	{
		clearInterval(game);
		dead.play();
	}

	
	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 1.6*box);
}

//calling draw function every 100ms
let game = setInterval(draw, 100);


