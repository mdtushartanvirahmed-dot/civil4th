/* =========================================================
   CIVIL FC | SHYMOLI IDEAL POLYTECHNIC INSTITUTE
   Complete JavaScript
   Firebase Auth + Firestore Realtime Match & Notice
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    inMemoryPersistence
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";


/* =========================================================
   FIREBASE
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
const db = getFirestore(app);

setPersistence(auth, inMemoryPersistence)
    .catch((error) => {
        console.error("Auth persistence error:", error);
    });


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
   MATCH DATA
========================================================= */

const defaultMatch = {
    opponent: "Coming Soon",
    date: "2026-10-10",
    time: "16:00",
    venue: "Shymoli Ideal Polytechnic Institute"
};

let match = { ...defaultMatch };


/* =========================================================
   NOTICE DATA
========================================================= */

let notices = [];


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

// Player modal
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
const adminLoginModal = document.getElementById("adminLoginModal");
const adminLoginClose = document.getElementById("adminLoginClose");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminUsername = document.getElementById("adminUsername");
const adminPassword = document.getElementById("adminPassword");
const adminLoginError = document.getElementById("adminLoginError");

const adminModal = document.getElementById("adminModal");
const adminClose = document.getElementById("adminClose");
const adminLogout = document.getElementById("adminLogout");
const adminNoticeCount = document.getElementById("adminNoticeCount");

const matchForm = document.getElementById("matchForm");
const opponentInput = document.getElementById("opponentInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const venueInput = document.getElementById("venueInput");
const saveMessage = document.getElementById("saveMessage");

const noticeForm = document.getElementById("noticeForm");
const noticeTitle = document.getElementById("noticeTitle");
const noticeDate = document.getElementById("noticeDate");
const noticeText = document.getElementById("noticeText");
const noticeMessage = document.getElementById("noticeMessage");
const adminNoticeList = document.getElementById("adminNoticeList");


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

        listenToMatch();
        listenToNotices();

    } else {

        showLogin();

    }

});


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        loginError.textContent = "";

        if (!email || !password) {

            loginError.textContent =
                "Please enter email and password.";

            return;
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

            loginError.textContent =
                getAuthError(error);

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

        loginError.textContent = "";

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
                getAuthError(error);

        }

    });

}


/* =========================================================
   AUTH ERROR
========================================================= */

