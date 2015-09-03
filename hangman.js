$(document).ready(init);

function init(){

  $('.lettergetter').focus();
  var solution = initializeSolution();
  var $display = initializeDisplay(solution);
  var lettersTried = "";
  var wrongCount = 0;
  $('.lettergetter').on('keydown', eventHandler);

  // console.log('display', display, '$display', $display)


  function initializeSolution(){
        var solutionsBank = ["apple", "banana", "orange", "watermelon", "pear", "peach", "cherry", "grape", "tomato", "cantelope",
      "toyota", "jeep", "lexus", "prius", "ford", "pontiac", "lamborghini", "chrysler", "dodge", "honda",
     "usa", "brazil", "japan", "mexico", "ireland", "england", "australia", "china", "canada", "russia",
    "washington", "lincoln", "kennedy", "clinton", "roosevelt", "hoover", "wilson", "obama", "eisenhower", "fillmore",
    "mozart", "beethoven", "brahms", "bach", "tchaikovsky", "chopin", "handel", "schubert", "wagner", "debussy",
    "cinderella", "gladiator", "twilight", "inception", "tangled", "frozen", "hancock", "dracula", "frankenstein", "titanic",
    "celery", "broccoli", "carrots", "cucumber", "eggplant", "kale", "lettuce", "okra", "potatoes", "mushrooms",
    "chess", "checkers", "monopoly", "scrabble", "risk", "clue", "sorry", "backgammon", "candyland", "trouble",
    "sushi", "soba", "ramen", "gyudon", "tebasaki", "somen", "rice", "sashimi", "yakiniku", "umeboshi",
    "beer", "wine", "sake", "whiskey", "vodka", "cocktail", "shots", "martini", "scotch", "rum"];
        var ranInt = getRandomIntInclusive(0, solutionsBank.length-1)

        var hint = "";
        if (ranInt < 10) {
          hint = "FRUIT";
        } else if (ranInt < 20) {
          hint = "CARS";
        } else if (ranInt < 30) {
          hint = "COUNTRIES";
        } else if (ranInt < 40) {
          hint = "US PRESIDENTS";
        } else if (ranInt < 50) {
          hint = "FAMOUS COMPOSERS"
        } else if (ranInt < 60) {
          hint = "ONE WORD MOVIE TITLES"
        } else if (ranInt < 70) {
          hint = "VEGETABLES"
        } else if (ranInt < 80) {
          hint = "BOARD GAMES"
        } else if (ranInt < 90) {
          hint = "JAPANESE FOOD"
        } else {
          hint = "ALCOHOL"
        }

        $('.hint').text(hint);
        var solution = solutionsBank[ranInt];
        return solution
  }

  function initializeDisplay(solution){
      var display = [];
      var $display = $('.solution')

        for (var i = 0; i < solution.length; i++){
          display[i] = "_";
        }
      $display.text(display.join(" "));
      return $display;
  }

  function eventHandler(event){
      console.log($display.text())
      if (event.which == 13){
          if (($(this).val().length > 1) || ((/[a-z, A-Z]/).test($(this).val()) == false)) {
              alert("Please enter one letter")
              clearInput(this);
          } else {
              var newLetter = $(this).val().toLowerCase();

              clearInput(this);


              checkLetter(newLetter);

            }
        }
    }

        function checkLetter(newLetter){
          if (checkTriedLetters(newLetter) == true || lettersTried == "") {
              addToLettersTried(newLetter);
              letterChecker(newLetter);
          }
        }

        function checkTriedLetters(newLetter){
            for (var i = 0; i < lettersTried.split(" ").length; i++) {
                if (lettersTried.split(" ")[i] == newLetter) {
                    alert("You tried that letter already!");
                    return false;
                }
            } return true;
        }

        function addToLettersTried(newLetter){
          lettersTried = lettersTried + " " + newLetter;
          $('.lettersTried').text(lettersTried);
        }

          function letterChecker(newLetter) {
              display = $display.text().split(" ");
              console.log('letter checker display', display);
              var tempDisp = [];


              for (var i = 0; i < solution.length; i++){
                  if (display[i] == solution[i]){
                      tempDisp[i] = display[i];
                      console.log('check 1', tempDisp);
                  } else if (newLetter == solution[i]){
                      tempDisp[i] = newLetter;
                      console.log('check 2', tempDisp);
                  } else {
                      tempDisp[i] = "_";
                      console.log('check 3', tempDisp);
                  }
              }

              tempDisp = tempDisp.join(" ");
              display = display.join(" ");
              var theSolution = solution.split("").join(" ");
              winLoseCheck(tempDisp, display, theSolution);
          };

                  function winLoseCheck(tempDisp, display, theSolution){
                    // console.log('temp', tempDisp, 'disp', display, 'solution', solution);

                    if (tempDisp == display){
                      wrongCount += 1;
                      if (wrongCount < 10){
                        drawDude();
                      } else {
                        drawDude();
                        failFinalAnimation();
                      }
                    } else {
                    display = tempDisp;
                    $display.text(display);
                    console.log('final display', display)
                      if (display == theSolution){
                        successFinalAnimation();
                      }
                    }
                  }


// drawing the hangman
function drawDude(){
  var canvas = document.getElementById('hangdude');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    var base = new Path2D();
    base.moveTo(10, 270);
    base.lineTo(200, 270);
    // ctx.stroke(base);

    var vPole = new Path2D();
    vPole.moveTo(30, 270);
    vPole.lineTo(30, 30);
    // ctx.stroke(vPole);

    var hPole = new Path2D();
    hPole.moveTo(30, 30);
    hPole.lineTo(150, 30);
    // ctx.stroke(hPole);

    var noose = new Path2D();
    noose.moveTo(130, 30);
    noose.lineTo(130, 80);
    // ctx.stroke(noose);

    var head = new Path2D();
    head.arc(130, 100, 20, 0, (2*Math.PI));
    // ctx.stroke(head);

    var body = new Path2D();
    body.moveTo(130, 120);
    body.lineTo(130, 190);
    // ctx.stroke(body);

    var leftArm = new Path2D();
    leftArm.moveTo(130, 140);
    leftArm.lineTo(100, 130);
    // ctx.stroke(leftArm);

    var rightArm = new Path2D();
    rightArm.moveTo(130, 140);
    rightArm.lineTo(160, 130);
    // ctx.stroke(rightArm);

    var leftLeg = new Path2D();
    leftLeg.moveTo(130, 190);
    leftLeg.lineTo(110, 220);
    // ctx.stroke(leftLeg);

    var rightLeg = new Path2D();
    rightLeg.moveTo(130, 190);
    rightLeg.lineTo(150, 220);
    // ctx.stroke(rightLeg);

    var parts = [base, vPole, hPole, noose, head, body, leftArm, rightArm, leftLeg, rightLeg]
    var i = 0;
    while (i < wrongCount){
      ctx.stroke(parts[i]);
      i++;
    }

    }
}
// Helper Functions
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearInput(element){
    element.value = "";
};



