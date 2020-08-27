const axios = require("axios")

const api_token = require("./api_token.js")

// createPolls({
//   P1: "呂佳玲",
//   P2: "林晨華",
// })

function createPolls({ P1, P2 }) {
  return axios
    .post(
      `https://api.open-agora.com/polls/with-choices?api_token=${api_token}`,
      {
        title: `${P1}vs${P2}test`,
        choices: [
          {
            label: P1,
          },
          {
            label: P2,
          },
        ],
        options: {
          anonymous: true,
        },
      }
    )
    .then(({ data }) => {
      // console.log(data)
      const P1 = data.choices[0]
      const P2 = data.choices[1]
      console.log(`poll-id: ${data.id}`)
      console.log(`P1: ${P1.label} / ${P1.id}`)
      console.log(`P2: ${P2.label} / ${P2.id}`)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = createPolls
