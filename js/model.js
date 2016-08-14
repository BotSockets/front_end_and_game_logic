var toyRobotHackathon = toyRobotHackathon || {};

toyRobotHackathon.model = (function(){

  var gameInterval, timeOfNextEvent, nextEvent;

  setGameInterval = function( value ){ gameInterval = value };

  getNextEvent = function(){ return nextEvent };
  setNextEvent = function( value ){
    nextEvent = value;
  };

  getTimeOfNextEvent = function(){ return timeOfNextEvent };
  setTimeOfNextEvent = function( value ){
    timeOfNextEvent = value;
  };

  timeUntilNextEvent = function( timeOfNextEvent ){
    return timeOfNextEvent - new Date;
  };

  // Does not deal in negative numbers!
  msToTime = function (s) {
    var string = "";
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    if ( hrs > 0 ){
      string += ( hrs + " hrs " );
    };

    if ( mins > 0 ){
      string += ( mins + " mins " );
    };

    if ( secs > 0 ){
      string += ( secs + " secs" );
    };

    return string;
  };

  // Random number from 0 to largestNumber
  randomNumber = function( largestNumber, smallestNumber ){
    var smallest = smallestNumber || 0;
    var number =  Number( (Math.random() * largestNumber).toFixed(0) );
    while (number < smallestNumber) {
      number = Number( (Math.random() * largestNumber).toFixed(0) );
    };
    return number;
  };

  return {

    setGameInterval,

    getNextEvent,
    setNextEvent,

    getTimeOfNextEvent,
    setTimeOfNextEvent,

    msToTime,

    randomNumber,

    timeUntilNextEvent,
  };

})();