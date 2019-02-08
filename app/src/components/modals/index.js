import React from "react";
import { connect } from "react-redux";
import { confirmModalAction } from "../../actions";


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: props.isOpened,
    };
  };

  confirm = async() => {
    await this.props.confirmModalAction(this.props.callBack);
    this.setState({
      isOpened: false
    });
  };

  render() {
    return (
      <div className='standard-modal' style={{
        top: this.props.top,
        left:this.props.left,
        height:this.props.height,
        width:this.props.width}}>
        <div>{this.props.message}</div>
        <span className='standard-modal-buttons'>
          <button
            onClick={this.props.cancel}
            className="cancel-action"
          >
            {this.props.hasConfirm ? "No" : "OK"}
          </button>
          {this.props.hasConfirm ?
            <button
              onClick={this.props.confirm}
              className="confirm-action"
            >
              Yes
            </button>
            :
          null}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  userInfo: state.userInfo
});


export default connect(mapStateToProps, {confirmModalAction}) (Modal);