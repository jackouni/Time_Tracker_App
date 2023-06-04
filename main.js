// --> SELECTED ELEMENTS <-- //
const startBtn = document.getElementById("start-btn");
const endBtn = document.getElementById("end-btn");
const mainTable = document.getElementById("main-table");
const totalTimeDisplay = document.getElementById("total-time");
let sessionActive = false;
let startTime;

// --> FUNCTIONALITY <-- // 

function insertRow() {
    const newRow = mainTable.insertRow(-1);
    for (let i = 0; i < 5; i++) {
        newRow.insertCell(i);
    }
}

function getCurrentDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // JavaScript months are 0-based, so we add 1
    let day = date.getDate();
    return `${year}/${month}/${day}`;
}

function getCurrentTime() {
    let date = new Date();
    let hours = pad(date.getHours(), 2);
    let minutes = pad(date.getMinutes(), 2);
    let seconds = pad(date.getSeconds(), 2);
    return `${hours}:${minutes}:${seconds}`;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function calculateTotalTime() {
    // Collect all rows of the table
    const rows = mainTable.rows;
    let totalSeconds = 0;
    
    // Iterate through each row, starting from the second one (since the first row is the header)
    for(let i = 1; i < rows.length; i++) {
        // Get the time entry from the fifth cell of each row
        const timeStr = rows[i].cells[4].innerHTML;
        
        // Split the string into hours, minutes, and seconds
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        
        // Convert the time entry into seconds and add it to the total
        totalSeconds += (hours * 3600) + (minutes * 60) + seconds;
    }
    
    // Convert the total seconds back into a time format
    const hours = pad(Math.floor(totalSeconds / 3600), 2);
    const mins = pad(Math.floor((totalSeconds % 3600) / 60), 2);
    const secs = pad(totalSeconds % 60, 2);

    const totalTime = `${hours}:${mins}:${secs}`;

    // Return the total time
    return totalTime;
}


// --> EVENT LISTENERS <-- //

startBtn.addEventListener('click', function() {
    if (!sessionActive) {
        insertRow();
        mainTable.rows[mainTable.rows.length - 1].cells[0].innerHTML = getCurrentDate();
        startTime = new Date(); // Record the start time
        mainTable.rows[mainTable.rows.length - 1].cells[1].innerHTML = getCurrentTime();
        sessionActive = true;
    } else alert("Error: Start-time already entered");
});

endBtn.addEventListener('click', function() {
    if (sessionActive) {
        mainTable.rows[mainTable.rows.length - 1].cells[3].innerHTML = getCurrentTime();
        const endTime = new Date(); // Get the end time
        const elapsedMs = endTime - startTime; // Calculate the elapsed time in milliseconds
        const elapsedSecs = Math.round(elapsedMs / 1000); // Convert to seconds
        const hours = pad(Math.floor(elapsedSecs / 3600), 2); // Get the hours part
        const mins = pad(Math.floor((elapsedSecs % 3600) / 60), 2); // Get the minutes part
        const secs = pad(elapsedSecs % 60, 2); // Get the seconds part
        const elapsedTime = `${hours}:${mins}:${secs}`;
        mainTable.rows[mainTable.rows.length - 1].cells[4].innerHTML = elapsedTime;
        sessionActive = false;
        let totalTime = calculateTotalTime()
        totalTimeDisplay.textContent = "Total time: " + totalTime;
    } else alert("Error: Start-time required");
});

console.log(mainTable.rows)
console.log(mainTable.rows[0])
console.log(mainTable.rows[2])