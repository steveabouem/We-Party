import React from "react";
import "firebase/database";
import firebase from "firebase";
import { connect } from "react-redux";
import Navigation from "../navigation/Navigation.jsx";
import SurveyForm from "../survey/SurveyForm";
import TextField from "./TextField";
import Confirmation from "./ConfirmPopUp";
import Modal from "../modals";
import {
  retrieveuser, searchActivities, sendEmail,
  createActivity,
  loadActivitiesCollection, retrieveJoinedProps, randomKey
} from "../../actions";


class HomePage extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      loggedIn: null,
      list: null,
      searchResults: null,
      showMatches: false,
      currentUser: null,
      isModalOpened: false,
      noResultModal: false,
      loginModal: false,
      isPaymentModalOpen: false
    }

    this.resultRef = React.createRef();
    firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({ currentUser: currentUser });
      if(currentUser && currentUser.uid) {
        props.retrieveuser(currentUser.uid);
        props.retrieveJoinedProps(currentUser.uid);
      }
    });
  }
  
  handleKeyPress = (e) => {
    if (e.keyCode === 13 && !this.state.isModalOpened) {
      this.processSearch();
    } else if (e.keyCode === 13 && this.state.isModalOpened) {
      this.closeModal();
    }
  }
  
  closeModal = () => {
      this.setState({
        noResultModal: false,
        isModalOpened: false,
        loginModal: false,
        isPaymentModalOpen: false
      });
  }
  
  processSearch = async() => {
    let input = document.getElementById("SEARCH_VENUE").value,
      groupTotal = document.getElementById("how-many").value,
      budget = document.getElementById("budget-selected").innerHTML,
      gender = document.getElementById("gender-selected").innerHTML,
      eventDate = document.getElementById("when").value;
    
    if (input === "" || groupTotal === "" || budget === "" 
      || input === " " || groupTotal === " " ||
      budget === "Pick an amount" || gender === "Edit your group" ||
      eventDate === "") {
      
      this.setState({
        isModalOpened: true
      });
    } else {
      await this.props.searchActivities(input);
      if (this.props.userInfo.searchResults === "No results found:(") {
        this.setState({
          	noResultModal: true
        });
      } else {
        window.scrollTo({
          top: 400,
          left: 0,
          behavior: "smooth"
        });
      }
    }
  }
  
  createActivity = (e,object) => {
    let currentUser = this.props.userInfo.userSummary,
    groupTotal = document.getElementById("how-many").value,
    budget = document.getElementById("budget-selected").innerHTML,
    gender = document.getElementById("gender-selected").innerHTML,
    eventDate = document.getElementById("when").value,
    date = new Date(), 
    dateString = date.toString().split(" ").slice(0, 5),
    created = `${dateString[0]}, ${dateString[1]} ${dateString[2]} ${dateString[3]}`,
    activityObject = {
      id: object.id,
      creator: this.props.userInfo.userSummary,
      location: object.location.address1, contact: object.phone, contribution: budget,
      group: groupTotal, members: [currentUser], genders: gender, created: created,
      eventDate: eventDate, venue: object.name
    };

    for( let key in activityObject ) {
      if(activityObject[key] === "" || activityObject[key] === " " || activityObject[key] === "Pitch in") {
        activityObject[key] = null
      }
    };
    this.props.createActivity(activityObject, this.props.userInfo.userSummary.uid);
  }
  
  async componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
    {firebase.auth().currentUser ? this.props.retrieveuser(firebase.auth().currentUser.uid) : null }
    {firebase.auth().currentUser ? this.props.retrieveJoinedProps(firebase.auth().currentUser.uid) : null }
  }
  

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  componentDidUpdate(prevProps) {
    if(this.props.userInfo.ErrorMessage && (!prevProps.userInfo.ErrorMessage  || prevProps.userInfo.ErrorMessage !== this.props.userInfo.ErrorMessage)) {
      this.setState({
        isPaymentModalOpen: true,
      });
    }
    if(this.props.userInfo.searchResults && this.props.userInfo.searchResults !==prevProps.userInfo.searchResults) {

    }
  }

  render (){
    const apiResponse = this.props.userInfo.searchResults;
    const {userInfo} = this.props;
    const {currentUser, isPaymentModalOpen, isModalOpened, loginModal, noResultModal} = this.state;
    return(
      <div className="home-container">
        <Navigation />
        <SurveyForm />
        {
            isPaymentModalOpen
            ?
            <Modal
              isOpen={true}
              hasConfirm={true}
              hasCancel={true}
              top={window.innerHeight / 1.5 + "px"}
              right="45%"
              message="Go Premium?"
              callback={e => {this.props.history.push("/payment")}}
              cancel={e=>{this.closeModal()}}
            />
              :
              null
          }
        <div className="image-holder">
          <div className="row">
            <div>
              <div className="input-group">
                <span className="form-wrapper" style={{padding: "1%"}}>
                  <TextField style={{margin: "1%"}}/>
                  {!firebase.auth().currentUser?
                    <button style={{width: "100px", height: "100%"}} id="disabled-button">
                      Please Login
                    </button>
                    :
                    <button className="button-primary" style={{width: "100px", height: "100%"}} onClick={this.processSearch}>
                      Find Match!
                    </button>
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="results-cards">
          {
            !currentUser && loginModal
            ?
            <Modal
              isOpen={true}
              hasConfirm={false}
              hasCancel={true}
              top="20%"
              right="45%"
              message="Please login first"
              cancel={e=>{this.closeModal(); this.props.history.push("/");}}
            />
              :
              null
          }
          {
            isModalOpened
            ?
            <Modal
              isOpen={true}
              hasConfirm={false}
              hasCancel={true}
              top="20%"
              right="45%"
              message="Please complete all the fields."
              cancel={e=>this.closeModal()}
            />
              :
              null
          }
          {
            noResultModal
            ?
            <Modal
              isOpen={true}
              hasConfirm={false}
              hasCancel={true}
              top="20%"
              right="45%"
              message="No Results Found for this Search..."
              cancel={e=>this.closeModal()}
            />
              :
            null  
          }
          {apiResponse && apiResponse !== "No results found:(" && apiResponse.results.length > 0 ? apiResponse.results.map(result => {
            return (
            <div className="result-wrap" key={result.alias}>
              <div className="result-column">
                  <span>
                    <Confirmation key = {result.id} yelpResult = {result}
                      createActivity = {this.createActivity} 
                      matches={userInfo.searchResults.existingGroups} 
                    />
                  </span>
                <img className="result-image" top width="100%" height="200px" src={result.image_url} />
                <div className="result-text">
                  <h3> Venue: <br/> {result.name} </h3>
                  <p>
                    Description: <br/>
                    Yelp rating: {result.rating} ({result.review_count} reviews) <br/>
                    <span>
                      <span className="material-icons">phone_android</span>: {result.display_phone} <br/>
                    </span>
                    <span>
                      <span className="material-icons">location_on</span>: {result.location.address1} <br/>
                    </span>
                  </p>
                  <a href={result.url} target="blank">
                    <button className="button-secondary">Venue details...</button>
                  </a>
                </div>
              </div>
            </div>
            )}   
            ) : <p className="no-data-prompt"> </p>}
          </div>
        </div>
      )
    } 
}
      
const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, { searchActivities, sendEmail, retrieveuser, createActivity, loadActivitiesCollection, retrieveJoinedProps, randomKey}) (HomePage)
