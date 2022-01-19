import { stack_frac, stackn, stack, quarter_turn_left, quarter_turn_right, from_url, red, rcross, sail, corner, nova, heart, show } from "rune";

const mit = from_url("https://i.imgur.com/deaPdki.jpg");

const myrune =
    quarter_turn_right(sail);
        
//show(myrune);

function turn_upside_down(picture) {
    return quarter_turn_right(
        quarter_turn_right(picture));
}
// example use:
//show(turn_upside_down(heart));

//show(stack(rcross, sail));

function beside(rune1, rune2) {
    return quarter_turn_left(
        stack(quarter_turn_right(rune1),
              quarter_turn_right(rune2)));
}

// example use:
show(beside(rcross, sail));
// should show rcross on left
//      and sail on right

const my_quilt =
   stackn(5,
        quarter_turn_right(
            stackn(7,quarter_turn_left(heart))));

show(my_quilt);

function quilt(n, m, rune) {
    return stackn(n,
        quarter_turn_right(
            stackn(m,
                quarter_turn_left(rune))));
}

show(quilt(5,2,heart));


function make_cross(rune) {
    return stack(beside(quarter_turn_right(rune),
                            turn_upside_down(rune)),
                beside(rune,
                        quarter_turn_left(rune)));
}

show(make_cross(make_cross(heart)));

//stack_frac(r, heart, sail)

show(stack_frac(87 / 100, heart, sail));