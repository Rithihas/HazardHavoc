
// global variables

let startofgame = true;  //tells whether players have initialized their positions or not.
let playcount = 0;       //helps in player initialization. never used again.
let maxplayers = 2;      // stores the number of players playing.
let turn = -1;           // tracks whose turn it is to play.
let invalidmove = false; // for status printing?.
let shiftdone = false;


// various arrays used to store data .

var players = [];  //stores player objects.

var colourarray = ["url(playerred.svg)","url(playerblue.svg)","url(playergreen.svg)","url(playeryellow.svg)"]; //stores player icons.

var deatharray = [];  //stores the field block ids which cause death (bomb present).

var playernames = []; // stores player names entered at the start.

//for tranistion from number of players to enter player names.
function toSecond(s)
{
     document.getElementById("pre").style.display = 'none';
     document.getElementById("mid").style.display = 'flex';

     maxplayers = parseInt(s);

     var currentplayers = document.getElementById("mid").getElementsByClassName("flexentry");

     for(let i=0 ; i<maxplayers ; i++)
     {
       currentplayers[i].style.display = "flex";
     }
}

//for transition from enter player names to actual game.
function startgame() 
{

   for(let i=26; i<26+maxplayers ; i++)
   {
     
       playernames[i-26] = document.getElementById(i.toString()).value;

   }


   document.getElementById("mid").style.display = 'none';
     document.getElementById("fin").style.display = 'flex';
  


}

// this function tells whether a field is currently occupied by another player or not.
function occupied(x)
{
    var occup = false;
    for(let i=0 ; i<playcount ; i++)
    {
        if(players[i].currentbox == x)
        occup = true;
    }
    
    
    return occup;

    
}



// class for the player objects. very useful
class Player {

    constructor(pname , pnumber , currentbox , playercolour)
    {
        this.pname = pname;
        this.pnumber = pnumber;
        this.currentbox = currentbox;
        this.playercolour = playercolour;
        
    }

    // this class method tells whether a player can make a certain move or not.
    validateMove(m) {

      if(( Math.abs(m - this.currentbox) == 1 || Math.abs(m-this.currentbox) == 5 ) && !occupied(m))
      return true;
      else 
      return false;
      
  

    }


}


// shifts the location of the bombs to one field below. (UNDER IMPLEMENTATION)
function shiftBombs()
{

    //this loop changes the bomb icon position and death array numbers
     
    for(let i=0 ; i<deatharray.length ; i++)
    {
      document.getElementById(deatharray[i]).getElementsByClassName("bombs")[0].style.display = "none";
      if(deatharray[i]!=20)
      deatharray[i] = (deatharray[i] + 5)%25;
      else 
      {
        deatharray[i] = 25;
      }
      document.getElementById(deatharray[i]).getElementsByClassName("bombs")[0].style.display = "block";
    }

    //checks whether any falling bomb has caused any death 
    for(let i=0 ; i<maxplayers ; i++)
    {

      if(deatharray.includes(players[i].currentbox))
      {
       
        setTimeout(() => { let deadplayer = players[i].pname;
          document.getElementById(players[i].currentbox).style.backgroundImage = "none";
          alert(players[i].pname+" died. trash gameplay.");
          maxplayers--;
        players.splice(i,1);
        playernames.splice(i,1);
        colourarray.splice(i,1);

        turn = (turn-1)%maxplayers;

        if(maxplayers==1){
          setTimeout(() => { let winplayer = players[0].pname;
            if(confirm(winplayer+" has won the game. The game has ended. Press Ok to restart"))
            {
               location.reload();
            }}, 300);

          }
          }, 300);
        
        

        
         
      }

    }


}




// main functionality of the game
function clicked(x)
{
     // position initialization
     if(startofgame==true) 
     {
        
        if(playcount == 0 || !occupied(x)) {
        document.getElementById("stat").value = playernames[playcount]+" has chosen their starting field.";
        
        
        players[playcount] = new Player(playernames[playcount],playcount+1,0,colourarray[playcount],false);
        players[playcount].currentbox = x;
        document.getElementById(x).style.backgroundImage = colourarray[playcount];

        playcount+=1;

        
        
        if(playcount == maxplayers)
        startofgame = false;

        }
        else 
        {
          document.getElementById("stat").value = "Chosen field is already occupied.";
          
        }
     }

     // normal gameplay mechanics
     else 
     {
        invalidmove = false;
        shiftdone = false;
        turn = (turn+1)%maxplayers;

        

        
        //bomb placement 
        if(players[turn].currentbox == x && !deatharray.includes(x))
        {

          if(turn!= maxplayers-1)
          {
          document.getElementById(x).getElementsByClassName("bombs")[0].style.display = "block";
          deatharray.push(x);
          }

          else 
          {
             shiftBombs();
             document.getElementById(x).getElementsByClassName("bombs")[0].style.display = "block";
             deatharray.push(x);
             shiftdone = true;
          }
          
          
        }

        //moves player
       else if(players[turn].validateMove(x))
        {
            document.getElementById(players[turn].currentbox).style.backgroundImage = "none";
            document.getElementById(x).style.backgroundImage = colourarray[turn];
            players[turn].currentbox = x;

            //if moved into a bomb placed field
            if(deatharray.includes(x))
            {
             
              setTimeout(() => { let deadplayer = players[turn].pname;
                document.getElementById(x).style.backgroundImage = "none";
                alert(players[turn].pname+" died. trash gameplay.");
                maxplayers--;
              players.splice(turn,1);
              playernames.splice(turn,1);
              colourarray.splice(turn,1);

              turn = (turn-1)%maxplayers;

              if(maxplayers==1){
                setTimeout(() => { let winplayer = players[0].pname;
                  if(confirm(winplayer+" has won the game. The game has ended. Press Ok to restart"))
                  {
                     location.reload();
                  }}, 300);
  
                }
                }, 300);
              
              

              
               
            }

            document.getElementById("stat").value = playernames[turn]+" moved";

            
            if(turn==maxplayers-1 && !shiftdone)
            {

               shiftBombs();

            }

        }

        //balancing an invalid move
        else
      {  invalidmove = true; 
        document.getElementById("stat").value = "invalid move by "+playernames[turn];
        turn = turn+maxplayers-1;
      }

      if(!invalidmove)
      document.getElementById("stat").value = playernames[(turn+1)%maxplayers]+"'s turn";

     }

}
