$(document).ready(function(){
  var equation = '';
  var sol = 0;
  var nonNums = ["/", "*", "-", "+", "."];
  var equalPressed = false;
  
  //display entry on the screen 
  function displayEntry(pressed){
    $(".entries").append(pressed);
    console.log("length: " + $(".entries").text().length);
  }

  //show error message
  function showError(){
    $(".limit").show();
    $("#ce, #ac, #equal").click(function(){
      $(".limit").fadeOut();
    });
  }

  //store entries
  function pressedEntries(){
    $(".calcFunc").click(function(){
      // don't allow consecutive operants to be pressed
      if(nonNums.includes(equation.substr(equation.length-1)) && nonNums.includes(this.value)){
        console.log("double operant");
        return false;
      // first entry cannot be an operant
      }else if(equation.length === 0 && nonNums.includes(this.value)){
        console.log("first entry cannot be operant");
        return false;
      // equation cannot exceed 15 characters   
      }else if(equation.length >= 15){
        console.log("limit exceeded");
        showError();
      // after pressing =, if first pressed is a number
      }else if(equalPressed === true && nonNums.includes(this.value) === false){
        equation = '';
        equation += this.value;
        $(".entries").text(equation);
        equalPressed = false;
        console.log("the equation is " + equation);
        console.log("= pressed: " + equalPressed);
      }else{
        var key = this.value;
        equation += key;
        console.log("the equation is " + equation);
        equalPressed = false;
        console.log("= pressed: " + equalPressed);
        if(this.value === "*"){
          displayEntry("x");
        }else if(this.value === "/"){
          displayEntry("&divide;");
        }else{
          displayEntry(key);
        }   
      }
    });
  }

  $("#ac").click(function(){
    $(".entries").empty();
    equation = '';
    equalPressed = false;
    console.log("= pressed: " + equalPressed);
  });

  //delete previous entry
  $("#ce").click(function(){
    // if = was just pressed, treat CE as AC
    if(equalPressed === true){
      $(".entries").empty();
      equation = '';
      equalPressed = false;
      console.log("the equation is " + equation);
      console.log("= pressed: " + equalPressed);
    }else{
      equation = equation.slice(0,-1);
      $(".entries").text(equation);  
      console.log("the equation is " + equation);
    }
  });

  // show the solution
  $("#equal").click(function(){
    var equals = math.eval(equation);
    sol = math.format(equals, {precision: 10});
    // equation cannot be empty
    if(equation.length === 0){
      return false;
    }
    // if equation doesn't end w/ num, 
    // don't show solution yet
    else if(nonNums.includes(equation.substr(equation.length-1))){
      return false;   
    // error message if solution exceeds limit
    }else if(sol.toString().length >= 15){
      $(".solLimit").show();
      $("#ce, #ac, #divid, #multiply, #dot, #add, #minus").click(function(){
        $(".solLimit").fadeOut();
      });
    }else{ 
      equation = '';
      equation += sol;
      $(".entries").text(equation);
      equalPressed = true;
      console.log(equation);
      console.log("length: " + equation.length);
      console.log("= pressed: " + equalPressed);
    }  
  });
  pressedEntries();
});