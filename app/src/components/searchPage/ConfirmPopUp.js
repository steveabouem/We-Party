import React from "react";
import { connect } from "react-redux";
import { pushNewMember, retrieveJoinedProps } from "../../actions";


class Confirmation extends React.Component {

  searchMatchesList = [];

  retrieveSearchMatches = () => { //retrieves the activities created that would match the current search entered
    if(this.props.activitiesList && this.props.activitiesList.unmatched){ 
      this.props.activitiesList.unmatched.forEach(match => {
        if(match.venue === this.props.yelpResult.name && match.location === this.props.yelpResult.location.address1){
          this.searchMatchesList.push(match);
        }
      })
    }
  };

  joinGroup =  async( e,user,match) => {
    e.stopPropagation();
    await this.props.pushNewMember( user,match);
    this.props.retrieveJoinedProps(this.props.userInfo.userInfo);
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
                  <button className="button-secondary" onClick={e=> {this.props.createActivity(e, this.props.yelpResult)}}>
                    CREATE YOURS
                  </button>
                  <br />
                  Or join a group below
                  {
                    this.searchMatchesList.map( match => {
                      console.log(match.members, this.searchMatchesList);
                      
                    return(
                        <li key={key += 0.2101}> 
                          Venue:{match.venue} for {match.group} people
                          ( {match.contribution} each). 
                          <br/>
                          {match.members.length -1} member(s) joined!
                          <br/>
                          Creator: {match.creator.name}
                          <br/>
                          On {match.created}.
                          <br/>
                          <button type="button" className="button-secondary" onClick={ e=> {this.joinGroup(e,this.props.userInfo.userInfo, match)}}>
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

export default connect(mapStateToProps, { pushNewMember, retrieveJoinedProps }) (Confirmation)