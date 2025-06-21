import ExpoModulesCore

public class CustomAudioModule: Module {
  public func definition() -> ModuleDefinition {
    Name("CustomAudioModule")

    Function("hello") {
      return "Hello world! 👋"
    }
  }
}
