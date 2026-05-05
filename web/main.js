eel.load_songs()(songs => {
    const ul = document.getElementById('playlist');
    ul.innerHTML = '';
    songs.forEach((song, i) => {
        const li = document.createElement('li');
        li.textContent = song;
        li.onclick = () => eel.play(i);
        ul.appendChild(li);
    });
});

function playPause() {
    eel.toggle()(playing => {
        document.getElementById('playBtn').textContent = playing ? '⏸️' : '▶️';
    });
}

function stopSong() { eel.stop(); }
function nextSong() { eel.next_song(); }
function prevSong() { eel.prev_song(); }

eel.expose(on_play);
function on_play(name, cur, total) {
    document.getElementById('song-name').textContent = name;
    document.getElementById('counter').textContent = `${cur} / ${total}`;
    document.getElementById('playBtn').textContent = '⏸️';
}

document.getElementById('volume')?.addEventListener('input', e => {
    eel.set_vol(e.target.value / 100);
});