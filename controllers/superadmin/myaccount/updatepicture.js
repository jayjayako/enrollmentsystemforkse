const fsx = require("fs-extra");
const fs = require("fs");

const { drive } = require("./driveconn");
const superadmin_info = require("../../../models/superadmin_info");

/////////////////// upload user profile picture /////////////////
const updateprofilepicture = async (userid, newid) => {
  let user;
  user = await superadmin_info.findOne({ id: userid });
  user.picture = newid;
  let results = await user.save();
  if (results) {
    console.log("Update SuperAdmin Picture Successfully");
  }
};

const deleteexistingpicture = async (oldfileid) => {
  try {
    await drive.files.delete({
      fileId: oldfileid,
    });
    console.log(`File with ID ${fileId} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting file with ID ${fileId}: ${err}`);
  }
};

const uploadFile = async (userid, fileid, fileObject) => {
  const bufferStream = fs.createReadStream(fileObject.tempFilePath);

  const { data } = await drive.files.create({
    resource: {
      name: fileObject.name,
      parents: ["1pYDda_TwtOWL8ETHQDmlC2-bppwocVfJ"],
    },
    media: {
      mimeType: fileObject.mimetype,
      body: bufferStream,
    },
    fields: "id,name",
  });
  console.log(`Uploading file ${data.name} ${data.id}`);
  if (fileid == "default") {
    updateprofilepicture(userid, data.id);
  } else {
    updateprofilepicture(userid, data.id);
    deleteexistingpicture(fileid);
  }
  return data;
};

const updatepicture = async (userid, absolutepath, fileid, fileObject) => {
  try {
    await uploadFile(userid, fileid, fileObject);
    fsx
      .emptyDir(absolutepath + "/tmp")
      .then(() => {
        console.log("tmp deleted");
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
//////////////////////////////////////////////////////////////

module.exports = {
  updatepicture: updatepicture,
};
