import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './CustomAudioModule.types';

type CustomAudioModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class CustomAudioModule extends NativeModule<CustomAudioModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(CustomAudioModule, 'CustomAudioModule');
