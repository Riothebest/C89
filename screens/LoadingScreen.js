import React, {Component} from "react";
import {
    View,
    ActivityIndicator,
}from "react-native"
import firebase from "firebase"

export default class LoadingScreen extends Components{
    componentDidMount(){
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = ()=>{
        firebase.auth().onAuthStateChange((user)=>{
            if(user){
                this.props.navigation.navigate('DashboardScreen')
            }
            else{
                this.props.navigation.navigate('LoginScreen')
            }
        })
    }

    render(){
        return(
            <View style={{flex:1, justifyContent:"center",alignContent:"center",}}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}