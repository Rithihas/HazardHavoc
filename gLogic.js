let startofgame = true;
let playcount = 0;
let maxplayers = 2;
let turn = -1;
let invalidmove = false;



var players = [];

var colourarray = ["url(playerred.svg)","url(playerblue.svg)","url(playergreen.svg)","url(playeryellow.svg)"];

var deatharray = [];

var playernames = [];

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

function startgame() 
{

   for(let i=26; i<26+maxplayers ; i++)
   {
     
       playernames[i-26] = document.getElementById(i.toString()).value;

   }


   document.getElementById("mid").style.display = 'none';
     document.getElementById("fin").style.display = 'flex';
  


}

function occupied(x)
{
    var occup = false;
    for(let i=0 ; i<maxplayers ; i++)
    {
        if(players[i].currentbox == x)
        occup = true;
    }
    
    
    return occup;

    
}    


class Player {

    constructor(pname , pnumber , currentbox , playercolour)
    {
        this.pname = pname;
        this.pnumber = pnumber;
        this.currentbox = currentbox;
        this.playercolour = playercolour;
        
    }

    validateMove(m) {

      if(( Math.abs(m - this.currentbox) == 1 || Math.abs(m-this.currentbox) == 5 ) && !occupied(m))
      return true;
      else 
      return false;
      
  

    }


}







function clicked(x)
{

     if(startofgame==true) 
     {
        

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
        invalidmove = false;
        turn = (turn+1)%maxplayers;

        

        if(players[turn].currentbox == x && !deatharray.includes(x))
        {
          // let str = x;
          document.getElementById(x).getElementsByClassName("bombs")[0].style.display = "block";
          deatharray.push(x);
          
        }

       else if(players[turn].validateMove(x))
        {
            document.getElementById(players[turn].currentbox).style.backgroundImage = "none";
            document.getElementById(x).style.backgroundImage = colourarray[turn];
            players[turn].currentbox = x;
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

        }
        else
      {  invalidmove = true; 
        document.getElementById("stat").value = "invalid move by "+playernames[turn];
        turn = turn+maxplayers-1;
      }

      if(!invalidmove)
      document.getElementById("stat").value = playernames[(turn+1)%maxplayers]+"'s turn";

     }

}
