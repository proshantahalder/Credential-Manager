import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const AddCredentialScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otherInfo, setOtherInfo] = useState('');

  const handleSave = async () => {
    if (!title || !username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const storedCredentials = await EncryptedStorage.getItem('credentials');
      let credentials = storedCredentials ? JSON.parse(storedCredentials) : [];

      const newCredential = {
        id: Date.now().toString(),
        title,
        username,
        password,
        otherInfo,
      };

      credentials.push(newCredential);

      await EncryptedStorage.setItem('credentials', JSON.stringify(credentials));
      Alert.alert('Success', 'Credential saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save credential:', error);
      Alert.alert('Error', 'Failed to save credential');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title (e.g. Facebook, Gmail)"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

    

<TextInput
        style={styles.textarea}
        multiline
        numberOfLines={10}
        placeholder="Other Information"
        value={otherInfo}
        onChangeText={setOtherInfo}
        textAlignVertical="top" // Aligns text at the top
        placeholderTextColor="#888" // Placeholder text color
      />

      <TouchableOpacity style={styles.sbutton} onPress={handleSave}>
            <Text style={styles.sbuttonText}>Save Credential</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8, // Rounded corners
    backgroundColor: '#f9f9f9', // Light background color
    fontSize: 16, // Increase font size
    color: '#333', // Text color
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 2, // Android shadow
  },

  textarea: {
    height: 150, // Adjust height as needed
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sbutton: {
    backgroundColor: '#009432',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  sbuttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCredentialScreen;