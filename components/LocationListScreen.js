import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImagePickerIOS,
  ScrollView,
  ListView
} from 'react-native';
const styles = StyleSheet.create({

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

const Row = (props) => (
  <View style={{padding:15}}>
    <Text style={{fontSize: 20}}>
      {`${props.name}`}
    </Text>
    <Text style={{fontSize: 15, color:'grey'}}>
      {`${props.address}`}
    </Text>
  </View>
);
const Header = () => (
  <View style={{padding:10, backgroundColor:'black'}}>
    <Text 
      style={{color:'white', fontSize:20}}
      onPress={()=>this._cancel()}> 
      {'< Back'}
    </Text>
  </View>
);
const Footer = () => (
  <View style={{padding:1, backgroundColor:'grey'}}>
  </View>
);



export default class LocationListScreen extends Component {
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._setLocation = this._setLocation.bind(this);
    this.itemsRef = this.props.firebaseApp.database().ref();

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.properties = [];
  }

  componentDidMount() {
    var that = this;
    this.hullmark = this.itemsRef.child('properties');
    this.hullmark.on('value', (properties) => {
      properties.forEach((property) => {
        that.properties.push({id: property.key, name: property.val().name, url: property.val().photo, contacts: property.val().contacts});
      });
      if (that.refs.myRef) {
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(that.properties)
        });
      }
    });
    
  }

  _renderRow(props) {
    return (<View style={{padding:15, flexDirection:'row'}}>
      <Image style={{ width: 40, height: 40, borderWidth: 1, borderColor: 'black', borderRadius:5 }} source={{uri: props.url}} /> 
      
      <Text style={{fontSize: 20, padding:5}}
        onPress={()=>this._setLocation(props)}
      >
        {`${props.name}`}
      </Text>
    
  </View>);
  }
  _renderHeader() {
    return (<View style={{padding:10, backgroundColor:'black'}}>
    <Text 
      style={{color:'white', fontSize:20}}
      onPress={()=>this._cancel()}> 
      {'< Back'}
    </Text>
  </View>);
  }

  _cancel() {
    this.props.navigator.pop();
  }

  _setLocation(data) {
    this.props.parent.selectProperty(data);
    this.props.navigator.pop();
  }
  /*
   * Removed for brevity
   */
  render() {
    return (      
      <ListView ref="myRef"
        style={{}}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        renderHeader={this._renderHeader}
      />
    );
  }
}