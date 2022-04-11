let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking = false, seekto, currtimetext, duretimetext,
playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, random,like;

dir = "music/";
playlist = ["Airplanes ","Title","Up"];
title = ["Airplanes ","Title","MA3RFTCH SMYTHA"];

artists = ["B.o.B","HH2","2m hh"];
poster = ["Images/airplans.jpg","Images/ncs2.jpg","Images/kermit.png"];

ext = ".mp3";
agent = navigator.userAgent.toLocaleLowerCase();

if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
    ext = '.ogg';
}

playbtn = document.getElementById('playPause-btn');
nextbtn = document.getElementById('next-btn');
prevbtn = document.getElementById('pre-btn');
mutebtn = document.getElementById('mute-btn');
seekslider = document.getElementById('seekSlider');
volumeslider = document.getElementById('volumeSlider');
currtimetext = document.getElementById('currTimeText');
duretimetext = document.getElementById('durTimeText');
playlist_status = document.getElementById('playlist-statue');
playlist_artist = document.getElementById('playlist-artist');
repeat = document.getElementById('repeat');
random = document.getElementById('random');
like = document.getElementById('like');

playlist_index = 0;

audio = new Audio();
audio.src = dir + playlist[0] + ext;
audio.loop = false;

playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

playbtn.addEventListener('click', playpause);
nextbtn.addEventListener('click', nextsong);
prevbtn.addEventListener('click', prevsong);
mutebtn.addEventListener('click', mute);
seekslider.addEventListener('mousedown', function(event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener('mousemove', function(event) {
    seek(event);
});
seekslider.addEventListener('mouseup', function(event) {
    seeking = false;
});
volumeslider.addEventListener('mousemove', setvolume);
audio.addEventListener('timeupdate', function() {
    seektimeupdate();
});
audio.addEventListener('ended', function() {
    switchtrack();
});
repeat.addEventListener('click', loop);
random.addEventListener('click', rand);
like.addEventListener('click', likeit);

function fetchMusicDetails() {
    $('#playPause-btn img').attr('src','Images/pause-red.png');
    $('#bgimage').attr('src', poster[playlist_index]);
    $('#image').attr('src', poster[playlist_index]);

    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    audio.src = dir + playlist[playlist_index] + ext;
    audio.play();
}

function playpause() {
    if(audio.paused) {
        audio.play();
        $('#playPause-btn img').attr('src','Images/pause-red.png');
    }
    else {
        audio.pause();
        $('#playPause-btn img').attr('src','Images/play-red.png');
    }
}

function nextsong() {
    playlist_index++;
    if(playlist_index > playlist.length - 1) {
        playlist_index = 0;
    }
    fetchMusicDetails();
}

function prevsong() {
    playlist_index--;
    if(playlist_index < 0) {
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetails();
}

function mute() {
    if(audio.muted) {
        audio.muted = false;
        $('#mute-btn img').attr('src','Images/speaker.png');
    }
    else {
        audio.muted = true;
        $('#mute-btn img').attr('src','Images/mute.png');
    }
}

function seek(event) {
    if(audio.duration == 0) {
        null;
    }
    else {
        if(seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value/100);
            audio.currentTime = seekto;
        }
    }
}

function setvolume() {
    audio.volume = volumeslider.value / 100;
}

function seektimeupdate() {
    if(audio.duration) {
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;

        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);

        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);

        if(cursecs < 10) {
            cursecs = '0' + cursecs;
        }
        if(dursecs < 10) {
            dursecs = '0' + dursecs;
        }
        if(curmins < 10) {
            curmins = '0' + curmins;
        }
        if(dursecs < 10) {
            dursecs = '0' + dursecs;
        }

        currtimetext.innerHTML = curmins + ':' + cursecs;
        duretimetext.innerHTML = durmins + ':' + dursecs;

    }
    else {
        currtimetext.innerHTML = '00' + ':' + '00';
        duretimetext.innerHTML = '00' + ':' + '00';
    }
}

function switchtrack() {
    if(playlist_index == (playlist.length - 1)) {
        playlist_index = 0;
    }
    else {
        playlist_index++;
    }
    fetchMusicDetails();
}

function loop() {
    if(audio.loop) {
        audio.loop = false;
        $('#repeat img').attr('src','Images/rep.png');
    }
    else {
        audio.loop = true;
        $('#repeat img').attr('src','Images/rep1.png');
    }
}

function getrandomnum(min,max) {
    let step1 = max-min+1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

function rand() {
    let randomindex = getrandomnum(0, playlist.length - 1);
    playlist_index = randomindex;
    fetchMusicDetails();
}

var isliked = false;
function likeit() {
    if(isliked) {
        $('#like i').attr('class','far fa-heart');
        isliked = false;
    }
    else {
        $('#like i').attr('class','fas fa-heart');
        isliked = true;
    }
}