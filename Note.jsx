import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Note = ({note, onDelete, onEdit}) => {
  return (
    <View style={styles.noteContainer}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', gap: 3}}>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="delete" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    display: 'flex',
    backgroundColor: '#212326',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    width: 150,
    marginLeft: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 15,
    marginTop: 5,
  },
  
});

export default Note;
