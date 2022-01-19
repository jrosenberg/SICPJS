// Qn 1

function biggie_size(meal) {
    return meal > 0 && meal < 9
        ? meal + 4
        : 0;
}
display(biggie_size(1));

// Qn 2

function unbiggie_size(meal) {
    return meal - 4;
}
display(unbiggie_size(5));

// Qn 3

function is_biggie_size(meal) {
    return meal>=5 ? true : false;
}
display(is_biggie_size(5));
display(is_biggie_size(3));

// Qn 4

function combo_price(meal) {
    return is_biggie_size(meal)
        ? 0.50 + (1.17 * unbiggie_size(meal))
        : 1.17 * meal;
}
display(combo_price(3));
display(combo_price(5));

// Qn 5

function empty_order() {
    return 0;
}
display(empty_order());

// Qn 6

function add_to_order(order, combo) {
    return order * 10 + combo;
}

display(add_to_order(1,2));
display(add_to_order(23,4));

// Qn 7
function last_combo(order) {
    return (order % 10);
}

display(last_combo(321));
display(last_combo(3426));

// Qn 8
function other_combos(order) {
    return (order - last_combo(order)) / 10;
}

display(other_combos(5432));
display(other_combos(543));