const trainingContainer = document.getElementById("training-container");

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const now = new Date();

function getMonday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
    return new Date(d.setDate(diff));
}

const monday = getMonday(now);

for (let i = 0; i < 5; i++) {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + i);

    const dayPassed = dayDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const registrationClosed = now.getHours() >= 19 && dayDate.toDateString() === now.toDateString();

    const isToday = dayDate.toDateString() === now.toDateString();

    const box = document.createElement("div");
    box.className = "day-box";
    box.classList.add(dayPassed ? "past-day" : "active-day");

    const dayName = daysOfWeek[i];
    const dateStr = `${dayDate.getDate()}.${dayDate.getMonth() + 1}.${dayDate.getFullYear()}`;

    box.innerHTML = `
        <h3>${dayName}</h3>
        <p>${dateStr}</p>
        <p>Training in 20:00</p>
        ${dayPassed || registrationClosed ? `<p class="closed">Registration Closed</p>` : `<p class="countdown" id="countdown-${i}"></p>`}
        <button class="register-button" ${dayPassed || registrationClosed ? "disabled" : ""}>I'm In!</button>
    `;

    trainingContainer.appendChild(box);

    if (!dayPassed && !registrationClosed) {
        updateCountdown(i, dayDate);
        setInterval(() => updateCountdown(i, dayDate), 1000);
    }
}

function updateCountdown(index, targetDate) {
    const now = new Date();
    const deadline = new Date(targetDate);
    deadline.setHours(19, 0, 0, 0); 

    const diff = deadline - now;

    const countdownEl = document.getElementById(`countdown-${index}`);
    if (diff <= 0) {
        countdownEl.innerText = "Registration Closed";
        countdownEl.previousElementSibling.disabled = true;
        countdownEl.classList.add("closed");
        return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.innerText = `Before close: ${hours}h ${minutes}m ${seconds}s`;
}
