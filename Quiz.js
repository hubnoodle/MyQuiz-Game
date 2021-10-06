class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

    question.hide();
    background("purple");

    //this.title.hide();

    fill(0);
    textSize(30);
    text("Results of the Quiz", 340, 50);

    Contestant.getPlayerInfo();

    if(allContestants!==undefined){
      var display_Answers = 230;
      fill("blue");
      textSize(20);
      text("Note : Contestant(s) who answered correctly are highlighted in green!", 130, 230);
    }

    this.button.show();
    this.title.show();
    this.input1.show();
    this.input2.show();

      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer){
          fill("green");
        }
        else{
          fill("red");
        }
        display_Answers+= 30;
        textSize(20);
        text(allContestants[plr].name + ":" + allContestants[plr].answer, 250, display_Answers);
      }
    }
  }