import React from "react";
import {sendFeedback} from "../../actions";
import {connect} from "react-redux";
const firebase = require("firebase");

class SurveyForm extends React.Component {
    constructor() {
        super();
        this.state = { 
            isExpanded: false,
            isSubmitted: false
        };
    }

    sendFeedback = e => {
        e.preventDefault()
        let fields = document.getElementsByTagName("textarea");
        if(fields[0] && this.props.userInfo && this.props.userInfo.userSummary && this.props.userInfo.userSummary.uid) {
            let values = Object.keys(fields).map( field => (
                {field: fields[field].name, value: fields[field].value}
            ));
            this.props.sendFeedback(values, this.props.userInfo.userSummary.uid);
        }
        this.setState({isExpanded: false});
    }

    render() {
        const {isExpanded} = this.state;
        return (
            <React.Fragment>
                <div className="survey-button-wrap">
                    <button id="survey-button" onClick={e => {
                        this.setState({isExpanded: !isExpanded});
                    }}>
                        {isExpanded ? "COLLAPSE FEEDBACK FORM" : "FEEDBACK"}
                    </button>
                </div>
                {isExpanded &&
                    <div className="survey-form">
                        <h1>Your Feedback</h1>
                        <p>This website is under construction. We value the experience of our future customers and would love to hear your feedback, good and bad.</p>
                        <p>Please fill in the form below.</p>
                        <form id="feedback">
                            <label>How would you describe your overall experience?</label>
                            <textarea name="question-1" className="form-question" />

                            <label>What are the positive takeways from your navigation on this page?</label>
                            <textarea name="question-2" className="form-question" />

                            <label>What, if anything was challenging/uncomfortable to you on the current page?</label>
                            <textarea name="question-3" className="form-question"/>

                            <label>What are the major bugs that you noticed?</label>
                            <textarea name="question-4" className="form-question"/>

                            <label>Are there any functionalities that you would like to have added to the website upon launch?</label>
                            <textarea name="question-5" className="form-question"/>

                            <button id="feedback-button" type="submit" onClick={e => {this.sendFeedback(e)}}>Send Feedback</button>
                        </form>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
});

export default connect(mapStateToProps,{sendFeedback}) (SurveyForm);