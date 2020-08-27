import uniqid from "uniqid"

const localStorageId = "4n5pxq24kpiob12og9"

export default function getUserID() {
  let userID = localStorage.getItem(localStorageId)

  if (!userID) {
    userID = uniqid()
    localStorage.setItem(localStorageId, userID)
  }

  return userID
}
