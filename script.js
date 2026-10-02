/* =========================================================
   CIVIL FC | SHYMOLI IDEAL POLYTECHNIC INSTITUTE
   Firebase Auth + Players + Match + Notices + Admin
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyAZgHHlMKPfeNJjayusHw_1HFkfdzYrfTI",
    authDomain: "cvil-fc.firebaseapp.com",
    projectId: "cvil-fc",
    storageBucket: "cvil-fc.firebasestorage.app",
    messagingSenderId: "700492123659",
    appId: "1:700492123659:web:b604125d9ddc56fe86810e",
    measurementId: "G-7W7329DRBG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* =========================================================
   PLAYERS
========================================================= */

const players = [
    {
        id: 1,
        name: "Fahim",
        position: "Midfielder",
        number: "11",
        short: "CM"
    },
    {
        id: 2,
        name: "Liyon",
        position: "Right Winger",
        number: "09",
        short: "RW"
    },
    {
        id: 3,
        name: "Siam",
        position: "Goalkeeper",
        number: "67",
        short: "GK"
    },
    {
        id: 4,
        name: "Prince",
        position: "Goalkeeper",
        number: "23",
        short: "GK"
    },
    {
        id: 5,
        name: "Nadim",
        position: "Centre Back",
        number: "05",
        short: "CB"
    },
    {
        id: 6,
        name: "Sohag TM",
        position: "Midfielder",
        number: "06",
        short: "CM"
    },
    {
        id: 7,
        name: "Tanvir",
        position: "Captain",
        number: "10",
        short: "CM"
    },
    {
        id: 8,
        name: "Jihad",
        position: "Striker",
        number: "07",
        short: "ST"
    },
    {
        id: 9,
        name: "Rezaul",
        position: "Left Back",
        number: "08",
        short: "LB"
    }
];


/* =========================================================
   DEFAULT MATCH
========================================================= */

const defaultMatch = {
    opponent: "Coming Soon",
    date: "2026-10-10",
    time: "16:00",
    venue: "Shymoli Ideal Polytechnic Institute"
};

let match =
    JSON.parse(localStorage.getItem("civilFCMatch")) ||
    defaultMatch;


/* =========================================================
   DEFAULT NOTICES
========================================================= */

const defaultNotices = [
    {
        id: Date.now() + 1,
        title: "Welcome to Civil FC",
        date: "2026-10-01",
        text: "Welcome to the official Civil FC website."
    },
    {
        id: Date.now() + 2,
        title: "Next Match",
        date: "2026-10-01",
        text: "Our next match information will be updated soon."
    },
    {
        id: Date.now() + 3,
        title: "Team Update",
        date: "2026-10-01",
        text: "Stay connected with Civil FC for the latest updates."
    }
];

let notices =
    JSON.parse(localStorage.getItem("civilFCNotices")) ||
    defaultNotices;


/* =========================================================
   ELEMENTS
========================================================= */

// Login
const loginScreen = document.getElementById("loginScreen");
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");
const signupBtn = document.getElementById("signupBtn");

// Website
const website = document.getElementById("website");

// Navbar
const mainNav = document.getElementById("mainNav");
const menuBtn = document.getElementById("menuBtn");
const logoutBtn = document.getElementById("logoutBtn");
const themeBtn = document.getElementById("themeBtn");

// Players
const playerGrid = document.getElementById("playerGrid");
const playerSearch = document.getElementById("playerSearch");

// Player Modal
const playerModal = document.getElementById("playerModal");
const playerModalClose = document.getElementById("playerModalClose");
const playerModalContent = document.getElementById("playerModalContent");

// Match
const opponentDisplay = document.getElementById("opponentDisplay");
const matchDate = document.getElementById("matchDate");
const matchTime = document.getElementById("matchTime");
const matchVenue = document.getElementById("matchVenue");

// Notices
const noticeGrid = document.getElementById("noticeGrid");

// Admin
const adminOpenBtn = document.getElementById("adminOpenBtn");

const adminLoginModal =
    document.getElementById("adminLoginModal");

const adminLoginClose =
    document.getElementById("adminLoginClose");

const adminLoginForm =
    document.getElementById("adminLoginForm");

const adminUsername =
    document.getElementById("adminUsername");

const adminPassword =
    document.getElementById("adminPassword");

const adminLoginError =
    document.getElementById("adminLoginError");

const adminModal =
    document.getElementById("adminModal");

const adminClose =
    document.getElementById("adminClose");

const adminLogout =
    document.getElementById("adminLogout");

