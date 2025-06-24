//
//  AudioPlayerObject.swift
//  Pods
//
//  Created by Jozo Mostarac on 22.06.2025..
//

import ExpoModulesCore
import AVFoundation

// AudioPlayer SharedObject - This is the main class
public class AudioPlayerObject: SharedObject {
  internal var audioPlayer: AVAudioPlayer?
  
  public required override init() {
    super.init()
  }
  
  // Public methods for module access
  public func loadAudio(source: String) async throws {
    // Create URL from source string
    guard let url = URL(string: source) else {
      throw AudioPlayerError.invalidURL(source)
    }
    
    do {
      // Read local file data
      let data = try Data(contentsOf: url)
      
      // Stop current player if exists
      audioPlayer?.stop()
      
      // Create new player
      audioPlayer = try AVAudioPlayer(data: data)
      audioPlayer?.prepareToPlay()
      
    } catch {
      throw AudioPlayerError.loadFailed(error.localizedDescription)
    }
  }
  
  public func play() throws {
    guard let audioPlayer = audioPlayer else {
      throw AudioPlayerError.notLoaded
    }
    
    audioPlayer.play()
  }
  
  public func stop() {
    audioPlayer?.stop()
    audioPlayer?.currentTime = 0 // Reset to beginning
  }
  
  public func remove() {
    audioPlayer?.stop()
    audioPlayer = nil
  }
  
  deinit {
    remove()
  }
}

// Error types
enum AudioPlayerError: Error, LocalizedError {
  case invalidURL(String)
  case fileNotFound(String)
  case loadFailed(String)
  case notLoaded
  
  var errorDescription: String? {
    switch self {
    case .invalidURL(let url):
      return "Invalid URL: \(url)"
    case .fileNotFound(let file):
      return "Audio file not found: \(file)"
    case .loadFailed(let reason):
      return "Failed to load audio: \(reason)"
    case .notLoaded:
      return "Audio not loaded. Call loadAudio() first."
    }
  }
}