//animation for end

function laserPewPew(){
  var canvas = document.getElementById('hangdude');
  var ctx = canvas.getContext('2d');

  var requestID;

  // laser vars
  var posX = 300;
  var pixelsPerFrame = 5;

  // var laser = new Path2D();
  ctx.beginPath();
  ctx.moveTo(posX, 65);
  ctx.lineTo((posX - 5), 65);
  ctx.stroke();

  function laserShoot(){
    requestID = requestAnimationFrame(laserShoot);

    if (posX >= 135){
      ctx.clearRect((posX - 6), 64, 7, 11);
      posX -= pixelsPerFrame;
      ctx.beginPath();
      ctx.moveTo(posX, 65);
      ctx.lineTo((posX - 5), 65);
      ctx.stroke();
    } else {
      ctx.clearRect((posX - 6), 64, 7, 11);
      cancelAnimationFrame(requestID);
      postPewPew();
    }
  }
  requestID = requestAnimationFrame(laserShoot);
}


function postPewPew(){
  var canvas = document.getElementById('hangdude');
  var ctx = canvas.getContext('2d');

  var requestID;

  // body vars
  var posY = 80;
  var pixelsPerFrame = 5;
  var armPosY = 0;
  var armMovement = 2;
  var armLoopControl = 0;

  // body
  // head
  ctx.beginPath()
  ctx.arc(130, (posY + 20), 20, 0, (2*Math.PI));
  ctx.stroke();
  // body
  ctx.beginPath()
  ctx.moveTo(130, (posY + 40));
  ctx.lineTo(130, (posY + 110));
  ctx.stroke();
  // left arm
  ctx.beginPath()
  ctx.moveTo(130, (posY + 60));
  ctx.lineTo(100, (posY + 50));
  ctx.stroke();
  // right arm
  ctx.beginPath()
  ctx.moveTo(130, (posY + 60));
  ctx.lineTo(160, (posY + 50));
  ctx.stroke();
  // left leg
  ctx.beginPath()
  ctx.moveTo(130, (posY + 110));
  ctx.lineTo(110, (posY + 140));
  ctx.stroke();
  // right leg
  ctx.beginPath()
  ctx.moveTo(130, (posY + 110));
  ctx.lineTo(150, (posY + 140));
  ctx.stroke();


  function bodyDrop(){
    requestID = requestAnimationFrame(bodyDrop);

    if (posY < 125){
      ctx.clearRect(95, (posY - 5), 70, 140);
      posY += pixelsPerFrame;

      // body
      // head
      ctx.beginPath()
      ctx.arc(130, (posY + 20), 20, 0, (2*Math.PI));
      ctx.stroke();
      // body
      ctx.beginPath()
      ctx.moveTo(130, (posY + 40));
      ctx.lineTo(130, (posY + 110));
      ctx.stroke();
      // left arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(100, (posY + 50));
      ctx.stroke();
      // right arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(160, (posY + 50));
      ctx.stroke();
      // left leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(110, (posY + 140));
      ctx.stroke();
      // right leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(150, (posY + 140));
      ctx.stroke();

    } else {

      cancelAnimationFrame(requestID);
      postBodyDrop();
    }
  }
  requestID = requestAnimationFrame(bodyDrop);
}


