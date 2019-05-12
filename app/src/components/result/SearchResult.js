import React from "react";
import {connect} from "react-redux";
import {retrieveJoinedProps, retrieveuser, createActivity, deleteActivity} from "../../actions";
import {Loading} from "../Loading";
import Navigation from "../navigation/Navigation";
const firebase = require("firebase");

class SearchResult extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            isLoading: true,
        };

        firebase.auth().onAuthStateChanged(currentUser => {
            this.setState({ 
                currentUser: currentUser,
            });
            if(currentUser.uid) {
                props.retrieveuser(currentUser.uid);
                props.retrieveJoinedProps(currentUser);
            }
        });
    }


    componentDidMount() {
        this.setState({isLoading:false});
    }


    render() {
        const {isLoading, currentUser} = this.state;
        const {location, userInfo, retrieveJoinedProps, retrieveuser, createActivity, deleteActivity} = this.props;
        return(
            <div className="result-page-container">
                <Navigation />
                {
                    isLoading ? <Loading />
                :
                    <div className="result-wrap">
                        <h2>Details for {location.state.result ? location.state.result.name : 'this location'}</h2>
                        <div className="result-details">
                            
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo
});

export default connect(mapStateToProps, {retrieveJoinedProps, retrieveuser, deleteActivity}) (SearchResult);