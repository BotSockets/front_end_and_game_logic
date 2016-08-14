var toyRobotHackathon = toyRobotHackathon || {};

toyRobotHackathon.view = (function(){

  init = function(){
  	attachClickListeners();
    attachKeyDownListeners();
  };

  // toyRobotHackathon.view.attachKeyDownListeners
  var attachKeyDownListeners = function(){
    $(window).keydown(function(event){
      // left key
      if ( keyCodeIsBeingListenedFor( event.keyCode ) ){
        event.preventDefault();
        addToNumberInDivID( "player-command-count", 1 );
        if ( event.keyCode === 37 ) {
          addToCommandsTextArea( "Left" );
        // up key
        } else if ( event.keyCode === 38 ) {
          addToCommandsTextArea( "Forwards" );
        // right key
        } else if ( event.keyCode === 39 ) {
          addToCommandsTextArea( "Right" );
        //  back arrow key
        } else if (event.keyCode === 40) {
          addToCommandsTextArea( "Back" );
        };
      };
    });
  };

  // toyRobotHackathon.view.displayBoard
  var displayBoard = function( grid, robot ){
    var stringOfHTML = "";
    for(var y = grid.length - 1; y >= 0; y--){
      stringOfHTML += "<div class='game-row'>"
      for(var x = 0; x < grid[y].length; x++){
        stringOfHTML += "<div class='game-point'>";

        if (grid[x][y].hasBox){
          stringOfHTML += "B";
        };

        if ( grid[x][y].isTarget ) {
          stringOfHTML += "X";
        };

        if ( robot.x === x && robot.y === y ){
          stringOfHTML += "R";
        };

        stringOfHTML += "</div>";
      };
      stringOfHTML += "</div>"
    };

    $("#game-board").html(stringOfHTML);
  };

  // toyRobotHackathon.view.keyCodeIsBeingListenedFor
  var keyCodeIsBeingListenedFor = function( keyCode ){
    return ( event.keyCode === 37 || 
             event.keyCode === 38 || 
             event.keyCode === 39 || 
             event.keyCode === 40 )
  };

  // toyRobotHackathon.view.attachClickListeners
  var attachClickListeners = function(){
  	attachClearButtonListener();
    attachListenerForSubmitButton();
   	attachListenerForButtonWithSetValue( "#left", "Left" );
  	attachListenerForButtonWithSetValue( "#right", "Right" );
  	attachListenerForButtonWithSetValue( "#forwards", "Forwards" );
    attachListenerForButtonWithSetValue( "#back", "Back" );
  };

  // toyRobotHackathon.view.attachClearButtonListener
  var attachClearButtonListener = function(){
  	$("#clear").click(function(){
  	  $("#commands-textarea").val("");
      $("#player-command-count").text(0);
  	});
  };

  // toyRobotHackathon.view.attachListenerForButtonWithSetValue
  var attachListenerForButtonWithSetValue = function( buttonId, valueToAdd ){
   	$( buttonId ).click(function(){
      addToCommandsTextArea( valueToAdd );
      addToNumberInDivID( "player-command-count", 1 );
  	});
  };

  // toyRobotHackathon.view.attachListenerForSubmitButton
  var attachListenerForSubmitButton = function(){
    $("#submit").click(function(){
      var commands = $("#commands-textarea").val();
      toyRobotHackathon.controller.actionSubmittedCommands( commands );
    });
  };

  // toyRobotHackathon.view.addToCommandsTextArea
  var addToCommandsTextArea = function( valueToAdd ){
    var commandString = $("#commands-textarea").val();
    commandString = commandString + " " + valueToAdd;
    $("#commands-textarea").val( commandString.trim() );
  };

  // toyRobotHackathon.view.addToNumberInDivID
  var addToNumberInDivID = function( cssId, number ){
    $( "#" + cssId ).text( Number($( "#" + cssId).text()) + number );
  };

  // toyRobotHackathon.view.setNextEventDetails
  var setNextEventDetails = function( nextEvent, timeUntilNextEvent ){
    $("#next-event-details-container").html("<h6>Time until " + nextEvent + ": " + timeUntilNextEvent + "</h6>")
  };

  return {
    displayBoard: displayBoard,
  	init: init,
    setNextEventDetails,
  };

})();