import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './Note';
import Navbar from './Navbar';
import MasonryList from '@react-native-seoul/masonry-list'
import Icon from 'react-native-vector-icons/AntDesign';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [inputExpanded, setInputExpanded] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleAddNote = async newNote => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    setInputExpanded(false);
    setEditTitle('');
    setEditContent('');
  };

  const handleDeleteNote = async id => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleEdit = async () => {
    if (editingNote) {
      const updatedNotes = notes.map(note =>
        note.id === editingNote.id
          ? {...note, title: editTitle, content: editContent}
          : note,
      );
      setNotes(updatedNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setEditingNote(null);
      setInputExpanded(false);
      setEditTitle('');
      setEditContent('');
    }
  };

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.Navbarbig}>
        <Navbar />
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Icon name="search1" size={20} color="white" style={{marginTop:10}}/>
      </View>
      <View
        style={[
          styles.addNoteContainer,
          inputExpanded && styles.expandedContainer,
        ]}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={editTitle}
          onChangeText={text => setEditTitle(text)}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Content"
          value={editContent}
          onChangeText={text => setEditContent(text)}
        />
        <TouchableOpacity
          onPress={() => {
            if (editingNote) {
              handleEdit();
            } else {
              const id = Date.now().toString();
              handleAddNote({
                id,
                title: editTitle,
                content: editContent,
              });
            }
          }}>
          <View style={styles.addeditbutton}>
            <Text style={{fontWeight: 'bold'}}>{editingNote ? 'Edit' : 'Add'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.notesContainer}>
          <MasonryList
            data={filteredNotes}
            renderItem={({item}) => (
              <Note
                key={item.id}
                note={item}
                onDelete={() => handleDeleteNote(item.id)}
                onEdit={() => {
                  setEditingNote(item);
                  setEditTitle(item.title);
                  setEditContent(item.content);
                  setInputExpanded(true);
                }}
                style={styles.Notess}
              />
            )}
            keyExtractor={item => item.id}
            
            numColumns={2} // You can adjust the number of columns as needed
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  Navbarbig: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 20,
    marginTop: 10,
  },
  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '13%',
    marginTop: '1%',
    width: 20,
    gap: 5,
    
  },
  titleInput: {
    fontSize: 30,
    borderBottomWidth: 1,
    borderColor: 'white'
  },
  contentInput: {
    fontSize: 20,
  },

  searchInput: {
    padding: 8,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    marginLeft: 60,
    backgroundColor: '#212326',
  },
  addNoteContainer: {
    margin: 'auto',
    padding: 20,
    width: 300,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginLeft: '10%',
    marginTop: '5%',
    marginBottom: '5%',
  },
  addImage: {
    width: 80,
    zIndex: 9999,
  },
  addeditbutton: {
    backgroundColor: '#f5bf42',
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 200,
  },
  expandedContainer: {
    marginBottom: 10,
  },
  notesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 11,
    
  },
  
});

export default App;
