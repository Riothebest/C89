import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

import { RFValue } from 'react-native-responsive-fontsize';

export default class PostCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:true,
      post_id: this.props.post.key,
      post_data:this.props.post.value,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
     this.fetchUser();
  }
  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
    return(
       <TouchableOpacity style={styles.container} onPress = { () => this.props.navigation.navigate("PostScreen" , {post : this.props.post})}>
        <View style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }>
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
              <Image source={require("../assets/profile_img.png")} style={styles.profileImage}></Image>
            </View>
            <View style={styles.authorNameContainer}>
              <Text style={this.state.light_theme ? authorNameTextLight :styles.authorNameText}>
                {this.props.post.author}
              </Text>
            </View> 
          </View>
          <Image source={require("../assets/post.jpeg")} style={styles.postImage}></Image>
          <View style={styles.captionContainer}>
            <Text style={this.state.light_theme ? styles.captionTextLight : styles.captionText}>
              {this.props.post.caption}
              </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={"heart"} size={RFValue(20)} color={"white"}/>
              <Text style={this.state.light_theme? likeTextLight : styles.likeText}>12k</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }}
}
const styles = StyleSheet.create({
  container:{
 flex: 1
  },
  cardContainer:{
    margin: RFValue(13),
    backgroundColor: "#373737",
    borderRadius: RFValue(20)
  },
  cardContainerLight:{
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  authorContainer:{

  },
  authorImageContainer:{
    alignSelf:"center",
    alignItems:"center"
  }, 
  profileImage:{
    width:RFValue(3),
    height:RFValue(3),
    alignSelf:"center"
  },
  authorNameContainer:{
  paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  authorNameText:{
    fontSize: RFValue(25),
    color: "white"
  },
  authorNameTextLight:{
    fontSize: RFValue(25),
    color: "black"
  },
  postImage:{
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  captionContainer:{

  },
  captionText:{
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  captionTextLight:{
    fontSize: 13,
    color: "black",
    paddingTop: RFValue(10)
  },
  actionContainer:{
justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton:{
width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#000000",
    borderRadius: RFValue(30)
  },
  likeText:{
color: "white",
fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
    color:"black"
  }
});
