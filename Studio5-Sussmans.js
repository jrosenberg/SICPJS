// Shared Session


/*
QUESTION 1
//const increment_repeater =
//    repeater => f => x => repeater(f)(f(x)) ;
    

function compose(f, g) {
    return x => f(g(x)) ;
}
function square(x) { return x*x ; }
compose(math_sqrt, square)(4) ;

const increment_repeater =
    repeater => f => compose(f, repeater(f));
    
    
const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT");          // should display "ALERT" 
                        // three times in orange
const bigwarn = fourtimes(display);
bigwarn("A L E R T");   // should display "A L E R T" 
                        // four times in orange
                        // (the REPL will display 
                        // "A L E R T"a fifth time 
                        // [in white] as the value 
                        // returned by bigwarn)
*/

// QUESTION 2

const pair = (x, y) => f => f(x, y);
		
//const head = p => (x, y) => x;  // complete lambda expression
//const tail = p => (x, y) => y;  // complete lambda expression

// a pair (the result of calling pair) takes in a selector
// and applies it to the arguments that were given to the pair constructor

const head = p => p((x,y)=>x);
const tail = p => p((x,y)=>y);

display(head(pair(1, 2)) === 1); // should return true
tail(pair(1, 2)) === 2; // should return true

// GJS would name some of the anonymous functions 
// e.g. (x,y) => x would be x_selector


// QUESTION 3

const decrement_repeater =
    repeater =>
        head(repeater(p => pair(tail(p),
                                increment_repeater(tail(p))
                                )
                     )
             (pair(zero_repeater, zero_repeater))
            );
            
decrement_repeater(thrice);




