import React from "react";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: props.isOpened,
    };
  };

  confirm = () => {
    this.props.callBack;
    this.setState({
      isOpened: false
    });
  };

  render() {
    const {hasConfirm, hasLink, message, top, left, link, width, height, callBack, cancel, hasCancel} = this.props;
    return (
      <div className='standard-modal' style={{
        top: top,
        left:left,
        height:height,
        width:width}}>
        <div>{message}</div>
        <span className='standard-modal-buttons'>
          {hasLink && 
            <a href={link}>
            <button>GO</button>
            </a>
          }
          {hasConfirm && 
             <button
             onClick={cancel}
             className="cancel-action"
           >
             {hasCancel ? "YES" : "OK"}
           </button>
          }
          {hasCancel &&
            <button
              onClick={cancel}
              className="cancel-action"
            >
              {hasConfirm ? "No" : "OK"}
            </button>
          }
        </span>
      </div>
    );
  }
}
