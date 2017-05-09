var cards = {
	// greens
	"4e0fef8b": { type: "green", tag:"<h1>"},
	"ae18ef8b": { type: "green", tag:"</h1>"},
	"ce1cef8b": { type: "green", tag:"<h2>"},
	"0efdee8b": { type: "green", tag:"</h2>"},
	"de0fef8b": { type: "green", tag:"<h3>"},
	"beff75b4": { type: "green", tag:"</h3>"},
	"5e25ef8b": { type: "green", tag:"<h4>"},
	"de08ef8b": { type: "green", tag:"</h4>"},
	"ae03ef8b": { type: "green", tag:"<h5>"},
	"5ef6ee8b": { type: "green", tag:"</h5>"},
	//red
	"1e02ef8b": { type: "red", tag:"em" },
	"5e23ef8b": { type: "red", tag:"em" },
	"fe24ef8b": { type: "red", tag:"i" },
	"8eef75b4": { type: "red", tag:"i" },
	"4e1d76b4": { type: "red", tag:"strong" },
	"3e4bef8b": { type: "red", tag:"strong" },
	"ee1d76b4": { type: "red", tag:"pre" },
	"3e1e76b4": { type: "red", tag:"pre" },
	//blue
	"6eff75b4": { type: "blue", tag:"div" },
	"9e1d76b4": { type: "blue", tag:"div" },
	"3efbee8b": { type: "blue", tag:"main" },
	"4e3bef8b": { type: "blue", tag:"main" },
	"1eff75b4": { type: "blue", tag:"section" },
	"fe25ef8b": { type: "blue", tag:"section" },
	//white
	"1e1def8b": { type: "white", tag:"Gustav, The Goldfish" },
	"9e14ef8b": { type: "white", tag:"The Great Henry McBride" },
	"de26ef8b": { type: "white", tag:"The Rabbit and The Bear" },
	"9e0f76b4": { type: "white", tag:"The bear looked upset. He looked frightfully sad. \“Good gracious!\” he gasped. “Is that really so bad?\” \“Err... well,\” said the rabbit. \“I’ve counted the hairs that grow on the eyelids of hundreds of bears and I always noticed, in adding up theirs, that they always come out to an even amount." },
	"5e0def8b": { type: "white", tag:"“It’s hard to decide,” said young Henry McBride. “It’s terribly, terribly hard to decide. When a fellow grows up and turns into a man, A fellow should pick the best job that he can. But there’s so many jobs that would be so much fun." },
	"ce32ef8b": { type: "white", tag:"The man who sold Gustav the Gold sh to us had warned us, \“Take Care! When you feed him this small cuss just feed him a spot. If you feed him a lot, then something might happen! So I tried to take care just to feed Gus a pinch. But it never seemed fair. “Cause he always looked sad when he gulped down the stuff." },
	"2e2cef8b": { type: "white", tag:"But yours, Mr. Bear, make an un-even count!" },
	"0e12ef8b": { type: "white", tag:"It’s terribly hard to decide on just one." },
	"9effee8b": { type: "white", tag:"His eyes seemed to tell me, “This isn’t enough!\”" },
	"2e10ef8b": { type: "white", tag:"And I guess that’s the reason,\” the rabbit then said, ‘For the lop-sided way that you’re holding your head. It’s twisted! It’s sagging! Because of the weight of your un-even lashes, you can’t hold it straight!\”" },
	"ee29ef8b": { type: "white", tag:"“I might be a farmer...That sounds pretty good. That could be my job and, now, maybe it should. I’ll buy a big farm somewhere out in the West and raise gaint rabbits. The World’s very best! Yeah! That’s what I’ll do. That’s the way I’ll decide, I’ll be the big Rabbit-Man, Henry McBride!" },
	"fe0e76b4": { type: "white", tag:"Then he’d always blow bubbles, as much as to say, \“Come on! Don’t be stingy, I’m hungry today!\” Gus had to have food. Not a spot. But a lot! No matter what happened, I didn’t care what. So,  nally, one day, poor old Gus looked so thin, I thook the whole box and I dumped it all in!" },
	"9e1fef8b": { type: "white", tag:"FUCK YOU BODIE!" }
};


function updateHTML(ids, socket) {
	buildHead(ids, socket);
	buildBody(ids, socket);
	if(ids[9] == "9e1fef8b"){
		console.log('fybd');
		fybd();
		socket.emit('fybd', {mydata: ""});
	}
}

function buildHead(ids, socket) {
	var title = document.getElementById('title');
	if(ids[0] == ""){
		title.innerHTML = "<h1>Select a Title</h1><h5>And accompanying 'H' tags.</h5>";
		return;
	}
	title.innerHTML = '';
	if(ids[0] != ""){
		title.innerHTML = cards[ids[0]].tag;
	}
	if(ids[1] != ""){
		title.childNodes[0].innerHTML += cards[ids[1]].tag;
	} else { 
		title.childNodes[0].innerHTML += "Select a Title"
	}
}

function buildBody(ids) {
	var c1 = document.getElementById('content1');
	if(ids[4] != ""){
		c1.innerHTML = cards[ids[4]].tag;
	} else {
		c1.innerHTML = 'Place content blocks';
	}
	if(ids[5] != ""){
		var tag = cards[ids[5]].tag
		var middle = document.createElement(tag);
		middle.id = 'middleSection';
		if(ids[6] != ""){
			middle.innerHTML = cards[ids[6]].tag;
		}
		document.getElementById('middle').innerHTML = '';
		document.getElementById('middle').appendChild(middle);
	}
	var c2 = document.getElementById('content2');
	if(ids[8] != ""){
		c2.innerHTML = cards[ids[8]].tag;
	} else {
		c2.innerHTML = '';
	}
}

function fybd(){
	$('#imgcontainer').hide();
	var bd = document.createElement('div');
	bd.innerHTML = "<div style='position:relative'><img class='explode' src='imgs/explode-med.gif'><h1 class='fybd'>FUCK YOU BODIE!</h1></div>";
	document.querySelector('body').appendChild(bd);
	return;
}