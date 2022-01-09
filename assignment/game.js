var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var counter = 0;
var bombExplode = 0;
var hit = 0;
var score = 0;
var randomBombPosition = [];
var getBomb;
var stop = 0;
var enemyCollision = 0;
var pointFive = 0;
var levelCheck = 1;



function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

//The code in this function creates the bomb
function bomb(){
	var divBomb = document.createElement('div');
	divBomb.className = 'bomb'; 
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(divBomb);
	return divBomb;
}

//This funnction assigns the class name for player on hitting thr arrow
function playerClass(direction){
	var player = document.getElementById('player');

	if(direction == 'up'){
		if(player.className == 'character stand up' || player.className == 'character stand down' || player.className == 'character stand left' || player.className == 'character stand right'){
			player.className = 'character fire stand up';
		}
		if(player.className == 'character walk up' || player.className == 'character walk down' || player.className == 'character walk left' || player.className == 'character walk right'){
			player.className = 'character fire walk up';
		}
	}
	if(direction == 'left'){
		if(player.className == 'character stand up' || player.className == 'character stand down' || player.className == 'character stand left' || player.className == 'character stand right'){
			player.className = 'character fire stand left';
		}
		if(player.className == 'character walk up' || player.className == 'character walk down' || player.className == 'character walk left' || player.className == 'character walk right'){
			player.className = 'character fire walk left';
		}
	}
	if(direction == 'right'){
		if(player.className == 'character stand up' || player.className == 'character stand down' || player.className == 'character stand left' || player.className == 'character stand right'){
			player.className = 'character fire stand right';
		}
		if(player.className == 'character walk up' || player.className == 'character walk down' || player.className == 'character walk left' || player.className == 'character walk right'){
			player.className = 'character fire walk right';
		}
	}
}


//The code here is to create arrow
function arrowFire(direction){
	playerClass(direction);
	var arrow = document.createElement('div');
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(arrow);
	arrow.className = 'arrow ' + direction;
	return arrow;
}

