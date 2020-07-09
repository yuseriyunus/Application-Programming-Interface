import React from 'react';
import { Buton, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';


export default class App extends React.Component {
  state = {
  image: null,
  haspermission : null,
  setHasPermission : null,
  type : Camera.Constants.Type.back,
  setType : Camera.Constants.Type.back
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

            console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    this.setState({ image: uri });
  };


  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }}  />
        <View>
          <Button onPress={this._pickImage}>Open Gallery</Button>
          <Button onPress={this.takePicture}>Open Camera</Button>
        </View>
      </View>
    );
  }
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  image: { width: 300, height: 400, backgroundColor : 'lightgrey' },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
