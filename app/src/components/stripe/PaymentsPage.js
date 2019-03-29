import React from "react";
import {connect} from "react-redux";
import { SlideToggle } from 'react-slide-toggle';
import {Switch, Route} from "react-router-dom";//emlate viwbooking
import {CardElement, injectStripe} from 'react-stripe-elements';
import {createStripeCustomer, submitPayment, retrieveuser} from "../../actions";
import Navigation from "../navigation/Navigation";
import Modal from "../modals";
import {Loading} from "../Loading";
const firebase = require("firebase");

class PaymentsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpened: true,
            loading: true,
            isPaying: false,
            buttonContent: "ADD FUNDS"
        };

        firebase.auth().onAuthStateChanged(currentUser => {
            this.setState({ currentUser: currentUser });
        });
    }

    submitPayment = async (e) => {
        this.setState({
            loading: true
        });
        let customer = {name: this.state.currentUser.displayName, email: this.state.currentUser.email, uid: this.state.currentUser.uid};
        await this.props.createStripeCustomer(customer, this.props.stripe);
        await this.props.retrieveuser(this.state.currentUser.uid);
        this.setState({
            loading: false
        });
    }   
    
    togglePayment = () => {
        this.setState(prevState => ({
            isPaying: !this.state.isPaying,
            buttonContent: prevState.buttonContent === "ADD FUNDS" ? "COLLAPSE" : "ADD FUNDS"
        }));
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    render() {
        return this.state.loading ?
         (<Loading />) : 
         (
            <div className="payments-container">
                <Navigation currentUser={this.state.currentUser}/>
                {
                    !this.state.isPaying ?
                    <div className="balance-section">
                        <h3>your account summary</h3>
                        <div className="balance-summary-container">
                            <table>
                                <th>balance</th>
                                <th>Groups</th>
                                <tr>
                                    <td>form props bal</td>
                                    <td>form props groups</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    :
                    <div className="payment-section">
                        <h3>{this.state.button}</h3>
                        <PaymentForm style={{transform: "translateY(200px)"}} submitPayment={e => {this.submitPayment(e)}}/>
                    </div>
                }
                <button className="button-primary" onClick={this.togglePayment}>
                    {this.state.buttonContent}
                </button>
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
            </div>
        );
    }
}

const PaymentForm = ({submitPayment}) => {
    return (
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
                <button type="button" onClick={submitPayment}>
                    SUBMIT
                </button>
            </form>
    );
}
const mapStateToProps = (state) => ({
    userInfo: state.userInfo
});

export default connect( mapStateToProps, {createStripeCustomer, submitPayment, retrieveuser}) (injectStripe(PaymentsPage))