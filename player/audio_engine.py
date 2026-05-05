import pygame

class AudioEngine:
    
    def __init__(self):
        pygame.mixer.init()
        self._is_playing = False
        self._current_file = None
    
    def load_and_play(self, filepath: str):
        pygame.mixer.music.load(filepath)
        pygame.mixer.music.play()
        self._is_playing = True
        self._current_file = filepath
    
    def pause(self):
        if self._is_playing:
            pygame.mixer.music.pause()
            self._is_playing = False
    
    def resume(self):
        if not self._is_playing:
            pygame.mixer.music.unpause()
            self._is_playing = True
    
    def stop(self):
        pygame.mixer.music.stop()
        self._is_playing = False
    
    def is_playing(self) -> bool:
        return self._is_playing
    
    def set_volume(self, volume: float):
        pygame.mixer.music.set_volume(max(0.0, min(1.0, volume)))