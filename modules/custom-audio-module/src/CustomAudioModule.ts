import { requireNativeModule } from 'expo';

// This call loads the native module object from the JSI.
const CustomAudioModule = requireNativeModule('CustomAudioModule');

// AudioSource type
export type AudioSource = string;

// AudioPlayer interface
export interface AudioPlayer {
  /**
   * Boolean value indicating whether the player is currently playing.
   */
  playing: boolean;

  /**
   * Boolean value indicating whether the player is finished loading.
   */
  isLoaded: boolean;

  /**
   * Start playing audio.
   */
  play(): void;

  /**
   * Stops/pauses the player.
   */
  stop(): void;

  /**
   * Load an audio source.
   */
  loadAudio(source: AudioSource): Promise<void>;

  /**
   * Remove the player from memory to free up resources.
   */
  remove(): void;
}

// Export the AudioPlayer constructor from the native module
export namespace AudioPlayer {
  export const create = (): AudioPlayer => {
    return new (CustomAudioModule.AudioPlayerObject as new () => AudioPlayer)();
  };
}
