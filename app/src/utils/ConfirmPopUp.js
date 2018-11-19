import React from "react";
import { connect } from "react-redux";
import { pushNewMember, retrieveJoinedProps } from "../actions";


class Confirmation extends React.Component {

  matchesList = [];

  retrieveMatches = () => {
    if(this.props.activitiesList){ 
      this.props.activitiesList.forEach(match => {
        if(match.venue === this.props.yelpResult.name && match.location === this.props.yelpResult.location.address1){
          this.matchesList.push(match);
        }
      })
    }
  };

  joinGroup = async ( e,user,match) => {
    e.stopPropagation();
    await this.props.pushNewMember( user,match);
    await this.props.retrieveJoinedProps(this.props.userInfo.userInfo.email);
  };

  componentWillMount() {
    this.retrieveMatches();
  }
  
  render(){
    return(
      <div className="confirmation-container">
          <div>
            <div>Group(s) you could join: {this.matchesList.length}
              {this.matchesList.length > 0? 
                <ul className="view-groups" >
                  <button className="create-activity-secondary" onClick={e=> {this.props.createActivity(e, this.props.yelpResult)}}>
                    CREATE YOURS
                  </button>
                  <br />
                  Or join a group below
                  {
                    this.matchesList.map( match => {
                      
                    return(
                        <li key={this.props.yelpResult.id}> 
                          Venue:{match.venue} for {match.group} people
                          ( {match.contribution} each). 
                          <br/>
                          {match.members.length -1} member(s) joined!
                          <br/>
                          Creator: {match.creator.name}
                          <br/>
                          On {match.created}.
                          <br/>
                          <button type="button" className="create-activity" onClick={ e=> {this.joinGroup(e,this.props.userInfo.userInfo, match)}}>
                            Join Group
                          </button>
                        </li>
                    )
                    })
                  }
                </ul>
              :
              <div>
              No group created yet.<br/>
                <button type="button" className="create-activity" onClick={e=> {this.props.createActivity(e, this.props.yelpResult)}}>
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

export default connect(mapStateToProps, { pushNewMember, retrieveJoinedProps }) (Confirmation)