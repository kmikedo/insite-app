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
  ScrollView
  
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
					<Icon name="angle-left" size={30} color="rgb(255, 110, 58)" />
					<Text style={{paddingLeft:10, color:'orange', fontSize:20}}>Back</Text>
				</Button>
			</View>
		</View>
		<ScrollView  ref="myScrollView" style={{alignSelf: 'stretch', flex:1}}>

		<View style={{ margin:20, backgroundColor:'white'}}>
			<View style={{flexDirection:'row', paddingTop:20}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'gray'}}>
						Address
					</Text>
				</View>
				<View style={{flex:3, margin:15, borderTopWidth:1, borderColor:'gray'}}></View>
			</View>
			<View style={{flexDirection:'row', paddingTop:20, paddingBottom:10, borderColor:'lightgray', borderBottomWidth:1}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'black'}}>
						{params.location.street_address}, {params.location.city}
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						{params.location.postal}
					</Text>
				</View>
			</View>
			
			<View style={{flexDirection:'row', paddingTop:20}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'gray'}}>
						More stuff ...  
					</Text>
				</View>
				<View style={{flex:2, margin:15, borderTopWidth:1, borderColor:'gray'}}></View>
			</View>
			<View style={{flexDirection:'row', paddingTop:20, paddingBottom:20, borderColor:'lightgray', borderBottomWidth:1}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'black'}}>
						what else can we put here??
					</Text>
				</View>
			</View>
			
			<View style={{flexDirection:'row', paddingTop:20}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'gray'}}>
						Contacts
					</Text>
				</View>
				<View style={{flex:3, margin:15, borderTopWidth:1, borderColor:'gray'}}></View>
			</View>
			<View style={{flexDirection:'row', paddingTop:20, paddingBottom:20, borderColor:'lightgray', borderBottomWidth:1}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'black'}}>
						Mike Do (Manager)
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						416-882-0965
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						kmikedo@gmail.com
					</Text>
				</View>
			</View>
			<View style={{flexDirection:'row', paddingTop:20, paddingBottom:20, borderColor:'lightgray', borderBottomWidth:1}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'black'}}>
						Mike Do
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						416-882-0965
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						kmikedo@gmail.com
					</Text>
				</View>
			</View>
			<View style={{flexDirection:'row', paddingTop:20, paddingBottom:20, borderColor:'lightgray', borderBottomWidth:1}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'black'}}>
						Mike Do
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						416-882-0965
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						kmikedo@gmail.com
					</Text>
				</View>
			</View>
			<View style={{flexDirection:'row', paddingTop:20, paddingBottom:20, borderColor:'lightgray', borderBottomWidth:1}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'black'}}>
						Mike Do
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						416-882-0965
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						kmikedo@gmail.com
					</Text>
				</View>
			</View>
			<View style={{flexDirection:'row', paddingTop:20, paddingBottom:20, borderColor:'lightgray', borderBottomWidth:1}}>
				<View style={{flex:1}}>
					<Text style={{fontSize:20, color:'black'}}>
						Mike Do
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						416-882-0965
					</Text>
					<Text style={{fontSize:20, color:'black'}}>
						kmikedo@gmail.com
					</Text>
				</View>
			</View>
			
        
		</View>
		</ScrollView>
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
		height:50,
		alignSelf: 'stretch',
		justifyContent: 'flex-start',
		flexDirection:"row",
		alignItems: "center",
		margin:0,
		padding:10,
		borderWidth:0,
		backgroundColor: 'white',
		shadowColor: "black",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
		  height: 2,
		  width: -2
		},
		borderBottomWidth:5,
		borderColor:'lightgray'
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