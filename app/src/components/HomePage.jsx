import React from "react";
import { connect } from "react-redux";
import "firebase/database";
import Navigation from "./Navigation.jsx";
import TextField from "../utils/TextField";
import { searchActivities, saveActivity, findMatches, loadUsersCollection } from "../actions";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import location  from "../utils/icons/location.svg";
import phone  from "../utils/icons/smartphone.svg";


class HomePage extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      loggedIn: null,
      list: null
    }
  }

  async componentDidMount() {
    await this.props.loadUsersCollection();
  }
  
  recordSearch = async(e) => {
    let firstResult = document.getElementsByClassName("add-activity"); 
    let input = e.target.value;
    // console.log(firstResult);
    
    await this.props.searchActivities(input);
    await this.props.searchResults;
    if(firstResult[0]){
      firstResult[0].focus(); // look if delaying possible. Focus() method takes no arguments :( )
    }
  }
  
  saveActivity = (e, object) => {// use cookies upon deployment, this is just taking in the latest user logged in
    console.log("phone", object);
    
    const existingUsers = this.props.userInfo.usersList;
    const  groupTotal = document.getElementById("how-many").value;
    const budget = document.getElementById("budget-selected").innerHTML;
    const gender = document.getElementById("gender-selected").innerHTML;
    const activityObject = { user: existingUsers[existingUsers.length -1] , venue: object.name, location:object.location.address1, contact: object.phone, budget: budget, group: groupTotal, genders: gender};
    this.props.saveActivity(activityObject,existingUsers[existingUsers.length -1]);
  }

  findMatches = async () => {
    await this.props.findMatches()
  }

  focus = () => {
    let loginButton = document.getElementsByClassName('link-primary')[0];
    loginButton.focus();
  }

  render (){
    const ApiResponse =this.props.userInfo.searchResults;
    console.log(this.props);
    
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
              {this.props.userInfo.userInfo.userInfo?
              <button style={{margin: "1%", height: "90%"}} id="disabled-button" onClick={this.focus}>
                Login first
              </button>
              :
              <button style={{margin: "1%", height: "90%"}} onClick={this.findMatches}>
                Find Match!
              </button>
              }
            </span>
            </div>
            <span className="photo-credentials"> Photo by Gades Photography on Unsplash </span>
          </div>
        </div>
        </div>
        <div className="results-cards">
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
                    <CardTitle> Establishment: <br/> {result.name} </CardTitle>
                    {/* <CardSubtitle>Category: {result.categories[0].title} </CardSubtitle> */}
                    <CardText>
                      Description: <br/>
                      Yelp rating: {result.rating} <br/>
                      <span>
                      <img src={phone} alt="phone" className="result-icon" />: {result.display_phone} <br/>
                      </span>
                      <span>
                        <img src={location} alt="location" className="result-icon" />: {result.location.address1} <br/>
                        {/* Stephen Hutchings */}
                      </span>
                      {/* distance:  {result.distance} <br/> */}
                    </CardText>
                    <a href={result.url} target="blank">
                     <Button>Learn more...</Button> 
                    </a>
                  </CardBody>
                </Card>
              </Col>
          )}   
           ) :<p className="no-data-prompt"> </p>}
        </div>
      </div>)
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, {searchActivities, saveActivity, findMatches, loadUsersCollection}) (HomePage)