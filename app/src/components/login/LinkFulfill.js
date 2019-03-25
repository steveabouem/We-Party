import React from "react";
import {connect} from "react-redux";
import firebase from "firebase";
import "firebase/database";
import Modal from "../modals";
import {confirmLink} from "../../actions";

// alt button style :     background: #ffffff57;, color: #3c3c3c!important
class LinkFulfill extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpened: false
        };
    }

    completeLogin = async (e) => {
        let chosenName = this.props.match.params.username;
        await this.props.confirmLink(chosenName);
        await firebase.auth().currentUser;
       if(firebase.auth().currentUser) {
           firebase.auth().currentUser.updateProfile({
               displayName: this.props.match.params.username
           })
           .catch( e => {
               console.log({e});
               
           })
           this.props.history.push({pathname: "/home", name: chosenName });
       } else {
           this.setState({
               isModalOpened: true
           });
       }
    }

    closeModal = () => {
        this.setState({
            isModalOpened: false
        });
    };

    render() {
        return (
            <div className="link-auth-container">
                {this .state.isModalOpened && 
                    <Modal
                        callBack={null} 
                        isOpened={this.state.isModalOpened} 
                        hasConfirm={false}
                        hasCancel={true}
                        message={<p>Something went wrong. Please return to the <a href="/">Home page</a> to request a new link.</p>}
                        cancel={this.closeModal}
                        top="20%"
                        left="33%"
                    />
                }
                <h1>Fulfill here</h1>
                <button id="confirm-subscription" onClick={this.completeLogin}>
                    LOGIN
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo
});

export default connect (mapStateToProps, {confirmLink}) (LinkFulfill)