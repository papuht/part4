import {Component} from 'react';
import * as React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView, FlatList, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AsyncStorage} from 'react-native';



class Notez extends Component {
	constructor(props) {
	super(props) 
		
	this.state = {
		notes: []
		
		
	}
	
	
	
	}
	
	componentDidMount = () =>
	
	AsyncStorage.getItem('note', (err, result) => {
	
	console.log(result)	
	
	const notez = JSON.parse(result)
	console.log(notez)
	if (notez === null) {
		
	}
	
	else {

	this.setState({notes : notez})
	console.log(this.state.notes)
	}
	})
	
	
	
	
   
	render() {
		
		
	return (
	<View style={styles.container}>
		<Text style={styles.header}>Muistiinpanot</Text>
		<ScrollView style={styles.scrollView}>
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
		notes:[],
		newNote: '',
		
		
	}
	
	this.handleNoteAdd = this.handleNoteAdd.bind(this)
	
	this.addNote = this.addNote.bind(this)
	
	}
	
	
	
	
	
	
	handleNoteAdd = (newNote) => {
	
	this.setState({ newNote})
	
	
	
	}
	
	componentDidMount = () => 
	
	
	AsyncStorage.getItem('note', (err, result) => {
	
	const notess = this.state.notes
	console.log(result)	
	const notezz = JSON.parse(result)
	console.log(notezz)
	if (notess === null) {
		
	
	}
	else {
	
	
	console.log(notezz)
	this.setState({notes: notess.concat(notezz)})
	console.log(this.state.notes)
	
	}
	})
	
	
	
	
	addNote = (event) => {
	event.preventDefault()
		
	const note = {
		
		note: this.state.newNote
	}
	
	console.log(note.note)
	console.log(this.state.notes)
	
	var saveNote = ""
	
	
	if (this.state.notes[0] === null) {
		saveNote = note
		console.log(saveNote)
	}
	else {
	saveNote = this.state.notes.concat(note)
	console.log(saveNote)
	}
	
	
	const savedarray = JSON.stringify(saveNote)
	console.log(savedarray)
	
	AsyncStorage.setItem('note', savedarray)
	
	
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
   flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "baseline",
   paddingTop: 22
  },
  scrollView: {
  flex: 2,
  
  backgroundColor: "black"
  
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
	color: "white"
  },
  input: {
	height: 40,
	fontSize: 25,
	backgroundColor: "green"
  },
  header: {
	color:"white",
	backgroundColor: "black",
	fontSize: 35  
  },
  
  
  
  
  
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
