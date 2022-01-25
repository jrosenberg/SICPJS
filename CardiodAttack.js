// some fun with the unit circle

import { make_point, 
         draw_connected_full_view, draw_points_full_view
} from "curve";		

function unit_circle(t) {
  return make_point(math_cos(2 * math_PI * t), 
                    math_sin(2 * math_PI * t));
}

//draw_points_full_view(10)(unit_circle);
//draw_connected_full_view(10)(unit_circle);

const draw_numbers = 
    n => draw_points_full_view(n)(unit_circle);

//draw_numbers(5); // draws five points

const connect_numbers = 
    n => draw_connected_full_view(n)(unit_circle);

//connect_numbers(5); // draws a pentaGON

const connect_results =
    (n, f) =>
        draw_connected_full_view(n)
        (t => unit_circle(f(math_round(t * n)) / n));

//connect_results(5, k => 2 * k); // draws a pentaGRAM

const star =
   (n, step) => 
       connect_results(n, k => step * k);

//star(200, 71); // draws a star with 11 corners and step size 4

const fan =
    blades => connect_results(
                  blades * 2,
                  k => k % 2 === 1 ? k : 0
                 );
                         
//fan(20); // draws a fan with 4 blades

const wheel =
    spokes => connect_results(
                  spokes * 3,
                  k => { const v = 3 * math_round((k - 1) / 3);
                         return k % 3 === 1 ? v + spokes * 3 / 2 : v; 
                  }
                 );
                         
//wheel(400); // draws a wheel with 100 spokes

const connect_laps =
    (n, g) =>
    connect_results(n * 3,
                    k => { const v = math_round((k - 1) / 3);
                           return k % 3 === 1 ? g(v)*3 : v * 3; 
                    }
                   );

//connect_laps(8, k => k + 4); // draws wheel with 8 spokes

//connect_laps(5, k => k + 2); // pentagram within pentagon

//watch https://www.youtube.com/watch?v=qhbuKbxJsk8

const draw_times_table =
    (n, m) => connect_laps(n, k => k * m);
    
//draw_times_table(100, 2);      // m = 2: cardioid: 1 lobe
//draw_times_table(100, 3);      // m = 3: nephroid: 2 lobes
//draw_times_table(100, 4);      // m = 4: 3 lobes...

//draw_times_table(397, 200);    // m = (n + 3) / 2: cardioid
//draw_times_table(500, 252);    // m = (n + 4) / 2: nephroid
//draw_times_table(501, 253);    // m = (n + 5) / 2: 3 lobes...

//draw_times_table(500, 168);    // m = (n + 4) / 3: cardioid
//draw_times_table(295, 100);    // m = (n + 5) / 3: nephroid
//draw_times_table(594, 200);    // m = (n + 6) / 3: 3 lobes...

//draw_times_table(395, 100);    // m = (n + 5) / 4: cardioid
//draw_times_table(494, 100);    // m = (n + 6) / 5: cardioid
//draw_times_table(593, 100);    // m = (n + 7) / 6: cardioid...

// also nice:
//draw_times_table(400, 201);    // m = n / 2 + 1 (/4,/8,/16)
draw_times_table(200, 99);     // m = (n / 2) - 1: square pattern

