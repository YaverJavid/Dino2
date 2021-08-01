//var audio = new Audio("Sounds/Jump.wav");
var player_score = [],
    map = [],
    condition = [];
map.game_start = !1;
preparation();

function clock() {
    jumpaction();
    putonmap();
    enemy_move();
    collision()
}

function preparation() {
    init_map();
    init_obj_on_map();
    init_event();
    var a = init_player();
    a.position.y += a.height_jump;
    preparation_text();
    init_style_player(a);
    init_speed_distance()
}

function clock_game() {
    clock();
    map.game_stop || (map.time += map.time_clock * Math.pow(10, -3), re_distandspeed(), speed_and_distance(), map.time_clock -= map.player.distance * Math.pow(10, -6), map.timeout = setTimeout(clock_game, map.time_clock))
}

function start_game() {
    init_style_enemy(f_enemy(0));
    clock_game()
}

function game_stop() {
    clearTimeout(map.timeout);
    end_game_text();
    map.game_stop = !0;
    setTimeout(function() { map.game_start = !1 }, 1E3)
}

function random(a, b) { return b - Math.random() * (b - a) }

function f_enemy_id(a) { return map.enemys[a].id }

function f_enemy(a) { return map.enemys[a] }

function f_player(a) { return null != a && "" != a ? map.player[a] : map.player }

function position(a, b) { return a.position[b] }

function error_msg(a) { null == a ? console.log("Unknown error") : console.log(a) }

function end_game_text() {
    document.getElementById("gamezone").classList.add("end_gamezone");
    document.getElementById("gamezone").insertAdjacentHTML("beforeend", "<span class='end_text'>Game Over            Try Again</span>")
}

function preparation_text() { document.getElementById("gamezone").insertAdjacentHTML("beforeend", "<span class='begin_text'>PRESS ANYWHERE TO START</span>") }

function speed_and_distance() {
    document.getElementById("speed").innerHTML = "SPEED: " + Math.round(map.player.speed) + " (MPH)";
    document.getElementById("time").innerHTML = "     SCORE: " + Math.floor(map.time.toFixed(1)) + " (Points)";
    document.getElementById("distance").innerHTML = "DISTANCE: " + (Math.round(map.player.distance) * Math.pow(10, -3)).toFixed(2) + " (Mi.)"
}
player_score = [];
map = [];
condition = [];
map.game_start = !1;
preparation();
//var playx = function() {
//  (new Audio("Sounds/Collision.mp3")).play()
//};

function collision() { for (var a = 0; a < map.enemys.length; a++) re_location(f_enemy(a)), f_enemy(a).location.x_front >= map.player.location.x_front && !(f_enemy(a).location.x_back > map.player.location.x_back) && (f_player().obj_andr_player = !0, f_player().position.y + f_player().height > f_enemy(a).position.y && (game_stop(), playx(), navigator.vibrate([500]))), f_enemy(a).location.x_back > map.player.location.x_back && (map.player.obj_andr_player = !1) }

function change_of_day() {
    if (map.time > condition.change_of_day)
        for (var a = 0; a < map.enemys.length; a++);
}

function enemy_move() { for (var a = 0; a < map.enemys.length; a++) f_enemy(a).init && (f_enemy(a).position.x += f_enemy(a).speed, f_enemy_id(a).style.right = f_enemy(a).position.x) }

function jumpup() {
    map.game_start ? condition.jump || condition.fall ? condition.exp < condition.jump_speed / 2 && condition.fall && (condition.delayed_jump = !0) : condition.jump = !0 : init_obj_game();
  //  audio.play()
}

function putonmap() { for (var a = 0; a < map.enemys.length; a++) f_enemy(a).init || (0 == a ? f_enemy(2).position.x > f_enemy(a).delay && init_style_enemy(f_enemy(a)) : f_enemy(a - 1).position.x > f_enemy(a).delay && init_style_enemy(f_enemy(a))); for (a = 0; a < map.enemys.length; a++) map.width < f_enemy(a).position.x && delete_enemy_style(f_enemy(a)) }

