const axios = require("axios")

const api_token = require("./api_token.js")

// getResult({
//   poll_id: "PJrY8Be3RJ",
// })

export default function getResult({ poll_id }) {
  // alert("in")
  return axios
    .get(
      `https://api.open-agora.com/polls/${poll_id}/results/runoff?api_token=${api_token}`
    )
    .then(({ data }) => {
      // console.log(data)
      const [PlayerFirst, PlayerLast] = data

      const P1 = PlayerFirst.choice.num === 1 ? PlayerFirst : PlayerLast
      const P2 = PlayerLast.choice.num === 2 ? PlayerLast : PlayerFirst

      const allScore = P1.score + P2.score
      const P1Percent = allScore ? Math.round((P1.score / allScore) * 100) : 0
      const P2Percent = allScore ? Math.round((P2.score / allScore) * 100) : 0
      console.log(`P1 score: ${P1.score} / P2 score: ${P2.score}`)
      console.log(`P1 percent: ${P1Percent}% / P2 percent: ${P2Percent}%`)
      return {
        P1: {
          id: P1.choice.id,
          score: P1.score,
          percent: `${P1Percent}%`,
        },
        P2: {
          id: P2.choice.id,
          score: P2.score,
          percent: `${P2Percent}%`,
        },
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
