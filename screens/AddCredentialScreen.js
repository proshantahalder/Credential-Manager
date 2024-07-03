import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const AddCredentialScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <Button title="Save Credential" onPress={handleSave} />
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
  },
});

export default AddCredentialScreen;