import React, {Component} from 'react';
import { TextInput, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state = {
            text:'',
        };

        getWord=(word)=>{
            var searchKeyword = word.toLowerCase()
            var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
            return fetch(url).then((data)=>{
                if(data.status===200)
                {
                    return data.json()
                }
                else{
                    return null
                }
            })
            .then((response)=>{
                //console.log(response)
                var responseObject = response
                //var word = responseObject.word
                //var lexicalCategory = response.results[0].lexicalCatagory.text
                if(responseObject)
                {
                    var wordData = responseObject.definitions[0]
                    //console.log(responseObject.definitions[0])
                    var definition = wordData.description
                    var lexicalCatagory = wordData.wordtype
                    //console.log(lexicalCategory)
                    this.setState({
                        "word" : this.state.text,
                        "definition" :definition,
                        "lexicalCategory": lexicalCatagory
                    })
                }
                else{
                    this.setState({
                        "word" : this.state.text,
                        "definition": "Not Found",
                    })
                }
            })
        }
    render(){
        <View style={this.styles.detailsContainer}>
            <Text style={this.styles.detailesTitle}>
                Word : {""}
                </Text>
                <Text style={{fontSize:18}}>
                    {this.state.word}
                    </Text>
                    <View style={this.styles.detailsContainer}>
                    <Text style={this.styles.detailesTitle}>
                Type : {""}
                </Text>
                <Text style={{fontSize:18}}>
                    {this.state.lexicalCatagory}
                    </Text>
                    </View>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <Text style={this.styles.detailesTitle}>
                definition : {""}
                </Text>
                <Text style={{fontSize:18}}>
                    {this.state.definition}
                    </Text>
                    </View>
            </View>
            
        return(
            <View style={styles.container}>
                <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Dictionary App',
            style: { color: '#fff', fontSize: 20 },
          }}
        /> 
        <TextInput style={styles.inputBox}
        onChangeText={text => {
            this.setState({
                text:text,
                isSearchedPressed: false,
                word : "Loading...",
                examples: [],
                defination : ""
            });
        }}
        value = {this.state.text}
        />
        <TouchableOpacity
        style = {styles.searchButton}
        onPress={ () => {
            this.setState({ isSearchPressed: true});
            this.getWord(this.state.text)
        }}><Text>Search</Text></TouchableOpacity>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    inputBoxContainer:{
        flex: 0.3,
        alignItems:'center',
        justifyContent: 'center',
    },
    inputBox:{
        width:'80%',
        alignSelf:'center',
        height: 40,
    },
    detailsContainer:{

    },
    detailesTitle:{

    },

