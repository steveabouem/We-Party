import React from "react";


export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: props.isOpened,
    };
    this.modalRef = React.createRef();
  };

  confirm = async() => {
    if(this.props.callback !== undefined) {
      this.props.callback();
      this.setState({
        isOpened: false
      });
    } 
  };

  componentDidUpdate() {
    let modalElt = document.getElementsByClassName("standard-modal");
    if(modalElt[0]) {
      modalElt.scrollIntoView();
    }
  } 

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
              onClick={this.confirm}
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
