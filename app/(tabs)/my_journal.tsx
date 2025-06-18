import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Simplified data structure
interface JournalEntry {
  id: string;
  name: string;
  date: Date;
  duration: number;
  hasLocalRecording: boolean;
}

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    name: 'Morning Reflections',
    date: new Date('2024-01-15T10:30:00'),
    duration: 120,
    hasLocalRecording: true,
  },
  {
    id: '2',
    name: 'Career Goals Discussion',
    date: new Date('2024-01-14T15:45:00'),
    duration: 85,
    hasLocalRecording: true,
  },
  {
    id: '3',
    name: 'Weekend Plans',
    date: new Date('2024-01-13T09:15:00'),
    duration: 95,
    hasLocalRecording: true,
  },
  {
    id: '4',
    name: 'Gratitude Practice',
    date: new Date('2024-01-12T18:20:00'),
    duration: 110,
    hasLocalRecording: false,
  },
];

export default function MyJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [playingId, setPlayingId] = useState<string | null>(null);

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

  const handlePlay = (entryId: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry?.hasLocalRecording) {
      Alert.alert("Recording Not Available", "This recording is not available locally.");
      return;
    }

    if (playingId === entryId) {
      setPlayingId(null);
      console.log(`Stopped playing entry ${entryId}`);
    } else {
      setPlayingId(entryId);
      console.log(`Started playing entry ${entryId}`);
      // Simulate playback ending after 3 seconds
      setTimeout(() => {
        setPlayingId(null);
      }, 3000);
    }
  };

  const handleDelete = (entryId: string) => {
    const entry = entries.find(e => e.id === entryId);
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
            setEntries(prev => prev.filter(e => e.id !== entryId));
            console.log(`Deleted entry ${entryId}`);
          }
        }
      ]
    );
  };

  const renderEntry = (entry: JournalEntry) => {
    const isPlaying = playingId === entry.id;
    const canPlay = entry.hasLocalRecording;

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
              name={entry.hasLocalRecording ? "audiotrack" : "cloud-download"} 
              size={20} 
              color={entry.hasLocalRecording ? "#27ae60" : "#95a5a6"} 
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[
              styles.playButton,
              canPlay ? styles.playButtonActive : styles.playButtonDisabled,
              isPlaying && styles.playButtonPlaying
            ]}
            onPress={() => handlePlay(entry.id)}
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Journal</Text>
        <Text style={styles.subtitle}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </Text>
      </View>

      {/* Entries List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {entries.length > 0 ? (
          <View style={styles.entriesContainer}>
            {entries.map(renderEntry)}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="mic-none" size={64} color="#bdc3c7" />
            <Text style={styles.emptyTitle}>No journal entries yet</Text>
            <Text style={styles.emptySubtitle}>
              Start recording your first entry in the New Entry tab
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  scrollView: {
    flex: 1,
  },
  entriesContainer: {
    padding: 20,
    gap: 15,
  },
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 22,
  },
});