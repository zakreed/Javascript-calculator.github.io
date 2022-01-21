// EQUALS 

const equals = document.getElementById('=');
equals.addEventListener('click', function(){
    if (!is_valid(history))
        document.getElementById("result").innerHTML = "Invalid";
    else{
        expr = toRPN(history);
        res = calculate(expr);
        document.getElementById("result").innerHTML = res;
        }
})

// CHECK IF INPUT A VALID CALCULATION

function is_valid(s){
    let operators = new Set();
    operators.add("-");
    operators.add("+");
    operators.add("*");
    operators.add("/");
    for (i=0; i<s.length; i++){
        if (i==0 && operators.has(s[i]) && s[i] != '-' && s[i] != '+')
            return false;
        else if (i==s.length-1 && operators.has(s[i]))
            return false;
        else if (operators.has(s[i]) && operators.has(s[i-1]))
            return false;
    }
    return true;
}

// RPN EVALUATOR

function calculate(s){
    stack = new Array();
    for (i=0; i<s.length; i++){
        if (s[i][0] >= '0' && s[i][0] <= '9')
            stack.push(parseFloat(s[i], 10));
        else{
            b = parseFloat(stack.pop(), 10);
            a = parseFloat(stack.pop(), 10);
            let res = 0;
            switch(s[i]){
                case '+':
                    res = a+b;
                    break;
                case '-':
                    res = a-b;
                    break;
                case '/':
                    res = a/b;
                    break;
                case '*':
                    res = a*b;
                    break;
            }
            stack.push(res);
        }
    }
    return stack.pop();
}

// SHUNTING YARD ALGORITHM (convert infix notation to RPN)

function toRPN(s) {
    s = s.match(/\+|\/|\-|\*|[0-9]*[.[0-9]*]?/g);
    s = s.filter(x => x != "");
    if (s[0] == '-' || s[0] == '+'){
        s.unshift('0');
    }

    stack = new Array();
    queue = new Array();
    const order = new Map();
    order.set('*', 2);
    order.set('/', 2);
    order.set('%', 2);
    order.set('+', 1);
    order.set('-', 1);
    for (i=0; i<s.length; i++){
        if (order.has(s[i])){
            if (stack.length>0 && order.get(stack[stack.length-1]) >= order.get(s[i]))
                while (order.get(stack[stack.length-1]) >= order.get(s[i]) || stack.length > 0)
                    queue.push(stack.pop());
            stack.push(s[i]);
        } else
            queue.push(s[i]);
        console.log("stack", stack, "queue", queue);
    }
    while (stack.length>0)
        queue.push(stack.pop());

    return queue;
}

// HISTORY 

const history_buttons = document.getElementsByClassName('history_log');
const clear = document.getElementById('C');
const clear_entry = document.getElementById('CE');

let history = "";
var history_log = function() { history += this.id; };

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
