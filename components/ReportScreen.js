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
  Alert,
  Image,
  Modal,
  View,
  Picker,
  AsyncStorage,
  TextInput,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
var ImagePicker = require('react-native-image-picker');

export default class ReportScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
    //${navigation.state.params.user}`,
	header: <View style={{height:0}}></View>
  });
  constructor(props) {
    super(props);
	this.state = {text: '', height: 0, images:[], language:'java', modalVisible:false,
	selectedLocation: this.props.navigation.state.params.property,
	locationList: this.props.navigation.state.params.properties,
	locationList2: [
	{'name': 'Hullmark', 'description': 'blahblah', 'address':'1 Sheppard Ave'},
	{'name': 'Hullmark2', 'description': 'blahblah', 'address':'2 Sheppard Ave'},
	{'name': 'Hullmark3', 'description': 'blahblah', 'address':'3 Sheppard Ave'},
	{'name': 'Hullmark4', 'description': 'blahblah', 'address':'4 Sheppard Ave'},
	{'name': 'Hullmark5', 'description': 'blahblah', 'address':'5 Sheppard Ave'},
	{'name': 'Hullmark6', 'description': 'blahblah', 'address':'6 Sheppard Ave'}]
	};
	console.log('size is report'+JSON.stringify(this.props.navigation.state.params.properties));
  }
	_clearInput() {
	  
		Alert.alert('',
        'Save as draft or discard it?',
        [
           {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
		   {text: 'Discard', style: 'delete', onPress: () => {this.props.navigation.goBack()}},
           {text: 'Draft', onPress: () => {
				this.setState({
					title:'',
					selectedLocation:'',
					detail:'',
					images: []
				});
		   }},
        ]);
	};
	_setLocation(location) {
		this.setState({selectedLocation:location});
		this.setState({modalVisible:false});
	};
	_openLoacationList(visible) {
		this.setState({modalVisible:visible});
	};
	_openLocationDetail() {
		if (this.state.selectedLocation) {
			this.props.navigation.navigate('LocationDetail', {'location':this.state.selectedLocation});
		}
	};
	_removePhoto(index) {
		if (this.state.images[index]) {
			var tempImages = this.state.images.slice();
				tempImages.splice(index, 1);
				this.setState({
					images: tempImages
				});
		}
	};
	
	_uploadImage = (uri, imageName, firebase1, mime = 'image/jpeg') => {
	  return new Promise((resolve, reject) => {
		const uploadUri = uri.replace('file://', '')
		  const sessionId = imageName+'.jpeg'
		  let uploadBlob = null
		  //const imageRef = this.storage.ref('images').ref('issues').child(`${sessionId}`)
		  const imageRef = firebase1.storage().ref('images/issues').child(`${sessionId}`)
		  fs.readFile(uploadUri, 'base64')
		  .then((data) => {
			return Blob.build(data, { type: `${mime};BASE64` })
		  })
		  .then((blob) => {
			uploadBlob = blob
			return imageRef.put(blob, { contentType: mime })
		  })
		  .then(() => {
			uploadBlob.close()
			return imageRef.getDownloadURL()
		  })
		  .then((url) => {
			resolve(url)
		  })
		  .catch((error) => {
			reject(error)
		  })
		}).catch((error => {
			console.log('wtf'+JSON.stringify(error));
		}));
	};
	_submit() {
		var user = firebase.auth().currentUser;
		var that = this;
		console.log('imageeee'+ JSON.stringify(this.state.images[0]));
		that._uploadImage(this.state.images[0].uri, 'testimage', firebase).then(function() {
			user.getIdToken(false).then(function(t) {
				fetch('http://138.197.133.13/demo_client/issue', {
				  method: 'POST',
				  headers: {
					'Authorization': t,
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				  },
				  body: JSON.stringify({
					 'title': that.state.title, 'description': that.state.detail, 'status': 'new', 'property': that.state.selectedLocation.id 
				  })
				}).then((responseJson) => {
					Alert.alert('',
					'Saved!!',
					[
					   {text: 'OK', onPress: () => {this.props.navigation.goBack()}}
					]);
				})
				.catch((error) => {
					console.error(error);
				});
			});
		});
	}
	_attachPhoto() {
		var options = {
			title: 'Attach photo',
			customButtons: [
				//{name: 'fb', title: 'Choose Photo from Facebook'},
			],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				let source = { uri: response.uri, fileSize: response.fileSize, fileName: response.fileName };

			// You can also display the image using data:
			// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				var tempImages = this.state.images.slice();
				tempImages.push(source);
				this.setState({
					images: tempImages
				});
			}
		});
	};
	render() {
		const { params } = this.props.navigation.state;
	var imagesSubView;
	if (this.state.images && this.state.images.length > 0) {
		var that = this;
		imagesSubView = <View style={{flex:1, margin:15}}>{this.state.images.map(function(imageSource, index) {
			return (
				<View key={index} style={{flexDirection:'row',marginBottom:10, padding:5, borderColor:'gray', borderWidth:0.5, borderRadius:5}}>
				<Image style={{flex:1,borderWidth: 3, borderColor:'gray', borderRadius:5, width: 75, height:75}} source={{ uri: imageSource.uri }}/>

				<Button
					containerStyle={{marginLeft:10, height:70, overflow:'hidden'}}
					onPress={()=>that._removePhoto(index)}
					style={{fontSize: 20, color: 'white', borderColor: 'white',borderRightWidth:1}}>
					<Icon name="remove" size={30} color="rgb(255, 110, 58)" />
				</Button>
				</View>
		)})}</View>
	}
	var locationText;
	var locationText2;
	if (this.state.selectedLocation)
	{
		locationText = this.state.selectedLocation.street_address;
		locationText2 = this.state.selectedLocation.city + ', ' + this.state.selectedLocation.postal;
	} else {
		locationText = 'Select property';
	}
		var locationListView;
	if (this.state.locationList && this.state.locationList.length > 0) {
		var that = this;
		locationListView = <View style={{flex:1, marginTop:2, flexDirection:'column', backgroundColor:'white'}}>{this.state.locationList.map(function(locationObj, index) {
			return (
				
				<View key={index} 
				style={{flex:1, flexDirection:'row', alignItems:'center', height: 90, margin:10, borderColor:'gray', borderBottomWidth:0.5, backgroundColor:'white'}}>
					<Image style={{width: 50, height: 50, borderRadius:20, marginRight: 10}} source={{uri:"https://facebook.github.io/react/img/logo_og.png"}}/>  
					<TouchableHighlight style={{flex:1, padding:15}} onPress={() => {
              that._setLocation(locationObj)
            }}>
			<View style={{flex:1}}>
				<Text style={{ fontSize: 20, color:'black'}}>{locationObj.city}</Text>
				<Text style={{ fontSize: 17}}>{locationObj.street_address}</Text>
				<Text style={{ fontSize: 14}}>{locationObj.postal}</Text>
				<View style={styles.formColumn,{flex:1, alignItems:'flex-end', justifyContent:'flex-end'}}>
					<Button
						containerStyle={{ height:30, padding:5,overflow:'hidden', backgroundColor:'orange', borderColor:'gray', borderRadius:5}}
						onPress={()=>this._openLocationDetail()}>
						<Text style={{color:'white'}}>See Detail</Text>
					</Button>
				</View>
			</View>
            </TouchableHighlight>
					
				</View>
		)})}</View>
	}
	
    return (
	<View style={styles.container}>
		<View style={styles.header}>
			<View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden'}}
					onPress={()=>this._clearInput()}
					style={{fontSize: 20, color: 'white', borderColor: 'white',borderRightWidth:1}}>
					<Icon name="angle-left" size={35} color="white" />
				</Button>
			</View>
			<View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden', paddingRight:15}}
					onPress={()=>this._attachPhoto()}>
					<Text style={styles.headerText}>ATTACH</Text>
				</Button>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden', paddingRight:15}}
					onPress={()=>this._submit()}>
					<Text style={styles.headerText}>SAVE</Text>
				</Button>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden', paddingRight:5}}
					onPress={()=>this._clearInput()}>
					<Icon name="ellipsis-v" size={30} color="white" />
				</Button>
			</View>
		</View>
		<View style={styles.formbody}>
			<ScrollView  ref="myScrollView" keyboardDismissMode='interactive' style={{alignSelf: 'stretch', flex:1}}>
				<View style={styles.formRow}>
					
					<View style={styles.formColumn, {flex:1, padding:10, flexDirection:'row'}}>
						<Image style={{width: 50, height: 50, borderRadius:20, marginRight: 10}} source={{uri:"https://s-media-cache-ak0.pinimg.com/736x/b8/19/b7/b819b74d318177b85ca314f38149b34d--futurist-architecture-architecture-building.jpg"}}/>  
						<Button
							containerStyle={{ height:50, overflow:'hidden', justifyContent:'center', alignItems:'center'}}
							onPress={()=>this._openLoacationList(true)}>
							<View style={{flexDirection:'column'}}>
								<Text style={{color: 'black', fontSize: 20, paddingLeft:10, paddingRight:5 }}>{locationText}</Text>
								<Text style={{color: 'black', fontSize: 20, paddingLeft:10, paddingRight:5 }}>{locationText2}</Text>
							</View>
							<Icon name="sort-desc" size={20} color="#44D7A8" />
						</Button>
					</View>
					
				</View>
				
				<View style={styles.formRow}>
					<View style={styles.formColumn, {flex:1, padding:10, flexDirection:'row'}}>

					<TextInput
						underlineColorAndroid='rgba(0,0,0,0)'
						style={{paddingLeft:0, height:50, flex:10, color:'black', fontSize:25}}
						placeholder="Subject"
						underlineColorAndroid='transparent'
						onChange={(event) => {
							  this.setState({
								title: event.nativeEvent.text
							  });
							}}
							value={this.state.title}
						>
					</TextInput>
					</View>

				</View>
				
				<View style={styles.formRow, {borderWidth: 0, height: Math.max(50, this.state.height)}}>
					<TextInput
						underlineColorAndroid='rgba(0,0,0,0)'
						style={ {borderWidth: 0, flex:1, margin:20, marginTop: 5, height: Math.max(40, this.state.height),minHeight:40,textAlignVertical:'top',justifyContent:'flex-start', alignItems:'flex-start'}}
						multiline={true}
						placeholder="Enter your issue here"
						onChange={(event) => {
						  this.setState({
							detail: event.nativeEvent.text,
							height: event.nativeEvent.contentSize.height+50,
						  });
						}}
						value={this.state.detail}
					/>
				</View>
				<View style={styles.formRow, {borderWidth:0}}>
					{imagesSubView}
				</View>
			</ScrollView>
		  </View>
		  <Modal transparent={true} visible={this.state.modalVisible} onRequestClose={() =>{}}
			animationType={"fade"}
			>
			<View style={{margin:20, marginTop:30, backgroundColor: 'white', borderWidth:1, borderColor:'orange', width:"90%", height:"80%", borderRadius:10}}>
			
			<ScrollView  ref="myScrollView" keyboardDismissMode='interactive' style={{marginTop:5, alignSelf: 'stretch', flex:1, backgroundColor:'white'}}>
			{locationListView}
			</ScrollView>
			<TouchableHighlight style={{alignItems:'flex-end', padding:15}} onPress={() => {
              this._openLoacationList(false)
            }}>
              <Text style={{fontSize:20, color:'orange'}}>cancel</Text>
            </TouchableHighlight>
			</View>
			</Modal>
	</View>
    );
  }
};
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	delete: {
		color:'red'
	},
	issuePhoto: {
		height:100,
		width:100,
		borderWidth:1,
		borderColor:'red'
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
	headerText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold'
	},
	formbody: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		marginTop:5
	},
	formRow: {
		flexDirection:'row',
		alignSelf: 'stretch',
		minHeight:50,
		marginLeft:20,
		marginRight:20,
		alignItems: "center",
		borderColor:'lightgray',
		borderBottomWidth:0.5
	},
	formColumn: {
		padding: 5,
		minWidth: 100,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	formTitle: {
		fontSize:18,
		textAlign: 'center',
		color: 'black'
	},
	formDescription: {
		alignSelf: 'stretch',
		flex:1
	}
});