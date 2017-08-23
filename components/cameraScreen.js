/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';


import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';

import Camera from 'react-native-camera';
export default class CameraScreen extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  _onForward(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.props.parent.addPicture(data))
      .catch(err => console.error(err));
    this.props.navigator.pop();
  }

  cancelPicture() {
    this.props.navigator.pop();
  }

  render() {
      return (
      <View style={styles.container}>
        <View style={{backgroundColor:'black', flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start', padding:10}}>
          <Text style={{color:'white', fontSize:17}} onPress={this.cancelPicture.bind(this)}>Cancel</Text>
        </View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          
        </Camera>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'white'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});