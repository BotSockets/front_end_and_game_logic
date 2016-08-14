var toyRobotHackathon = toyRobotHackathon || {};

toyRobotHackathon.Robot = function(){
	this.x = 0;
	this.y = 0;
	this.facing = "NORTH";

	// Next move has to be in bounds
	// If the next move has box
	  // If the boxes' next move is possible
	  	// move and also move the box.
	// else 
	  // move
	//
	this.move = function( direction ){
	  if (direction === "forwards"){
	  	var nsq = nextSquareCoordinates.apply(this, ["forwards"] );
	  	var nextX = nsq.x;
	  	var nextY = nsq.y;
	  	moveBasedOnNextCoordinates.apply(this, [nextX, nextY] );
	  } else if (direction === "back"){
	  	var nsq = nextSquareCoordinates.apply(this, ["back"] );
	  	var nextX = nsq.x;
	  	var nextY = nsq.y;
		moveBasedOnNextCoordinates.apply(this, [nextX, nextY] );
	  };
	};

	this.turn = function( direction ){
		var facingKey = directionsNumber[this.facing];
		if (direction === "left"){
		  setFacing.apply(this, [facingKey - 1]);
		} else if (direction === "right"){
		  setFacing.apply(this, [facingKey + 1]);
		};
	};

	var directionsNumber = {
		"NORTH": 0,
		"EAST": 1,
		"SOUTH": 2,
		"WEST": 3,
	};

	var numberDirections = {
		0: "NORTH",
		1: "EAST",
		2: "SOUTH",
		3: "WEST",
	};

	var moveBasedOnNextCoordinates = function( nextX, nextY ){
		if ( toyRobotHackathon.board.coordinatesOnBoard( nextX, nextY ) ){
	  	  if ( toyRobotHackathon.board.coordinatesHasBox( nextX, nextY ) ){
	  	  	var ctah = coordinatesTwoAheadOfRobot( this.x, this.y, nextX, nextY );
	  	  	if ( toyRobotHackathon.board.boxCanMoveToCoordinates( ctah.x,
	  	  														  ctah.y ) ){
	  	  	  this.x = nextX;
	  	  	  this.y = nextY;
	  	  	  toyRobotHackathon.board.moveBox( nextX, 
	  	  	  								   nextY,
	  	  	  								   ctah.x,
	  	  	  								   ctah.y );
	  	  	};
	  	  } else {
	  	  	this.x = nextX;
	  	  	this.y = nextY;
	  	  };
	  	};
	};

	var coordinatesTwoAheadOfRobot = function( currentX, currentY, nextX, nextY ){
	  var coordinatesTwoAhead = {};
	  coordinatesTwoAhead.x = ( currentX + ( nextX - currentX ) * 2 );
	  coordinatesTwoAhead.y = ( currentY + ( nextY - currentY ) * 2 );
	  return coordinatesTwoAhead;
	};


	var nextSquareCoordinates = function( direction ){
		var coordinates = {};
		if (direction === "forwards"){
		  if (this.facing === "NORTH") {
		  	coordinates.x = this.x;
		  	coordinates.y = this.y + 1;
		  } else if (this.facing === "EAST"){
		  	coordinates.x = this.x + 1;
		  	coordinates.y = this.y;
		  } else if (this.facing === "SOUTH"){
		  	coordinates.x = this.x;
		  	coordinates.y = this.y - 1;
		  } else if (this.facing === "WEST"){
		  	coordinates.x = this.x - 1;
		  	coordinates.y = this.y;
		  };
		} else if ( direction === "back"){
		  if (this.facing === "NORTH") {
		  	coordinates.x = this.x;
		  	coordinates.y = this.y - 1;
		  } else if (this.facing === "EAST"){
		  	coordinates.x = this.x -1;
		  	coordinates.y = this.y;
		  } else if (this.facing === "SOUTH"){
		  	coordinates.x = this.x;
		  	coordinates.y = this.y + 1;
		  } else if (this.facing === "WEST"){
		  	coordinates.x = this.x + 1;
		  	coordinates.y = this.y;
		  };
		};
		return coordinates;
	};

	var setFacing = function( facingKey ){
	  if (facingKey < 0){
	    facingKey = 3;
	  } else if (facingKey > 3){
	    facingKey = 0;
	  };
      this.facing = numberDirections[facingKey];
	};
};