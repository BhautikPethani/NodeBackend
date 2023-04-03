module.exports = {
  generateUsername: function (email) {
    var splitArray = email.split("@");
    return splitArray[0];
  },

  covertToArray: function (data) {
    var temp = data.split(",");
    return JSON.stringify(temp);
  },
};
