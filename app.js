const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileOp = require("./lib/fileOp");

app.get("/", (req, res) => {
  res.send("nonsense index");
});

app.get("/notes", (req, res) => {
  fileOp.getSubDirectory("", (err, subDir) => {
    if (subDir) {
      res.send({ content: subDir });
    } else {
      console.log(err);
    }
  });
});

app.get("/notes/:year", (req, res) => {
  fileOp.getSubDirectory(req.params.year + "/", (err, subDir) => {
    if (subDir) {
      res.send({ content: subDir });
    } else {
      res.send({ err: "could note find the year" });
    }
  });
});

app.get("/notes/:year/:month", (req, res) => {
  fileOp.getFile(
    req.params.year + "/" + req.params.month + "/",
    (err, files) => {
      if (files != null) {
        res.send({ content: files });
      } else {
        res.end({ err: "could not find the month" });
      }
    }
  );
});

app.get("/notes/:year/:month/:day", (req, res) => {
  fileOp.getData(
    req.params.year + "/" + req.params.month + "/" + req.params.day,
    (err, data) => {
      if (data != null) {
        res.send({ content: data });
      } else {
        res.end({ err: "could not find data" });
      }
    }
  );
});

const jsonParser = bodyParser.json();
app.post("/notes/:year/:month/:day", jsonParser, (req, res) => {
  console.log(req.body);
  fileOp.createDirectory("", req.params.year, msg => {
    fileOp.createDirectory(req.params.year, req.params.month, msg => {
      fileOp.writeFile(
        req.params.year + "/" + req.params.month + "/" + req.params.day,
        req.body.content,
        msg => {
          console.log(msg);
        }
      );
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
