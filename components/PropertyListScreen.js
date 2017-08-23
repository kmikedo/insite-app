/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import getDirections from 'react-native-google-maps-directions'
import * as firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  View,
  Modal,
  TouchableHighlight
} from 'react-native';
export default class ReportListScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
    //${navigation.state.params.user}`,
	header: <View style={{height:0}}></View>
  });
  constructor(props) {
    super(props);
	var reportLists;
	var that = this;
	var user = firebase.auth().currentUser;
	user.getIdToken(false).then(function(t) {
		fetch('http://138.197.133.13/demo_client/properties', {
		  method: 'GET',
		  headers: {
			'Authorization': t,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		  }
		}).then((response) => response.json())
		.then((responseJson) => {
			that.setState({'propertyList': responseJson});
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
	});
	
	this.state = {modalVisible:false, menuModalVisible: false, text: '', height: 0};
  }
	handleGetDirections(propObj) {
		const data = {
    //   source: {
      //  latitude: -33.8356372,
        //longitude: 18.6947617
      //},
      destination: {
		  address: (propObj.street_address +', ' + propObj.city)
	  },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }
 
    getDirections(data)
	};
	_newReport() {
		this.props.navigation.navigate('Report', {'properties':this.properties});
	};
	_openReport(propertyObj) {
		this.props.navigation.navigate('ReportList', {'property':propertyObj});
	};
	
	_setModalVisible(visible) {
		this.setState({modalVisible: visible});
	};
	  
	_setMenuModalVisible(visible) {
		this.setState({menuModalVisible: visible});
	};
  
	render() {
	const newIcon = (<Icon name="pencil" size={30} backgroundColor="rgba(0,0,0,0)" color="white" />)
	var propertyListView;
	if (this.state.propertyList && this.state.propertyList.length > 0) {
		var that = this;
		var imageUrl = "https://s-media-cache-ak0.pinimg.com/736x/b8/19/b7/b819b74d318177b85ca314f38149b34d--futurist-architecture-architecture-building.jpg";
		propertyListView = <View style={{flex:1, marginTop:5, flexDirection:'column', backgroundColor:'white'}}>{this.state.propertyList.map(function(propertyObj, index) {
			return (
			<View key={index} style={{flex:1, flexDirection:'row', height: 110, margin:10,  borderColor:'gray', borderBottomWidth:0.2, backgroundColor:'white'}}>
				<TouchableHighlight onPress={()=>{that._openReport(propertyObj)}} style={{flex:3}}>
				<View style={{flex:1, flexDirection:'row', height: 110}}>
					<Image style={{width: 100, height: 100, marginRight:20, borderWidth: 1, borderColor: 'gray', borderRadius:5 }} source={{uri: imageUrl}} />
					<View  style={{ flexDirection:'column'}}>
						
						<Text style={{ fontSize: 20,color:'black'}}>{propertyObj.street_address} </Text>
						<Text style={{fontSize:20, color:'gray'}}>
							{propertyObj.city}
						</Text>
					</View>
					
				</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={()=>{that.handleGetDirections(propertyObj)}} style={{flex:1}}>
					<View  style={{ flexDirection:'column', marginTop: 20, alignItems:'center', justifyContent:'center'}}>
						
						<Icon name="map-marker" size={30} backgroundColor="rgba(1,1,1,1)" color="rgb(99, 159, 255)" />
						<Text style={{fontSize:15, color:'rgb(99, 159, 255)'}}>
							DIRECTIONS
						</Text>
					</View>
				</TouchableHighlight>
				</View>
		)})}</View>
	}
    return (
      <View style={styles.container}>
		<View style={styles.header}>
			<View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden', paddingRight:5}}
					onPress={()=>this._setMenuModalVisible(true)}>
					<Icon name="bars" size={30} color="white" />
				</Button>
			</View>
		</View>
		<ScrollView  ref="myScrollView" keyboardDismissMode='interactive' style={{ alignSelf: 'stretch', flex:1, backgroundColor:'white'}}>
		{propertyListView}
		</ScrollView>
		<View style={{position:'absolute', right: 15, bottom:15}}>
			<Button
				containerStyle={{ height:60, width:60,borderRadius:29, alignItems:'center', justifyContent:'center', backgroundColor:'#44D7A8',overflow:'hidden'}}
				style={{fontSize: 20, color: 'white', borderColor: 'white',borderRightWidth:1}}
				onPress={()=>{this._newReport()}}>
				<Icon name="pencil" size={30} color="white" />
			</Button>
		</View>
		
		<Modal transparent={true} visible={this.state.menuModalVisible} onRequestClose={() =>{}}
		animationType={"fade"}
		>
		<View style={{ backgroundColor:'white', margin:30, width:"80%", borderWidth:0.5, borderColor:'gray', borderRadius:10}}>
			
			<View style={{padding: 20, borderBottomWidth: 0.5, borderColor:'gray'}}><Text style={{color:'black', fontSize:20, paddingBottom:0}}>Menu</Text></View>
			<View style={{backgroundColor:'white', padding:20, flexDirection:'row'}}><Icon name="vcard-o" size={30} color="orange" /><Text style={{fontSize:20, paddingLeft:10}}>Profile</Text></View>
			<View style={{backgroundColor:'white', padding:20, flexDirection:'row'}}><Icon name="sign-out" size={30} color="orange" /><Text style={{fontSize:20, paddingLeft:10}}>Logout</Text></View>
			<TouchableHighlight style={{alignItems:'flex-end', padding:15}} onPress={() => {
              this._setMenuModalVisible(!this.state.menuModalVisible)
            }}>
              <Text style={{fontSize:20, color:'rgb(69, 188, 97)'}}>Cancel</Text>
            </TouchableHighlight>
		</View>
		</Modal>
      </View>
    );
  }
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		flexDirection: 'column'
	},
	headerText: {
		color: 'white',
		fontSize: 20
	},
  header: {
		height:60,
		alignSelf: 'stretch',
		justifyContent: 'flex-start',
		flexDirection:"row",
		alignItems: "center",
		margin:0,
		padding:10,
		borderWidth:0,
		backgroundColor: '#44D7A8',
		shadowColor: "black",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
		  height: 2,
		  width: -2
		}
	},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});