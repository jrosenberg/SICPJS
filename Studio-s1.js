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

