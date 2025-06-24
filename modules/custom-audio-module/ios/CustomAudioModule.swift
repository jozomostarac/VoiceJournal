import ExpoModulesCore

public class CustomAudioModule: Module {
  public func definition() -> ModuleDefinition {
    Name("CustomAudioModule")
    
    // Export the AudioPlayer SharedObject class
    Class(AudioPlayerObject.self) {
      Constructor { () -> AudioPlayerObject in
        return AudioPlayerObject()
      }
      
      // Properties - bound natively for performance
      Property("playing") { (audioPlayer: AudioPlayerObject) -> Bool in
        return audioPlayer.audioPlayer?.isPlaying ?? false
      }
      
      Property("isLoaded") { (audioPlayer: AudioPlayerObject) -> Bool in
        return audioPlayer.audioPlayer != nil
      }
      
      // Functions
      AsyncFunction("loadAudio") { (audioPlayer: AudioPlayerObject, source: String) in
        try await audioPlayer.loadAudio(source: source)
      }
      
      Function("play") { (audioPlayer: AudioPlayerObject) in
        try audioPlayer.play()
      }
      
      Function("stop") { (audioPlayer: AudioPlayerObject) in
        audioPlayer.stop()
      }
      
      Function("remove") { (audioPlayer: AudioPlayerObject) in
        audioPlayer.remove()
      }
    }
  }
}
