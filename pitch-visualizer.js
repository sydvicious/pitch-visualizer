// find elements
var button = $("button")

var players = [];
$.ajax({
  type: "GET",
  url: "https://raw.githubusercontent.com/rd-astros/hiring-resources/master/players.json",
  data: [],
  success: function(res) {
    var json = $.parseJSON(res);
  	players = json.queryResults.row;
  }
	});
  
getPlayerName = function(id) {
	for(var i = 0; i < players.length; i++) {
  	if(players[i]._player_id == id)
    	return players[i]._player;
  }

}

getPlayString = function(play) {
 var inning = "Top";
 if(play._top_inning_sw == "N")
 	inning = "Bot";
 return inning + " " + play._inning + 
 " (" + play._balls + "-" + play._strikes + ") " + play._pitch_type + "" +
 parseFloat(play._initial_speed).toFixed(0) + "<br>" + 
 getPlayerName(play._batter_id) + " vs " + getPlayerName(play._pitcher_id) + "<br>" +
 play._event_result;
}

var canvas = document.getElementById("homePlate");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#EEEEEE";
ctx.fillRect(0, 0, 300, 400);
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle = "#000000";
ctx.lineWidth = 1.0;
ctx.fillRect(75, 100, 150, 200);
ctx.strokeRect(75, 100, 150, 200);

// handle click and add class
button.on("click", function(){
  $.ajax({
  type: "GET",
  url: "https://raw.githubusercontent.com/rd-astros/hiring-resources/master/game_565609.json",
  data: [],
  success: function(res) {
    var json = $.parseJSON(res);
  	var pitches = json.queryResults.row;
    ctx.strokeStyle = "#000000";
    for(var i = 0; i < pitches.length; i++) {
      console.log("Beginning");

    	var p = pitches[i];
      var x;
      var y;
      var strike_zone_size = p._sz_top - p._sz_bottom;
      x = 150.0 + ((p._plate_x * 12.0 * 150.0) / 17.0);
      y = 300.0 - (((p._plate_z - p._sz_bottom) / strike_zone_size) * 200);
      console.log("_plate_z = " + p._plate_z);
      console.log("y = " + y);
      if (p._umpire_call === "B"
      		|| p._umpire_call === "*B"
          || p._umpire_call === "H") {
        ctx.fillStyle = "#CCCCCC";
      } else if (p._umpire_call === "S" 
          || p._umpire_call === "F"
          || p._umpire_call === "W"
          || p._umpire_call === "T") {
        ctx.fillStyle = "#0000FF";
      } else if (p._umpire_call === "C") {
      	ctx.fillStyle = "#CC0000";
	    } else {
      	ctx.fillStyle = "#00FF00";
  	  }
    	ctx.arc(x, y, (p._plate_speed - 60.0) / 2.0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
    }
  }
  });
});


