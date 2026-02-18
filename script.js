const ramzanData = [
    { day: 1, date: "2026-02-19", sehri: "05:41", iftar: "18:43" },
    { day: 2, date: "2026-02-20", sehri: "05:40", iftar: "18:44" },
    { day: 3, date: "2026-02-21", sehri: "05:40", iftar: "18:44" },
    { day: 4, date: "2026-02-22", sehri: "05:39", iftar: "18:44" },
    { day: 5, date: "2026-02-23", sehri: "05:39", iftar: "18:45" },
    { day: 6, date: "2026-02-24", sehri: "05:38", iftar: "18:45" },
    { day: 7, date: "2026-02-25", sehri: "05:37", iftar: "18:45" },
    { day: 8, date: "2026-02-26", sehri: "05:37", iftar: "18:46" },
    { day: 9, date: "2026-02-27", sehri: "05:36", iftar: "18:46" },
    { day: 10, date: "2026-02-28", sehri: "05:36", iftar: "18:46" },
    { day: 11, date: "2026-03-01", sehri: "05:35", iftar: "18:47" },
    { day: 12, date: "2026-03-02", sehri: "05:34", iftar: "18:47" },
    { day: 13, date: "2026-03-03", sehri: "05:33", iftar: "18:47" },
    { day: 14, date: "2026-03-04", sehri: "05:32", iftar: "18:48" },
    { day: 15, date: "2026-03-05", sehri: "05:32", iftar: "18:48" },
    { day: 16, date: "2026-03-06", sehri: "05:31", iftar: "18:48" },
    { day: 17, date: "2026-03-07", sehri: "05:30", iftar: "18:48" },
    { day: 18, date: "2026-03-08", sehri: "05:29", iftar: "18:48" },
    { day: 19, date: "2026-03-09", sehri: "05:29", iftar: "18:49" },
    { day: 20, date: "2026-03-10", sehri: "05:28", iftar: "18:49" },
    { day: 21, date: "2026-03-11", sehri: "05:27", iftar: "18:49" },
    { day: 22, date: "2026-03-12", sehri: "05:26", iftar: "18:50" },
    { day: 23, date: "2026-03-13", sehri: "05:25", iftar: "18:50" },
    { day: 24, date: "2026-03-14", sehri: "05:24", iftar: "18:50" },
    { day: 25, date: "2026-03-15", sehri: "05:24", iftar: "18:50" },
    { day: 26, date: "2026-03-16", sehri: "05:23", iftar: "18:51" },
    { day: 27, date: "2026-03-17", sehri: "05:22", iftar: "18:51" },
    { day: 28, date: "2026-03-18", sehri: "05:21", iftar: "18:51" },
    { day: 29, date: "2026-03-19", sehri: "05:20", iftar: "18:51" },
    { day: 30, date: "2026-03-20", sehri: "05:19", iftar: "18:52" }
];

// Helper to convert 24h to 12h format
function format12h(time24h) {
    const [hours, minutes] = time24h.split(':');
    let h = parseInt(hours);
    const m = minutes;
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
}

