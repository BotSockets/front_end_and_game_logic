var toyRobotHackathon = toyRobotHackathon || {};

toyRobotHackathon.commandCentre = (function(){

  // toyRobotHackathon.commandCentre.correctAnswer
  correctAnswer = function( commands, robot ){
    var commandsAsNumbersInArray = returnCommandsAsNumbersInArray( commands );
    var grid = returnGridAfterCommandsHaveBeenActioned( commandsAsNumbersInArray, robot );
    if ( boxesOnTargets(grid) ){
      return true;
    } else {
      return false;
    };
  };

  returnGridAfterCommandsHaveBeenActioned = function( commands, robot ){
    for(var i = 0; i < commands.length; i++){
      if ( commands[i] === 2 ){
        robot.turn( "left" );
      } else if ( commands[i] === 3 ){
        robot.turn( "right" );
      } else if ( commands[i] === 0){
        robot.move( "forwards" );
      } else if ( commands[i] === 1 ){
        robot.move( "back" );
      };
    };
    return toyRobotHackathon.board.getGrid();
  };

  boxesOnTargets = function( grid ){
    var answer = true;
    for (var x = 0; x < grid.length; x++){
      for (var y = 0; y < grid[x].length; y++){
        if (grid[x][y].isTarget !== grid[x][y].hasBox ) {
          return false;
        };
      };
    };
    return answer;
  };

  // 0 == forwards
  // 1 == back
  // 2 == left
  // 3 == right
  returnCommandsAsNumbersInArray = function( commands ){
    var commandsInArray = commands.split(" ");
    var commandsAsNumbersInArray = [];
    for (var i = 0; i < commandsInArray.length; i++){
      var command = commandsInArray[i].toLowerCase();
      if (command === "left"){
        commandsAsNumbersInArray.push( 2 );
      } else if (command === "right") {
        commandsAsNumbersInArray.push( 3 );
      } else if (command === "forwards") {
        commandsAsNumbersInArray.push( 0 );
      } else if (command === "back") {
        commandsAsNumbersInArray.push( 1 );
      };
    };
    return commandsAsNumbersInArray;
  };

  return {
    correctAnswer: correctAnswer,
  };

})();