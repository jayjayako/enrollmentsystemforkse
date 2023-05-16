const { drive } = require("./driveconn");
const superadmin_info = require("../../../models/superadmin_info");
///////////////////////// display files ////////////////////////
const getFileMetadata = async (fileId) => {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      fields: "name,webViewLink",
    });

    return response.data;
  } catch (error) {
    console.error(`Error retrieving file metadata: ${error}`);
    throw error;
  }
};

const getaccountpic = async (req, res, next) => {
  try {
    let user;
    user = await superadmin_info.findOne({ id: req.session.userid });
    const file = await getFileMetadata(user.picture);
    const response = await drive.files.get(
      { fileId: user.picture, alt: "media" },
      { responseType: "stream" }
    );
    res.locals.response = response;
    res.locals.file = file;
    res.locals.filename = file.name;
    next();
  } catch (error) {
    res.json({ status: "invalid" });
  }
};

module.exports = {
  getaccountpic: getaccountpic,
};
