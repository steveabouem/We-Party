import { LOGIN, LOGOUT, LOAD_USERS } from "./types";
import axios from "axios";
import firebase from "firebase/app";
import { dbConfig } from "../config/firebase";

export const saveUser = (user) => dispatch => {
  dispatch({
    type: LOGIN,
    payload: user
  })
};

export const searchActivities = (input) => dispatch => {
  console.log("actions input", input);
  
  // exports.activities = functions.https.onRequest((req, res, input) => {
  //   const express = require('express');
  //   const cors = require('cors');
    
  //   const app = express();
  //   console.log("input", input);
  // });
//   console.log("input", input);
  
//   const yelpConfig = {
//     headers: { Authorization: "Bearer woO7hOWfngBu9aeNH8cMaN0g4p7_u0IzDZ5JFvjwhu0aqAItRM-5HijZhO3JY_TwmEVq3kFpnh0Ss5yBBHYYFTZPeCtuXStFKtdmO93SILH3b-RNgeyvOisyIWpNW3Yx", "Access-Control-Allow-Origin": "*" },
//     params: {
//       name: `${input}`,
//       location: "Montreal"
//     }
//   };
//   axios
//   .get(`https://api.yelp.com/v3/categories/${input}`, yelpConfig)
//   .then(response => {
//     console.log("food done: ", response.data);
//   })
//   .catch(err => console.log("Yelp call error: ", err));
}

export const loadUsersCollection = () => dispatch => {//thyere still not unique
  const usersCollection = firebase.database().ref().child('users')
  usersCollection.once('value').then(function(snapshot) {
    let usersList = []
    for(const user in snapshot.val()) {
      usersList.push(snapshot.val()[user]);
    }
    // console.log(usersList);
    dispatch({
      type: LOAD_USERS,
      payload: usersList
    })
  });
}