//The code in this function create an enemy and move it back and forth
function enemyEntry(){
	var body = document.getElementsByTagName('body')[0]; 
	var enemy = document.createElement('div');
	var enemyHead = document.createElement('div');
	var enemyBody = document.createElement('div');
	var player = document.getElementById('player');

	enemy.appendChild(enemyHead);
	enemy.appendChild(enemyBody);
	body.appendChild(enemy);

	var randomEnemyPosition = (Math.ceil(Math.random() * 6)) * 100;

	var randomEnemyTop = Math.ceil(Math.random() * 2);

	enemy.id = 'opponent';
	enemy.className = 'character';

	enemyHead.className = 'head';
	enemyBody.className = 'body';

	var playerPosition = player.offsetLeft;

	var randomHeadBody = Math.floor(Math.random() * 5);

	enemyHead.style.backgroundImage = 'url(images/head' + randomHeadBody + '.png';
	enemyBody.style.backgroundImage = 'url(images/body' + randomHeadBody + '.png';

	if(randomEnemyTop == 1){
		enemy.style.top = '645px';
	}
	else{
		enemy.style.top = '675px';
	}
	
	if(playerPosition < 768){
		enemy.style.left = window.innerWidth - randomEnemyPosition + 'px';
		enemy.className = 'character walk left';

		moving = setInterval(function(){

			var newEnemyPosition = enemy.offsetLeft;
			enemy.style.left = newEnemyPosition - 10 + 'px';

			if(enemyCollision == 0){
				if(player.offsetLeft >= enemy.offsetLeft - 32 && player.offsetLeft <= enemy.offsetLeft + 32 && player.offsetTop >= enemy.offsetTop - 46 && player.offsetTop <= enemy.offsetTop + 46 && hit < 3){
					enemyCollision++;
					hit++;
					afterCollision(hit);
				}
			}

			if(hit == 3){
				var clearEnemy = setTimeout(function(){
					enemy.style.display = 'none';
					stopInterval(levelCheck);
					clearTimeout(clearEnemy);
				}, 500);
			}

			if(enemyCollision > 0){
				var clearCollision = setInterval(function(){
					enemyCollision = 0;
					clearInterval(clearCollision);
				}, 4000);
			}

			if(newEnemyPosition <= 10){
				clearInterval(moving);
			}
		}, 150);
	}
	if(playerPosition >= 768){
		enemy.style.left = randomEnemyPosition + 'px';
		enemy.className = 'character walk right';

		moving = setInterval(function(){

			var newEnemyPosition = enemy.offsetLeft;
			enemy.style.left = newEnemyPosition + 10 + 'px';

			if(enemyCollision == 0){
				if(player.offsetLeft >= enemy.offsetLeft - 32 && player.offsetLeft <= enemy.offsetLeft + 32 && player.offsetTop >= enemy.offsetTop - 46 && player.offsetTop <= enemy.offsetTop + 46 && hit < 3){
					enemyCollision++;
					hit++;
					afterCollision(hit);
				}
			}

			if(hit == 3){
				var clearEnemy = setTimeout(function(){
					enemy.style.display = 'none';
					stopInterval(levelCheck);
					clearTimeout(clearEnemy);
				}, 500);
			}

			if(enemyCollision > 0){
				var clearCollision = setInterval(function(){
					enemyCollision = 0;
					clearInterval(clearCollision);
				}, 4000);
			}

			if(newEnemyPosition >= window.innerWidth - 32){
				clearInterval(moving);
			}
		}, 150);
	}

	enemyForthAndBack = setInterval(function(){
		newPositionEnemy = enemy.offsetLeft;

		if(newPositionEnemy <= 10){

			var movingRight = setInterval(function(){

				enemy.className = 'character walk right';
				enemy.style.left = newPositionEnemy + 10 + 'px';

				if(enemyCollision == 0){
					if(player.offsetLeft >= enemy.offsetLeft - 32 && player.offsetLeft <= enemy.offsetLeft + 32 && player.offsetTop >= enemy.offsetTop - 46 && player.offsetTop <= enemy.offsetTop + 46 && hit < 3){
						enemyCollision++;
						hit++;
						afterCollision(hit);
					}
				}

				if(hit == 3){
					var clearEnemy = setTimeout(function(){
						enemy.style.display = 'none';
						stopInterval(levelCheck);
						clearTimeout(clearEnemy);
					}, 500);
				}

				if(enemyCollision > 0){
					var clearCollision = setInterval(function(){
						enemyCollision = 0;
						clearInterval(clearCollision);
					}, 4000);
				}

				if(newPositionEnemy >= 1520){
					clearInterval(movingRight);
				}
			}, 150);
		}
		if(newPositionEnemy >= 1510){

			var movingLeft = setInterval(function(){

				enemy.className = 'character walk left';
				enemy.style.left = newPositionEnemy - 10 + 'px';

				if(enemyCollision == 0){
					if(player.offsetLeft >= enemy.offsetLeft - 32 && player.offsetLeft <= enemy.offsetLeft + 32 && player.offsetTop >= enemy.offsetTop - 46 && player.offsetTop <= enemy.offsetTop + 46 && hit < 3){
						enemyCollision++;
						hit++;
						afterCollision(hit);
					}
				}

				if(hit == 3){
					var clearEnemy = setTimeout(function(){
						enemy.style.display = 'none';
						stopInterval(levelCheck);
						clearTimeout(clearEnemy);
					}, 500);
				}

				if(enemyCollision > 0){
					var clearCollision = setInterval(function(){
						enemyCollision = 0;
						clearInterval(clearCollision);
					}, 4000);
				}

				if(newPositionEnemy <= 10){
					clearInterval(movingLeft);
				}
			}, 150);
		}
	}, 150);
}

