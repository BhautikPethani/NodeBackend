const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Workspace = mongoose.model("Workspace");

router.post("/createWorkspace", async (req, res) => {
  const { workspaceName, owner, participants } = req.body;

  // var userName = helper.generateUsername(email);

  const workspace = new Workspace({
    workspaceName,
    participants,
    owner,
  });

  try {
    await workspace.save();
    res.send({ message: "Workspace created successfully" });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

router.post("/allWorkspaces", (req, res) => {
  const { userName } = req.body;

  Workspace.find({ participants: userName })
    .then((workspaces) => {
      // console.log(savedUser);
      if (workspaces) {
        res.send(workspaces);
      } else {
        return res.status(422).send({ error: "No Workspace Available" });
      }
    })
    .catch((err) => {
      return res.status(422).send({ error: err.message });
    });
});

module.exports = router;
