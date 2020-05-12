// jshint esversion: 6

exports.getDate = function() {
  const today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

return today.toLocaleDateString("en-US", options);

}
