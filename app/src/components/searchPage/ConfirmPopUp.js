import React from "react";
import firebase from "firebase";
import moment from "moment"
import { connect } from "react-redux";
import { pushNewMember, retrieveJoinedProps, sendEmail } from "../../actions";
import Modal from "../modals";


class Confirmation extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpened: false,
      modalMessage: "",
      currentUser: firebase.auth().currentUser
    };
  }

  searchMatchesList = [];

  retrieveSearchMatches = () => { //retrieves the activities created that would match the current search entered
    if(this.props.activitiesList && this.props.activitiesList.unmatched) { 
      this.props.activitiesList.unmatched.forEach(match => {
        if(match.venue === this.props.yelpResult.name && match.location === this.props.yelpResult.location.address1){
          this.searchMatchesList.push(match);
        }
      })
    }
  };

  joinGroup = async (e, user, match) => {
    // e.stopPropagation();
    await this.props.pushNewMember(this.state.currentUser, match);
    this.props.retrieveJoinedProps(this.state.currentUser);
    match.members.forEach(member => {
      //  sendEmail = (email, subject,content)
      // this.props.sendEmail(member.email, "New Member", `A new member has joined your group (${match.venue}, ${match.created})!`);
    });
  };

  openModal = (e) => {
    e.stopPropagation();
    this.setState({
      isModalOpened: true,
      modalMessage: "You created this activity. You may create a second group, but you cannot join this one.",
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpened: false
    });
  };

  componentWillMount() {
    this.retrieveSearchMatches();
  }
  
  render(){ 
    let key = 0;
    return(
      <div className="confirmation-container">
          <div>
            <div>Group(s) you could join: {this.searchMatchesList.length}
              {this.searchMatchesList.length > 0? 
              <ul className="view-groups" >
                {this.state.isModalOpened &&
                  <Modal callBack={null}
                    isOpened={this.state.isModalOpened}
                    hasConfirm={false}
                    hasCancel={true}
                    message={this.state.modalMessage}
                    cancel={this.closeModal}
                    top="20%"
                    left="33%"
                    height="20%"
                    width="80%" 
                  />
                }
                  <button className="button-secondary" onClick={e=> {this.props.createActivity(e, this.props.yelpResult)}}>
                    CREATE YOURS
                  </button>
                  <br/>
                  Or join a group below
                  {
                  this.searchMatchesList.map(match => {
                    let dateDiff = moment(match.eventDate).diff(moment().now,"days");
                      return(
                        <li key={key += 0.2101}> 
                          Venue: {match.venue} for {match.group} people
                          ( {match.contribution} each). 
                          <br/>
                          {match.members && match.members.length -1} member(s) joined!
                          <br/>
                          Creator: {match.creator.name}
                          <br/>
                          Created On {match.created}.
                          <br />
                          For {moment(match.eventDate).format("ddd-MMM-Do-YY")} (in 
                          {dateDiff} {dateDiff > 1 ? " days" : " day"})
                          <br/>
                          {match.creator.email === this.state.currentUser.email ?
                            <button type="button" className="button-secondary"
                              onClick={ e=> this.openModal(e)}>
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
                </ul>
              :
              <div>
              No group created yet.<br/>
                <button type="button" className="button-primary" onClick={e=> {this.props.createActivity(e, this.props.yelpResult)}}>
                  CREATE!
                </button>
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

export default connect(mapStateToProps, { pushNewMember, retrieveJoinedProps, sendEmail }) (Confirmation)