function postBodyDrop(){
  var canvas = document.getElementById('hangdude');
  var ctx = canvas.getContext('2d');

  var requestID;

  // body vars
  var posY = 125;
  var bodyMovement = 4;
  var pixelsPerFrame = 5;
  var armPosY = -25;
  var armMovement = -5;
  var armLoopControl = 0;
  var legPosY = 0;
  var legMovement = -4;

  function armWaveAndJump(){
    requestID = requestAnimationFrame(armWaveAndJump);

    if (armLoopControl <= 40){
      ctx.clearRect(95, (posY - 5), 70, 145);
      armLoopControl += pixelsPerFrame;
      posY -= bodyMovement;
      armPosY -= armMovement;

      // body
      // head
      ctx.beginPath()
      ctx.arc(130, (posY + 20), 20, 0, (2*Math.PI));
      ctx.stroke();
      // body
      ctx.beginPath()
      ctx.moveTo(130, (posY + 40));
      ctx.lineTo(130, (posY + 110));
      ctx.stroke();
      // left arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(100, (posY + 50 + armPosY));
      ctx.stroke();
      // right arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(160, (posY + 50 + armPosY));
      ctx.stroke();
      // left leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(110, (posY + 140));
      ctx.stroke();
      // right leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(150, (posY + 140));
      ctx.stroke();


    } else if (armLoopControl <= 80) {
      ctx.clearRect(95, (posY - 5), 70, 150);
      armLoopControl += pixelsPerFrame;
      posY += bodyMovement;
      armPosY += armMovement;

      // body
      // head
      ctx.beginPath()
      ctx.arc(130, (posY + 20), 20, 0, (2*Math.PI));
      ctx.stroke();
      // body
      ctx.beginPath()
      ctx.moveTo(130, (posY + 40));
      ctx.lineTo(130, (posY + 110));
      ctx.stroke();
      // left arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(100, (posY + 50 + armPosY));
      ctx.stroke();
      // right arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(160, (posY + 50 + armPosY));
      ctx.stroke();
      // left leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(110, (posY + 140));
      ctx.stroke();
      // right leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(150, (posY + 140));
      ctx.stroke();


    } else if (armLoopControl <= 120) {
      ctx.clearRect(95, (posY - 5), 70, 150);
      armLoopControl += pixelsPerFrame;
      posY -= bodyMovement;
      armPosY -= armMovement;

      // body
      // head
      ctx.beginPath()
      ctx.arc(130, (posY + 20), 20, 0, (2*Math.PI));
      ctx.stroke();
      // body
      ctx.beginPath()
      ctx.moveTo(130, (posY + 40));
      ctx.lineTo(130, (posY + 110));
      ctx.stroke();
      // left arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(100, (posY + 50 + armPosY));
      ctx.stroke();
      // right arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(160, (posY + 50 + armPosY));
      ctx.stroke();
      // left leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(110, (posY + 140));
      ctx.stroke();
      // right leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(150, (posY + 140));
      ctx.stroke();

    } else if (armLoopControl <= 160) {
      ctx.clearRect(95, (posY - 5), 70, 150);
      armLoopControl += pixelsPerFrame;
      posY += bodyMovement;
      armPosY += armMovement;

      // body
      // head
      ctx.beginPath()
      ctx.arc(130, (posY + 20), 20, 0, (2*Math.PI));
      ctx.stroke();
      // body
      ctx.beginPath()
      ctx.moveTo(130, (posY + 40));
      ctx.lineTo(130, (posY + 110));
      ctx.stroke();
      // left arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(100, (posY + 50 + armPosY));
      ctx.stroke();
      // right arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(160, (posY + 50 + armPosY));
      ctx.stroke();
      // left leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(110, (posY + 140));
      ctx.stroke();
      // right leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(150, (posY + 140));
      ctx.stroke();


    } else if (armLoopControl <= 200) {
      ctx.clearRect(95, (posY - 5), 70, 150);
      armLoopControl += pixelsPerFrame;
      posY -= bodyMovement;
      armPosY -= armMovement;

      // body
      // head
      ctx.beginPath()
      ctx.arc(130, (posY + 20), 20, 0, (2*Math.PI));
      ctx.stroke();
      // body
      ctx.beginPath()
      ctx.moveTo(130, (posY + 40));
      ctx.lineTo(130, (posY + 110));
      ctx.stroke();
      // left arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(100, (posY + 50 + armPosY));
      ctx.stroke();
      // right arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(160, (posY + 50 + armPosY));
      ctx.stroke();
      // left leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(110, (posY + 140));
      ctx.stroke();
      // right leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(150, (posY + 140));
      ctx.stroke();


    } else if (armLoopControl <= 240) {
      ctx.clearRect(95, (posY - 5), 70, 150);
      armLoopControl += pixelsPerFrame;
      posY += bodyMovement;
      armPosY += armMovement;

      // body
      // head
      ctx.beginPath()
      ctx.arc(130, (posY + 20), 20, 0, (2*Math.PI));
      ctx.stroke();
      // body
      ctx.beginPath()
      ctx.moveTo(130, (posY + 40));
      ctx.lineTo(130, (posY + 110));
      ctx.stroke();
      // left arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(100, (posY + 50 + armPosY));
      ctx.stroke();
      // right arm
      ctx.beginPath()
      ctx.moveTo(130, (posY + 60));
      ctx.lineTo(160, (posY + 50 + armPosY));
      ctx.stroke();
      // left leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(110, (posY + 140));
      ctx.stroke();
      // right leg
      ctx.beginPath()
      ctx.moveTo(130, (posY + 110));
      ctx.lineTo(150, (posY + 140));
      ctx.stroke();


    }

      else {
        cancelAnimationFrame(requestID);
        alert('Congrats! You win!');
        document.location.reload();
      }
  }
  requestID = requestAnimationFrame(armWaveAndJump);
}


