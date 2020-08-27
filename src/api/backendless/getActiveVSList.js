const axios = require("axios")

const backendlessAPIUrl =
  "https://api.backendless.com/401F07F0-4899-A358-FFAA-5F19863E0900/325265EF-3C37-4014-B9A1-1D0603B7F2A9/data/XINGHO_2020_FIGHT?where=active%3Dtrue&loadRelations=P1%2CP2"

function getActiveVSList() {
  return axios.get(backendlessAPIUrl).then(({ data }) => {
    console.log(data)
    return data
  })
}

module.exports = getActiveVSList
