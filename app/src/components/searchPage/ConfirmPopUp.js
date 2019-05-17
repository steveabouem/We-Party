import React from "react";
import firebase from "firebase";
import moment from "moment"
import { connect } from "react-redux";
import { pushNewMember, retrieveJoinedProps, sendEmail} from "../../actions";
import Modal from "../modals";

class Confirmation extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpened: false,
      modalMessage: "",
      currentUser: firebase.auth().currentUser,
      matchesList: [],
      showMatches: false,
    };
  }

  searchMatchesList = [];

  isPerfectMatch = (match) => {//conditions below prevent occasional crash on reload
    // console.log({match});
    
    // let groupTotal = document.getElementById("how-many") ? document.getElementById("how-many").value : "",
    //   budget = document.getElementById("budget-selected") ? document.getElementById("budget-selected").innerHTML : "",
    //   genders = document.getElementById("gender-selected") ? document.getElementById("gender-selected").innerHTML : "",
    //   location = document.getElementById("SEARCH_VENUE") ? document.getElementById("SEARCH_VENUE").value : "",
    //   eventDate = document.getElementById("when") ? document.getElementById("when").value : "";
    
    // if (
    //   match.venue.toLowerCase().indexOf(location.toLowerCase() ==! -1)
    //   && match.contribution == budget
    //   && match.eventDate == eventDate
    //   && match.group == groupTotal
    //   && genders === match.genders
    // ) {
    //   return true
    // }

    // return false
  }

  renderMatchesList = async() => {
    let matchesList = [],
    {yelpResult, matches} = this.props;

    await matches.unmatched.forEach(search => {
      if(search && search.location === yelpResult.location.address1) {
        matchesList.push(search);
      }
    });
    await matches.matched.forEach(search => {
      if(search && search.location === yelpResult.location.address1) {
        matchesList.push(search);
      }
    });
    this.setState({matchesList});
  }

  isDuplicate = (currentUser, match) => {
    let duplicates = Object.keys(match.members).filter( key => {
      return match.members[key].email === currentUser.email
    });
    return duplicates.length > 0;
  }

  joinGroup = async (e, user, match) => {
    // e.stopPropagation();
    await this.props.pushNewMember(this.state.currentUser, match);
    this.props.retrieveJoinedProps(this.state.currentUser);
    
  };

  openModal = (e, duplicate) => {
    e.stopPropagation();
    let modalMessage;
     if(duplicate === "creator") {
      modalMessage = "You created this activity. You may create a second group, but you cannot join this one."
     } else {
      modalMessage = "You already joined this party. You will be notified of all relevant events";
     } 
      
    this.setState({
      isModalOpened: true,
      modalMessage: modalMessage,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpened: false
    });
  };

  async componentDidMount() {
    await this.renderMatchesList();
  }

  render(){ 
    let key = 0;
    const {yelpResult, createActivity} = this.props;
    const {matchesList, isModalOpened, modalMessage, showMatches} = this.state;
    
    return(
      <div className="confirmation-container">
          <div>
            <div>
              <h3 className="match-title">Group(s) you could join: {matchesList.length > 0 ? matchesList.length : "N/A"}</h3>
              {matchesList.length > 0 ? 
                <ul className="view-groups" >
                  {isModalOpened &&
                    <Modal callBack={null}
                      isOpened={isModalOpened}
                      hasConfirm={false}
                      hasCancel={true}
                      message={modalMessage}
                      cancel={this.closeModal}
                      top="20%"
                      left="33%"
                      height="30%"
                      width="80%" 
                    />
                  }
                  <span className="match-top-buttons">
                    <button className="button-secondary" onClick={e=> {createActivity(e, yelpResult)}}>
                      CREATE YOURS
                    </button>
                    <div className="material-icons" onClick={e => {this.setState({showMatches: !showMatches})}}>{showMatches ? "new_releases" : "new_releases"}</div>
                  </span>
                  {showMatches && 
                    <div className="matching-groups">
                      <span>Or join a group below</span>
                      
                      {matchesList.length > 0 && matchesList.map(match => {
                        let dateDiff = moment(match.eventDate).diff(moment().now, "days");
                          return(
                            <li key={key += 0.2101} className =  {this.isPerfectMatch(match) && "perfect-match-box"}> 
                              {this.isPerfectMatch(match) && <span className="material-icons">stars</span>}
                              Venue: {match.venue} for {match.group} people
                              ( {match.contribution} each). 
                              <br/>
                              {match.members && match.members.length -1} member(s) joined!
                              <br/>
                              Creator: {match.creator.displayName}
                              <br/>
                              Created On {match.created}.
                              <br />
                              For {moment(match.eventDate).format("ddd, MMM Do YY")} (in 
                              {dateDiff} {dateDiff > 1 ? " days" : " day"})
                              <br/>
                              {
                                match.creator.email === this.state.currentUser.email ?
                                <button type="button" className="button-secondary"
                                  onClick={ e=> this.openModal(e, "creator")}>
                                  Join Group
                                </button>
                                :
                                this.isDuplicate(this.state.currentUser, match) ?
                                <button type="button" className="button-secondary"
                                  onClick={ e=> this.openModal(e, "duplicate")}>
                                  Join Group
                                </button>
                                :
                                <button type="button" className="button-secondary"
                                  onClick={ e => { this.joinGroup(e, this.state.currentUser, match) }}>
                                  Join Group
                                </button>
                              }
                            </li>
                          );
                        })
                      }
                    </div>
                  }
                </ul>
              :
              <div>
                No group created yet.<br/>
                <span className="match-top-buttons">
                  <button type="button" className="button-primary" onClick={e=> {createActivity(e, yelpResult)}}>
                    CREATE!
                  </button>
                </span>
              </div>
              }
            </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, { pushNewMember, retrieveJoinedProps, sendEmail}) (Confirmation)