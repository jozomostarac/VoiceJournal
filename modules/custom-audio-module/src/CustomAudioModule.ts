import { NativeModule, requireNativeModule } from 'expo';

import { CustomAudioModuleEvents } from './CustomAudioModule.types';

declare class CustomAudioModule extends NativeModule<CustomAudioModuleEvents> {
  hello(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CustomAudioModule>('CustomAudioModule');
