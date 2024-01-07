var text = ["STUDENT", "FRONTEND DEVELOPER", "MUSIC DEVELOPER"];
var counter = 0;
var elem = document.getElementById("rotate");
var inst = setInterval(change, 1000);

function change() {
    elem.innerHTML = text[counter];
    counter++;
    if (counter >= text.length) {
        counter = 0;
        // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
    }
}