function laserPewPewDeath(){
  var canvas = document.getElementById('hangdude');
  var ctx = canvas.getContext('2d');

  var requestID;

  // laser vars
  var posX = 300;
  var pixelsPerFrame = 5;

  // var laser = new Path2D();
  ctx.beginPath();
  ctx.fillRect(posX, 90, 2, 2)
  ctx.stroke();

  function laserShoot(){
    requestID = requestAnimationFrame(laserShoot);

    if (posX >= 135){
      ctx.clearRect((posX - 6), 89, 10, 5);
      posX -= pixelsPerFrame;
      ctx.beginPath();
      ctx.arc(130, 100, 20, 0, (2*Math.PI));
      ctx.fillRect(posX, 90, 3, 2)
      ctx.stroke();
    } else {
      // ctx.clearRect((posX - 6), 90, 7, 20);
      cancelAnimationFrame(requestID);
      postPewPewDeath();
    }
  }
  requestID = requestAnimationFrame(laserShoot);
}


function postPewPewDeath(){
  var canvas = document.getElementById('hangdude');
  var ctx = canvas.getContext('2d');

  var requestID;

  // body vars
  var deathAnimationCount = 0;
  var pixelsPerFrame = 5;
  var x = 0;
  var y = 0;

  function headExplode(){
    requestID = requestAnimationFrame(headExplode);

    if (deathAnimationCount < 100){
      ctx.clearRect(35, 35, 70, 70);
      ctx.clearRect(35, 35, 90, 40);
      deathAnimationCount += pixelsPerFrame;
      x -= 2;
      y -= 2;

      ctx.beginPath();
      ctx.moveTo(x + 110, 90);
      ctx.lineTo(x + 100, 90);
      ctx.strokeStyle = 'red';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + 115, y + 85);
      ctx.lineTo(x + 105, y + 80);
      ctx.strokeStyle = 'red';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(120, y + 80);
      ctx.lineTo(119, y + 70);
      ctx.strokeStyle = 'red';
      ctx.stroke();

    } else {

      cancelAnimationFrame(requestID);
      postHeadExplode();
    }
  }
  requestID = requestAnimationFrame(headExplode);
}


