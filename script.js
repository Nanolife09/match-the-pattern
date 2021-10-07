var game_playing = false;
const light_color = ['orange','black'];
var start = [];
var replay = [];

var index = 0;
let counter = 0;
let total_seconds = 1;

function getElementById (x){
    return document.getElementById(x);
}


function getTime() {
    seconds = total_seconds % 60;
    total_minutes = Math.floor(total_seconds / 60);
    minutes = total_minutes % 60;
    hours = Math.floor(total_minutes / 60);
    if (total_seconds == 0) {
        window.setTimeout(function(){
            alert("Times out...");
			game_playing = false;
            location.reload();
        }, 1)
    }
    return "" + hours + " : " + minutes + " : "  + seconds;
}

function check_solve() {
	var gameChildren = getElementById("table").children;
	var sampleChildren = getElementById("sample").children;
	for (let i = 0; i < 9; i++) {
		if (gameChildren[i].style.backgroundColor != sampleChildren[i].style.backgroundColor)
		return;
	}
	window.setTimeout(() => window.location.replace("victory.html"), 100);
}

function when_tile_clicked () {
	if (game_playing) {
		counter++;
	}
    index = light_color.indexOf(this.style.backgroundColor);
    this.style.backgroundColor = light_color[(index + 1) % light_color.length];
    for (let firstIdDigit = 0; firstIdDigit < 3; firstIdDigit++) {
        for(let secondIdDigit = 0; secondIdDigit < 3; secondIdDigit++) {
            var adjacent_box = "" + firstIdDigit + secondIdDigit;
            if (firstIdDigit == Number(this.id[0]) + 1 || firstIdDigit == Number(this.id[0]) - 1) {
                if (secondIdDigit == Number(this.id[1])) {
                    index = light_color.indexOf(getElementById(adjacent_box).style.backgroundColor);
		            getElementById(adjacent_box).style.backgroundColor = light_color[(index + 1) % light_color.length];
                }
            }
            else if (secondIdDigit == Number(this.id[1]) + 1 || secondIdDigit == Number(this.id[1]) - 1) {
                if (firstIdDigit == Number(this.id[0])) {
                    index = light_color.indexOf(document.getElementById(adjacent_box).style.backgroundColor);
		            getElementById(adjacent_box).style.backgroundColor = light_color[(index + 1) % light_color.length];
                }
            }
        }
    }
    display_click();
	check_solve();
}

function create_board() {
    var color;
    var item;
	var container = getElementById("table");
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			color = light_color[Math.floor(Math.random() * light_color.length)];
			item = document.createElement("div");
			item.id = "" + i + j;
			item.style.backgroundColor = color;
			item.onclick = when_tile_clicked;
			container.appendChild(item);
		}
	}
	var sample = getElementById("sample");
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			color = light_color[Math.floor(Math.random() * light_color.length)];
			item = document.createElement("div");
			item.style.backgroundColor = color;
			sample.appendChild(item);
		}
	}
}

function timer() {
	if (game_playing) {
    	total_seconds--;
	}
	getElementById("timer").innerHTML = "TIME: " + getTime();
    window.setTimeout(timer, 1000);
}

function bot() {
    let game = document.getElementById("table");
    game.children[Math.floor(Math.random() * game.children.length)].onclick();
    window.setTimeout(bot, 10);
}

function display_click() {
    getElementById("click").innerHTML = "You clicked: " + counter + " times";
}

function when_button_clicked (time) {
    getElementById("menu").style.display = "none";
    getElementById("container").style.display = "flex";
    total_seconds = time * 15 * 60;
	game_playing = true;
    create_board();
    timer();
    display_click();
   	//bot();
}

function menu () {
    var container = getElementById("menu");
    for (let i = 1; i <= 3; i++) {
        var option = document.createElement("button");
        option.innerHTML = (i * 15) + " minutes";
        option.id = "button" + i;
        option.style.width = "20vw";
        option.style.height = "20vh";
        option.style.fontSize = "2vw";
        option.onclick = () => when_button_clicked(i);
        container.appendChild(option);
    }
}

function victory () {
	display_click();
	timer();
}

function save_replay_initial(){
	
}