var db = firebase.database();

var objectRec;
fetch();

//abhishek18296@gmail.com

function fetch(){
    var userId = localStorage['objectToPass'];
    // localStorage.removeItem( 'objectToPass' );
    var ref = db.ref("Registration/" + userId);
    ref.on("value", gotOne, errData);

    /*
    ref.update({
        fine : {
            y2018 : {
                JAN : 1000,
                FEB : 220,
                MAR : 300,
                APR : 40,
                MAY : 5000,
                JUN : 750,
                JUL : 1000,
                AUG : 100,
                SEP : 0,
                OCT : 10,
                NOV : 110,
                DEC : 10
            }
        }
    });
    */
    
}

function gotOne(data){
    objectRec = data.val();
    document.getElementById("userName").innerHTML = objectRec.FName + " " + objectRec.MName + " " + objectRec.LName;
    document.getElementById("userName").style.visibility = "visible";
    autoType(".type-js",200);
}
function errData(err){
    console.log(err);
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