function postHeadExplode(){
  var canvas = document.getElementById('hangdude');
  var ctx = canvas.getContext('2d');

  var requestID;

  // body vars
  var deathAnimationCount = 0;
  var pixelsPerFrame = 5;
  var y = 0;
  var bloodPool = 0;

  function bloodDrip(){
    requestID = requestAnimationFrame(bloodDrip);

    if (deathAnimationCount < 100){
      ctx.clearRect(120, 85, 20, 30);
      deathAnimationCount += pixelsPerFrame;
      y += 1;
      bloodPool += 0.2;


      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fillRect(130, y + 90, 5, 5);

      ctx.beginPath();
      ctx.arc(130, 90, bloodPool, 0, (2*Math.PI));
      ctx.fillStyle = 'red';
      ctx.fill()


    } else {

      cancelAnimationFrame(requestID);
      bloodDrip2();
    }
  }
  requestID = requestAnimationFrame(bloodDrip);
}

function bloodDrip2(){
  var canvas = document.getElementById('hangdude');
  var ctx = canvas.getContext('2d');

  var requestID;

  // body vars
  var deathAnimationCount = 0;
  var pixelsPerFrame = 5;
  var y = 0;
  var bloodPool = 3;

  function bloodDripper(){
    requestID = requestAnimationFrame(bloodDripper);

    if (deathAnimationCount < 100){
      ctx.clearRect(120, 85, 20, 30);
      deathAnimationCount += pixelsPerFrame;
      y += 1;


      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fillRect(130, y + 90, 5, 5);

      ctx.beginPath();
      ctx.arc(130, 90, bloodPool, 0, (2*Math.PI));
      ctx.fillStyle = 'red';
      ctx.fill()


    } else {

      cancelAnimationFrame(requestID);
      bloodDripCount += 1;
      if (bloodDripCount < 10) {
        bloodDrip2();
      } else {
        alert('You lose');
        document.location.reload();
        }
    }
  }
  requestID = requestAnimationFrame(bloodDripper);
}
var bloodDripCount = 0;



function successFinalAnimation(){
  wrongCount = 10;
  drawDude();
  laserPewPew();
  // laserPewPewDeath();
  // tinyDancer();
}

function failFinalAnimation(){
  wrongCount = 10;
  drawDude();
  // laserPewPew();
  laserPewPewDeath();
  // tinyDancer();
}


}
