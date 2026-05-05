import yt_dlp

def download_as_mp3(video_url, output_folder='./music'):

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'{output_folder}/%(title)s.%(ext)s',
        'postprocessors': [{ 
            'key': 'FFmpegExtractAudio', 
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }
    
    print(f"downloading: {video_url}")
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
        print("done!")
    except Exception as e:
        print(f"err: {e}")