const adminNoticeCount =
    document.getElementById("adminNoticeCount");

const matchForm =
    document.getElementById("matchForm");

const opponentInput =
    document.getElementById("opponentInput");

const dateInput =
    document.getElementById("dateInput");

const timeInput =
    document.getElementById("timeInput");

const venueInput =
    document.getElementById("venueInput");

const saveMessage =
    document.getElementById("saveMessage");

const noticeForm =
    document.getElementById("noticeForm");

const noticeTitle =
    document.getElementById("noticeTitle");

const noticeDate =
    document.getElementById("noticeDate");

const noticeText =
    document.getElementById("noticeText");

const noticeMessage =
    document.getElementById("noticeMessage");

const adminNoticeList =
    document.getElementById("adminNoticeList");


/* =========================================================
   LOGIN / WEBSITE
========================================================= */

function showWebsite() {
    if (loginScreen) {
        loginScreen.classList.add("hidden");
    }

    if (website) {
        website.classList.remove("hidden");
    }
}

function showLogin() {
    if (loginScreen) {
        loginScreen.classList.remove("hidden");
    }

    if (website) {
        website.classList.add("hidden");
    }
}


/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

onAuthStateChanged(auth, (user) => {

    if (user) {
        showWebsite();
    } else {
        showLogin();
    }

});


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (loginError) {
            loginError.textContent = "";
        }

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            loginForm.reset();

        } catch (error) {

            console.error(error);

            if (loginError) {

                if (
                    error.code ===
                    "auth/invalid-credential"
                ) {
                    loginError.textContent =
                        "Invalid email or password.";
                }

                else if (
                    error.code ===
                    "auth/user-not-found"
                ) {
                    loginError.textContent =
                        "Account not found.";
                }

                else if (
                    error.code ===
                    "auth/wrong-password"
                ) {
                    loginError.textContent =
                        "Wrong password.";
                }

                else {
                    loginError.textContent =
                        error.message;
                }
            }

        }

    });

}


/* =========================================================
   SIGN UP
========================================================= */

if (signupBtn) {

    signupBtn.addEventListener("click", async () => {

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {

            loginError.textContent =
                "Enter email and password first.";

            return;
        }

        if (password.length < 6) {

            loginError.textContent =
                "Password must be at least 6 characters.";

            return;
        }

        try {

            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            loginError.textContent =
                "Account created successfully!";

        } catch (error) {

            console.error(error);

            loginError.textContent =
                error.message;
        }

    });

}


/* =========================================================
   LOGOUT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await signOut(auth);

        } catch (error) {

            console.error(error);

        }

    });

}


/* =========================================================
   PLAYERS
========================================================= */

function renderPlayers(searchTerm = "") {

    if (!playerGrid) return;

    playerGrid.innerHTML = "";

    const search = searchTerm
        .toLowerCase()
        .trim();

    const filteredPlayers = players.filter((player) => {

        return (
            player.name.toLowerCase().includes(search) ||
            player.position.toLowerCase().includes(search) ||
            player.short.toLowerCase().includes(search) ||
            player.number.includes(search)
        );

    });

    if (filteredPlayers.length === 0) {

        playerGrid.innerHTML = `
            <div class="empty-state">
                No player found.
            </div>
        `;

        return;
    }

    filteredPlayers.forEach((player) => {

        const card = document.createElement("div");

        card.className = "player-card";

        card.innerHTML = `
            <div class="player-number">
                ${player.number}
            </div>

            <div class="player-info">
                <h3>${player.name}</h3>
                <p>${player.position}</p>
            </div>

            <span class="player-position">
                ${player.short}
            </span>
        `;

        card.addEventListener("click", () => {
            openPlayerModal(player);
        });

        playerGrid.appendChild(card);

    });

}


/* =========================================================
   PLAYER SEARCH
========================================================= */

if (playerSearch) {

    playerSearch.addEventListener("input", (e) => {

        renderPlayers(e.target.value);

    });

}


/* =========================================================
   PLAYER MODAL
========================================================= */

function openPlayerModal(player) {

    if (!playerModal || !playerModalContent) {
        return;
    }

    playerModalContent.innerHTML = `
        <div class="player-modal-info">

            <div class="player-modal-number">
                ${player.number}
            </div>

            <h2>${player.name}</h2>

            <p>
                <strong>Position:</strong>
                ${player.position}
            </p>

            <p>
                <strong>Role:</strong>
                ${player.short}
            </p>

        </div>
    `;

    playerModal.classList.remove("hidden");
}


/* =========================================================
   PLAYER MODAL CLOSE
========================================================= */

