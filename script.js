// Fetch prayer times from Aladhan API
async function fetchPrayerTimes() {
    const city = "London"; // Change to your city
    const country = "UK";  // Change to your country
    const method = 2;      // Calculation method (2 = Muslim World League)

    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`);
    const data = await response.json();
    return data.data.timings;
}

// Display prayer times and schedule Azan
async function displayPrayerTimes() {
    const timings = await fetchPrayerTimes();
    const prayerTimesDiv = document.getElementById("prayer-times");

    // Display prayer times
    Object.entries(timings).forEach(([prayer, time]) => {
        const prayerElement = document.createElement("div");
        prayerElement.textContent = `${prayer}: ${time}`;
        prayerTimesDiv.appendChild(prayerElement);

        // Schedule Azan
        scheduleAzan(prayer, time);
    });
}

// Play Azan at the scheduled time
function scheduleAzan(prayer, time) {
    const [hour, minute] = time.split(":").map(Number);
    const now = new Date();
    const azanTime = new Date();
    azanTime.setHours(hour, minute, 0, 0);

    const delay = azanTime - now;
    if (delay > 0) {
        setTimeout(() => {
            playAzan(prayer);
        }, delay);
    }
}

function playAzan(prayer) {
    const audio = document.getElementById("azan-audio");
    audio.play();
    alert(`Time for ${prayer}`);
}

// Initialize
displayPrayerTimes();
