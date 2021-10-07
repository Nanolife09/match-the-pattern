var game_playing = false;
const colors = [];
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
	window.setTimeout(() => {
        document.getElementById("game").style.display = "none";
        document.getElementById("victory_menu").style.display = "flex";
        victory();
    }, 1000);
}

function when_tile_clicked () {
	if (game_playing) {
		counter++;
	}
    index = colors.indexOf(this.style.backgroundColor);
    this.style.backgroundColor = colors[(index + 1) % colors.length];
    for (let firstIdDigit = 0; firstIdDigit < 3; firstIdDigit++) {
        for(let secondIdDigit = 0; secondIdDigit < 3; secondIdDigit++) {
            var adjacent_box = "" + firstIdDigit + secondIdDigit;
            if (firstIdDigit == Number(this.id[0]) + 1 || firstIdDigit == Number(this.id[0]) - 1) {
                if (secondIdDigit == Number(this.id[1])) {
                    index = colors.indexOf(getElementById(adjacent_box).style.backgroundColor);
		            getElementById(adjacent_box).style.backgroundColor = colors[(index + 1) % colors.length];
                }
            }
            else if (secondIdDigit == Number(this.id[1]) + 1 || secondIdDigit == Number(this.id[1]) - 1) {
                if (firstIdDigit == Number(this.id[0])) {
                    index = colors.indexOf(document.getElementById(adjacent_box).style.backgroundColor);
		            getElementById(adjacent_box).style.backgroundColor = colors[(index + 1) % colors.length];
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
    let color_choices = ["orange", "black", "green", "blue", "aqua", "yellow", "purple", "pink"];
    let index1 = Math.floor(Math.random() * color_choices.length);
    colors.push(color_choices[index1]);
    color_choices.splice(index1, 1)
    colors.push(color_choices[Math.floor(Math.random() * color_choices.length)]);
	var container = getElementById("table");
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			color = colors[Math.floor(Math.random() * colors.length)];
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
			color = colors[Math.floor(Math.random() * colors.length)];
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
	document.getElementById("time").innerHTML = "Time Remaining: " + getTime();
}

function save_replay_initial(){
	
}