//This function either makes the arrow move upwards or to the right or to the left based on the condition 
function arrowFireUp(event){
	if(event.keyCode === 32 && hit < 3){

		clearInterval(timeout);

		if(pointFive != 0){
			return false;
		}

		pointFive++;

		var pointFiveStart = setTimeout(function(){
			pointFive = 0;
		}, 500);

		var arrow = arrowFire('up');

		arrow.style.width = 30 + 'px';

		var stopPlayer = setTimeout(function(){
			timeout = setInterval(move, 10);
			clearTimeout(stopPlayer);
		},500);

		var body = document.getElementsByTagName('body')[0];

		playerPosition = player.offsetLeft;
		arrow.style.position = 'absolute';
		arrow.style.left = playerPosition + 5 + 'px';
		arrow.style.top = player.offsetTop + 'px';

		var arrowUp = setInterval(function(){

			var arrowPosition = arrow.offsetTop;

			if(arrowPosition <= 0){
				clearInterval(arrowUp);
				arrow.remove();
			} 
			else{
				var newArrowTop = arrowPosition - 10;
				arrow.style.top = newArrowTop + 'px';
			}

			if(arrow.offsetTop <= getBomb.offsetTop + 31 && arrow.offsetTop >= getBomb.offsetTop - 91 && arrow.offsetLeft <= getBomb.offsetLeft + 30 && arrow.offsetLeft >= getBomb.offsetLeft - 29 && getBomb.className == 'bomb'){
				clearInterval(arrowUp);
				getBomb.className = 'explosion';
				arrow.remove();
				score += 2;

				var vanishBomb = setInterval(function(){
					getBomb.style.display = 'none';
					clearInterval(vanishBomb);
				}, 100);

			}

		}, 30);
	}

	var enemy = document.getElementById('opponent');

	if(event.keyCode === 65 && hit < 3){
		
		clearInterval(timeout);

		if(pointFive != 0){
			return false;
		}

		pointFive++;

		var pointFiveStart = setTimeout(function(){
			pointFive = 0;
		}, 500);

		var arrow = arrowFire('left');

		arrow.style.height = 10 + 'px';
		arrow.style.width = 30 + 'px';

		var stopPlayer = setTimeout(function(){
			timeout = setInterval(move, 10);
			clearTimeout(stopPlayer);
		},500);

		var body = document.getElementsByTagName('body')[0];

		playerPosition = player.offsetLeft;
		arrow.style.position = 'absolute';
		arrow.style.left = playerPosition - 20 + 'px';
		arrow.style.top = player.offsetTop + 15 + 'px';

		var arrowLeft = setInterval(function(){

			var arrowPositionLeft = arrow.offsetLeft;

			if(arrowPositionLeft <= 0){
				clearInterval(arrowLeft);
				arrow.remove();
			} 
			else{
				var newArrowLeft = arrowPositionLeft - 10;
				arrow.style.left = newArrowLeft + 'px';
			}

			if(levelCheck > 3){

				if(arrow.offsetTop <= enemy.offsetTop + 31 && arrow.offsetTop >= enemy.offsetTop - 10 && arrow.offsetLeft <= enemy.offsetLeft + 10 && arrow.offsetLeft >= enemy.offsetLeft - 30){
					clearInterval(arrowLeft);

					if(enemy.className == 'character walk left'){
						enemy.className = 'character hit left';
					}
					else{
						enemy.className == 'character hit right';
					}

					arrow.remove();
					score += 2;

					var vanishEnemy = setInterval(function(){
						enemy.style.display = 'none';
						clearInterval(vanishEnemy);
					}, 500);

				}
			}

		}, 30);
	}

	if(event.keyCode === 68 && hit < 3){
		
		clearInterval(timeout);

		if(pointFive != 0){
			return false;
		}

		pointFive++;

		var pointFiveStart = setTimeout(function(){
			pointFive = 0;
		}, 500);

		var arrow = arrowFire('right');

		arrow.style.height = 10 + 'px';
		arrow.style.width = 30 + 'px';

		var stopPlayer = setTimeout(function(){
			timeout = setInterval(move, 10);
			clearTimeout(stopPlayer);
		},500);

		var body = document.getElementsByTagName('body')[0];

		playerPosition = player.offsetLeft;
		arrow.style.position = 'absolute';
		arrow.style.left = playerPosition + 20 + 'px';
		arrow.style.top = player.offsetTop + 15 + 'px';

		var arrowRight = setInterval(function(){

			var arrowPositionLeft = arrow.offsetLeft;

			if(arrowPositionLeft >= window.innerWidth + 10){
				clearInterval(arrowRight);
				arrow.remove();
			} 
			else{
				var newArrowLeft = arrowPositionLeft + 10;
				arrow.style.left = newArrowLeft + 'px';
			}

			if(levelCheck > 3){

				if(arrow.offsetTop <= enemy.offsetTop + 31 && arrow.offsetTop >= enemy.offsetTop - 10 && arrow.offsetLeft <= enemy.offsetLeft + 10 && arrow.offsetLeft >= enemy.offsetLeft - 30){
					clearInterval(arrowRight);

					if(enemy.className == 'character walk left'){
						enemy.className = 'character hit left';
					}
					else{
						enemy.className == 'character hit right';
					}

					arrow.remove();
					score += 2;

					var vanishEnemy = setInterval(function(){
						enemy.style.display = 'none';
						clearInterval(vanishEnemy)
					}, 500);

				}
			}

		}, 30);
	}
}

