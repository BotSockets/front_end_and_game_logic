var toyRobotHackathon = toyRobotHackathon || {};

toyRobotHackathon.controller = (function(){

  var robot;
  var getRobot = function(){ return robot };

  init = function(){
    robot = new toyRobotHackathon.Robot()
    toyRobotHackathon.board.init( robot );
  	toyRobotHackathon.view.init();
  	ajaxGameState();
  	startIntervalTimer();
  };

  var actionSubmittedCommands = function( commands ){
    var correct = toyRobotHackathon.commandCentre.correctAnswer( commands, robot );
    if ( correct ){
      console.log("YEAHHHH")
      // send number of moves and time to high score area
    } else {
      console.log("Wrongggg")
    };
  };

  var startIntervalTimer = function(){
    toyRobotHackathon.model.setGameInterval( setInterval(function(){
      var timeOfNextEvent = toyRobotHackathon.model.getTimeOfNextEvent();
      var timeUntilNextEvent = toyRobotHackathon.model.timeUntilNextEvent( timeOfNextEvent );

      if ( timeUntilNextEvent < 0 ){
        ajaxGameState();
      };

      var timeUntilNextEventFormatted = toyRobotHackathon.model.msToTime( timeUntilNextEvent );
    	var nextEvent = toyRobotHackathon.model.getNextEvent();
    	toyRobotHackathon.view.setNextEventDetails( nextEvent, timeUntilNextEventFormatted );
      var grid = toyRobotHackathon.board.getGrid();
      toyRobotHackathon.view.displayBoard( grid, robot );
    }, 1000) );
  };

  var ajaxGameState = function(){
  	$.get("http://172.19.59.128/schedule", 
	  function(JSON){
		  toyRobotHackathon.model.setTimeOfNextEvent( Date.parse(JSON["timeOfNextEvent"]) );
		  toyRobotHackathon.model.setNextEvent( JSON["nextEvent"] );
	  });
  };

  return {
    actionSubmittedCommands: actionSubmittedCommands,
  	init: init,
    getRobot: getRobot,
  };

})();