var toyRobotHackathon = toyRobotHackathon || {};

toyRobotHackathon.board = (function(){

  var boardLength = 6;
  var grid;
  var getGrid = function(){ return grid };

  init = function( robot ){
    setGrid();
    setTargets( 3, robot );
    console.log(3);    
    setBoxes( 3, robot );
  };

  // toyRobotHackathon.board.boxCanMoveToCoordinates
  // if coordinatesInRangeForBox && coordinatesInFrontOfBoxIsClear
    // return true
  // else
    // return false
  boxCanMoveToCoordinates = function( x, y ){
    return ( coordinatesInRangeForBox(x, y) && !coordinatesHasBox( x, y ) );
  };


  // toyRobotHackathon.board.coordinatesInRangeForBox
  coordinatesInRangeForBox = function( x, y ){
    return ( coordinateInRange( x, 1, boardLength - 2 ) && coordinateInRange( y, 1, boardLength -2 ) );
  };

  // toyRobotHackathon.board.coordinateInRange
  coordinateInRange = function( coordinate, min, max ){
    return (coordinate >= min && coordinate <= max);
  };

  coordinatesHasBox = function( x, y ){
    return grid[x][y].hasBox;
  };

  coordinatesOnBoard = function( x, y ){
    return ( coordinateInRange(x, 0, boardLength - 1) && coordinateInRange( y, 0, boardLength - 1 ) );
  };

  moveBox = function( initialX, initialY, newX, newY ){
    grid[initialX][initialY].hasBox = false;
    grid[newX][newY].hasBox = true;
  };

  setGrid = function(){
    grid = [];
    for(var x = 0; x < boardLength; x++ ){
      grid[x] = [];
      for(var y = 0; y < boardLength; y++){
        grid[x].push(new point());
      };
    };
  };

  setTargets = function( numberOfTargets, robot ){
    while( numberOfTargets > 0 ){
      var randomX = toyRobotHackathon.model.randomNumber( boardLength - 2, 1 );
      var randomY = toyRobotHackathon.model.randomNumber( boardLength - 2, 1 );
      if ( robotNotOnCoordinate( randomX, randomY, robot ) && pointOnGridIsEmpty( randomX, randomY ) ){
        grid[randomX][randomY].isTarget = true;
        numberOfTargets--;
      };
    };
  };

  setBoxes = function( numberOfBoxes, robot ){
    while( numberOfBoxes > 0 ){
      var randomX = toyRobotHackathon.model.randomNumber( boardLength - 2, 1 );
      var randomY = toyRobotHackathon.model.randomNumber( boardLength - 2, 1 );
      if ( robotNotOnCoordinate( randomX, randomY, robot ) && pointOnGridIsEmpty( randomX, randomY ) ){
        grid[randomX][randomY].hasBox = true;
        numberOfBoxes--;
      };
    };
  };

  robotNotOnCoordinate = function( x, y, robot ){
    return !(robot.x === x && robot.y === y);
  };

  pointOnGridIsEmpty = function( x, y ){
    return !(grid[x][y].isTarget || grid[x][y].hasBox);
  };

  point = function(){
    this.isTarget = false;
    this.hasBox = false;
  };

  return {
    boxCanMoveToCoordinates: boxCanMoveToCoordinates,
    coordinatesHasBox: coordinatesHasBox,
    coordinatesOnBoard: coordinatesOnBoard,
  	init: init,
    getGrid: getGrid,
    moveBox: moveBox,
  };

})();