const axios = require("axios")

axios
  .post(
    "https://api.open-agora.com/votes/?api_token=ZrI3CavyaeD2s14oO7dLfMt9udlhdoDe",

    {
      choice_id: "CsuQXfXRS2",
      poll_id: "PJrY8Be3RJ",
    }
  )
  .then(({ data }) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
