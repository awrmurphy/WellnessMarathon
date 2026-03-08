import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import appStyles from "../shared/appStyles";

const HeaderRender = ({
  journalEntry,
  setJournalEntry,
  mood,
  setMood,
  moods,
  addEntry,
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
    <TouchableOpacity onPress={addEntry} style={appStyles.button}>
      <Text style={appStyles.buttonText}>Add Entry</Text>
    </TouchableOpacity>
  </View>
);

export default function Journal({ journalEntries = [], setJournalEntries }) {
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

  const addEntry = () => {
    if (journalEntry.trim() && mood) {
      const newEntry = { id: Date.now().toString(), text: journalEntry, mood };
      setJournalEntries([...journalEntries, newEntry]);
      setJournalEntry("");
      setMood("");
    }
  };

  const deleteEntry = (id) => {
    setJournalEntries(journalEntries.filter((entry) => entry.id !== id));
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
          addEntry={addEntry}
        />
      }
      renderItem={({ item }) => (
        <View style={appStyles.entryItem}>
          <Text style={appStyles.entryMood}>{item.mood}</Text>
          <Text style={appStyles.entryText}>{item.text}</Text>
          <TouchableOpacity
            onPress={() => deleteEntry(item.id)}
            style={appStyles.deleteButton}
          >
            <Text style={appStyles.buttonText}> Delete </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
