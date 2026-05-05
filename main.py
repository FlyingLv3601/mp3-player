import eel
import glob
import os
from player.audio_engine import AudioEngine

engine = AudioEngine()

songs = []
current = -1

def refresh_songs():
    global songs
    songs = sorted(glob.glob("music/*.mp3"))
    return [os.path.basename(s) for s in songs]

eel.init("web")

@eel.expose
def load_songs():
    return refresh_songs()

@eel.expose
def play(index):
    global current
    if 0 <= index < len(songs):
        current = index
        engine.load_and_play(songs[current])
        eel.on_play(songs[current], current + 1, len(songs))()

@eel.expose
def toggle():
    if engine.is_playing():
        engine.pause()
    else:
        engine.resume()
    return engine.is_playing()

@eel.expose
def stop():
    engine.stop()

@eel.expose
def next_song():
    global current
    if songs:
        current = (current + 1) % len(songs)
        engine.load_and_play(songs[current])
        eel.on_play(songs[current], current + 1, len(songs))()

@eel.expose
def prev_song():
    global current
    if songs:
        current = (current - 1) % len(songs)
        engine.load_and_play(songs[current])
        eel.on_play(songs[current], current + 1, len(songs))()

@eel.expose
def set_vol(v):
    engine.set_volume(v)

if __name__ == "__main__":
    refresh_songs()
    eel.start("web/index.html", size=(900, 600), port=0)