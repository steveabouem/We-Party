import React from "react";
import Navigation from "./Navigation.jsx";
import PaperSheet from "../utils/PaperSheet";
import { searchResults } from "../helpers/searchResults";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';



export default class HomePage extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      searchResults: [],
      loggedIn: null
    }
  }
  componentDidMount(){
    fetch("/home")
      .then(res => {console.log("mount res: ", res)});
  }
  getActivity(e){
    let input = e.target.value;
    let resultHolder = [];
    if(input.length > 2){
    searchResults.forEach( object =>{
      if(object.category.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) !== -1) {
        resultHolder.push(object)
      }
      this.setState({searchResults: resultHolder})
    })
  } if(input.length < 2){
    this.setState({searchResults:[]})
  }
  }

  render (){
    return(
      <div>
        <Navigation />
        <PaperSheet />
        {/* Photo by Ethan Hu on Unsplash */}
        <div class="row">
          <div class="col-lg-8">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Look for..." onChange={(e) => this.getActivity(e)}/>
            </div>
          </div>
        </div>
        <div className="results-cards">
          {(this.state.searchResults.length > 0? this.state.searchResults.map(result => {
            return(
              <Col md={{ size: 10 }}>
                <Card>
                  <CardBody>
                    <CardTitle>Activity: {result.name}</CardTitle>
                    <CardSubtitle>Category {result.category}</CardSubtitle>
                    <CardText>Description: { result.description}</CardText>
                    <Button>Learn more...</Button>
                  </CardBody>
                </Card>
              </Col>)
               }) :
               <p>
               </p>
            
          )}   
        </div>
      </div>)
                 
  }
}

