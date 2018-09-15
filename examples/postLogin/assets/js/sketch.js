var db = firebase.database();

var objectRec;
fetch();


//abhishek18296@gmail.com

function fetch(){
    if (localStorage.getItem("objectToPass") === null) {
        window.alert("Login to continue....");
        window.location.href = '/examples/login-page.html';
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
    autoType(".type-js",200);
    if(document.getElementById("headLabel").innerText === "DASHBOARD")
        displayTable();
    if(document.getElementById("headLabel").innerText === "HISTORY")
        displayHistoryTable();
}
function errData(err){
    console.log(err);
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
    document.getElementById("tableBody").innerHTML = tableCnt;
  }



  function displayHistoryTable(){
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
                lmt = 0;
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
    var ldr = document.getElementById('ldr').style = "visibility: hidden";
  }



function logoutStuff(){
    localStorage.removeItem( 'objectToPass' );
    window.location.href = '/examples/landing-page.html';
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