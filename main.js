const startBtn = document.getElementById("start-btn")
const endBtn = document.getElementById("end-btn")
const mainTable = document.getElementById("main-table")

function insertRow() {
    const newRow = mainTable.insertRow(-1)
    for (let i = 0; i < 5; i++) {
        newRow.insertCell(i)
    }
}

function getCurrentDate() {
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    let day = new Date().getDate()
    return `${year}/${month}/${day}`
}

function getCurrentTime() {
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    return `${hours}:${minutes}:${seconds}`
}

getCurrentDate()
getCurrentTime()

startBtn.addEventListener('click', function() {
    insertRow()
    mainTable.rows[mainTable.rows.length - 1].cells[0].innerHTML = getCurrentDate()
    mainTable.rows[mainTable.rows.length - 1].cells[1].innerHTML = getCurrentTime()
})

endBtn.addEventListener('click', function() {
    mainTable.rows[mainTable.rows.length - 1].cells[3].innerHTML = getCurrentTime()
})
