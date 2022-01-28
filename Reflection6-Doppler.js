import { 
    play as sound_play,
    make_sound, get_wave,
    make_stereo_sound
} from "stereo_sound";

// see paper "Teachable Moments in Functional Audio Processing"
// https://www.comp.nus.edu.sg/~henz/publications/index.html#splasheteachable2021.abstract

const π = math_PI;
const square = x => x * x;
const play = (w, d) => sound_play(make_sound(w, d));
const play_stereo = (w1, w2, d) => 
                       sound_play(make_stereo_sound(w1, w2, d));

//play(t => math_sin(2 * π * t * 440), 3);

const sine_wave = f => t => math_sin(2 * π * t * f);

//play(sine_wave(440), 2);

// show sampled amplitudes when playing
const displaying_sine_wave = f => t => 
                             display(math_sin(2 * π * t * f));
//play(displaying_sine_wave(440), 0.0001);                       

//play_stereo(sine_wave(440), sine_wave(660), 2);

// white noise
const noise = t => math_random() * 2 - 1;

//play(noise, 2);

function american_police_siren(base_freq, mod_freq, mod_ind) {
    return t => math_sin(2 * π * t * base_freq - 
                         mod_ind * math_sin(2 * π * t * 
                                            mod_freq));
}

const boston_police_siren = american_police_siren(900, 3, 30);
//play(boston_police_siren, 3);

/*play_stereo(american_police_siren(1100, 2, 30), 
            american_police_siren(1300, 3, 30), 
            2);
*/

// fast_forward returns a wave transformation
// that shrinks time by a given factor
function fast_forward(r) {
    return w => t => w(t * r);
}
//play(boston_police_siren, 3);
//play(fast_forward(1.2)(boston_police_siren), 3);

// does this work for noise?

//play(noise, 2);
//play(fast_forward(2)(noise), 2);

//
// Basics
//

// delay returns a wave transformation that
// delays a given wave by d seconds
function delay(d) {
    return w => t => t < d ? 0 : w(t - d);
}

const delay_1 = delay(2);

//play(delay_1(sine_wave(1000)), 3);

// cut returns a wave transformation that
// cuts a given wave so that it starts at time
// t_start and ends at time t_end
function cut(t_start, t_end) {
    return w => t => (t < t_start || t > t_end) ? 0 : w(t);
}

//play(cut(1, 1.2)(sine_wave(1000)), 3);

// binary operator on waves: add amplitudes together
function add(w1, w2) {
    return t => (w1(t) + w2(t)) / 2;
}

const short_high = cut(0, 0.5)(sine_wave(1000));

const long_low = cut(0, 1)(sine_wave(500));

//play(long_low, 4);

//play(add(short_high, delay(0.2)(long_low)), 3);

//play_stereo(short_high, delay(0.1)(long_low), 3);

// compose two waves sequentially, 
// the second wave with delay d seconds
function consecutive(w1, d, w2) {
    return add(cut(0, d)(w1), delay(d)(w2));
}

const german_fire_engine = 
consecutive(add(sine_wave(435), sine_wave(450)), 1,
            add(sine_wave(580), sine_wave(600)));
//play(german_fire_engine, 2);            
// 435 Hz + 450 Hz und 580 Hz + 600 Hz

// repeat_every returns a wave transformation
// that repeats a given wave every d seconds
function repeat_every(d) {
    return w => t => w(t % d);
}

//play(repeat_every(2)(german_fire_engine), 8);

// sads returns a wave transformation that
// ramps up the volume from zero at t1 to
// max at t2 and then fades to zero at t3
function sads(t1, t2, t3) {
    const a1 = 1 / (t2 - t1);
    const b1 = - t1 / (t2 - t1);
    const a2 = 1 / (t2 - t3);
    const b2 = - t3 / (t2 - t3);
    return w => t => t < t1 
                     ? 0
                     : t < t2
                     ? w(t) * (a1 * t + b1)
                     : t < t3
                     ? w(t) * (a2 * t + b2)
                     : 0;
}

// a snare drum
const snare_drum = sads(0, 0.005, 0.2)(noise);
//play(snare_drum, 1);

const pongo_wave = add(add(sine_wave(167), sine_wave(191)),
                       add(sine_wave(207), sine_wave(134)));

//play(pongo_wave, 1);

const pongo_drum = sads(0, 0.005, 0.2)(pongo_wave);
//play(pongo_drum, 1);

const rhythm = consecutive(pongo_drum, 0.5, snare_drum);
//play(rhythm, 1);

const repeated_rhythm = repeat_every(1)(rhythm);
//play(repeated_rhythm, 4);

// ratio of two neighboring notes in equal temperament
const semitone = math_pow(2, 1/12);

// base frequency A3 
const a = 220;
const a_sharp       = a * math_pow(semitone, 1);
const b             = a * math_pow(semitone, 2);
const c             = a * math_pow(semitone, 3);
const c_sharp       = a * math_pow(semitone, 4);
const d             = a * math_pow(semitone, 5);
const d_sharp       = a * math_pow(semitone, 6);
const e             = a * math_pow(semitone, 7);
const f             = a * math_pow(semitone, 8);
const f_sharp       = a * math_pow(semitone, 9);
const g             = a * math_pow(semitone, 10);
const g_sharp       = a * math_pow(semitone, 11);
const next_a        = a * math_pow(semitone, 12);
const next_a_sharp  = a * math_pow(semitone, 13);
const next_b        = a * math_pow(semitone, 14);
const next_c        = a * math_pow(semitone, 15);
const next_c_sharp  = a * math_pow(semitone, 16);
const next_d        = a * math_pow(semitone, 17);
const next_d_sharp  = a * math_pow(semitone, 18);

// instruments have characteristic "overtones"
// often multiples of the base note
const organ = f => d => sads(0, 0.1, d)
                            (add(sine_wave(f),
                                 add(sine_wave(f * 2),
                                     sine_wave(f * 4))));

//play(organ(c)(0.5), 1);

// a song played on an organ
const $ = consecutive;
const happy = $(organ(g)(0.3),0.3,
                $(organ(g)(0.3),0.3,
                  $(organ(next_a)(0.6),0.6,
                    $(organ(g)(0.6),0.6,
                      $(organ(next_c)(0.6),0.6,
                        organ(next_b)(1.2))))));
//play(happy, 5);                  

// doppler returns a wave transformation
// that starts shrinking time at t1 and
// reaches a maximal shrinking factor max
// at time t2
function doppler(max, t1, t2) {

    return w => t => w(t + ???);
}

//play(doppler(-0.1, 1, 2)(sine_wave(1000)), 3);
