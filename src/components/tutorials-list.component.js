import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveInterns = this.retrieveInterns.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveIntern = this.setActiveIntern.bind(this);

    this.state = {
      interns: [],
      currentIntern: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveInterns();
  }

  retrieveInterns() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          interns: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveInterns();
    this.setState({
      currentIntern: null,
      currentIndex: -1
    });
  }

  setActiveIntern(intern, index) {
    this.setState({
      currentIntern: intern,
      currentIndex: index
    });
  }

  render() {
    const { interns, currentIntern, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Interns List</h4>

          <ul className="list-group">
            {interns &&
              interns.map((intern, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveIntern(intern, index)}
                  key={index}
                >
                  {intern.Name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentIntern ? (
            <div>
              <h4>Intern</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentIntern.Name}
              </div>
              <div>
                <label>
                  <strong>Age:</strong>
                </label>{" "}
                {currentIntern.Age}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentIntern.Phone}
              </div>

              <Link
                to={"/tutorials/" + currentIntern.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Intern...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}