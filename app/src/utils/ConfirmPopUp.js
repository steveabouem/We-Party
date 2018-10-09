import React from "react";
import { connect } from "react-redux";
import { SlideToggle } from 'react-slide-toggle';



class Confirmation extends React.Component {
  matchesList = [];

  retrieveMatches = () => {
    if(this.props.activitiesList){ 
      this.props.activitiesList.forEach(match => {
        if(match.venue === this.props.yelpResult.name){
          this.matchesList.push(match)
        }
      })
    }
   
  }
  
  componentWillMount() {
    this.retrieveMatches();
  }
  
  render(){
    return(
      <div className="confirmation-container">
          <div>
            <div>Group(s) you could join: {this.matchesList.length}
              {this.matchesList.length > 0? 
                
             <SlideToggle duration={100} collapsed bestPerformance
             render={({onToggle, setCollapsibleElement}) => (
               <ul className="view-groups" >
                 <button className="create-activity" onClick={onToggle}>
                View Groups
                </button>
                 {
                   this.matchesList.map( match => {
                   return(
                     <li key={this.props.yelpResult.id} ref={setCollapsibleElement}> 
                       Venue:{match.venue} for {match.group} people
                       ( {match.contribution} each). 
                       <br/>
                       {match.members.length} member(s) joined!
                       <br/>
                       Creator: {match.creator.name}
                     </li>
                   )
                   })
                 }
               </ul>
             )}
           />
              :
              <div>
              No group created yet.<br/>
                <button className="create-activity" onClick={e=> {this.props.createActivity(e)}}>
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

export default connect(mapStateToProps) (Confirmation)