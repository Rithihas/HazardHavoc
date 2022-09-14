let startofgame = true;
let playcount = 0;
let maxplayers = 2;
let turn = -1;

var p1;
var p2;

var players = [p1,p2];

var colourarray = ["url(playerred.svg)","url(playerblue.svg)","url(playergreen.svg)","url(playeryellow.svg)"];

function occupied(x)
{
    var occup = false;
    for(let i=0 ; i<2 ; i++)
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
        

        document.getElementById("stat").value = "Initial positioning";
        
        
        players[playcount] = new Player("arrancar",playcount+1,0,colourarray[playcount]);
        players[playcount].currentbox = x;
        document.getElementById(x).style.backgroundImage = colourarray[playcount];

        playcount+=1;

        
        
        if(playcount == maxplayers)
        startofgame = false;
     }

     else 
     {
 
        turn = (turn+1)%2;

        document.getElementById("stat").value = "In play";

        if(players[turn].validateMove(x))
        {
            document.getElementById(players[turn].currentbox).style.backgroundImage = "none";
            document.getElementById(x).style.backgroundImage = colourarray[turn];
            players[turn].currentbox = x;
            document.getElementById("stat").value = "valid move";

        }
        else
      {   
        document.getElementById("stat").value = "invalid move";
        turn = turn+1;
      }
     }

}
