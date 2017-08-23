/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as firebase from 'firebase';
import React, { Component } from 'react';
//var Report = require('./report.js').default;
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
const firebaseConfig = {
	  apiKey: "AIzaSyBMy-iq7UMjm3ECbb8qJqH9RnXkTYuG6dE",
	  authDomain: "hullmark-6637a.firebaseapp.com",
	  databaseURL: "https://hullmark-6637a.firebaseio.com",
	  storageBucket: "hullmark-6637a.appspot.com"
	};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email : '', password : ''};
  };
  
  
  static navigationOptions = ({ navigation }) => ({
    //${navigation.state.params.user}`,
	header: <Text style={{height:0}} ></Text>
  });

  _login(nextRoute) {
    var firebase = firebaseApp;
    var email = this.state.email;
    var password = this.state.password;
    email = 'kmikedo@gmail.com';
    password = 'Mike123';
    if (email == null || email.length == 0) {
      alert('Email required');
    } else if (password == null || password.length == 0) {
      alert('Password required');
    }
    else if (email != null && password != null) {
      firebase.auth().signInWithEmailAndPassword(email, password).then((userData) =>
      {
        AsyncStorage.setItem('user_data', JSON.stringify(userData));
        this.props.navigation.navigate('PropertyList', {"firebase":firebase});
      }
    ).catch((error) =>
        {
        alert('Login Failed. Please try again');
    });;
      
    }
  };

  render() {
    const userIcon = (<Icon name="user" size={25} backgroundColor="rgba(0,0,0,0)" color="white" />)
    const lockIcon = (<Icon name="lock" size={25} backgroundColor="rgba(0,0,0,0)" color="white" />)
    const nextRoute = {
     // component: Report,
	  component: '',
      title: 'Login Page',
      passProps: { title: 'Login Page', 'firebaseApp': this.props.firebaseApp }
    };
    return (
      <Image source={require('./img/insite.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={{color:'white', margin:5, fontSize:50}}></Text>
        </View>
        <View style={{height:56, margin:5,flexDirection:'row', borderBottomColor:'black', borderTopWidth:0, borderTopColor:'black',borderBottomWidth:0,padding:3,backgroundColor:'rgba(58, 57, 56, 0.5)'}}>
          <View style={{height:50, flex:2, justifyContent:'center', alignItems:'center'}}>
            {userIcon}
          </View>
		  <TextInput
		  underlineColorAndroid='transparent'
            style={{height:50, flex:10, color:'white', fontSize:20}}
            onChangeText={(text) => this.setState({email:text})}
			placeholderTextColor='rgba(168, 166, 164,1)'
            placeholder="Username">
          </TextInput>
        </View>
        <View style={{height:56, margin:5, marginTop:0, flexDirection:'row', borderBottomColor:'gray', borderBottomWidth:0,padding:3,backgroundColor:'rgba(58, 57, 56, 0.5)'}}>
            <View style={{height:50, flex:2, justifyContent:'center', alignItems:'center'}}>
              {lockIcon}
            </View>
			<TextInput
			  underlineColorAndroid='transparent'
              style={{height:50, flex:10, color:'white', fontSize:20}}
              secureTextEntry={true}
              placeholder="Password"
			  placeholderTextColor="rgba(168, 166, 164,1)"
              onChangeText={(text) => this.setState({password:text})}>
            </TextInput>
            
        </View>
        <View style={{margin:5,marginTop:0, flex:2}}>
        <Button
          containerStyle={{alignItems:'center', justifyContent:'center', height:50, borderRadius: 2,overflow:'hidden', backgroundColor: '#44D7A8'}}
          onPress={()=>this._login(nextRoute)}
          style={{fontSize: 25, color: 'white', margin: 20}}>
          Sign In
        </Button>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent:"flex-start",
    backgroundColor:'black'
  },
  container: {
    flex: 12,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center"
  },
  companyNameView: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
    flex:1,
    marginBottom:50,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  loginLabel: {
    color: 'white',
    fontSize: 10,
    marginBottom:1,
    width:250,
    paddingBottom:3
  },
  loginTextBox: {
    textAlign: 'right',
    fontSize: 13,
    color:'black',
    width:250,
    height:20,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    borderColor:'gray',
    borderWidth:0.5,
    borderRadius:5,
    marginBottom:10,
    padding:3
  },
  loginButtonView: {
    borderRadius:5,
    borderWidth:1,
    width:100,
    height:30,
    backgroundColor:'white'
  }
});