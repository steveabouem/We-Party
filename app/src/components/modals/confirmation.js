import React from "react";
import Popup from "reactjs-popup"; 

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: this.props.open }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }

  openModal (){
    this.setState({ open: true })
  }

  closeModal () {
    this.setState({ open: false })
  }

  render() {
    let index = Math.floor(Math.random() * (6 - 1)) + 1;
    console.log(this.state, this.props, index);
    
    return (
      <div className="display-modal">
        <button className="button" onClick={this.openModal} >
          HINTS
        </button>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          {!this.props.hints ? this.props.modalText.map( text => {
             return <p>{text}</p>
          })
          :
          <p> {this.props.hints[index]}</p>
          }
          <a className="close" onClick={this.closeModal}>
            &times;
          </a>
        </Popup>
      </div>
    )
  }
}

export default ConfirmationModal 