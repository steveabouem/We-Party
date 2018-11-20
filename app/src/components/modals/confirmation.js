import React from "react";
import Popup from "reactjs-popup"; 

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: this.props.open }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }

  shuffleIndex = () => {
    if(this.props.min){
      console.log(Math.floor(Math.random() * (this.props.max - this.props.min)) + this.props.min);
      
      return Math.floor(Math.random() * (this.props.max - this.props.min)) + this.props.min;
    }
  }
  
  openModal (){
    this.setState({ open: true })
  }
  
  closeModal () {
    this.setState({ open: false})
  }
  
  
  componentDidMount() {

    console.log(this.shuffleIndex());
  }

  render() {
    let index = this.props.index;
    
    return (
      <div className="display-modal">
        <button className="button" onClick={this.openModal}  >
          HINTS 
        </button>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          {
             <p> {this.props.index === 0? this.props.hints[0] : this.props.hints[this.shuffleIndex()]}</p>
          
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