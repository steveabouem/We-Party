import React from "react";
import Navigation from "./Navigation.jsx";
import  {activities} from "../helpers/activities";
import  {groups} from "../helpers/groups";


export default class HomePage extends React.Component {
  render (){
    console.log(groups, activities)
    return(
      <div className="home-page">
        <Navigation />
        
      </div>
    )
  }
}