//The code here displays the current level
function levelDisplay(nextlevel){
	var levelShow = document.createElement('div');
	var levelShowText = document.createTextNode('level' + nextlevel);
	var sky = document.getElementsByClassName('sky')[0];

	levelShow.appendChild(levelShowText);
	sky.appendChild(levelShow);

	levelShow.style.fontSize = '30px';
	levelShow.style.fontWeight = 'bold';
	levelShow.style.textAlign = 'center';

	nextLevel(nextlevel);

	var textRemove = setInterval(function(){

		sky.removeChild(levelShow);
		clearInterval(textRemove);

	}, 5000);
}

//The code in this function is responsible for creating different levels
function nextLevel(nextlevel){
	
	var levelNext = setTimeout(function(){

		if(nextlevel < 4){
			alert('level' + nextlevel);
		}
		if(nextlevel != 8 && nextlevel > 3){
			alert('level' + nextlevel + '. ' + 'Dodge the enemy or you are out. You will have 4s to get away from the enemy after a hit.');
		}
		if(nextlevel == 8){
			alert('level' + nextlevel + '. ' + 'Dodge the enemy or you are out.' + 'Bombs will drop faster from this level onwards.');
		}

		if(nextlevel < 8){
			continueLevel = setInterval(function(){
				var health = document.getElementsByClassName('health')[0];
				health.style.display = 'block'; 
				functionStart(nextlevel);
			}, 1000);
		}
		else{
			continueLevel = setInterval(function(){
				var health = document.getElementsByClassName('health')[0];
				health.style.display = 'block'; 
				functionStart(nextlevel);
			}, 500);
		}

		clearTimeout(levelNext);

	}, 200);
}

//This function reloads the page
function reloadPage(){
	counter = 0;
	location.reload();			// The code in this line was taken (learnt) from a website which is properly referenced at the end of the report.
}								// Reference: https://www.w3schools.com/jsref/met_loc_reload.asp


//The code in this function is to display play again along with a button to restart game
function afterInput(){
	var sky = document.getElementsByClassName('sky')[0];
	var gameOverText = document.createTextNode('Game over');
	var gameOver = document.createElement('div');
	var playAgainText = document.createTextNode('Play Again?');
	var playAgain = document.createElement('div');
	var scoreDisplay = document.createElement('div');
	var scoreText = document.createTextNode("Your score: " + score);

	var divArray = [gameOver, playAgain];
	for(var j = 0; j < divArray.length; j++){
		divArray[j].style.fontSize = '50px';
		divArray[j].style.fontWeight = 'bold';
		divArray[j].style.textAlign = 'center';	
	}

	var button = document.createElement('button');
	var buttonText = document.createTextNode('Yes');

	button.style.width = '50px';
	button.style.height = '30px';
	button.style.fontSize = '20px';
	button.style.marginTop = '10px';

	scoreDisplay.style.marginTop = '20px';
	scoreDisplay.style.fontSize = '25px';

	gameOver.appendChild(gameOverText);
	playAgain.appendChild(playAgainText);
	button.appendChild(buttonText);
	scoreDisplay.appendChild(scoreText);

	var wholeBox = document.createElement('div');

	wholeBox.appendChild(gameOver);
	wholeBox.appendChild(playAgain);
	wholeBox.appendChild(button);
	wholeBox.appendChild(scoreDisplay);

	wholeBox.style.position = 'relative';
	wholeBox.style.top = '20%';
	wholeBox.style.textAlign = 'center';
	sky.appendChild(wholeBox);

	button.addEventListener('click', reloadPage);
}

