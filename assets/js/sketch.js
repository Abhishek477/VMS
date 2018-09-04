console.log(firebase);
var db = firebase.database();
var LoginEmail,LoginPassword;

function dataStore(){
  var FName     =  document.getElementById('FName').value;
  var MName     =  document.getElementById('MName').value;
  var LName     =  document.getElementById('LName').value;
  var dob       =  document.getElementById('DOB').value;
  var DLNo      =  document.getElementById('DLNo').value;
  var VRNo      =  document.getElementById('VRNo').value;
  var VManu     =  document.getElementById('VManu').value;
  var VModel    =  document.getElementById('VModel').value;
  var email     =  document.getElementById('email').value;
  var password  =  document.getElementById('password').value;
  var hash      =  window.btoa(password);
  //window.atob()

  var user = {
    FName     : FName,
    MName     : MName,
    LName     : LName,
    DOB       : dob,
    DLNo      : DLNo,
    VRNo      : VRNo,
    VManu     : VManu,
    VModel    : VModel,
    Email     : email,
    Password  : hash
  };
  var ref = db.ref("Registration/" + window.btoa(email));
  ref.set(user)
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  window.alert("You are registered. Click ok to Login.");
}

function retrieveData(){
  LoginEmail     =  document.getElementById('LoginEmail').value;
  LoginPassword  =  document.getElementById('LoginPassword').value;

  var ref = db.ref("Registration");
  ref.on('value', getData, errData);
}

function getData(data){
  var userCredentials = data.val();
  var keys = Object.keys(userCredentials);
  console.log(keys);
  var tmp = 0;
  for(var i = 0; i < keys.length; i++){
    if(keys[i] == window.btoa(LoginEmail)){
      window.alert("Found!");
      tmp = 1;
    }
  }
  if(tmp == 0)
    invalidCombo();
}

function errData(data){
  console.log("Error!");
  console.log(err);
}

function invalidCombo(){
  window.alert("Invalid credentials");
  window.location.reload();
}