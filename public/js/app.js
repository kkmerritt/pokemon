// NOTE: add instructions modal.
// NOTE: update score in the corner
// NOTE: add remaining cards (or maybe even a dealt cards stack on other side?)
// NOTE: add card stats for playerturncard
// NOTE: add a game winner function for when the cards are exhausted.
// NOTE: update the cards, maybe make a secret code that throws nude cards into the mix?

var pokemons = [
  {Name: 'Squirtle', HP: 44, Damage: 48, Speed: 43 },
  {Name: 'Charmander', HP: 39, Damage: 52, Speed: 65 },
  {Name: 'Bulbasaur', HP: 45, Damage: 49, Speed: 44 },
  {Name: 'Caterpie', HP: 45, Damage: 30, Speed: 45 },
  {Name: 'Weedle', HP: 40, Damage: 35, Speed: 50 },
  {Name: 'Pidgey', HP: 40, Damage: 45, Speed: 56 },
  {Name: 'Rattata', HP: 30, Damage: 56, Speed: 72},
  {Name: 'Pikachu', HP: 35, Damage: 55, Speed: 90 },
  {Name: 'Nidoran-Female', HP: 55, Damage: 47, Speed: 41 },
  {Name: 'Nidoran-Male', HP: 46, Damage: 57, Speed: 42 },
  {Name: 'Clefairy', HP: 70, Damage: 45, Speed: 35 },
  {Name: 'Vulpix', HP: 38, Damage: 41, Speed: 64 },
  {Name: 'Jigglypuff', HP: 115, Damage: 45, Speed: 20 },
  {Name: 'Oddish', HP: 45, Damage: 50, Speed: 30 },
  {Name: 'Meowth', HP: 40, Damage: 45, Speed: 90 },
  {Name: 'Psyduck', HP: 50, Damage: 52, Speed: 55 },
  {Name: 'Mankey', HP: 40, Damage: 80, Speed: 70 },
  {Name: 'Poliwag', HP: 40, Damage: 50, Speed: 91 }
]

// initialize
  dealtCards = [];
  playercards = [];
  computercards = [];
  computerwins = 0;
  playerwins = 0;
// end initializing

  resetGame()
  playGame();


function resetGame() {
    console.log("game is being reset")
    $('#computer-move').empty();
    $('#player-move').empty();

    computerturncard = [];
    card = [];
    playercurrent3inlc = [];
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
    $('.button').css("display", "none")

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

      function playGame(){
              dealComputer();
              dealPlayer();
              setTimeout(renderPlayer, 10);
              setTimeout(renderComputer, 15);
              setTimeout(play, 20)
            }
