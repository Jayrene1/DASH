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

  $('#create-user').on('submit', function(event){
    event.preventDefault();
    var userData = {
        email: $('#email').val(),
        password: $('#password').val(),
        uid: 0
    };
	auth.createUserWithEmailAndPassword(userData.email, userData.password)
	.then(function(user){
        console.log(user);
        userData.uid = user.user.uid;
        $.post("api/users", userData)
        .then(function() {
            window.location.href = "datasets"; //redirects user to datasets page
        });
  
         
	})
	.catch(function(error){
		alert(error);
	});
	
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