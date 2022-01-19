import { quarter_turn_right, from_url, red, rcross, sail, corner, nova, heart, show } from "rune";

const mit = from_url("https://i.imgur.com/deaPdki.jpg");

const myrune =
    quarter_turn_right(sail);
        
//show(myrune);

function turn_upside_down(picture) {
    return quarter_turn_right(
        quarter_turn_right(picture));
}
// example use:
show(turn_upside_down(heart));

stack(rcross, sail);