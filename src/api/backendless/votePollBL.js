const axios = require("axios")

function votePollBL({ poll_id, choice_name }) {
  return axios
    .post(
      `https://api.backendless.com/401F07F0-4899-A358-FFAA-5F19863E0900/325265EF-3C37-4014-B9A1-1D0603B7F2A9/data/VOTE_POLL`,
      {
        poll_id,
        choice_name,
      }
    )
    .then(({ data }) => {
      console.log(data)
      return data
    })
}

export default votePollBL