function populateTable() {
    const leftBody = document.getElementById('timetable-left');
    const rightBody = document.getElementById('timetable-right');
    const now = new Date();

    let activeDayIndex = -1;
    let activeColumn = ""; // "sehri" or "iftar"

    for (let i = 0; i < ramzanData.length; i++) {
        const item = ramzanData[i];
        const sehriTime = new Date(`${item.date}T${item.sehri}:00`);
        const iftarTime = new Date(`${item.date}T${item.iftar}:00`);

        if (now < sehriTime) {
            activeDayIndex = i;
            activeColumn = "sehri";
            break;
        } else if (now < iftarTime) {
            activeDayIndex = i;
            activeColumn = "iftar";
            break;
        }
    }

    if (activeDayIndex === -1 && ramzanData.some(d => new Date(d.date) > now)) {
        activeDayIndex = ramzanData.findIndex(d => new Date(d.date) > now);
        activeColumn = "sehri";
    }

    leftBody.innerHTML = '';
    rightBody.innerHTML = '';

    ramzanData.forEach((item, index) => {
        const row = document.createElement('tr');

        let sehriClass = "";
        let iftarClass = "";

        if (index === activeDayIndex) {
            row.classList.add('active-row');
            if (activeColumn === "sehri") sehriClass = "glow-cell";
            else if (activeColumn === "iftar") iftarClass = "glow-cell";
        } else if (index < activeDayIndex) {
            row.classList.add('past-row');
        }

        const dateObj = new Date(item.date);
        const dayNum = dateObj.getDate();
        const monthShort = dateObj.toLocaleDateString('en-US', { month: 'short' });
        const formattedDate = `${dayNum} ${monthShort}`;

        row.innerHTML = `
            <td>${item.day}</td>
            <td>${formattedDate}</td>
            <td class="${sehriClass}">${format12h(item.sehri)}</td>
            <td class="${iftarClass}">${format12h(item.iftar)}</td>
        `;

        if (index < 15) leftBody.appendChild(row);
        else rightBody.appendChild(row);
    });
}

function updateTimer() {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    let targetTime = null;
    let targetLabel = "";

    const todayData = ramzanData.find(item => item.date === todayStr);
    if (todayData) {
        const sehriTime = new Date(`${todayStr}T${todayData.sehri}:00`);
        const iftarTime = new Date(`${todayStr}T${todayData.iftar}:00`);
        if (now < sehriTime) {
            targetTime = sehriTime;
            targetLabel = "Sehri Ends In";
        } else if (now < iftarTime) {
            targetTime = iftarTime;
            targetLabel = "Iftar Starts In";
        } else {
            const tomorrowIndex = ramzanData.findIndex(item => item.date === todayStr) + 1;
            if (tomorrowIndex < ramzanData.length) {
                targetTime = new Date(`${ramzanData[tomorrowIndex].date}T${ramzanData[tomorrowIndex].sehri}:00`);
                targetLabel = "Next Sehri In";
            }
        }
    } else {
        const firstDay = ramzanData[0];
        const firstDayDate = new Date(`${firstDay.date}T${firstDay.sehri}:00`);
        if (now < firstDayDate) {
            targetTime = firstDayDate;
            targetLabel = "Ramzan Starts In";
        }
    }

    if (targetTime) {
        const diff = targetTime - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        document.getElementById('hours').innerText = h.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
        document.getElementById('timer-title').innerText = targetLabel;
        document.getElementById('status-display').innerText = targetLabel.includes("Iftar") ? "Roza is Ongoing" : "Preparing for Sehri";
    }

    if (now.getSeconds() === 0) populateTable();
}

function initShare() {
    const shareBtn = document.getElementById('whatsapp-share');
    shareBtn.addEventListener('click', () => {
        const text = encodeURIComponent("🌙 Ramzan Mubarak! Check out the 2026 Ramzan Timetable for Mumbai here: https://is.gd/ramzan2026");
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });
}

function initAccordion() {
    const details = document.querySelectorAll('.dua-item');
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            details.forEach((detail) => {
                if (detail !== targetDetail) detail.removeAttribute("open");
            });
        });
    });
}

function initPWA() {
    let deferredPrompt;
    const installBtn = document.getElementById('pwa-install');

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW Registered'))
                .catch(err => console.log('SW Failed', err));
        });
    }

    // Handle Install Prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installBtn) installBtn.style.display = 'flex';
    });

    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.style.display = 'none';
                }
                deferredPrompt = null;
            }
        });
    }

    window.addEventListener('appinstalled', () => {
        if (installBtn) installBtn.style.display = 'none';
        console.log('App Installed');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateTable();
    updateTimer();
    initShare();
    initAccordion();
    initPWA();
    setInterval(updateTimer, 1000);
});
