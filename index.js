const createPolls = require("./src/api/AgorAPI/createPolls.js")
const getResult = require("./src/api/AgorAPI/getResult.js")
const votePoll = require("./src/api/AgorAPI/votePoll.js")
const getActiveVSList = require("./src/api/backendless/getActiveVSList.js")

getResult({
  poll_id: "PJrY8Be3RJ",
})

// createPolls({
//   P1: "呂佳玲",
//   P2: "林晨華",
// })

// votePoll({
//   poll_id: "1",
//   choice_id: "CMO3ZlzYBb",
// })

// getActiveVSList()