function getAuthError(error) {

    switch (error.code) {

        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/user-not-found":
            return "Account not found.";

        case "auth/wrong-password":
            return "Wrong password.";

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Invalid email address.";

        case "auth/weak-password":
            return "Password is too weak.";

        case "auth/too-many-requests":
            return "Too many attempts. Try again later.";

        default:
            return error.message || "Something went wrong.";
    }

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
   PLAYER RENDER
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
                ${escapeHTML(player.number)}
            </div>

            <div class="player-info">
                <h3>${escapeHTML(player.name)}</h3>
                <p>${escapeHTML(player.position)}</p>
            </div>

            <span class="player-position">
                ${escapeHTML(player.short)}
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

    playerSearch.addEventListener("input", (event) => {

        renderPlayers(event.target.value);

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
                ${escapeHTML(player.number)}
            </div>

            <h2>${escapeHTML(player.name)}</h2>

            <p>
                <strong>Position:</strong>
                ${escapeHTML(player.position)}
            </p>

            <p>
                <strong>Role:</strong>
                ${escapeHTML(player.short)}
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

    playerModal.addEventListener("click", (event) => {

        if (event.target === playerModal) {

            playerModal.classList.add("hidden");

        }

    });

}


/* =========================================================
   MATCH FORMAT
========================================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "TBA";
    }

    const date = new Date(
        dateString + "T00:00:00"
    );

    if (Number.isNaN(date.getTime())) {
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

    const parts = timeString.split(":");

    if (parts.length < 2) {
        return timeString;
    }

    let hour = Number(parts[0]);
    const minute = parts[1];

    if (Number.isNaN(hour)) {
        return timeString;
    }

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;

}


/* =========================================================
   RENDER MATCH
========================================================= */

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
   FIRESTORE - MATCH REALTIME
========================================================= */

function listenToMatch() {

    const matchRef =
        doc(db, "civilFC", "match");

    onSnapshot(
        matchRef,
        (snapshot) => {

            if (snapshot.exists()) {

                match = snapshot.data();

            } else {

                match = {
                    ...defaultMatch
                };

            }

            renderMatch();
            loadAdminData();

        },
        (error) => {

            console.error(
                "Match Firestore error:",
                error
            );

        }
    );

}


/* =========================================================
   FIRESTORE - NOTICES REALTIME
========================================================= */

function listenToNotices() {

    const noticesRef =
        collection(db, "notices");

    onSnapshot(
        noticesRef,
        (snapshot) => {

            notices = snapshot.docs.map(
                (docSnapshot) => ({

                    id: docSnapshot.id,

                    ...docSnapshot.data()

                })
            );

            notices.sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );

            renderNotices();
            renderAdminNotices();

        },
        (error) => {

            console.error(
                "Notice Firestore error:",
                error
            );

        }
    );

}


/* =========================================================
   NOTICE RENDER
========================================================= */

function renderNotices() {

    if (!noticeGrid) return;

    noticeGrid.innerHTML = "";

    if (!notices.length) {

        noticeGrid.innerHTML = `
            <div class="empty-state">
                No notices available.
            </div>
        `;

        return;
    }

    const sortedNotices =
        [...notices].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );

    sortedNotices.forEach((notice) => {

        const card =
            document.createElement("div");

        card.className =
            "notice-card";

        card.innerHTML = `
            <div class="notice-date">
                ${formatDate(notice.date)}
            </div>

            <h3>
                ${escapeHTML(notice.title)}
            </h3>

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

    if (!notices.length) {

        adminNoticeList.innerHTML = `
            <p class="empty-state">
                No notices available.
            </p>
        `;

        return;
    }

    const sortedNotices =
        [...notices].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );

    sortedNotices.forEach((notice) => {

        const item =
            document.createElement("div");

        item.className =
            "admin-notice-item";

        item.innerHTML = `
            <div>

                <h4>
                    ${escapeHTML(notice.title)}
                </h4>

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
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   ADMIN LOGIN OPEN
========================================================= */

if (adminOpenBtn) {

    adminOpenBtn.addEventListener("click", () => {

        adminLoginModal.classList.remove("hidden");

        if (adminLoginError) {

            adminLoginError.textContent = "";

        }

    });

}


/* =========================================================
   ADMIN LOGIN CLOSE
========================================================= */

if (adminLoginClose) {

    adminLoginClose.addEventListener("click", () => {

        adminLoginModal.classList.add("hidden");

    });

}


if (adminLoginModal) {

    adminLoginModal.addEventListener("click", (event) => {

        if (event.target === adminLoginModal) {

            adminLoginModal.classList.add("hidden");

        }

    });

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const username =
                adminUsername.value.trim();

            const password =
                adminPassword.value;

            adminLoginError.textContent = "";

            /*
             * DEMO ADMIN LOGIN
             * Username: admin
             * Password: civilfc
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

                adminLoginError.textContent =
                    "Invalid admin username or password.";

            }

        }
    );

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

    adminModal.addEventListener("click", (event) => {

        if (event.target === adminModal) {

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

        adminModal.classList.add("hidden");

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
   SAVE MATCH - FIRESTORE
========================================================= */

if (matchForm) {

    matchForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const updatedMatch = {

                opponent:
                    opponentInput.value.trim() ||
                    "Coming Soon",

                date:
                    dateInput.value || "",

                time:
                    timeInput.value || "",

                venue:
                    venueInput.value.trim() ||
                    "TBA"

            };

            try {

                await setDoc(
                    doc(db, "civilFC", "match"),
                    updatedMatch
                );

                match = {
                    ...updatedMatch
                };

                renderMatch();

                loadAdminData();

                if (saveMessage) {

                    saveMessage.textContent =
                        "Match information updated for everyone!";

                    setTimeout(() => {

                        saveMessage.textContent = "";

                    }, 3000);

                }

            } catch (error) {

                console.error(
                    "Match save error:",
                    error
                );

                if (saveMessage) {

                    saveMessage.textContent =
                        "Failed to update match.";

                }

            }

        }
    );

}


/* =========================================================
   ADD NOTICE - FIRESTORE
========================================================= */

if (noticeForm) {

    noticeForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const title =
                noticeTitle.value.trim();

            const date =
                noticeDate.value ||
                new Date()
                    .toISOString()
                    .split("T")[0];

            const text =
                noticeText.value.trim();

            if (!title || !text) {

                noticeMessage.textContent =
                    "Please fill in all required fields.";

                return;
            }

            const newNotice = {

                title: title,

                date: date,

                text: text

            };

            try {

                await addDoc(
                    collection(db, "notices"),
                    newNotice
                );

                noticeForm.reset();

                noticeMessage.textContent =
                    "Notice published for everyone!";

                setTimeout(() => {

                    noticeMessage.textContent = "";

                }, 3000);

            } catch (error) {

                console.error(
                    "Notice save error:",
                    error
                );

                noticeMessage.textContent =
                    "Failed to publish notice.";

            }

        }
    );

}


/* =========================================================
   DELETE NOTICE - FIRESTORE
========================================================= */

if (adminNoticeList) {

    adminNoticeList.addEventListener(
        "click",
        async (event) => {

            const button =
                event.target.closest(
                    ".delete-notice"
                );

            if (!button) return;

            const id =
                button.dataset.id;

            if (!id) return;

            try {

                await deleteDoc(
                    doc(db, "notices", id)
                );

            } catch (error) {

                console.error(
                    "Notice delete error:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn && mainNav) {

    menuBtn.addEventListener("click", () => {

        mainNav.classList.toggle("active");

    });

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

if (mainNav) {

    mainNav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

        });

    });

}


/* =========================================================
   THEME
========================================================= */

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");

    } else {

        document.body.classList.remove("light");

    }

}


const savedTheme =
    localStorage.getItem("civilFCTheme");

applyTheme(savedTheme || "dark");


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        const isLight =
            document.body.classList.contains("light");

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
   SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   INITIAL LOAD
========================================================= */

renderPlayers();
renderMatch();
renderNotices();


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "Civil FC JavaScript loaded successfully."
);
