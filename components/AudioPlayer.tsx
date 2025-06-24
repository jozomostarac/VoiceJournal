import JournalEntry from "@/models/JournalEntry";
import { AudioPlayer as NativeAudioPlayer } from "@/modules/custom-audio-module";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface AudioPlayerProps {
    entry: JournalEntry;
    onDeleteEntry: (entryId: string) => void;
}

export default function AudioPlayer({ entry, onDeleteEntry }: AudioPlayerProps) {
    const [audioPlayer, setAudioPlayer] = useState<NativeAudioPlayer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Poll the native playing state to keep React state in sync
    useEffect(() => {
        if (!audioPlayer) return;

        const interval = setInterval(() => {
            const nativeIsPlaying = audioPlayer.playing;
            setIsPlaying(nativeIsPlaying);
        }, 100); // Check every 100ms

        return () => clearInterval(interval);
    }, [audioPlayer]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const createAndLoadAudio = async () => {
        try {
            // Create new AudioPlayer instance (SharedObject)
            const player = NativeAudioPlayer.create();

            // Load audio from URL
            await player.loadAudio('https://onlinetestcase.com/wp-content/uploads/2023/06/100-KB-MP3.mp3');
            // Or load from app bundle:
            // await player.loadAudio('example-audio'); // Will look for example-audio.mp3 in bundle

            setAudioPlayer(player);
            return player;
        } catch (error) {
            Alert.alert('Error', `Failed to load audio: ${error}`);
            return null;
        }
    };

    const togglePlay = async (entryId: string) => {
        let currentPlayer = audioPlayer;

        if (!currentPlayer) {
            currentPlayer = await createAndLoadAudio();
            if (!currentPlayer) return; // Failed to create player
        }

        if (currentPlayer.playing) {
            currentPlayer.stop();
        } else {
            currentPlayer.play();
        }
    };

    const handleDelete = (entryId: string) => {
        if (!entry) return;

        Alert.alert(
            "Delete Entry",
            `Are you sure you want to delete "${entry.name}"? This action cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        onDeleteEntry(entryId);
                        console.log(`Deleted entry ${entryId}`);
                    }
                }
            ]
        );
    };

    const canPlay = entry.localUrl !== null;

    return (
        <View key={entry.id} style={styles.entryCard}>
            {/* Entry Header */}
            <View style={styles.entryHeader}>
                <View style={styles.entryInfo}>
                    <Text style={styles.entryName}>{entry.name}</Text>
                    <Text style={styles.dateText}>{formatDate(entry.date)}</Text>
                    <Text style={styles.durationText}>
                        Duration: {formatDuration(entry.duration)}
                    </Text>
                </View>
                <View style={styles.statusIndicator}>
                    <MaterialIcons
                        name={entry.localUrl ? "audiotrack" : "cloud-download"}
                        size={20}
                        color={entry.localUrl ? "#27ae60" : "#95a5a6"}
                    />
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
                <TouchableOpacity
                    style={[
                        styles.playButton,
                        canPlay ? styles.playButtonActive : styles.playButtonDisabled,
                        isPlaying && styles.playButtonPlaying,
                    ]}
                    onPress={() => togglePlay(entry.id)}
                    disabled={!canPlay}
                    activeOpacity={0.7}
                >
                    <MaterialIcons
                        name={isPlaying ? "pause" : "play-arrow"}
                        size={20}
                        color={canPlay ? "#fff" : "#bdc3c7"}
                    />
                    <Text style={[
                        styles.playButtonText,
                        !canPlay && styles.playButtonTextDisabled
                    ]}>
                        {isPlaying ? "Pause" : canPlay ? "Play" : "Not Available"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(entry.id)}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="delete-outline" size={20} color="#e74c3c" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    entryCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 15,
    },
    entryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    entryInfo: {
        flex: 1,
    },
    entryName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: 8,
    },
    dateText: {
        fontSize: 14,
        color: "#7f8c8d",
        marginBottom: 4,
    },
    durationText: {
        fontSize: 12,
        color: "#95a5a6",
        fontFamily: "monospace",
    },
    statusIndicator: {
        padding: 8,
    },
    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    playButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        gap: 8,
        width: 110,
    },
    playButtonActive: {
        backgroundColor: "#3498db",
    },
    playButtonDisabled: {
        backgroundColor: "#ecf0f1",
        width: 160,
    },
    playButtonPlaying: {
        backgroundColor: "#e74c3c",
    },
    playButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
    },
    playButtonTextDisabled: {
        color: "#bdc3c7",
    },
    deleteButton: {
        padding: 12,
        borderRadius: 20,
        backgroundColor: "#fdf2f2",
    },
});
