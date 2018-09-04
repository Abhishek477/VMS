console.log(firebase);
var db = firebase.database();


function dataStore(){
  var FName =  document.getElementById('FName').value;
  var MName =  document.getElementById('MName').value;
  var LName =  document.getElementById('LName').value;
  var dob =  document.getElementById('DOB').value;
  var DLNo =  document.getElementById('DLNo').value;
  var VRNo =  document.getElementById('VRNo').value;
  var VManu =  document.getElementById('VManu').value;
  var VModel =  document.getElementById('VModel').value;
  var email =  document.getElementById('email').value;
  var password =  document.getElementById('password').value;

  var user = {
    FName : FName,
    MName : MName,
    LName : LName,
    DOB : dob,
    DLNo : DLNo,
    VRNo : VRNo,
    VManu : VManu,
    VModel : VModel,
    Email : email,
    Password : password
  };
  var ref = db.ref("Registration/" + Date.now());
  ref.set(user)
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  
}
