import React from "react";
import { connect } from "react-redux";
import "firebase/database";
import Navigation from "./Navigation.jsx";
import TextField from "../utils/TextField";
import { searchActivities, saveActivity } from "../actions";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';

class HomePage extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      loggedIn: null,
    }
  }
  
  recordSearch = async(e) => {
    let input = e.target.value;
    await this.props.searchActivities(input);
    this.props.searchResults;
  }

  saveActivity = (e, object) => {
    const  groupTotal = document.getElementById("how-many").value;
    const budget = document.getElementById("budget-selected").innerHTML;
    const activityObject = { venue: object.name, location:object.location.address1, budget: budget, group: groupTotal};

    this.props.saveActivity(activityObject);
  }

  render (){
    const ApiResponse =this.props.userInfo.searchResults;
    return(
      <div>
        <Navigation />
        <div className="image-holder">
          <div className="row">
          <div className="col-lg-8">
            <div className="input-group">
            <span className="instructions-primary">
              <p>Make it happen. Create your party!</p>
            </span>
            <span className="form-wrapper" style={{padding: "1%"}}>
              <TextField recordSearch={this.recordSearch} style={{margin: "1%"}}/>
              <button style={{margin: "1%", height: "90%"}}> Find Match! </button>
            </span>
            </div>
            <span style={{opacity: "0.5", color: "white", fontSize: "0.5em"}}> Photo by Gades Photography on Unsplash </span>
          </div>
        </div>
        </div>
        <div id="results-cards">
          {ApiResponse !== undefined? ApiResponse.results.map(result => {
            return(
              <Col md={{ size: 10 }} key={result.alias}>
                <Card className="result-cards">
                  <span>
                    <button key={result.id} className="add-activity" onClick={(e) => {this.saveActivity(e, result)}}>
                      Save it
                    </button>
                  </span>
                  <CardImg top width="100%" height="200px" src={result.image_url} />
                  <CardBody>
                    <CardTitle> Establishment: {result.name} </CardTitle>
                    <CardSubtitle>Category: {result.categories[0].title} </CardSubtitle>
                    <CardText>
                      Description: <br/>
                      Yelp rating: {result.rating} <br/>
                      Contact: (phone icon){result.display_phone} <br/>
                      Location: (address icon) {result.location.address1} <br/>
                      distance: (icon) {result.distance} <br/>
                    </CardText>
                    <a href={result.url} target="blank">
                     <Button>Learn more...</Button> 
                    </a>
                  </CardBody>
                </Card>
              </Col>
          )}   
           ) :<p></p>}
        </div>
      </div>)
                 
  }
}
const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, {searchActivities, saveActivity}) (HomePage)