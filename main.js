const equals = document.getElementById('=');
const history_buttons = document.getElementsByClassName('history_log');
const clear = document.getElementById('C');
const clear_entry = document.getElementById('CE');

equals.addEventListener('click', function(){
    document.getElementById("result").innerHTML = eval(history);
})

let history = "";
let history_log = function() { history += this.id; };

clear_entry.addEventListener('click', function(){
    history=history.substring(0, history.length - 1);
})

clear.addEventListener('click', function(){
    history = "";
    document.getElementById("result").innerHTML = "";
})

document.onclick = function(){
    if (history)
        document.getElementById("history").innerHTML = history;
    else
        document.getElementById("history").innerHTML = "...";
}

Array.from(history_buttons).forEach(function(history_buttons) {
      history_buttons.addEventListener('click', history_log);
});