//This function implements the high scores system
function highScores(name){

	var highscore = JSON.parse(localStorage.getItem('highscore')) || [];	// I learnt to use the code from line 671 to line 684 from a youtube 

	console.log(highscore);													// video. The video is properly referenced at the end of the report.

	var getScore = {														// Reference: https://www.youtube.com/watch?v=DFhmNLKwwGw
		scoreNum : score,
		username : name,
	};

	highscore.push(getScore);
	highscore.sort((a, b) => b.scoreNum - a.scoreNum);
	highscore.splice(5);

	localStorage.setItem('highscore', JSON.stringify(highscore));

	afterInput();

	var sky = document.getElementsByClassName('sky')[0];
	var title = document.createElement('div');
	var titleText = document.createTextNode('Highscores');

	title.appendChild(titleText);

	title.style.fontSize = '30px';
	title.style.position = 'relative';
	title.style.left = '45%';
	title.style.top = '25%';
	title.style.marginTop = '15px';

	var list = document.createElement('ul');

	list.style.fontSize = '20px';
	list.style.float = 'none';
	list.style.position = 'relative';
	list.style.left = '43%';
	list.style.top = '25%';

	list.innerHTML = highscore.map(											// I learnt to use the code from line 708 to line 712 from a youtube
		getScore => {
			return `<li>${getScore.username} - ${getScore.scoreNum}</li>`;	// video. The video is properly referenced at the end of the report.
		}
		).join('');															// Reference: https://www.youtube.com/watch?v=jfOv18lCMmw

	sky.appendChild(title);
	sky.appendChild(list);
}

//The code here displays game over and a text field to take user name after game ends 
function afterGameOver(){
	var sky = document.getElementsByClassName('sky')[0]; 
	var gameOverText = document.createTextNode('Game over');
	var nameText = document.createTextNode('Enter your name');
	var name = document.createElement('div');
	var gameOver = document.createElement('div');
	var takeName = document.createElement('input');

	takeName.type = 'text';	
	takeName.required;

	var button = document.createElement('button');
	var buttonText = document.createTextNode('Save');
	var wholeBox = document.createElement('div');

	gameOver.appendChild(gameOverText);
	name.appendChild(nameText);
	button.appendChild(buttonText);

	wholeBox.appendChild(gameOver);
	wholeBox.appendChild(name);
	wholeBox.appendChild(takeName);
	wholeBox.appendChild(button);

	wholeBox.style.position = 'relative';
	wholeBox.style.top = '35%'; 
	wholeBox.style.textAlign = 'center';

	takeName.style.width = '180px';
	takeName.style.height = '30px';

	button.style.width = '60px';
	button.style.height = '30px';
	button.style.fontSize = '20px';
	button.style.position = 'relative';
	button.style.marginLeft = '5px';

	var divArray = [gameOver, name];
	for(var j = 0; j < divArray.length; j++){
		divArray[j].style.fontSize = '50px';
		divArray[j].style.fontWeight = 'bold';
		divArray[j].style.textAlign = 'center';	
	}

	sky.appendChild(wholeBox);
	button.addEventListener('click', function(){
		sky.removeChild(wholeBox);

		highScores(takeName.value);
	});
}

//This function alerts if a life is lost
function alerting(count){
	alert('You lost a life. ' + (3 - count) + ' left');
}

//The code here performs certain required things after a life is lost
function afterCollision(count){
	var bombExplode = setInterval(function(){
		var hit = parseInt(count);

		var health = document.getElementsByClassName('health')[0];
		health.style.display = 'block';

		var life = document.getElementsByTagName('li');
		var player = document.getElementById('player');

		for(var i = 0; i < hit; i++){
			life[i].style.display = 'none';
		}

		if((hit < 3) && (player.className == 'character stand left' || player.className == 'character walk left')){
			player.className = 'character hit left';	
		}

		if((hit < 3) && (player.className == 'character stand up' || player.className == 'character walk up' || player.className == 'character fire stand up')){
			player.className = 'character hit up';	
		}

		if((hit < 3) && (player.className == 'character stand down' || player.className == 'character walk down')){
			player.className = 'character hit down';	
		}

		if((hit < 3) && (player.className == 'character stand right' || player.className == 'character walk right')){
			player.className = 'character hit right';	
		}

	// clearInterval(timeout);

	alerting(count);

	// if(hit < 3){
	// 	var movePlayer = setTimeout(function(){
	// 		timeout = setInterval(move, 10);
	// 		clearTimeout(movePlayer);
	// 	}, 500);
	// }

	if(hit == 3){
		afterGameOver();
		clearInterval(timeout);
		player.className = 'character dead';
	}

	clearInterval(bombExplode);
}, 80);	
}

//The code in this function is responsible for stopping the counter for the creation of bombs
function stopInterval(level){
	if(level == 1){
		clearInterval(bombFallingDown);
	}

	if(level > 1){
		clearInterval(continueLevel);
	}
}

//This code generates random numbers required in the function where this function is called
function generatingRandoms(maxNum){
	var randomNum = Math.ceil(Math.random() * maxNum);
	return randomNum;
}