if (playerModalClose) {

    playerModalClose.addEventListener("click", () => {

        playerModal.classList.add("hidden");

    });

}

if (playerModal) {

    playerModal.addEventListener("click", (e) => {

        if (e.target === playerModal) {
            playerModal.classList.add("hidden");
        }

    });

}


/* =========================================================
   MATCH
========================================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "TBA";
    }

    const date = new Date(dateString + "T00:00:00");

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}


function formatTime(timeString) {

    if (!timeString) {
        return "TBA";
    }

    const [hours, minutes] =
        timeString.split(":");

    let hour = parseInt(hours);

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minutes} ${ampm}`;
}


function renderMatch() {

    if (opponentDisplay) {
        opponentDisplay.textContent =
            match.opponent || "Coming Soon";
    }

    if (matchDate) {
        matchDate.textContent =
            formatDate(match.date);
    }

    if (matchTime) {
        matchTime.textContent =
            formatTime(match.time);
    }

    if (matchVenue) {
        matchVenue.textContent =
            match.venue || "TBA";
    }

}


/* =========================================================
   NOTICES
========================================================= */

function renderNotices() {

    if (!noticeGrid) return;

    noticeGrid.innerHTML = "";

    if (notices.length === 0) {

        noticeGrid.innerHTML = `
            <div class="empty-state">
                No notices available.
            </div>
        `;

        return;
    }

    const sortedNotices = [...notices].sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );

    sortedNotices.forEach((notice) => {

        const card = document.createElement("div");

        card.className = "notice-card";

        card.innerHTML = `
            <div class="notice-date">
                ${formatDate(notice.date)}
            </div>

            <h3>${escapeHTML(notice.title)}</h3>

            <p>
                ${escapeHTML(notice.text)}
            </p>
        `;

        noticeGrid.appendChild(card);

    });

}


/* =========================================================
   ADMIN NOTICES
========================================================= */

function renderAdminNotices() {

    if (!adminNoticeList) return;

    adminNoticeList.innerHTML = "";

    if (adminNoticeCount) {
        adminNoticeCount.textContent =
            notices.length;
    }

    if (notices.length === 0) {

        adminNoticeList.innerHTML = `
            <p class="empty-state">
                No notices available.
            </p>
        `;

        return;
    }

    const sortedNotices = [...notices].sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );

    sortedNotices.forEach((notice) => {

        const item = document.createElement("div");

        item.className = "admin-notice-item";

        item.innerHTML = `
            <div>
                <h4>${escapeHTML(notice.title)}</h4>

                <small>
                    ${formatDate(notice.date)}
                </small>

                <p>
                    ${escapeHTML(notice.text)}
                </p>
            </div>

            <button
                class="delete-notice"
                data-id="${notice.id}"
                type="button"
            >
                Delete
            </button>
        `;

        adminNoticeList.appendChild(item);

    });

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   ADMIN LOGIN MODAL OPEN
========================================================= */

if (adminOpenBtn) {

    adminOpenBtn.addEventListener("click", () => {

        if (adminLoginModal) {
            adminLoginModal.classList.remove("hidden");
        }

        if (adminLoginError) {
            adminLoginError.textContent = "";
        }

    });

}


/* =========================================================
   ADMIN LOGIN MODAL CLOSE
========================================================= */

if (adminLoginClose) {

    adminLoginClose.addEventListener("click", () => {

        adminLoginModal.classList.add("hidden");

    });

}

if (adminLoginModal) {

    adminLoginModal.addEventListener("click", (e) => {

        if (e.target === adminLoginModal) {

            adminLoginModal.classList.add("hidden");

        }

    });

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const username =
            adminUsername.value.trim();

        const password =
            adminPassword.value;

        if (adminLoginError) {
            adminLoginError.textContent = "";
        }

        /*
         * DEMO ADMIN LOGIN
         *
         * NOTE:
         * This is NOT secure for production because
         * the credentials are visible in JavaScript.
         */

        if (
            username === "admin" &&
            password === "civilfc"
        ) {

            localStorage.setItem(
                "civilFCAdmin",
                "true"
            );

            adminLoginForm.reset();

            adminLoginModal.classList.add(
                "hidden"
            );

            adminModal.classList.remove(
                "hidden"
            );

            loadAdminData();

        } else {

            if (adminLoginError) {

                adminLoginError.textContent =
                    "Invalid admin username or password.";

            }

        }

    });

}


/* =========================================================
   ADMIN DASHBOARD CLOSE
========================================================= */

