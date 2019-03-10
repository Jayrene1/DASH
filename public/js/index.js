var config = {
    apiKey: "AIzaSyB2D_0NczQjb0HyqQai4mxWY2rCQJC7UIw",
    authDomain: "dash-jayrene1.firebaseapp.com",
    databaseURL: "https://dash-jayrene1.firebaseio.com",
    projectId: "dash-jayrene1",
    storageBucket: "dash-jayrene1.appspot.com",
    messagingSenderId: "259766590514"
  };
  firebase.initializeApp(config);

  var auth = firebase.auth();
$(document).ready(function() {

  localStorage.setItem('dataset-count', "0");
  localStorage.setItem('dashboard-count', "0");
  localStorage.setItem('graph-count', "0");

  $('#create-user').on('submit', function(event){
    event.preventDefault();
    var userData = {
        email: $('#email').val(),
        password: $('#password').val(),
        username: 0
    };
	auth.createUserWithEmailAndPassword(userData.email, userData.password)
	.then(function(user){
        userData.username = user.user.uid;
        localStorage.setItem('username', user.user.uid.toString());
        $.post("api/users", userData)
        .then(function() {
          getUsers();
        });
        
	})
	.catch(function(error){
		alert(error);
  });
  
  function getUsers() {
    $.get("/api/users", function(data) {
      var uname = localStorage.getItem("username");
      for (var i=0; i < data.length; i++){
        if (data[i].username == uname){
          localStorage.setItem('userID', data[i].id.toString());
          window.location.href = "datasets";
        }
      }
    });
  }
	
  });

  $('#sign-in').on('submit', function(event){
	event.preventDefault();
	var email = $('#sign-in-email').val();
	var password = $('#sign-in-password').val();
	auth.signInWithEmailAndPassword(email, password)
	.then(function(user){
		console.log(user);
        window.location.href = "datasets"; //redirects user to datasets page
	})
	.catch(function(error){
		alert(error);
	});
	
  });


  $('#sign-out').on('click', function() {
      auth.signOut();
  });

});