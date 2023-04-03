const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = mongoose.model("Task");

router.post("/createTask", async (req, res) => {
  const {
    taskName,
    description,
    startDate,
    endDate,
    participants,
    dependantID = "-1",
    workspaceID,
  } = req.body;

  var status = -1;
  // var userName = helper.generateUsername(email);

  const task = new Task({
    taskName,
    description,
    startDate,
    endDate,
    participants,
    dependantID,
    workspaceID,
    status,
  });

  try {
    await task.save();
    res.send({ message: "Task created successfully" });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

router.post("/getTasks", (req, res) => {
  const { workspaceID, status } = req.body;

  Task.find({ workspaceID: workspaceID, status: status })
    .then((tasks) => {
      // console.log(savedUser);
      if (tasks) {
        res.send(tasks);
      } else {
        return res.status(422).send({ error: "No task Available" });
      }
    })
    .catch((err) => {
      return res.status(422).send({ error: err.message });
    });
});

module.exports = router;
