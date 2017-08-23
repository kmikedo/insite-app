/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
  
} from 'react-native';
export default class TestScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: <View style={{height:0}}></View>
	});
	constructor(props) {
		super(props);
	  }
	render() {
		const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
		<View style={styles.header}>
			<View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden'}}
					onPress={()=>this.props.navigation.goBack()}
					style={{fontSize: 20, color: 'white', borderColor: 'white',borderRightWidth:1}}>
					<Icon name="angle-left" size={35} color="white" />
					<Text style={{paddingLeft:10, color:'white', fontSize:25}}>Back</Text>
				</Button>
			</View>
		</View>
		<ScrollView  ref="myScrollView" style={{alignSelf: 'stretch', flex:1}}>

		<View style={{ margin:20, backgroundColor:'white'}}>
			<View style={{flexDirection:'row', paddingTop:5, paddingBottom:0}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:25, color:'black'}}>
						{params.issue.title}
					</Text>
				</View>
			</View>
			<View style={{flexDirection:'row', paddingTop:3, paddingBottom:0}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:15, color:'gray'}}>
						{params.issue.created_at}
					</Text>
				</View>
			</View>
			<View style={{flexDirection:'row', paddingTop:3, paddingBottom:10, borderColor:'lightgray', borderBottomWidth:1}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:15, color:'gray'}}>
						{params.issue.author.name} [{params.issue.author.email}]
					</Text>
				</View>
			</View>
			<View style={{flexDirection:'row', paddingTop:10, paddingBottom:10, borderColor:'lightgray', borderBottomWidth:1}}>
				
					<Image style={{width: 50, height: 50, borderRadius:20, marginRight: 10}} source={{uri:"https://facebook.github.io/react/img/logo_og.png"}}/>
					<View style={{flexDirection:'column'}}>
					<Text style={{fontSize:15, color:'gray'}}>
							{params.issue.property.street_address}, {params.issue.property.city}
					</Text>
					<Text style={{fontSize:15, color:'gray'}}>
						{params.issue.property.postal}
					</Text>
					</View>
			</View>
			<View style={{flexDirection:'row', paddingTop:10, paddingBottom:10, borderColor:'lightgray'}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:18, color:'black'}}>
						{params.issue.description}
					</Text>
				</View>
			</View>
			
			
			
        
		</View>
		</ScrollView>
		<View style={styles.header}>
			<View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
				<Button
					containerStyle={{marginLeft:10, height:30, overflow:'hidden'}}
					onPress={()=>this.props.navigation.goBack()}
					style={{fontSize: 20, color: 'white', borderColor: 'white',borderRightWidth:1}}>
					<Icon name="comment-o" size={30} color="white" />
					<Text style={{paddingLeft:10, color:'white', fontSize:20}}>Comments</Text>
				</Button>
			</View>
		</View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor:'white'
	},
  header: {
		height:60,
		alignSelf: 'stretch',
		justifyContent: 'flex-start',
		flexDirection:"row",
		alignItems: "center",
		margin:0,
		padding:10,
		paddingTop:5,
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