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


function downloadTrack() {
    const urlInput = document.getElementById('songUrl');
    const url = urlInput.value.trim();
    const statusDiv = document.getElementById('downloadStatus');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!url) {
        statusDiv.textContent = 'Please enter a YouTube link or search query';
        statusDiv.className = 'download-status error';
        setTimeout(() => {
            statusDiv.className = 'download-status';
            statusDiv.textContent = '';
        }, 3000);
        return;
    }

    statusDiv.textContent = '⏳ Downloading... (this may take a moment)';
    statusDiv.className = 'download-status loading';
    downloadBtn.disabled = true;
    downloadBtn.style.opacity = '0.6';

    eel.download_track(url)(response => {
        if (response.success) {
            statusDiv.innerHTML = `✅ ${response.message}`;
            statusDiv.className = 'download-status success';
            urlInput.value = ''; 

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
        } else {
            statusDiv.innerHTML = `❌ ${response.message}`;
            statusDiv.className = 'download-status error';
        }

        setTimeout(() => {
            if (statusDiv.className !== 'download-status loading') {
                statusDiv.className = 'download-status';
                statusDiv.textContent = '';
            }
        }, 5000);

        downloadBtn.disabled = false;
        downloadBtn.style.opacity = '1';
    });
}

document.getElementById('songUrl')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        downloadTrack();
    }
});