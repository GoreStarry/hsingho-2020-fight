const localStorageId = "ogTag"

function getPollLockedList() {
  const localRecord = localStorage.getItem(localStorageId)
  return localRecord ? JSON.parse(localRecord) : []
}

export function checkIsPollLocked(poll_id) {
  const list = getPollLockedList()
  return list.indexOf(poll_id) !== -1
}

export function setPollLocked(poll_id) {
  localStorage.setItem(
    localStorageId,
    JSON.stringify([...getPollLockedList(), poll_id])
  )
}