if (adminClose) {

    adminClose.addEventListener("click", () => {

        adminModal.classList.add("hidden");

    });

}

if (adminModal) {

    adminModal.addEventListener("click", (e) => {

        if (e.target === adminModal) {

            adminModal.classList.add("hidden");

        }

    });

}


/* =========================================================
   ADMIN LOGOUT
========================================================= */

if (adminLogout) {

    adminLogout.addEventListener("click", () => {

        localStorage.removeItem(
            "civilFCAdmin"
        );

        adminModal.classList.add(
            "hidden"
        );

    });

}


/* =========================================================
   LOAD ADMIN DATA
========================================================= */

function loadAdminData() {

    if (opponentInput) {
        opponentInput.value =
            match.opponent || "";
    }

    if (dateInput) {
        dateInput.value =
            match.date || "";
    }

    if (timeInput) {
        timeInput.value =
            match.time || "";
    }

    if (venueInput) {
        venueInput.value =
            match.venue || "";
    }

    renderAdminNotices();

}


/* =========================================================
   SAVE MATCH
========================================================= */

if (matchForm) {

    matchForm.addEventListener("submit", (e) => {

        e.preventDefault();

        match = {

            opponent:
                opponentInput.value.trim() ||
                "Coming Soon",

            date:
                dateInput.value ||
                defaultMatch.date,

            time:
                timeInput.value ||
                defaultMatch.time,

            venue:
                venueInput.value.trim() ||
                "TBA"

        };

        localStorage.setItem(
            "civilFCMatch",
            JSON.stringify(match)
        );

        renderMatch();

        if (saveMessage) {

            saveMessage.textContent =
                "Match information saved successfully!";

            setTimeout(() => {

                saveMessage.textContent = "";

            }, 3000);

        }

    });

}


/* =========================================================
   ADD NOTICE
========================================================= */

if (noticeForm) {

    noticeForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const title =
            noticeTitle.value.trim();

        const selectedDate =
            noticeDate.value;

        const text =
            noticeText.value.trim();

        if (!title || !text) {

            if (noticeMessage) {

                noticeMessage.textContent =
                    "Please fill in all required fields.";

            }

            return;
        }

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        const newNotice = {

            id:
                Date.now(),

            title:
                title,

            date:
                selectedDate || today,

            text:
                text

        };

        notices.unshift(newNotice);

        localStorage.setItem(
            "civilFCNotices",
            JSON.stringify(notices)
        );

        renderNotices();
        renderAdminNotices();

        noticeForm.reset();

        if (noticeMessage) {

            noticeMessage.textContent =
                "Notice added successfully!";

            setTimeout(() => {

                noticeMessage.textContent = "";

            }, 3000);

        }

    });

}


/* =========================================================
   DELETE NOTICE
========================================================= */

if (adminNoticeList) {

    adminNoticeList.addEventListener(
        "click",
        (e) => {

            const button =
                e.target.closest(
                    ".delete-notice"
                );

            if (!button) return;

            const id =
                Number(button.dataset.id);

            notices =
                notices.filter(
                    (notice) =>
                        notice.id !== id
                );

            localStorage.setItem(
                "civilFCNotices",
                JSON.stringify(notices)
            );

            renderNotices();
            renderAdminNotices();

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn && mainNav) {

    menuBtn.addEventListener("click", () => {

        /*
         * CSS uses nav.active
         * so JS also uses active.
         */

        mainNav.classList.toggle("active");

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

if (mainNav) {

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

        });

    });

}


/* =========================================================
   DARK / LIGHT THEME
========================================================= */

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");

    } else {

        document.body.classList.remove("light");

    }

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("civilFCTheme");

if (savedTheme) {

    applyTheme(savedTheme);

} else {

    applyTheme("dark");

}


/* Theme button */

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        const isLight =
            document.body.classList.contains(
                "light"
            );

        const newTheme =
            isLight ? "dark" : "light";

        applyTheme(newTheme);

        localStorage.setItem(
            "civilFCTheme",
            newTheme
        );

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (e) => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   INITIAL RENDER
========================================================= */

renderPlayers();
renderMatch();
renderNotices();


/* =========================================================
   AUTO LOAD ADMIN IF PREVIOUSLY LOGGED IN
========================================================= */

if (
    localStorage.getItem("civilFCAdmin") === "true"
) {

    /*
     * Don't automatically show dashboard.
     * Admin can click Admin button.
     */

    console.log("Admin session found.");

}


/* =========================================================
   FINAL MESSAGE
========================================================= */

console.log(
    "Civil FC script loaded successfully."
);
