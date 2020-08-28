const axios = require("axios")

const api_token = require("./api_token.js")

function votePoll({ poll_id, choice_id }) {
  return axios
    .post(`https://api.open-agora.com/votes/?api_token=${api_token}`, {
      poll_id,
      choice_id,
    })
    .then(({ data }) => {
      console.log(data)
    })
    .catch((err) => {
      alert("本場投票已終了～！")
      console.log(err)
    })
}

module.exports = votePoll
