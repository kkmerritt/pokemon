// initialize
dealtCards = [];
playercards = [];
computercards = [];
computerwins = 0;
playerwins = 0;
computerDiv = null;
playerDiv = null;
// end initializing

playGame()


function playGame(){
  console.log("game is being reset")
  $('#computer-move').empty();
  $('#player-move').empty();

  computerturncard = [];
  card = [];
  $('#player-cards').empty();
  $('#computer-cards').empty();

  dealComputer();
  dealPlayer();
  setTimeout(renderPlayer, 10);
  setTimeout(renderComputer, 15);
  setTimeout(play, 20);
}


//Play Begins Click to APPEND To INPLAY DIV
function play(){
  $(".card0").on("click", function(e){
    $(".windiv").remove();

    playerturncard = playercards[0];
    playerChoice(playerturncard);
    computerChoice();
    $('.button').css("display", "block")
    $('.button').css("color", "yellow")
  });

  $(".card1").on("click", function(e){
    $(".windiv").remove();

    playerturncard = playercards[1];
    playerChoice(playerturncard);
    computerChoice();
    $('.button').css("display", "block")
    $('.button').css("color", "yellow")
  });

  $(".card2").on("click", function(e){
    $(".windiv").remove();

    playerturncard = playercards[2];
    playerChoice(playerturncard);
    computerChoice();
    $('.button').css("display", "block")
    $('.button').css("color", "yellow")
  });

  computerPick();

  $(".button").on("click", function(e){
    $('.windiv').empty();
    winner(),
    $('footer').append("<div class='windiv'>" + turnwin + " " + roundwin + "</div>")
    setTimeout(function(){$('.windiv').remove()}, 2000);
    $('.button').css("display", "none");
    setTimeout(playGame, 1000); // // NOTE: put this on a mouse event button

  })
}//end of function play()



// Functions!
function dealPlayer() {
  playercards = [];
  playercurrent3inlc = [];
  for (var i = 0; i < 3; i++){
    var random = Math.floor(Math.random() * pokemons.length);
    dealtCards.push(pokemons[random]);
    playercards.push(pokemons[random]);
    pokemons.splice(random,1);
    playercurrent3inlc[i] = playercards[i].Name.toLowerCase();
    renderPlayer();
  };
}//end dealPlayer

function dealComputer() {
  computercards = [];
  for (var i = 0; i < 3; i++){
    var random = Math.floor(Math.random() * pokemons.length);
    dealtCards.push(pokemons[random]);
    computercards.push(pokemons[random]);
    pokemons.splice(random,1);
  }
}//end dealComputer

function computerPick(){
  computerturncard = computercards[Math.floor(Math.random()*3)]}

  function renderPlayer(){
    $('#player-cards').empty();
    // console.log('rendering player cards: ' + playercurrent3inlc[i]);
    $('#player-cards').append("<img class='card0' src='img/"+playercurrent3inlc[0]+".jpg'>");
    $('#player-cards').append("<img class='card1' src='img/"+playercurrent3inlc[1]+".jpg'>");
    $('#player-cards').append("<img class='card2' src='img/"+playercurrent3inlc[2]+".jpg'>");


  }//end rendering

  function renderComputer(){
    $('#computer-cards').empty();

    for (var i = 0; i < 3; i++){$('#computer-cards').append("<img class ='comp-card' src='img/cardback.png'>")}
  }//end rendering

  function playerChoice(tempcard){
    $('#player-move').empty();
    $('#player-move').append("<img class='card' src='img/"+tempcard.Name.toLowerCase()+".jpg'>")
    $('#in-play').css('opacity','.8')

  }
  function computerChoice(){
    $('#computer-move').empty();
    $('#computer-move').append("<img class ='comp-card' src='img/cardback.png'>")
    $('#in-play').css('opacity','.8')
  }

  function winner(){
    var loop = true;
    var playerpoints = playerturncard.HP
    var computerpoints = computerturncard.HP
    $('#computer-move').empty();
    $('#computer-move').append("<img class ='card' src='img/"+computerturncard.Name.toLowerCase()+".jpg'>");

    while (loop){
      if (computerturncard.Speed > playerturncard.Speed){
        playerpoints = playerpoints - computerturncard.Damage;
        if (playerpoints < 0) {roundwin = computerturncard.Name;
          turnwin = "Computer Won with ";
          computerwins = computerwins + 1;
          console.log('computerwins is ' + computerwins);
          break;}
        }
        else if (computerturncard.Speed < playerturncard.Speed){
          computerpoints = computerpoints - playerturncard.Damage;
          if (computerpoints < 0){roundwin = playerturncard.Name;
            turnwin = "You Won with ";
            playerwins = playerwins + 1;
            console.log('playerwins is ' + playerwins)
            break;}
          }
        }
      } //end winner
