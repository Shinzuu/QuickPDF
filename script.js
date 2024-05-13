// Function to update the time left for each exam
function updateExamsTime() {
    var exams = [
        { name: "MM CT1", time: new Date("2024-05-12T13:00:00") }, // Example exam data
        { name: "MID start", time: new Date("2024-06-08T10:30:00") },
        { name: "DSML Lab perf", time: new Date("2024-05-13T08:30:00") },
        { name: "MLD CT1", time: new Date("2024-05-14T10:00:00") },
        { name: "BIO CT1", time: new Date("2024-05-19T08:30:00") },
        { name: "Final start", time: new Date("2024-08-03T10:30:00") }
    ];

    // Sort exams based on start time
    exams.sort(function(a, b) {
        return a.time - b.time;
    });

    var examsList = document.getElementById("incomingExams");
    examsList.innerHTML = "";

    exams.forEach(function(exam) {
        var currentTime = new Date();
        var timeDiff = exam.time - currentTime;
        
        // Skip if the exam has already started
        if (timeDiff <= 0) {
            return;
        }

        var daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        var hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        // Format the date, month, and year
        var date = exam.time.getDate();
        var month = exam.time.getMonth() + 1; // Month is zero-indexed
        var year = exam.time.getFullYear();

        // Get the day name
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dayName = dayNames[exam.time.getDay()];

        var listItem = document.createElement("li");

        // Construct the remaining time message
        var remainingTimeMessage = " - ";

        if (daysLeft > 0) {
            remainingTimeMessage += daysLeft + " days ";
        }

        remainingTimeMessage += hoursLeft + "h " + minutesLeft + "m left";

        // Concatenate exam details and remaining time
        listItem.textContent = exam.name + " - " + dayName + ", " + date + "/" + month + "/" + year + remainingTimeMessage;
        
        examsList.appendChild(listItem);
    });
}

// Call updateExamsTime function initially
updateExamsTime();

// Update time every minute
setInterval(updateExamsTime, 60000);
