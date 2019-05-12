import React from "react";
import Navigation from "../navigation/Navigation";
import Modal from "../modals";
import {Loading} from "../Loading";
import {retrieveJoinedProps, retrieveuser, updateUser} from "../../actions";
import {connect} from "react-redux";

const firebase = require("firebase");

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isModalOpened: false,
            isEditing: {
                username: false,
                gender: false,
            },
            selectedOption: "",
            customName: ""
        };

        this.inputOptions = [
            {name: "female", text: "female"}, {name: "male", text:"male"}, 
            {name: "N/A", text:"It's my business"}, {name: "trans", text:"Transgender"}
        ];

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

    handleCheckboxChange = async (property) => {
        await this.props.updateUser({uid: this.state.currentUser.uid, update: {[property.name]: property.value}}, () => {
            if(property.name !== "displayName") {
                this.setState( prevState => ({
                    selectedOption: prevState.selectedOption === property.value ? "" : property.value
                })); 
            }
        });
        await this.props.retrieveuser(firebase.auth().currentUser.uid);
        console.log("Profile updated");
    }

    async componentDidMount(){
        await this.props.retrieveJoinedProps(firebase.auth().currentUser);
        this.setState({
            isLoading: false
        });
    }

    render() {
        const {currentUser, isLoading, isEditing, isModalOpened,  selectedOption} = this.state;
        const {userInfo} = this.props;
        
        return(
            <div className="profile-container">
                <Navigation currentUser={currentUser || null} />
                {
                    isLoading ? <Loading />
                    :
                    <div className="profile-wrap">
                        <div className="profile-left">
                            <div className="profile-inner-top">
                                <h2>Your Profile Details</h2>
                            </div>
                            <ul className="profile-summary">
                                <li>
                                    <h3>Credits</h3>
                                    <div className="profile-list-item">
                                        <span>You currently have <b>1</b> credit.</span>
                                            <a className="profile-name-edit" href="/payment">
                                                ADD
                                                <span className="material-icons add-credits">
                                                    monetization_on
                                                </span>
                                            </a>
                                    </div>
                                </li>
                                <li>
                                    <h3 htmlFor="profile-username">What you identify as</h3>
                                    <div className="profile-list-item">
                                        {currentUser && currentUser.uid &&
                                            <CheckBox 
                                                onClick={this.handleCheckboxChange}
                                                selectedOption={selectedOption}
                                                inputOptions={this.inputOptions}
                                                updateName="gender"
                                            />
                                        }
                                    </div>
                                </li>
                                <li>
                                    <h3>Your Groups and Activities</h3>
                                    <div className="profile-list-item">
                                        <ul className="profile-activities">
                                            {userInfo.userSummary && userInfo.userSummary.activities ?
                                                Object.keys(userInfo.userSummary.activities.unmatched).map( key => {
                                                    let activity = userInfo.userSummary.activities.unmatched[key].activity;
                                                    return (
                                                        <React.Fragment>
                                                            <li>
                                                                Date created: {activity.created}
                                                            </li>
                                                            <li>
                                                                By : {
                                                                        activity.creator.uid === currentUser.uid ? 
                                                                        "Yourself"
                                                                        :
                                                                        userInfo.userSummary.displayName
                                                                    }
                                                            </li>
                                                            <li>
                                                                Due date: {activity.eventDate}
                                                            </li>
                                                            <li>
                                                                Full breakdown <a>here</a>
                                                            </li>
                                                        </React.Fragment>
                                                    );
                                                })
                                                :
                                                null
                                            }
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="profile-right">
                            <div className="profile-inner-top">
                                <h2>Basic Information</h2>
                                <span className="material-icons profile-image-wrap">
                                    {currentUser && currentUser.photoURL ?
                                        <img src={currentUser.photoURL} />
                                        :
                                        "face"
                                    }
                                </span>
                            </div>
                            <ul className="profile-summary">
                                <li>
                                    <h3>Username</h3>
                                    <div className="profile-list-item">
                                        {isEditing.username ?
                                            <React.Fragment>
                                                <label className="select-profile-name">
                                                    Customize
                                                </label>
                                                <input 
                                                    type="text" onChange={e => {this.setState({customName: e.target.value})}}
                                                    placeholder="Min 4 characters"    
                                                />
                                                <a className="profile-name-edit-cancel">
                                                    <span className="material-icons">backspace</span>
                                                </a>
                                            </React.Fragment>
                                            :
                                            <span>
                                                {
                                                    currentUser && !userInfo.userSummary ? 
                                                    currentUser.displayName :
                                                    userInfo.userSummary ?
                                                    userInfo.userSummary.displayName
                                                    :
                                                    "N/A"
                                                }
                                            </span>
                                        }
                                        <a className="material-icons profile-name-edit" 
                                            href=""
                                            onClick={e => {
                                                e.preventDefault(); 
                                                this.setState({isEditing: {...this.state.isEditing, username: !this.state.isEditing.username}})

                                                if(this.state.customName.length && this.state.customName.length > 4) {
                                                    this.handleCheckboxChange({name: "displayName", value:this.state.customName});
                                                }
                                            }}
                                        >
                                            {!this.state.isEditing.username ? "EDIT" : "OK"}
                                            <span className="material-icons add-credits">
                                                {!this.state.isEditing.username ? "create" : "check"}
                                            </span>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <h3>Declared gender</h3>
                                    <span> 
                                        {userInfo.userSummary && userInfo.userSummary.gender ?
                                            userInfo.userSummary.gender     
                                        :
                                            'None declared.'
                                        }
                                    </span>
                                </li>
                                <li>
                                    <h3>Your average rating</h3>
                                    <span>0</span>
                                </li>
                            </ul>
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

const CheckBox = ({inputOptions, selectedOption, onClick, updateName}) => {
    return(
        <span className="checkbox-container">
                {
                    inputOptions.map( input => {
                        return (
                            <div key={input.name} className="checkbox-wrap">
                                <label htmlFor={input.name}>{input.text}</label>
                                <input 
                                    checked={selectedOption === input.name}
                                    name={input.name} type="checkbox"
                                    onClick={e => { onClick({name: updateName, value: input.name})}} 
                                    disabled={selectedOption && selectedOption !== input.name}
                                />
                            </div>
                        );
                    })
                }
        </span>
    );

}

export default connect (mapStateToProps, {retrieveuser, retrieveJoinedProps, updateUser}) (ProfilePage)