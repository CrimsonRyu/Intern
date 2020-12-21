const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.Name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    Name: req.body.Name,
    Age: req.body.Age,
    Phone: req.body.Phone
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Intern."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { Name: { [Op.like]: `%${name}%` } } : null;
  
    Tutorial.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Intern details."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Intern with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
      where: { ID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Intern was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Intern with id=${id}. Maybe Intern was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Intern with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
      where: { ID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Intern was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Intern with id=${id}. Maybe Intern was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Intern with id=" + id
        });
      });
};