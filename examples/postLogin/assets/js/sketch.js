var db = firebase.database();

var objectRec, userData;
var usrID = localStorage['objectToPass'];
refDB = db.ref("Registration/" + usrID + "/accType");
refDB.on("value", function(snapshot) {
    userData = snapshot.val();
});
fetch();


//abhishek18296@gmail.com

function fetch(){
    if (localStorage.getItem("objectToPass") === null) {
        window.alert("Login to continue....");
        window.location.href = '/VMS/examples/login-page.html';
    }

    var userId = localStorage['objectToPass'];
    // localStorage.removeItem( 'objectToPass' );
    var ref = db.ref("Registration/" + userId);
    ref.on("value", gotOne, errData);

    /*
    ref.update({
        Category : "Helmet",
        Place : "Station",
        Amount : 100
    });
    */
    
}

function gotOne(data){
    objectRec = data.val();
    document.getElementById("userName").innerHTML = objectRec.FName + " " + objectRec.MName + " " + objectRec.LName;
    document.getElementById("userName").style.visibility = "visible";
    document.getElementById("tktNo").innerHTML = "FINE TICKET #" + objectRec.TktNo;
    autoType(".type-js",200);
    if(userData == "driver" && document.getElementById("headLabel").innerText === "DASHBOARD")
        displayTable();
    if(document.getElementById("headLabel").innerText === "HISTORY")
        if(userData == "driver")
            displayHistoryTableD();
        else
            displayHistoryTableO();
    if(document.getElementById("headLabel").innerText === "PROFILE")
        displayUserForm();
}
function errData(err){
    console.log(err);
}


function displayUserForm(){
    document.getElementById("FName").value = objectRec.FName;
    document.getElementById("LName").value = objectRec.LName;
    document.getElementById("formDLNo").value = objectRec.DLNo;
    document.getElementById("DOB").value = objectRec.DOB;
    document.getElementById("Email").value = objectRec.Email;
    document.getElementById("Phone").value = objectRec.Phone;
    document.getElementById("VManu").value = objectRec.VManu;
    document.getElementById("VModel").value = objectRec.VModel;
    document.getElementById("VRNo").value = objectRec.VRNo;

     var preloader = $('.spinner-wrapper');
    preloader.fadeOut(500);
}



function displayTable(){
    var mnt = "SEP";
    var keys,tableCnt = "";
    var userId1 = localStorage['objectToPass'];

    var refDB = db.ref("Registration/" + userId1 + "/Fine/y2018/" + mnt);
    refDB.on("value", function(snapshot) {
    var chartData = snapshot.val();
    keys = Object.keys(chartData);
    });
    for(var j = 0; j < keys.length; j++){
    refDB = db.ref("Registration/" + userId1 + "/Fine/y2018/" + mnt + "/" + keys[j]);
    
    refDB.on("value", function(snapshot) {
        var chartData = snapshot.val();
        tableCnt += "<tr><td>" + keys[j] + "</td><td>" + chartData.date + "</td><td>" + chartData.Category + "</td><td>" + chartData.Place + "</td><td class='text-right'>&#8377 " + chartData.Amount + "</td></tr>";
    });
    }
    var tBody = document.getElementById("tableBody")
    if(tBody)   tBody.innerHTML = tableCnt;
  }



  function displayHistoryTableD(){
    var i,j,k;
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var keys,keys2,keys3,tableCnt = "";
    var userId1 = localStorage['objectToPass'];

    var refDB = db.ref("Registration/" + userId1 + "/Fine");
    refDB.on("value", function(snapshot) {
    var chartData = snapshot.val();
    keys = Object.keys(chartData);
    console.log(keys);
    });
    for(i = keys.length-1; i >= 0; i--){
        refDB = db.ref("Registration/" + userId1 + "/Fine/" + keys[i]);
        refDB.on("value", function(snapshot) {
            var chartData = snapshot.val();
            keys2 = Object.keys(chartData);
            var lmt = 11;
            if(keys[i] == "y2018")
                lmt = 8;
            else
                lmt = 0;                        //Remove this else when "y2017" has all months defined in Firebase
            for(j = lmt; j >= 0; j--){
                var tt = 0;
                while(tt < 12 && keys2[tt] != months[j]){tt++;}
                refDB = db.ref("Registration/" + userId1 + "/Fine/" + keys[i] + "/" + keys2[tt]);
                refDB.on("value", function(snapshot) {
                    var chartData = snapshot.val();
                    keys3 = Object.keys(chartData);
                    for(k = keys3.length - 1; k >= 0; k--){
                        refDB = db.ref("Registration/" + userId1 + "/Fine/" + keys[i] + "/" + keys2[tt] + "/" + keys3[k]);
                        refDB.on("value", function(snapshot) {
                            var chartData = snapshot.val();
                            tableCnt += "<tr><td>" + keys3[k] + "</td><td>" + chartData.date + "-" + keys[i].substring(3) + "</td><td>" + chartData.Category + "</td><td>" + chartData.Place + "</td><td class='text-right'>&#8377 " + chartData.Amount + "</td></tr>";
                        });
                    }
                });
            }
        });
    }
    document.getElementById("historyTable").innerHTML = tableCnt;
    
    var preloader = $('.spinner-wrapper');
    preloader.fadeOut(500);
  }

function displayHistoryTableO(){
    console.log("Official's History displayed!");
    var preloader = $('.spinner-wrapper');
    preloader.fadeOut(500);
}


function acceptFine(){
    var FName = document.getElementById("FName").value;
    var DLNo = document.getElementById("DLNo").value;
    var VRNo = document.getElementById("VRNo").value;
    var fineVal = document.getElementById("fineVal").value;
    var fineReason = document.getElementById("fineReason").value;
    var fineLoc = document.getElementById("fineLoc").value;
    var fineDate = document.getElementById("fineDate").value;

    if(DLNo == "" || VRNo == "" || fineVal == "" || FName == "" || fineReason == "" || fineLoc == "" || fineDate == ""){
        window.alert("Empty fields!");
        window.location.reload();
        return;
    }
     var ticketObj = {
        FName : FName,
        DLNo : DLNo,
        VRNo : VRNo,
        fineVal : fineVal,
        fineReason : fineReason,
        fineLoc : fineLoc,
        fineDate : fineDate
    };
     var ref = db.ref("Registration/" + usrID + "/Tickets/" + objectRec.TktNo);
    ref.set(ticketObj)
    .then(function() {
        console.log("Fine Ticket successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing Fine Ticket : ", error);
    });
     var ref = db.ref("Registration/" + usrID);
    ref.update({"TktNo" : objectRec.TktNo + 1});
     window.alert("Fine Ticket registered! An Email has been sent to Driver.");
    window.location.reload();
}









function gotoDashboard(){
    if(userData == "driver")
        window.location.href = './dashboardD.html';
    else
        window.location.href = './dashboardO.html';
}



function logoutStuff(){
    localStorage.removeItem( 'objectToPass' );
    window.location.href = '/VMS/examples/landing-page.html';
}




































function autoType(elementClass, typingSpeed){
    var thhis = $(elementClass);
    thhis.css({
        "position": "relative",
        "display": "inline-block"
    });
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".text-js");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function(){
        thhis.css("opacity",1);
        thhis.prev().removeAttr("style");
        // thhis.text("");
        for(var i = 0; i < amntOfChars; i++){
        (function(i,char){
            setTimeout(function() {        
            newString += char;
            thhis.text(newString);
            },i*typingSpeed);
        })(i+1,text[i]);
        }
    },1500);
}