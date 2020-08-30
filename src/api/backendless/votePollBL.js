const axios = require("axios")

async function votePollBL({ poll_id, choice_name }) {
  try {
    const { data } = await axios.get(
      `https://api.backendless.com/401F07F0-4899-A358-FFAA-5F19863E0900/325265EF-3C37-4014-B9A1-1D0603B7F2A9/data/XINGHO_2020_FIGHT?where=poll_id%20%3D%20'${poll_id}'`
    )

    if (data?.[0]?.active) {
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
    } else {
      return Promise.reject()
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export default votePollBL
