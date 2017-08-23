/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
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
	console.log('son of a '+JSON.stringify(props));
	this.property = this.props.navigation.state.params.property;
	this.state = {property: this.property};
	var reportLists;
	var that = this;
	var user = firebase.auth().currentUser;
	user.getIdToken(false).then(function(t) {
		console.log('token is'+t);
		fetch('http://138.197.133.13/demo_client/issues', {
		  method: 'GET',
		  headers: {
			'Authorization': t,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		  }
		}).then((response) => response.json())
		.then((responseJson) => {
			reportLists = responseJson;
			that.setState({'reportList':responseJson});
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
		
		fetch('http://138.197.133.13/demo_client/properties', {
		  method: 'GET',
		  headers: {
			'Authorization': t,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		  }
		}).then((response) => response.json())
		.then((responseJson) => {
			that.properties = responseJson;
			console.log('size is'+that.properties.length);
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
	});
	
	this.state = {modalVisible:false, menuModalVisible: false, text: '', height: 0, reportList2: [
	{'title': 'Issue #1', 'description': 'blahblah', 'draft':true, 'property':{'name':'Hullmark', 'street_address':'1 Sheppard Ave East'}, 'author':{'name': 'Mike Do', 'email':'kmikedo@gmail.com'}}, 
	{'title': 'Issue #2', 'description': 'blahblah', 'draft':true, 'property':{'name':'Hullmark', 'address':'1 Sheppard Ave East'}, 'author':{'name': 'Mike Do', 'email':'kmikedo@gmail.com'}}, 
	{'title': 'Issue #3', 'description': 'blahblah', 'draft':true, 'property':{'name':'Hullmark', 'address':'1 Sheppard Ave East'}, 'author':{'name': 'Mike Do', 'email':'kmikedo@gmail.com'}}, 
	{'title': 'Issue #4', 'description': 'blahblah', 'draft':true, 'property':{'name':'Hullmark', 'address':'1 Sheppard Ave East'}, 'author':{'name': 'Mike Do', 'email':'kmikedo@gmail.com'}}, 
	{'title': 'Issue #5', 'description': 'blahblah', 'draft':true, 'property':{'name':'Hullmark', 'address':'1 Sheppard Ave East'}, 'author':{'name': 'Mike Do', 'email':'kmikedo@gmail.com'}}, 
	{'title': 'Issue #6', 'description': 'blahblah', 'draft':true, 'property':{'name':'Hullmark', 'address':'1 Sheppard Ave East'}, 'author':{'name': 'Mike Do', 'email':'kmikedo@gmail.com'}}, 
	],property: this.props.navigation.state.params.property};
  }
	_newReport() {
		this.props.navigation.navigate('Report', {'properties':this.properties, 'property': this.property});
	};
	_openReport(issue) {
		this.props.navigation.navigate('ReportDetail', {'properties':this.properties, 'issue':issue});
	};
	
	_setModalVisible(visible) {
		this.setState({modalVisible: visible});
	};
	  
	_setMenuModalVisible(visible) {
		this.setState({menuModalVisible: visible});
	};
	
	_back() {
		this.props.navigation.goBack();
	};
  
	render() {
	const searchIcon = (<Icon name="search" size={25} backgroundColor="rgba(0,0,0,0)" color="#44D7A8" />)
	const newIcon = (<Icon name="pencil" size={30} backgroundColor="rgba(0,0,0,0)" color="white" />)
	var reportListView;
	
	const { params } = this.props.navigation.state;
	if (this.state.reportList && this.state.reportList.length > 0) {
		var that = this;
		reportListView = <View style={{flex:1, marginTop:5, flexDirection:'column', backgroundColor:'white'}}>{this.state.reportList.map(function(reportObj, index) {
			var draft = <Text></Text>
			if (reportObj.property.street_address !== that.state.property.street_address) {
				return;
			}
			else if (reportObj.draft) {
				draft = <Text>Draft</Text>
			}
			return (
			<TouchableHighlight onPress={()=>{that._openReport(reportObj)}} key={index}>
				<View  style={{flex:1, flexDirection:'column', height: 80, margin:10, borderColor:'gray', borderBottomWidth:0.5, backgroundColor:'white'}}>
					<Text style={{ fontSize: 20, color:'black'}}>{reportObj.title} [{reportObj.author.email}] </Text>
					<Text style={{ fontSize: 17}}>{reportObj.property.street_address}, {reportObj.property.city}</Text>
					<Text style={{ fontSize: 14}}>{reportObj.description}</Text>
				</View>
				</TouchableHighlight>
		)})}</View>
	}
    return (
      <View style={styles.container}>
		<View style={styles.header}>
			<View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden', paddingRight:5}}
					onPress={()=>this._back()}>
					<Icon name="angle-left" size={35} color="white" />
				</Button>
			</View>
			<View style={{flex:3, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
				<Text style={{fontSize:19, color:'white'}}>{this.state.property.street_address}</Text>
				<Text style={{fontSize:17, color:'white'}}>{this.state.property.city}</Text>
			</View>
			<View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden', paddingRight:5}}
					onPress={()=>this._setMenuModalVisible(true)}>
					<Icon name="bars" size={30} color="white" />
				</Button>
			</View>

		</View>
		<View style={{height:80, flexDirection:'row', backgroundColor:'#44D7A8', padding:10}}>
			<View style={{height:50, flex:1, margin:5, borderRadius: 10, flexDirection:'row',backgroundColor:'white'}}>
				<View style={{height:50, flex:1, justifyContent:'center', alignItems:'center'}}>
				  {searchIcon}
				</View>
				<TextInput
				  underlineColorAndroid='transparent'
				  style={{height:50, flex:6, color:'black', fontSize:20, margin:1,}}
				  placeholder="Search"
				  placeholderTextColor="rgba(168, 166, 164,1)"
				  onChangeText={(text) => this.setState({password:text})}>
				</TextInput>
			</View>
		</View>
		<ScrollView  ref="myScrollView" keyboardDismissMode='interactive' style={{ alignSelf: 'stretch', flex:1, backgroundColor:'white'}}>
		{reportListView}
		</ScrollView>
		<View style={{position:'absolute', right: 15, bottom:15}}>
			<Button
				containerStyle={{ height:60, width:60,borderRadius:29, alignItems:'center', justifyContent:'center', backgroundColor:'#44D7A8',overflow:'hidden'}}
				style={{fontSize: 20, color: 'white', borderColor: 'white',borderRightWidth:1}}
				onPress={()=>{this._newReport()}}>
				<Icon name="pencil" size={30} color="white" />
			</Button>
		</View>
		<Modal transparent={true} visible={this.state.modalVisible} onRequestClose={() =>{}}
		animationType={"fade"}
		>
		<View style={{ backgroundColor:'white', margin:30, width:"80%", borderWidth:0.5, borderColor:'gray', borderRadius:10}}>
			
			<View style={{padding: 20, borderBottomWidth: 0.5, borderColor:'gray'}}><Text style={{color:'black', fontSize:20, paddingBottom:0}}>Filter</Text></View>
			<View style={{backgroundColor:'white', padding:20, flexDirection:'row'}}><Icon name="check-square-o" size={30} color="orange" /><Text style={{fontSize:20, paddingLeft:10}}>Show All</Text></View>
			<View style={{backgroundColor:'white', padding:20, flexDirection:'row'}}><Icon name="square-o" size={30} color="orange" /><Text style={{fontSize:20, paddingLeft:10}}>My Issues</Text></View>
			<View style={{backgroundColor:'white', padding:20, flexDirection:'row'}}><Icon name="square-o" size={30} color="orange" /><Text style={{fontSize:20, paddingLeft:10}}>Drafts</Text></View>
			<TouchableHighlight style={{alignItems:'flex-end', padding:15}} onPress={() => {
              this._setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={{fontSize:20, color:'orange'}}>Cancel</Text>
            </TouchableHighlight>
		</View>
		</Modal>
		
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
		paddingTop:20,
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