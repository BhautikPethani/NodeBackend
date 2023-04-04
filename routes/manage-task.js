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

router.post("/getTasksForDependant", (req, res) => {
  const { workspaceID } = req.body;
  Task.find({ workspaceID: workspaceID }, { taskName: 1, _id: 1 }).then(
    async (tasks) => {
      // console.log(savedUser);

      try {
        if (tasks) {
          res.send(tasks);
        } else {
          res
            .status(422)
            .send({ label: "Opps!", message: "There's no data !!" });
        }
      } catch (err) {
        res.status(422).send({ label: "Opps!", message: err.message });
      }
    }
  );
});

router.post("/deleteTask", (req, res) => {
  const { taskID, taskName, dependantID } = req.body;

  console.log(taskID, taskName, dependantID);

  if (dependantID != "-1") {
    console.log("DELETE 1");
    Task.findOne({ _id: dependantID, status: "-1" }).then(async (tasks) => {
      // console.log(savedUser);

      try {
        if (tasks) {
          // res.send(tasks);
          if (tasks == [] || tasks == null || tasks == undefined) {
            Task.deleteOne({ _id: taskID }).then(async (response) => {
              // console.log(savedUser);

              try {
                if (response.status == 200) {
                  res.send({
                    label: "Success",
                    message: taskName + " deleted successfully.",
                  });
                } else {
                  return res
                    .status(422)
                    .send({ label: "Opps!", message: "There's no data !!" });
                }
              } catch (err) {
                res.send({ label: "Opps!", message: err.message });
              }
            });
          } else {
            console.log(tasks);
            return res.send({
              label: "Warning",
              message: "Please complete parent task first !!",
            });
          }
        } else {
          res
            .status(422)
            .send({ label: "Opps!", message: "Something went wrong !!" });
        }
      } catch (err) {
        res.status(422).send({ label: "Opps!", message: err.message });
      }
    });
  }
  Task.deleteOne({ _id: taskID }).then(async (response) => {
    // console.log(savedUser);

    res.send({
      label: "Success",
      message: taskName + " deleted successfully.",
    });
  });
});

module.exports = router;
