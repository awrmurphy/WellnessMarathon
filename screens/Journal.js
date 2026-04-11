import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import appStyles from "../shared/appStyles";
import { useSelector, useDispatch } from "react-redux";
import { addEntryToUser, deleteEntryFromUser } from "../Redux/journalReducer";

const HeaderRender = ({
  journalEntry,
  setJournalEntry,
  mood,
  setMood,
  moods,
  handleAddEntry,
}) => (
  <View style={appStyles.screen}>
    <TextInput
      value={journalEntry}
      onChangeText={setJournalEntry}
      placeholder="Write your journal entry"
      style={appStyles.input}
    />
    <Text style={appStyles.label}> Select your mood: </Text>
    <View style={appStyles.moodContainer}>
      {moods.map((m) => (
        <TouchableOpacity
          key={m}
          onPress={() => setMood(m)}
          style={[
            appStyles.moodButton,
            mood === m && appStyles.moodButtonSelected,
          ]}
        >
          <Text style={appStyles.moodButtonText}>{m}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <TouchableOpacity onPress={handleAddEntry} style={appStyles.button}>
      <Text style={appStyles.buttonText}>Add Entry</Text>
    </TouchableOpacity>
  </View>
);

export default function Journal() {
  const dispatch = useDispatch();
  const journalEntries = useSelector((state) => state.journal.entries);
  const [journalEntry, setJournalEntry] = useState("");
  const [mood, setMood] = useState("");

  const moods = [
    " Happy ",
    " Sad ",
    " Anxious ",
    " Excited ",
    " Angry ",
    " Neutral ",
  ];

  const handleAddEntry = async () => {
    const trimmedEntry = journalEntry.trim();

    if (!trimmedEntry) {
      Alert.alert(
        "Missing Content",
        "Please write something in your journal entry.",
      );
      return;
    }
    if (!mood) {
      Alert.alert("Missing Mood", "Please select a mood before saving.");
      return;
    }

    try {
      await dispatch(addEntryToUser({ text: trimmedEntry, mood })).unwrap();
      setJournalEntry("");
      setMood("");
    } catch (err) {
      Alert.alert(
        "Cloud Sync Error",
        "Your entry was not saved. Please try again later.",
      );
    }
  };

  const handleDeleteEntry = (item) => {
    Alert.alert("Delete Entry", "Are you sure you want to remove this entry?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await dispatch(deleteEntryFromUser(item)).unwrap();
          } catch (err) {
            Alert.alert(
              "Delete Failed",
              "The entry could not be removed from the server.",
            );
          }
        },
      },
    ]);
  };

  return (
    <FlatList
      style={{ backgroundColor: "#dfd8e5" }}
      contentContainerStyle={{
        padding: 20,
        flexGrow: 1,
      }}
      data={journalEntries}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <HeaderRender
          journalEntry={journalEntry}
          setJournalEntry={setJournalEntry}
          mood={mood}
          setMood={setMood}
          moods={moods}
          handleAddEntry={handleAddEntry}
        />
      }
      renderItem={({ item }) => (
        <View style={appStyles.entryItem}>
          <Text style={appStyles.entryMood}>{item.mood}</Text>
          <Text style={appStyles.entryText}>{item.text}</Text>
          <TouchableOpacity
            onPress={() => handleDeleteEntry(item)}
            style={appStyles.deleteButton}
          >
            <Text style={appStyles.buttonText}> Delete </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