function jumpaction() {
    condition.jump ? condition.exp <= condition.jump_speed && !condition.fall ? (condition.exp += .2, f_player("position").y = map.player.const_y + map.player.height_jump * Math.exp(-condition.exp)) : (condition.jump = !1, condition.fall = !0) : .23 <= condition.exp ? (condition.exp -= .23, f_player("position").y = map.player.const_y + map.player.height_jump * Math.exp(-condition.exp)) : (condition.exp = 0, f_player("position").y = map.player.const_y + map.player.height_jump * Math.exp(-condition.exp), condition.fall = !1, condition.delayed_jump &&
        (condition.jump = !0, condition.delayed_jump = !1));
    null == player && (game_stop(), error_msg());
    f_player().id.style.top = f_player("position").y + "px"
}

function create_enemy() {
    document.getElementById("gamezone").insertAdjacentHTML("beforeend", '<span id="enemy" class = "enemy"></span>');
    map.enemys[0] = init_enemy_obj(document.getElementById("enemy"));
    document.getElementById("gamezone").insertAdjacentHTML("beforeend", '<span id="enemy1" class = "enemy"></span>');
    map.enemys[1] = init_enemy_obj(document.getElementById("enemy1"));
    document.getElementById("gamezone").insertAdjacentHTML("beforeend", '<span id="enemy2" class = "enemy"></span>');
    map.enemys[2] = init_enemy_obj(document.getElementById("enemy2"))
}

function delete_enemy_style(a) {
    a.id.style.width = 0;
    a.id.style.height = 0;
    a.id.style.top = 0;
    a.id.style.right = 0;
    a.position.x = -40;
    a.height = random(40, 60);
    a.width = random(30, 50);
    a.position.y = map.height - a.height;
    a.delay = random(150, 300);
    a.init = !1
}

function init_style_enemy(a) {
    a.id.style.width = a.width;
    a.id.style.height = a.height;
    a.id.style.top = a.position.y;
    a.id.style.right = a.position.x;
    a.init = !0
}

function init_style_player(a) {
    a.id.style.width = a.width;
    a.id.style.height = a.height;
    a.id.style.top = a.position.y;
    a.id.style.left = a.position.x
}

function init_event() { document.getElementById("body").addEventListener("touchstart", jumpup) }

function re_location(a) {
    a.location.x_front = a.position.x + a.width;
    a.location.x_back = a.position.x
}

function re_distandspeed() {
    map.player.speed = f_enemy(0).speed / (map.time_clock * Math.pow(10, -3));
    map.player.distance = map.time * map.player.speed
}

function init_player() { return { height: 25, width: 25, position: { x: 10, y: map.height - 25 - 120 }, const_y: map.height - 25 - 120, id: document.getElementById("player"), height_jump: 120, location: { x_front: map.width - 10 - 25, x_back: map.width - 10 }, obj_andr_player: !1, distance: 0, speed: 0 } }

function init_status() { return { jump: !1, exp: 0, fall: !1, jump_speed: 2, delayed_jump: !1, change_of_day: 2 } }

function init_enemy_obj(a) {
    var b = random(40, 50),
        c = random(20, 20);
    return { height: b, width: c, position: { x: -40, y: map.height - b }, speed: 10, id: a, init: !1, delay: 200, location: { x_front: 0, x_back: 0 } }
}

function init_speed_distance() {
    document.getElementById("speed").style.top = map.height - map.heightobj;
    document.getElementById("distance").style.top = map.height - map.heightobj;
    document.getElementById("time").style.top = map.height - map.heightobj
}

function init_obj_on_map() { document.getElementById("gamezone").innerHTML = "<span id='player'></span>" }

function init_map() {
    map.id = document.getElementById("gamezone");
    map.position = map.id.getBoundingClientRect();
    map.enemys = [];
    map.heightobj = 200;
    map.id.style.height = map.heightobj;
    map.height = map.id.clientHeight + 1;
    map.width = map.id.clientWidth + 1;
    map.time_clock = 30;
    map.time = 0;
    map.game_stop = !1;
    map.id.className = ""
}

function init_obj_game() {
    map.game_start = !0;
    init_map();
    init_obj_on_map();
    var a = init_player();
    init_enemy_obj();
    condition = init_status();
    map.player = a;
    init_style_player(map.player);
    create_enemy();
    init_speed_distance();
    start_game()
};

function changeCharacter(Url) {
    document.getElementById("player").style.backgroundImage = `url(${Url})`
}