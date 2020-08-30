const axios = require("axios")

function getResultBL(poll_id, choice_name) {
  return axios
    .get(
      `https://api.backendless.com/401F07F0-4899-A358-FFAA-5F19863E0900/325265EF-3C37-4014-B9A1-1D0603B7F2A9/data/VOTE_POLL/count?where=choice_name%20%3D%20%27${choice_name}%27AND%20poll_id%20%3D%20'${poll_id}'`
    )
    .then(({ data }) => {
      console.log(data)
      return data
    })
}

async function getP1P2Result({ poll_id, P1_name, P2_name }) {
  try {
    const [P1Count, P2Count] = await Promise.all([
      getResultBL(poll_id, P1_name),
      getResultBL(poll_id, P2_name),
    ])

    const allScore = P1Count + P2Count
    const P1Percent = allScore ? Math.round((P1Count / allScore) * 100) : 0
    const P2Percent = allScore ? Math.round((P2Count / allScore) * 100) : 0

    return {
      P1: {
        id: P1_name,
        score: P1Count,
        percent: `${P1Percent}%`,
      },
      P2: {
        id: P2_name,
        score: P2Count,
        percent: `${P2Percent}%`,
      },
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

export default getP1P2Result
