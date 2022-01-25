//Lecture 4

//Defining Curves
function unit_circle(t) {
    return make_point(math_cos(2 * math_PI * t),
 }
function unit_line_at(y) {
    return t => make_point(t, y);
}
const unit_line = unit_line_at(0);

//Examples
draw_connected(200)(unit_circle);


draw_connected_full_view_proportional(200)
    (unit_circle);

draw_connected_full_view_proportional(8)
    (unit_circle);

//Spiral curves
//Solution
function spiral_one(t) {
    const p = unit_circle(t);
    return make_point(t * x_of(p), t * y_of(p));
}

draw_connected_full_view_proportional(200)(spiral_one);
   
   
//Attempt #1
function spiral(rev, t) {
    const p = unit_circle((t * rev) % 1);
    return make_point(t * x_of(p), t * y_of(p));
}

draw_connected_full_view_proportional(200)(spiral);

//Attempt #2
function spiral(rev) {
    return t => {
        const p = unit_circle((t * rev) % 1);
        return make_point(t * x_of(p), t * y_of(p)); };
}
draw_connected_full_view_proportional(200)(spiral(4));

//Example: Spiral Curves
draw_connected_full_view_proportional(200)(spiral(33));

draw_connected_full_view_proportional(2000)(spiral(33));

//Transformations on Curves
const rot_line =
    rotate_around_origin(0, 0, math_PI / 6)(unit_line);

const shifted_rot_line =
    translate(0, 0.25, 0)(rot_line);

draw_connected(200)(shifted_rot_line);

//Transformations on Curves (alternative)
function compose(f, g) {
    return x => f(g(x));
}
const shift_rot =
    compose(translate(0, 0.25, 0),
        rotate_around_origin(0, 0, math_PI / 6));

const shifted_rot_line = shift_rot(unit_line);

draw_connected(200)(shifted_rot_line);

//Connecting Curves
function connect_rigidly(curve1, curve2) {
    return t => t < 1/2
        ? curve1(2 * t)
        : curve2(2 * t - 1);
}

const result_curve =
    connect_rigidly(arc, translate(1, 0, 0)(arc));

draw_connected_full_view_proportional(200)
    (result_curve)
    
//Colored Curves
function colorful_spiral(rev) {
    return t => {
        const p = unit_circle((t * rev) % 1);
        const R = math_max(0, 1 - 2 * t) * 255;
        const G = (1 - math_abs(1 - 2 * t)) * 255;
        const B = math_max(0, 2 * t - 1) * 255;
        return make_color_point(t * x_of(p), t * y_of(p),
                                R, G, B);
    };
}
 
draw_connected_full_view_proportional(2000)
    (colorful_spiral(33));

//3D Curves
function colorful_3D_spiral(rev) {
    return t => {
        const p = unit_circle((t * rev) % 1);
        const R = math_max(0, 1 - 2 * t) * 255;
        const G = (1 - math_abs(1 - 2 * t)) * 255;
        const B = math_max(0, 2 * t - 1) * 255;
        return make_3D_color_point(
            t * x_of(p), t * y_of(p), 2 * t, R, G, B);
    };
}

draw_3D_connected_full_view_proportional(2000)
    (colorful_3D_spiral(33));