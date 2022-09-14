let startofgame = true;

var p1;
var p2;

var players = [p1,p2];

function occupied(x)
{
    // var occup = false;
    // for(let i=0 ; i<4 ; i++)
    // {
    //     if(players[i].currentbox == x)
    //     occup = true;
    // }
    
    // return occup;

    return true;
}    


class Player {

    constructor(pname , pnumber , currentbox)
    {
        this.pname = pname;
        this.pnumber = pnumber;
        this.currentbox = currentbox;
    }

    validateMove(m) {

      if(( Math.abs(m - this.currentbox) == 1 || Math.abs(m-this.currentbox) == 5 ) && occupied(m))
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
        document.getElementById(x).style.backgroundImage = "url(player.svg)";
        p1 = new Player("arrancar",1,0);
        p1.currentbox = x;
     
        startofgame = false;
     }

     else 
     {
        document.getElementById("stat").value = "In play";
        if(p1.validateMove(x))
        {
            document.getElementById(p1.currentbox).style.backgroundImage = "none";
            document.getElementById(x).style.backgroundImage = "url(player.svg)";
            p1.currentbox = x;
            document.getElementById("stat").value = "valid move";

        }
        else 
        document.getElementById("stat").value = "invalid move";
     }

}
