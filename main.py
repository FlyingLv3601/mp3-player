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

@eel.expose
def download_track(query):
    try:
        if not os.path.exists("music"):
            os.makedirs("/music")
        
        from player.ytmp3 import download_as_mp3
        download_as_mp3(query, output_folder='music')
        
        return {
            'success': True,
            'message': 'Track downloaded successfully!'
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Error: {str(e)}'
        }



@eel.expose
def get_all_users():
    try:
        conn = psycopg2.connect(
            host='localhost',
            port=5432,
            database='ddb',
            user='lv',
            password='kurwaword'
        )
        cur = conn.cursor()
        
        cur.execute("SELECT id, name, email FROM users ORDER BY id;")
        rows = cur.fetchall()
        
        users = []
        for row in rows:
            users.append({
                'id': row[0],
                'name': row[1],
                'email': row[2]
            })
        
        cur.close()
        conn.close()
        return users
        
    except Exception as e:
        print(f"Ошибка: {e}")
        return []


if __name__ == "__main__":
    refresh_songs()
    eel.init("web")
    eel.start(
        "index.html", 
        size=(550, 450), 
        mode="chrome",
        cmdline_args=["--kiosk"]
    )