var config = {
    apiKey: "AIzaSyBMz75ust3yXEhrlOOwHLYqaLBVvZ08NOA",
    authDomain: "hw-7-train-times.firebaseapp.com",
    databaseURL: "https://hw-7-train-times.firebaseio.com",
    projectId: "hw-7-train-times",
    storageBucket: "hw-7-train-times.appspot.com",
    messagingSenderId: "217139633658"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // button for adding trains
  $('#add-train-btn').on("click", function(event) {
  	event.preventDefault();

  	// get user input
  	var trainName = $('#train-name-input').val().trim();
  	var trainDest = $('#destination-input').val().trim();
  	var firstTime = $('#first-time-input').val().trim();
  	var trainFrequency = $('#frequency-input').val().trim();

  	
  	// creating an object to store our data
  	var newTrain = {
  		name: trainName,
  		destination: trainDest,
  		time: firstTime,
  		frequency: trainFrequency
  	};

  	// uploads new train object to database
  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.time);
  	console.log(newTrain.frequency);

  	alert("New Train Added - Choo Choo!");

  	// clear input boxes
  	$('#train-name-input').val("");
	$('#destination-input').val("");
	$('#first-time-input').val("");
	$('#frequency-input').val("");
  });

// create firebase event for adding trains to the database and a row in the html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

 // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency; 

// math to determine when the next train will arrive and minutes until arrival
  var adjustedTime = moment(firstTime, "hh:mm").subtract(1, "years");

  var currentTime = moment();

  var diffTime = moment().diff(moment(adjustedTime), "minutes");

  var tRemainder = diffTime % trainFrequency;

  var tMinutesTillTrain = trainFrequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});











