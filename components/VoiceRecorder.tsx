import { MaterialIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useAudioRecording from "../hooks/useAudioRecording";
import { useState } from "react";

export default function VoiceRecorder() {
    const {
        hasPermission,
        isRecording,
        duration,
        startRecording,
        stopRecording,
        discardRecording,
    } = useAudioRecording();

    const [recordingUri, setRecordingUri] = useState<string | null>(null);
    const hasRecording = recordingUri !== null;

    const formatTime = (milliseconds: number) => {
        const seconds = Math.floor(milliseconds / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };

      const handleStartRecording = async () => {
        setRecordingUri(null);
        await startRecording();
      };

      const handleStopRecording = async () => {
        const uri = await stopRecording();
        if (uri) {
            setRecordingUri(uri);
            saveRecording();
        }
      };

    
      const saveRecording = () => {
        Alert.prompt(
          "Save Recording",
          "Enter a name for this journal entry:",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Save",
              onPress: (name) => {
                if (name && name.trim()) {
                  // TODO: Implement actual save logic with name, date, duration
                  const entry = {
                    id: Date.now().toString(),
                    name: name.trim(),
                    date: new Date(),
                    duration: duration
                  };
                  console.log("Recording saved:", entry);
                  
                  Alert.alert(
                    "Saved!",
                    `Your recording "${name.trim()}" has been saved successfully!`,
                    [
                      {
                        text: "OK",
                        onPress: () => {
                        // TODO: Save the recording to the database
                          setRecordingUri(null);
                          discardRecording();
                        }
                      }
                    ]
                  );
                } else {
                  Alert.alert("Error", "Please enter a name for your recording.");
                }
              }
            }
          ],
          "plain-text",
          "",
          "default"
        );
      };
    
      const handleDiscardRecording = () => {
        Alert.alert(
          "Discard Recording",
          "Are you sure you want to discard this recording?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Discard",
              style: "destructive",
              onPress: () => {
                setRecordingUri(null);
                discardRecording();
                console.log("Recording discarded");
              }
            }
          ]
        );
      };

  return  <View>
    <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, isRecording && styles.recordingActive]}>
            <MaterialIcons 
              name={isRecording ? "mic" : "mic-off"} 
              size={24} 
              color={isRecording ? "#fff" : "#666"} 
            />
          </View>
          <Text style={styles.statusText}>
            {isRecording ? "Recording in progress..." : hasRecording ? "Recording stopped" : "Ready to record"}
          </Text>
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>
              {(isRecording || hasRecording) ? formatTime(duration) : "00:00"}
            </Text>
          </View>
        </View>
        <View>
     {!hasRecording ? (
       <TouchableOpacity
         style={[styles.recordButton, isRecording && styles.recordButtonActive]}
         onPress={isRecording ? handleStopRecording : handleStartRecording}
         activeOpacity={0.8}
       >
         <MaterialIcons 
           name={isRecording ? "stop" : "fiber-manual-record"} 
           size={32} 
           color="#fff" 
         />
         <Text style={styles.recordButtonText}>
           {isRecording ? "Stop Recording" : "Start Recording"}
         </Text>
       </TouchableOpacity>
     ) : (
       <View style={styles.actionButtons}>
         <TouchableOpacity
           style={[styles.actionButton, styles.saveButton]}
           onPress={saveRecording}
           activeOpacity={0.8}
         >
           <MaterialIcons name="save" size={32} color="#fff" />
           <Text style={styles.actionButtonText}>Save</Text>
         </TouchableOpacity>
         
         <TouchableOpacity
           style={[styles.actionButton, styles.discardButton]}
           onPress={handleDiscardRecording}
           activeOpacity={0.8}
         >
           <MaterialIcons name="delete" size={32} color="#fff" />
           <Text style={styles.actionButtonText}>Discard</Text>
         </TouchableOpacity>
       </View>
     )}
   </View>
  </View>
}

const styles = StyleSheet.create({
    statusContainer: {
        alignItems: "center",
        padding: 30,
        backgroundColor: "#fff",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
      },
      statusIndicator: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ecf0f1",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
      },
      recordingActive: {
        backgroundColor: "#e74c3c",
      },
      statusText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2c3e50",
        marginBottom: 15,
      },
      durationContainer: {
        height: 30,
        justifyContent: "center",
      },
    durationText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3498db",
        fontFamily: "monospace",
      },
      recordButton: {
        backgroundColor: "#3498db",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      },
      recordButtonActive: {
        backgroundColor: "#e74c3c",
      },
      recordButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 12,
      },
      actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      actionButton: {
        paddingVertical: 20,
        paddingHorizontal: 34,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      },
      saveButton: {
        backgroundColor: "#27ae60",
      },
      discardButton: {
        backgroundColor: "#e74c3c",
      },
      actionButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 12,
      }
})