import React, { Component } from 'react'
import Details from './details'
var firebase = require('firebase')
var uuid = require('uuid')

var firebaseConfig = {
    apiKey: "AIzaSyDP0TbZH-3KL304aoBeoUczfb0At7mL5dQ",
    authDomain: "survey-b67b7.firebaseapp.com",
    databaseURL: "https://survey-b67b7.firebaseio.com",
    projectId: "survey-b67b7",
    storageBucket: "survey-b67b7.appspot.com",
    messagingSenderId: "181059575781",
    appId: "1:181059575781:web:452a4bcf6e12775144590c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class Usurvey extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             studentName : '',
             uid : uuid.v1(),
             questions : '',
             answers : {
                 answer1 : '',
                 answer2 : '',
                 answer3 : '',
             },
             isSubmitted : 1
        }
        this.handleChange = this.handleChange.bind(this);
        this.nameSubmit = this.nameSubmit.bind(this);
    }

    handleChange (event){
        this.setState({studentName : event.target.value})
    }

    nameSubmit (event){
        this.setState({isSubmitted: 2})
        console.log(this.state)
        event.preventDefault()
        }

    answerSelected = (event) => {
        var answers = this.state.answers
        if(event.target.name === 'answer1'){
            answers.answer1 = event.target.value
        }else if (event.target.name === 'answer2'){
            answers.answer2 = event.target.value
        }else if (event.target.name === 'answer3'){
            answers.answer3 = event.target.value
        }
        this.setState({answers: answers}, function(){
            console.log(this.state)
        } )
    }

    submitQuestion = () => {
        firebase.database().ref('uSurvey/'+ this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        })
        this.setState({isSubmitted: 3})
    }
    

    render() {
        let display;
        let questions;

        if (this.state.isSubmitted === 1){
            display =    <Details 
                    name={this.state.studentName}
                     handleChange={this.handleChange}
                     nameSubmit={this.nameSubmit} />
            questions = ''
        }else if (this.state.isSubmitted === 2){
            display = <h2>Welcome, {this.state.studentName}</h2>
            questions = 
                <div>
                    <p>Complete the following survey</p>
                    
                    <form onSubmit={this.submitQuestion}>

                        <div className='card'>
                            <label>What Type of course do u prefer?</label> <br/>
                            <input type='radio' name='answer1' value='Technology' onChange={this.answerSelected}/> Technology <br />
                            <input type='radio' name='answer1' value='Marketting' onChange={this.answerSelected}/> Marketting <br />
                            <input type='radio' name='answer1' value='Design' onChange={this.answerSelected}/> Design <br />
                        </div>
                        <div className='card'>
                            <label>You are </label> <br/>
                            <input type='radio' name='answer2' value='Student' onChange={this.answerSelected}/> Student <br />
                            <input type='radio' name='answer2' value='In-Job' onChange= {this.answerSelected} /> In-Job<br />
                            <input type='radio' name='answer2' value='Looking-Job' onChange={this.answerSelected}/>Looking-Job<br />
                        </div>
                        <div className='card'>
                            <label>Is learning online helpful? </label> <br/>
                            <input type='radio' name='answer2' value='Student' onChange={this.answerSelected}/> Yes <br />
                            <input type='radio' name='answer2' value='In-Job' onChange={this.answerSelected}/> No <br />
                            <input type='radio' name='answer2' value='Looking-Job' onChange={this.answerSelected}/>Maybe<br />
                        </div>
                        
                        <input type='submit' value='submit'/>

                    </form>
                </div>
        }else if (this.state.isSubmitted === 3){
        display = <h4>Thanks, {this.state.studentName}</h4>
        }
        
                   

        return (
            <div>
                
                {display}
                --------------------------------------------------------
                {questions}
            </div>
        )
    }
}

export default Usurvey
