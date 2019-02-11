import React from 'react';
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
          />
        </div>
        <div className="sarch-separator" />
        <div className="field-container">
          <label>
            Attendees (number)
          </label>
          <input
            id="how-many"
            type="text"
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
        />
        </div>
      </form>
    );
  }
}

export default  TextField
