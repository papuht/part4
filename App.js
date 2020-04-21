import {Component, useState} from 'react';
import * as React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView, FlatList, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AsyncStorage} from 'react-native';



class Notez extends Component {
	constructor(props) {
	super(props) 
		
	this.state = {
		notes: [{note:"jhkasdja"},]
		
		
	}
	
	
	
	}
	
	componentDidMount = () => AsyncStorage.getItem('note', (err, result) => {
		
	console.log(result)	
	const note = {
		
		note: result
		
	}
	console.log(note)
	const notelist = this.state.notes.concat(note)
	
	
	console.log(notelist)

	this.setState({notes : notelist})
	
	})
	
	
   
	
	
	addNote = (event) => {
		event.preventDefault()

	const note = {
		
		note: this.state.newNote
	}
	
	const testnotes = this.state.notes.map(note => note.note)
	console.log(testnotes)
	console.log(note)
	
	if (testnotes.includes(note)) {
	
    Alert.alert(
      "Duplicate note detected"
      
    )}
		
		
	const notez = this.state.notes.concat(note)

	this.setState({
    notes: notez,
	newNote: ''
	})
	}
	
	handleNoteAdd = (newNote) => {
	
	this.setState({ newNote})
	
	
	}
	
	
	render() {
		
		
	return (
	<View style={styles.container}>
		<Text style={styles.header}>Muistiinpanot</Text>
		<ScrollView>
        <FlatList
          data={this.state.notes}
          renderItem={({item}) => <Text style={styles.item}>{item.note}</Text>}
        />
		</ScrollView>
		<Button title="Uusi muistiinpano" onPress={() => this.props.navigation.navigate('InputView')} />
		</View>
		)
	}
	
	
	

}



	class InputView extends Component{
	constructor(props) {
	super(props) 
		
	this.state = {
		newNote: ''
		
	}
	
	this.handleNoteAdd = this.handleNoteAdd.bind(this)
	
	}
	
	handleNoteAdd = (newNote) => {
	
	this.setState({ newNote})
	
	
	
	}
	
	addNote = (event) => {
		event.preventDefault()

	const note = this.state.newNote
	
	
	AsyncStorage.setItem('note', JSON.stringify(note))
	console.log(note)
	this.setState({ newNote: ''})
	
	}
	
	
		
		
		render() {
		return (
		<View>
		<ScrollView>
		<TextInput style ={styles.input}  
				placeholder="Kirjoita uusi muistiinpano" 
				value = {this.state.newNote}
				onChangeText = {this.handleNoteAdd}
				
				/>
				</ScrollView>
		<Button title="lähetä" onPress={this.addNote} />
		</View>
		
		
		
		)
		}
	}
	
	
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  input: {
	height: 40,
	fontSize: 25
  },
  header: {
	  
	fontSize: 35  
  }
  
  
  
  
})

	const Stack = createStackNavigator()
	const App = () => {
	return (
	
	<NavigationContainer>
      <Stack.Navigator initialRouteName="Notez">
        <Stack.Screen name="Notez" component={Notez} />
		<Stack.Screen name="InputView" component={InputView} />
        
      </Stack.Navigator>
    </NavigationContainer>
	)
	}


export default App;
