import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
  } from 'react-native-fontawesome';

const FIXED_USERNAME = 'admin';
const FIXED_PASSWORD = '123456';

const LoginScreen = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // Add a background image to your assets folder
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
         
        <FontAwesome
          style={styles.userIcon}
          icon={RegularIcons.user}
         
        />

          <Text style={styles.title}>Secure Login</Text>
          <View style={styles.inputContainer}>
           

            <FontAwesome
          style={styles.inputIcon}
          icon={RegularIcons.addressBook}
        />

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>

            <FontAwesome
           style={styles.inputIcon}
           icon={SolidIcons.truck}
        />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#aaa" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconStyle: {
    fontSize: 40,
    marginTop: 30,
    color: 'black',
  },
  userIcon: {
    fontSize: 36,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding:15,
    color:'#fff'
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;