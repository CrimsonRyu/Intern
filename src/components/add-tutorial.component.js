import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.saveIntern = this.saveIntern.bind(this);
    this.newIntern = this.newIntern.bind(this);

    this.state = {
      id: null,
      Name: "",
      Age: 0, 
      Phone: 0,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      Age: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      Phone: e.target.value
    });
  }

  saveIntern() {
    var data = {
      Name: this.state.Name,
      Age: this.state.Age,
      Phone: this.state.Phone
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          Name: response.data.Name,
          Age: response.data.Age,
          Phone: response.data.Phone,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newIntern() {
    this.setState({
      id: null,
      Name: "",
      Age: '',
      Phone: '',

      submitted: false
    });
  }

   render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.Name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                required
                value={this.state.Age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Phone">Phone</label>
              <input
                type="number"
                className="form-control"
                id="phone"
                required
                value={this.state.Phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>

            <button onClick={this.saveIntern} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}