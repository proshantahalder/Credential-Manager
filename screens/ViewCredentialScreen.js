import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const ViewCredentialScreen = ({ route, navigation }) => {
  const { credential } = route.params;
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = async () => {
    try {
      const storedCredentials = await EncryptedStorage.getItem('credentials');
      if (storedCredentials) {
        let credentials = JSON.parse(storedCredentials);
        credentials = credentials.filter(cred => cred.id !== credential.id);
        await EncryptedStorage.setItem('credentials', JSON.stringify(credentials));
        Alert.alert('Success', 'Credential deleted successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Failed to delete credential:', error);
      Alert.alert('Error', 'Failed to delete credential');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <Text style={styles.value}>{credential.title}</Text>
      
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{credential.username}</Text>
      
      <Text style={styles.label}>Password:</Text>
      <Text style={styles.value}>
        {showPassword ? credential.password : '••••••••'}
      </Text>


      <Text style={styles.label}>Other Info:</Text>
      <Text style={styles.value}>{credential.otherInfo}</Text>
      
      <Button
      style={styles.dbuttonText}
        title={showPassword ? "Hide Password" : "Show Password"}
        onPress={() => setShowPassword(!showPassword)}
      />

    
      <TouchableOpacity style={styles.dbutton} onPress={handleDelete}>
            <Text style={styles.dbuttonText}>Delete Credential</Text>
          </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
  },
  deleteButton: {
    marginTop: 20,
  },

  dbutton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  dbuttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

 

});

export default ViewCredentialScreen;