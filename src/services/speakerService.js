const { default: axios } = require("axios");

function speakerService() {
  function fetchSpeakerById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/speakers/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  return { fetchSpeakerById };
}

module.exports = speakerService();