//This function is responsible for dropping of bombs, collision detection, and level check
function functionStart(level){

	levelCheck = level;
	
	var player = document.getElementById('player');

	var divBomb = bomb();
	
	if(level < 10){
		var randomBombCheck = true;
		while(randomBombCheck == true){
			var randomBombSelect = (Math.ceil(Math.random() * 50)) * 30;

			var picked = false;

			for(var k = 0; k < randomBombPosition.length; k++){
				if(randomBombSelect == randomBombPosition[k]){
					picked = true;
				}
			}

			if(picked){
				randomBombCheck = true;
			} else{
				randomBombCheck = false;
			}
		}
		randomBombPosition.push(randomBombSelect);
		var randomBomb = randomBombSelect;
	}
	else{
		var randomBomb = Math.ceil(Math.random() * 75) * 20;
	}

	characterPosition = player.offsetLeft;
	divBomb.style.left = randomBomb  + 'px';

	var randomPixels = Math.floor(Math.random() * 14);
	var checkPixels = ((randomPixels * 10) + 600);

	var randomTurn = generatingRandoms(2);

	var randomSpeed = generatingRandoms(8) * 10; 

	var randomSpeedLeft = generatingRandoms(8) + 15;

	var enemy = document.getElementById('opponent');

	var bombDrop = setInterval(
		//The codes in this function explodes the bomb, detects bomb explosion collision with the player and also checks level progression
		function(){ 

			positionBomb = divBomb.offsetTop;
			getBomb = divBomb;

			if(randomTurn == 1){ 
				divBomb.style.top = (positionBomb + randomSpeed) + 'px';

				checkBomb = parseInt(divBomb.style.top);
				checkBombLeft = parseInt(divBomb.style.left);
			} 
			else{
				var positionBombLeft = divBomb.offsetLeft; 
				divBomb.style.top = (positionBomb + randomSpeed) + 'px';

				checkBomb = parseInt(divBomb.style.top);
				checkBombLeft = parseInt(divBomb.style.left);

				if(positionBombLeft < 765 && positionBombLeft > 7){
					divBomb.style.left = (positionBombLeft - randomSpeedLeft) + 'px';
				} 

				if(positionBombLeft > 765 && positionBombLeft < window.innerWidth - 34){
					divBomb.style.left = (positionBombLeft + randomSpeedLeft) + 'px';
				}
			}
			var pixels = parseInt(divBomb.style.top);
			if(pixels >= checkPixels && divBomb.className == 'bomb'){

				divBomb.className = 'explosion';

				clearInterval(bombDrop);

				var playerPosition1 = player.offsetLeft;
				var playerPosition2 = player.offsetTop;

				var bombPosition1 = divBomb.offsetLeft;
				var bombPosition2 = divBomb.offsetTop; 

				if(playerPosition1 >= bombPosition1 - 32 && playerPosition1 <= bombPosition1 + 128 && playerPosition2 >= bombPosition2 - 94 && playerPosition2 <= bombPosition2 + 90){
					if(hit <= 3){
						hit++;
					}
					if(hit == 1){
						afterCollision(1);
					} 
					if(hit == 2){						
						afterCollision(2);						
					}
					if(hit == 3){
						clearInterval(timeout);
						player.className = 'character dead';						

						stopInterval(level);

						afterCollision(3);	

						if(level > 3){
							enemy.remove();
						}

					}
				} else{
					if(hit < 3){
						score++;
					}
				}
				var explosionLost = setInterval(function(){
					if(divBomb.className == 'explosion'){
						divBomb.style.display = 'none';
						clearInterval(explosionLost);
					}
				}, 500)
				
				
			}
			if(getBomb.className == 'explosion'){
				
				if(bombExplode < 5 * level){
					bombExplode++;
					clearInterval(bombDrop);
				}
				
			}
			
			document.addEventListener('keyup', arrowFireUp);

			if(counter == (5 * level)){

				randomBombPosition.splice(0, randomBombPosition.length);	// I learnt to use the code in this line from a wesite which is 
																			// properly referenced at the end of the report
				nextlevel = level + 1;										// Reference: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript?rq=1								
				stopInterval(level);

				if(bombExplode == (5 * level) && hit < 3){
					clearInterval(bombDrop);

					counter = 0;
					bombExplode = 0;

					levelDisplay(nextlevel);
				}

			}

		}, 100);

	if(level > 3){

		if(counter == 0){
			enemyEntry();
		}

	}

	counter++;
}

