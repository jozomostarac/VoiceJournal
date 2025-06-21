package expo.modules.customaudiomodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class CustomAudioModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("CustomAudioModule")

    Function("hello") {
      "Hello world! 👋"
    }
  }
}
