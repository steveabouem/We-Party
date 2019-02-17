import React from 'react';
import moment from "moment";
import Dropdown from './Dropdown';
import GenderMix from "./GenderMix";

class TextField extends React.Component {
  render() {
    return (
      <form className="search-form" id="search-activity-form">
        <div className="field-container">
          <label>
            Where/What?
          </label>
          <input
            id="SEARCH_VENUE"
            type="text"
            placeholder="venue or category"  
          />
        </div>
        <div className="sarch-separator" />
        <div className="field-container">
          <label>
            Attendees
          </label>
          <input
            id="how-many"
            type="number"
            max={10}
            placeholder="enter number"  
          />
        </div>
        <div className="sarch-separator" />
        <div className="field-container">
          <Dropdown />
        </div>
        <div className="sarch-separator" />
        <div className="field-container">
          <GenderMix />
        </div>
        <div className="sarch-separator" />
        <div className="field-container">
          <label>
            When?
          </label>
          <input 
          id="when"
          type="date"
          label="When?"
          min={moment().format("YYYY-MM-DD")}
          max={moment().add(15, "days").format("YYYY-MM-DD")}
          placeholder="select date"  
        />
        </div>
      </form>
    );
  }
}

export default  TextField
