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
    constructor(props) {
        super(props);
        this.state = {
            isModalOpened: true,
            isPaymentModalOpen: false,
            loading: true,
            isPaymentFormOpen: false,
            buttonContent: "ADD FUNDS"
        };

        firebase.auth().onAuthStateChanged(currentUser => {
            this.setState({ currentUser: currentUser });
            props.retrieveuser(currentUser.uid);
        });
    }

    submitPayment = async (e) => {
        let customer = {name: this.state.currentUser.displayName, email: this.state.currentUser.email, uid: this.state.currentUser.uid};
        this.setState({
            loading: true
        });
        await this.props.createStripeCustomer(customer, this.props.stripe);
        await this.props.retrieveuser(this.state.currentUser.uid);
        this.setState({
            loading: false
        });
    }   
    
    togglePayment = () => {
        this.setState(prevState => ({
            isPaymentFormOpen: !this.state.isPaymentFormOpen,
            buttonContent: prevState.buttonContent === "ADD FUNDS" ? "VIEW BALANCE" : "ADD FUNDS"
        }));
    }

    renderModalContent = (info) => {
        switch (info.type) {
            case "paying":
                return "Processing"
                break;
            case "paid":
                return "Complete!"
                break;
            case "confirm":
                return info.content
                break;
            default:
                break;
        }
    }

    closeModal = () => {
        this.setState({
            isModalOpened: false,
            isPaymentModalOpen: false,
        })
    }

   async componentDidMount() {
        await this.state.currentUser;
        this.setState({
            loading: false
        });
    }

    render() {
        return this.state.loading ?
            <Loading size="large" /> 
            : 
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
            this.state.isPaymentModalOpen ? 
            <Modal
                isOpen={true}
                hasConfirm={false}
                hasCancel={true}
                top="20%"
                right="45%"
                message="Please wait while your payment is being processed..."
                cancel={e=>{this.closeModal();}}
            />
            : 
            <div className="payments-container">
                <Navigation currentUser={this.state.currentUser}/>
                <button className="button-primary" onClick={this.togglePayment}>
                    {this.state.buttonContent}
                </button>
                { !this.state.isPaymentFormOpen ?
                    <div className="balance-section">
                        <h3>your account summary</h3>
                        <div className="balance-summary-container">
                            <table>
                                <tr className="title-row">
                                    <th><Icon name="attach_money" /> Balance</th>
                                    <th><Icon name="group_add" /> Available Groups</th>
                                    <th><Icon name="group" /> Total Groups</th>
                                </tr>
                                <tr>
                                    <td>{this.props.userInfo.userSummary ? this.props.userInfo.userSummary.balance : "0 " }CAD</td>
                                    <td>{this.props.userInfo.userSummary ? "You can create up to " + this.props.userInfo.userSummary.timesUsed + " groups": "None created"}</td>
                                    <td>{this.props.userInfo.userSummary ? this.props.userInfo.userSummary.timesUsed  + " created": "None"}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    :
                    <div className="payment-section">
                        <div className="payment-form">
                            <PaymentForm submitPayment={e => {this.submitPayment(e)}}/>
                        </div>
                    </div>
                }
            </div>
    }
}

const Icon = ({name}) => {
    return <span className="material-icons">{name}</span>
};

const PaymentForm = ({submitPayment}) => {
    return (
        <form  className="payment-form">
            <label htmlFor="card-holder">
                Card holder's name
            </label>
            <input type="text" placeholder="Jane Dough" />

            <label htmlFor="card-number">
                Credit card number
            </label>
            <CardElement className="stripe-card-input" />
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