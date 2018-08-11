import React from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import "firebase/database";
import { dbConfig } from "../config/firebase";
import Navigation from "./Navigation.jsx";
import TextField from "../utils/TextField";
import { searchActivities } from "../actions";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';

class HomePage extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      searchResults: [],
      loggedIn: null
    }
  }
  
  recordSearch = (e) =>{
    let input = e.target.value;
      if(input.length > 3)
      return
      this.props.searchActivities(input);
  }

  render (){
    console.log("home props: ", this.props)
    return(
      <div>
        <Navigation />
        <div className="image-holder">
        {/* Photo by Ethan Hu on Unsplash */}
        <div className="row">
          <div className="col-lg-8">
            <div className="input-group">
            <p>CATCH PHRASE FOR WE PARTY, LIKE TURO.COM</p>
            {/* <input type="text" class="form-control" placeholder="Where to go?" onChange={(e) => this.recordSearch(e)}/> */}
            <TextField recordSearch={this.recordSearch}/>
            </div>
          </div>
        </div>
        </div>
        <div className="results-cards">
          {(this.state.searchResults.length > 0? this.state.searchResults.map(result => {
            return(
              <Col md={{ size: 10 }}>
                <Card>
                  <CardBody>
                    <CardTitle>Activity: {result.name}</CardTitle>
                    <CardSubtitle>Category {result.category}</CardSubtitle>
                    <CardText>Description: { result.description}</CardText>
                    <Button>Learn more...</Button>
                  </CardBody>
                </Card>
              </Col>)
               }) :
               <p>
               </p>
          )}   
        </div>
      </div>)
                 
  }
}
const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, {searchActivities}) (HomePage)