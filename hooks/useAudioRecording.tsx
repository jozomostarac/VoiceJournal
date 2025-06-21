import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";

export default function useAudioRecording() {
    const [audioRecorder, setAudioRecorder] = useState<Audio.Recording | null>(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0); // milliseconds
    const durationIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        requestPermissions();
    }, [])

    const requestPermissions = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            setHasPermission(permission.granted);
        } catch (error) {
            console.error("Error requesting recording permissions", error);
            setHasPermission(false);
        }
    }

    const startRecording = async () => {
        try {
            if (!hasPermission) {
                await requestPermissions();
                if (!hasPermission) {
                    throw new Error("Microphone permission not granted");
                }
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true
            })

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await recording.startAsync();

            setAudioRecorder(recording);
            setIsRecording(true);
            setDuration(0);

            durationIntervalRef.current = setInterval(async () => {
                try {
                    const status = await recording.getStatusAsync();
                    if (status.isRecording) {
                        setDuration(status.durationMillis);
                    }
                } catch (error) {
                    console.error("Error getting recording status", error);
                }
            }, 100);

            console.log("Recording started");
        } catch (error) {
            console.error("Error starting recording", error);
        }
    }

    const stopRecording = async () => {
        if (!audioRecorder) return;

        try {
            if (durationIntervalRef.current) {
                clearInterval(durationIntervalRef.current);
                durationIntervalRef.current = null;
            }

            await audioRecorder?.stopAndUnloadAsync();
            const uri = audioRecorder?.getURI();

            setAudioRecorder(null);
            setIsRecording(false);

            return uri;
        } catch (error) {
            console.error("Error stopping recording", error);
        }
    }

    const discardRecording = async () => {
        setDuration(0);
    }

    useEffect(() => {
        const intervalRef = durationIntervalRef.current;
        return () => {
            if (intervalRef) {
                clearInterval(intervalRef);
            }
        }
    }, []);

    return {
        hasPermission,
        isRecording,
        duration,
        startRecording,
        stopRecording,
        discardRecording,
    };
}