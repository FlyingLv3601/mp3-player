eel.load_songs()(songs => {
    const ul = document.getElementById('playlist');
    ul.innerHTML = '';
    songs.forEach((song, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-music"></i> ${song}`;
        li.onclick = () => eel.play(i);
        ul.appendChild(li);
    });
});

function playPause() {
    eel.toggle()(playing => {
        const playBtn = document.getElementById('playBtn');
        const icon = playBtn.querySelector('i');
        if (playing) {
            icon.className = 'fas fa-pause';
        } else {
            icon.className = 'fas fa-play';
        }
    });
}

function stopSong() { eel.stop(); }
function nextSong() { eel.next_song(); }
function prevSong() { eel.prev_song(); }

eel.expose(on_play);
function on_play(name, cur, total) {
    document.getElementById('song-name').textContent = name;
    document.getElementById('counter').textContent = `${cur} / ${total}`;
    const playBtn = document.getElementById('playBtn');
    const icon = playBtn.querySelector('i');
    icon.className = 'fas fa-pause';
}

document.getElementById('volume')?.addEventListener('input', e => {
    eel.set_vol(e.target.value / 100);
});