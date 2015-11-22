// initialize
  dealtCards = [];
  playercards = [];
  computercards = [];
  computerwins = 0;
  playerwins = 0;
// end initializing

resetGame()

function resetGame() {
    console.log("game is being reset")
    $('#computer-move').empty();
    $('#player-move').empty();

    computerturncard = [];
    card = [];
    playercurrent3inlc = [];
    playGame();
}

function playGame(){
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

  })
}//end of function play()



// Functions!
function dealPlayer() {
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
    var playerDiv = $('#player-cards');
    for (var i = 0; i < 3; i++){
      $(playerDiv).append("<img class='card"+[i]+"' src='img/"+playercurrent3inlc[i]+".jpg'>");}
    }//end rendering

    function renderComputer(){
      var computerDiv = $('#computer-cards');
      for (var i = 0; i < 3; i++){$(computerDiv).append("<img class ='comp-card' src='img/cardback.png'>")}
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
            console.log('computerwins is ' + computerwins)

          break;}}
          else if (computerturncard.Speed < playerturncard.Speed){
              computerpoints = computerpoints - playerturncard.Damage;
              if (computerpoints < 0){roundwin = playerturncard.Name;
                turnwin = "You Won with ";
                playerwins = playerwins + 1;
                console.log('playerwins is ' + playerwins)

              break}}
              }
            } //end winner
