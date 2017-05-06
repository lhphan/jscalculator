$(document).ready(function(){
  var equation = '';
  var sol = 0;
  var nonNums = ["/", "*", "-", "+", "."];
  var equalPressed = false;
  
  //display entry on the screen 
  function displayEntry(){
    $(".calcFunc").click(function(){
      // cannot have 2 consecutve operants
      if(nonNums.includes(equation.substr(equation.length-1)) && nonNums.includes(this.value)){
        //console.log('double operant');
        return false;
      }else if($(".screen").text().length >= 15){ // might not need this
        console.log("limit exceeded");
        $(".limit").show();
        $("button").focusout(function(){
          $(".limit").fadeOut();
        });
        //return false;
      }
      else{
        $(".screen").append(this.value);
        console.log("length: " + $(".screen").text().length);
      }
    });
  }

  function pressedEntries(){
    $(".calcFunc").click(function(){
      // don't allow consecutive operants to be pressed
      if(nonNums.includes(equation.substr(equation.length-1)) && nonNums.includes(this.value)){
        //console.log('double operant');
        return false;
      // equation cannot exceed 15 characters   
      }else if(equation.length >= 15){
        console.log("limit exceeded");
        return false;
        
      // if first pressed is a number
      }
      else if(equalPressed === true && nonNums.includes(this.value) === false){
        //$(".screen").empty();
        equation = '';
        equation += this.value;
        $(".screen").text(equation);
        equalPressed = false;
        console.log("the equation is " + equation);
        console.log("= pressed: " + equalPressed);
      }
      
      else{
        equation += this.value;
        console.log("the equation is " + equation);
        equalPressed = false;
        console.log("= pressed: " + equalPressed);
      }
    });
  }

  $('#ac').click(function(){
    $('.screen').empty();
    equation = '';
    equalPressed = false;
    console.log("= pressed: " + equalPressed);
  });

  $('#ce').click(function(){
    if(equalPressed === true){
      $('.screen').empty();
      equation = '';
      equalPressed = false;
      console.log("the equation is " + equation);
      console.log("= pressed: " + equalPressed);
    }else{
      equation = equation.slice(0,-1);
      $('.screen').text(equation);  
      console.log("the equation is " + equation);
    }
  });

  // show the solution
  $('#equal').click(function(){
    // if equation doesn't end w/ num, 
    // don't show solution yet
    if(nonNums.includes(equation.substr(equation.length-1))){
      return false;
      
    // error message if solution exceeds limit
    }else if(math.eval(equation).length >= 15){
      //console.log(equation);
      $(".solLimit").show();
      $("button").focusout(function(){
        $(".solLimit").fadeOut();
      });
      
    }else{
      sol = math.eval(equation);
      equation = '';
      equation += sol;
      $('.screen').text(equation);
      equalPressed = true;
      console.log(equation);
      console.log("= pressed: " + equalPressed);
    }  
  });

  displayEntry();
  pressedEntries();

});