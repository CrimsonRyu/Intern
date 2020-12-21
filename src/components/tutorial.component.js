import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.getIntern = this.getIntern.bind(this);
    this.updateIntern = this.updateIntern.bind(this);
    this.deleteIntern = this.deleteIntern.bind(this);

    this.state = {
      currentIntern: {
        id: null,
        Name: "",
        Age: 0,
        Phone: 0
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getIntern(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentIntern: {
          ...prevState.currentIntern,
          Name: name
        }
      };
    });
  }

  onChangeAge(e) {
    const age = e.target.value;
    
    this.setState(prevState => ({
      currentIntern: {
        ...prevState.currentIntern,
        Age: age
      }
    }));
  }

  onChangePhone(e) {
    const phone = e.target.value;
    
    this.setState(prevState => ({
      currentIntern: {
        ...prevState.currentIntern,
        Phone: phone
      }
    }));
  }

  getIntern(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentIntern: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateIntern() {
    TutorialDataService.update(
      this.state.currentIntern.id,
      this.state.currentIntern
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Intern details were updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteIntern() {    
    TutorialDataService.delete(this.state.currentIntern.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentIntern } = this.state;

    return (
      <div>
        {currentIntern ? (
          <div className="edit-form">
            <h4>Intern</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentIntern.Name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={currentIntern.Age}
                  onChange={this.onChangeAge}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentIntern.Phone}
                  onChange={this.onChangePhone}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteIntern}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateIntern}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Intern...</p>
          </div>
        )}
      </div>
    );
  }
}