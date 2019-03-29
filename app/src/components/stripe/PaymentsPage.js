import React from "react";
import {connect} from "react-redux";
import {submitPayment} from "../../actions";
import {Switch, Route} from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Modal from "../modals";
import {CardElement, injectStripe} from 'react-stripe-elements';
const firebase = require("firebase");

class PaymentsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpened: true,
        };

        firebase.auth().onAuthStateChanged(currentUser => {
            this.setState({ currentUser: currentUser });
        });
    }

    submitPayment = e => {
        let customer = {name: "Steve A", email: "email.com"};
        this.props.submitPayment(customer, this.props.stripe)
    }
    
    render() {
        return (
            <div className="payments-container">
            <Navigation currentUser={this.state.currentUser}/>
            <div className="balance-section">
                <h3>your account balance</h3>
                <div>
                    Insert account balance here. 
                </div>
            </div>
            <h3>Payment process</h3>
            {
              !this.state.currentUser && this.state.isModalOpened
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
                <div className="payment-section">
                    <form className="payment-form">
                        <label htmlFor="card-holder">
                            Card holder's name
                        </label>
                        <input type="text" placeholder="Jane Dough" />

                        <label htmlFor="card-number">
                            Credit card number
                        </label>
                        <CardElement />
                        <label htmlFor="card-number-confirm">
                            Confirm card number
                        </label>
                        <input type="number" /> 

                        <label htmlFor="payment-amount">
                            Enter amount
                        </label>
                        <input type="number" />
                        <button type="button" onClick={e => {this.submitPayment(e);}}>
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo
});

export default connect( mapStateToProps, {submitPayment}) (injectStripe(PaymentsPage))