//This function initiates the game
function pressStart(){
	var box = document.getElementById('selectionBox');
	box.style.display = 'none'; 

	var health = document.getElementsByClassName('health')[0];
	health.style.display = 'block';

	var characterChoice = document.getElementById('characterChoice');
	characterChoice.style.display = 'none';

	var start = document.getElementsByClassName('start')[0];
	start.style.display = 'none';

	var arrowInform = document.createElement('div');
	var arrowInformText = document.createTextNode('Space - arrow fire up , A - arrow fire left , D - arrow fire right');

	arrowInform.appendChild(arrowInformText);

	arrowInform.style.textAlign = 'center';
	arrowInform.style.position = 'relative';
	arrowInform.style.top = '45%';
	arrowInform.style.fontSize = '25px';

	var sky = document.getElementsByClassName('sky')[0];
	sky.appendChild(arrowInform);

	var information = setTimeout(function(){
		arrowInform.style.display = 'none';
	}, 3000);
	
	bombFallingDown = setInterval(function(){
		functionStart(1);
	}, 1000);
}

//The code here selects the respective head and body for the player
function selection(what, change){
	var select = document.createElement('ul');
	select.className = what;
	for(var i = 0; i < 5; i++){
		var li = document.createElement('li');
		li.id = change + i;
		select.appendChild(li);  
	}
	return select;
}

//This functions sets the image for head of the character
function headSet(){
	player.getElementsByClassName('head')[0].style.backgroundImage = 'url(images/' + this.id + '.png)';
}

//This functions sets the image for body of the character
function bodySet(){
	player.getElementsByClassName('body')[0].style.backgroundImage = 'url(images/' + this.id + '.png)';
}

//This code checks which head or body is selected
function bodyHead(head, body){
	var player = document.getElementById('player');

	var getHead = head.getElementsByTagName('li');

	for(var i = 0; i < getHead.length; i++){
		getHead[i].addEventListener('click', headSet);
	}

	var getBody = body.getElementsByTagName('li');

	for(var j = 0; j < getBody.length; j++){
		getBody[j].addEventListener('click', bodySet);
	}
}

//This function is responsible for creating the box for selecting the player's head and body
function addingThings(){
	stop++;

	var box = document.getElementById('selectionBox');
	box.style.display = 'block';
	var health = document.getElementsByClassName('health')[0];
	health.style.display = 'none';

	if(stop == 1){
		var closeBox = document.createElement('div');
		var closeBoxX = document.createTextNode('X');

		closeBox.id = 'closeside';
		closeBox.style.height = '20px';
		closeBox.style.width = '20px';

		closeBox.appendChild(closeBoxX);
		box.appendChild(closeBox);

		var headP = document.createElement('p');
		var selectHead = document.createTextNode('Head');

		headP.appendChild(selectHead);
		headP.style.clear = 'both';

		box.appendChild(headP);

		var heads = selection('heads', 'head');

		box.appendChild(heads);

		var bodyP = document.createElement('p');
		var selectBody = document.createTextNode('Body');

		bodyP.appendChild(selectBody);

		box.appendChild(bodyP);

		var body = selection('bodies', 'body');

		box.appendChild(body);

		bodyHead(heads, body);

		closeBox.addEventListener('click', function(){
			box.style.display = 'none';
			health.style.display = 'block';
		})
	}
}

//This functions creates a button to open the box for player selection 
function clickToAdd(){
	var clickButton = document.createElement('button');

	clickButton.id= 'characterChoice';
	clickButton.style.height = '30px';
	clickButton.style.width = '150px';
	clickButton.style.position = 'absolute';
	clickButton.style.top = '10%';
	clickButton.style.left = '90%';

	var buttonText = document.createTextNode('Choose character');
	clickButton.appendChild(buttonText);

	var body = document.getElementsByTagName('body')[0];
	body.appendChild(clickButton);

	var box = document.createElement('aside');
	box.id = 'selectionBox';
	box.style.display = 'none';
	body.appendChild(box);

	clickButton.addEventListener('click', addingThings);

	startGame();
}

//The code here checks what happens when the start button is clicked
function startGame(){
	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', pressStart); 
}

function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	clickToAdd();
}

document.addEventListener('DOMContentLoaded', myLoadFunction);