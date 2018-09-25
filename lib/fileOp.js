const fs = require("fs");
const path = require("path");
let lib = {};
lib.getSubDirectory = (where, callback) => {
  const filePath = path.resolve("./notes/" + where);
  console.log("searching " + filePath + " for indexes");
  fs.readdir(filePath, (err, files) => {
    if (err) {
      callback(err, {});
    } else {
      subDir = files.filter(filename =>
        fs.statSync(path.join(filePath, filename)).isDirectory()
      );
      console.log(subDir);
      callback(null, subDir);
    }
  });
};

lib.getFile = (where, callback) => {
  const filePath = path.resolve("./notes/" + where);
  console.log("searching " + filePath + " for notes");
  fs.readdir(filePath, (err, files) => {
    if (err) {
      callback(err, {});
    } else {
      _files = files.filter(filename =>
        fs.statSync(path.join(filePath, filename)).isFile()
      );
      console.log(_files);
      callback(null, _files);
    }
  });
};

lib.getData = (where, callback) => {
  const filePath = path.resolve("./notes/" + where);
  console.log("reading " + filePath + " for notes");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, {});
    } else {
      console.log(data);
      callback(null, data);
    }
  });
};

lib.createDirectory = (where, directoryName, callback) => {
  const filePath = path.resolve("./notes/" + where);
  lib.getSubDirectory(where, (err, subDir) => {
    if (subDir.indexOf(directoryName) !== -1) {
      callback("Directory exsists");
    } else {
      fs.mkdir(filePath + "/" + directoryName, err => {
        if (!err) {
          console.log("created");
          callback("");
        }
      });
    }
  });
};

lib.writeFile = (where, data, callback) => {
  const filePath = path.resolve("./notes/" + where);
  fs.open(filePath, "w", fd => {
    fs.writeFile(filePath, data, err => {
      console.log("Done");
      callback("Done");
    });
  });
};

module.exports = lib;
