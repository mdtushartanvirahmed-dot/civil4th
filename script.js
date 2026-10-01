// ======================================================
// FIREBASE
// ======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================

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


// ======================================================
// PLAYERS
// ======================================================

const players = [
    {
        name: "Fahim",
        position: "CM",
        number: "11",
        role: "Midfielder"
    },
    {
        name: "Liyon",
        position: "RW",
        number: "09",
        role: "Right Winger"
    },
    {
        name: "Siam",
        position: "GK",
        number: "67",
        role: "Goalkeeper"
    },
    {
        name: "Prince",
        position: "GK",
        number: "23",
        role: "Goalkeeper"
    },
    {
        name: "Nadim",
        position: "CB",
        number: "05",
        role: "Centre Back"
    },
    {
        name: "Sohag TM",
        position: "CM",
        number: "06",
        role: "Midfielder"
    },
    {
        name: "Tanvir",
        position: "CM",
        number: "10",
        role: "Captain"
    },
    {
        name: "Jihad",
        position: "ST",
        number: "07",
        role: "Striker"
    },
    {
        name: "Rezaul",
        position: "LB",
        number: "08",
        role: "Left Back"
    }
];


// ======================================================
// DEFAULT MATCH
// ======================================================

const defaultMatch = {
    opponent: "Coming Soon",
    date: "2026-10-10",
    time: "16:00",
    venue: "Shymoli Ideal Polytechnic Institute"
};

let match =
    JSON.parse(localStorage.getItem("civilFCMatch")) ||
    defaultMatch;


// ======================================================
// DEFAULT NOTICES
// ======================================================

const defaultNotices = [
    {
        id: 1,
        title: "Welcome to Civil FC",
        text: "Welcome to the official Civil FC platform of Shymoli Ideal Polytechnic Institute.",
        date: "2026-10-01"
    },
    {
        id: 2,
        title: "Team Training",
        text: "Players are requested to stay prepared for upcoming football activities.",
        date: "2026-10-01"
    },
    {
        id: 3,
        title: "Stay Connected",
        text: "Check this website regularly for match and team updates.",
        date: "2026-10-01"
    }
];

let notices =
    JSON.parse(localStorage.getItem("civilFCNotices")) ||
    defaultNotices;


// ======================================================
// ELEMENTS
// ======================================================

const loginScreen = document.getElementById("loginScreen");
const website = document.getElementById("website");

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");
const signupBtn = document.getElementById("signupBtn");


// ======================================================
// SHOW WEBSITE
// ======================================================

function showWebsite() {
    loginScreen.classList.add("hidden");
    website.classList.remove("hidden");

    renderPlayers();
    renderMatch();
    renderNotices();
}


// ======================================================
// SHOW LOGIN
// ======================================================

function showLogin() {
    website.classList.add("hidden");
    loginScreen.classList.remove("hidden");
}


// ======================================================
// FIREBASE AUTH STATE
// ======================================================

onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log("Logged in:", user.email);
        showWebsite();
    } else {
        showLogin();
    }

});


// ======================================================
// LOGIN
// ======================================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    loginError.textContent = "";
    loginError.style.color = "#ff7070";

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    } catch (error) {

        console.error(error);

        if (error.code === "auth/invalid-credential") {

            loginError.textContent =
                "Incorrect email or password.";

        } else if (error.code === "auth/invalid-email") {

            loginError.textContent =
                "Please enter a valid email.";

        } else {

            loginError.textContent =
                "Login failed. Please try again.";

        }

    }

});


// ======================================================
// CREATE ACCOUNT
// ======================================================

signupBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    loginError.style.color = "#ff7070";

    if (!email) {

        loginError.textContent =
            "Enter your email first.";

        return;
    }

    if (!password) {

        loginError.textContent =
            "Enter a password first.";

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

        loginError.style.color = "var(--green)";

        loginError.textContent =
            "Account created successfully!";

    } catch (error) {

        console.error(error);

        if (error.code === "auth/email-already-in-use") {

            loginError.textContent =
                "This email is already registered.";

        } else if (error.code === "auth/invalid-email") {

            loginError.textContent =
                "Invalid email address.";

        } else {

            loginError.textContent =
                "Could not create account.";

        }

    }

});


// ======================================================
// LOGOUT
// ======================================================

function createLogoutButton() {

    const nav = document.querySelector(".navbar nav");

    if (!nav) return;

    if (document.getElementById("logoutBtn")) return;

    const logoutBtn = document.createElement("button");

    logoutBtn.id = "logoutBtn";
    logoutBtn.className = "admin-nav-btn";
    logoutBtn.textContent = "Logout";

    logoutBtn.addEventListener("click", async () => {

        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }

    });

    nav.insertBefore(
        logoutBtn,
        nav.querySelector("#adminOpenBtn")
    );
}

createLogoutButton();


// ======================================================
// PLAYERS
// ======================================================

const playerGrid =
    document.getElementById("playerGrid");


function renderPlayers(searchTerm = "") {

    if (!playerGrid) return;

    playerGrid.innerHTML = "";

    const search =
        searchTerm.toLowerCase().trim();

    const filteredPlayers =
        players.filter(player =>

            player.name.toLowerCase().includes(search) ||
            player.position.toLowerCase().includes(search) ||
            player.role.toLowerCase().includes(search)

        );


    if (filteredPlayers.length === 0) {

        playerGrid.innerHTML = `
            <div style="color:var(--muted); padding:20px;">
                No player found.
            </div>
        `;

        return;
    }


    filteredPlayers.forEach(player => {

        const card =
            document.createElement("div");

        card.className = "player-card";

        card.innerHTML = `

            <div class="player-number">
                ${player.number}
            </div>

            <h3>
                ${player.name}
            </h3>

            <div class="player-position">
                ${player.position}
            </div>

            <div class="player-role">
                ${player.role}
            </div>

            ${
                player.name === "Tanvir"
                ?
                `
                <span class="captain-tag">
                    CAPTAIN
                </span>
                `
                :
                ""
            }

        `;

        card.addEventListener("click", () => {
            openPlayerModal(player);
        });

        playerGrid.appendChild(card);

    });

}


// ======================================================
// PLAYER SEARCH
// ======================================================

const playerSearch =
    document.getElementById("playerSearch");

if (playerSearch) {

    playerSearch.addEventListener(
        "input",
        function () {

            renderPlayers(this.value);

        }
    );

}


// ======================================================
// PLAYER MODAL
// ======================================================

const playerModal =
    document.getElementById("playerModal");

const playerModalContent =
    document.getElementById("playerModalContent");


function openPlayerModal(player) {

    if (!playerModal || !playerModalContent) return;

    playerModalContent.innerHTML = `

        <div class="modal-icon">
            ⚽
        </div>

        <h2>
            ${player.name}
        </h2>

        <p style="color:var(--green); margin-top:8px;">
            ${player.position}
        </p>

        <p style="color:var(--muted); margin-top:12px;">
            Squad Number: ${player.number}
        </p>

        <p style="color:var(--muted); margin-top:8px;">
            Role: ${player.role}
        </p>

        ${
            player.name === "Tanvir"
            ?
            `
            <span class="captain-tag">
                TEAM CAPTAIN
            </span>
            `
            :
            ""
        }

    `;

    playerModal.classList.remove("hidden");

}


// Close player modal

document
    .querySelectorAll('[data-close="playerModal"]')
    .forEach(button => {

        button.addEventListener("click", () => {

            playerModal.classList.add("hidden");

        });

    });


if (playerModal) {

    playerModal.addEventListener("click", (event) => {

        if (event.target === playerModal) {

            playerModal.classList.add("hidden");

        }

    });

}


// ======================================================
// MATCH
// ======================================================

function renderMatch() {

    const opponentDisplay =
        document.getElementById("opponentDisplay");

    const opponentName =
        document.getElementById("opponentName");

    const matchDate =
        document.getElementById("matchDate");

    const matchTime =
        document.getElementById("matchTime");

    const matchVenue =
        document.getElementById("matchVenue");


    if (opponentDisplay)
        opponentDisplay.textContent = match.opponent;

    if (opponentName)
        opponentName.textContent = match.opponent;

    if (matchDate)
        matchDate.textContent = formatDate(match.date);

    if (matchTime)
        matchTime.textContent = formatTime(match.time);

    if (matchVenue)
        matchVenue.textContent = match.venue;

}


// ======================================================
// DATE FORMAT
// ======================================================

function formatDate(date) {

    if (!date) return "-";

    const d =
        new Date(date + "T00:00:00");

    return d.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


// ======================================================
// TIME FORMAT
// ======================================================

function formatTime(time) {

    if (!time) return "-";

    const [hour, minute] =
        time.split(":");

    const d = new Date();

    d.setHours(
        Number(hour),
        Number(minute)
    );

    return d.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


// ======================================================
// NOTICES
// ======================================================

function renderNotices() {

    const noticeGrid =
        document.getElementById("noticeGrid");

    if (!noticeGrid) return;

    noticeGrid.innerHTML = "";

    notices.forEach(notice => {

        const card =
            document.createElement("div");

        card.className = "notice-card";

        card.innerHTML = `

            <div class="notice-date">
                ${formatDate(notice.date)}
            </div>

            <h3>
                ${notice.title}
            </h3>

            <p>
                ${notice.text}
            </p>

        `;

        noticeGrid.appendChild(card);

    });

    renderAdminNotices();

}


// ======================================================
// ADMIN LOGIN
// ======================================================

const adminLoginModal =
    document.getElementById("adminLoginModal");

const adminModal =
    document.getElementById("adminModal");

const adminOpenBtn =
    document.getElementById("adminOpenBtn");


if (adminOpenBtn) {

    adminOpenBtn.addEventListener("click", () => {

        adminLoginModal.classList.remove("hidden");

    });

}


// Close admin login

document
    .querySelectorAll('[data-close="adminLoginModal"]')
    .forEach(button => {

        button.addEventListener("click", () => {

            adminLoginModal.classList.add("hidden");

        });

    });


// ======================================================
// ADMIN LOGIN FORM
// ======================================================

const adminLoginForm =
    document.getElementById("adminLoginForm");


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const username =
                document.getElementById(
                    "adminUsername"
                ).value.trim();

            const password =
                document.getElementById(
                    "adminPassword"
                ).value;

            const error =
                document.getElementById(
                    "adminLoginError"
                );


            if (
                username === "admin" &&
                password === "civilfc"
            ) {

                localStorage.setItem(
                    "civilFCAdmin",
                    "true"
                );

                error.textContent = "";

                adminLoginModal.classList.add(
                    "hidden"
                );

                adminModal.classList.remove(
                    "hidden"
                );

                loadAdminData();

            } else {

                error.textContent =
                    "Invalid admin credentials.";

            }

        }
    );

}


// ======================================================
// ADMIN DASHBOARD CLOSE
// ======================================================

document
    .querySelectorAll('[data-close="adminModal"]')
    .forEach(button => {

        button.addEventListener("click", () => {

            adminModal.classList.add("hidden");

        });

    });


// ======================================================
// ADMIN LOGOUT
// ======================================================

const adminLogout =
    document.getElementById("adminLogout");


if (adminLogout) {

    adminLogout.addEventListener("click", () => {

        localStorage.removeItem(
            "civilFCAdmin"
        );

        adminModal.classList.add("hidden");

    });

}


// ======================================================
// LOAD ADMIN DATA
// ======================================================

function loadAdminData() {

    const opponentInput =
        document.getElementById("opponentInput");

    const dateInput =
        document.getElementById("dateInput");

    const timeInput =
        document.getElementById("timeInput");

    const venueInput =
        document.getElementById("venueInput");


    if (opponentInput)
        opponentInput.value = match.opponent;

    if (dateInput)
        dateInput.value = match.date;

    if (timeInput)
        timeInput.value = match.time;

    if (venueInput)
        venueInput.value = match.venue;

    renderAdminNotices();

}


// ======================================================
// SAVE MATCH
// ======================================================

const matchForm =
    document.getElementById("matchForm");


if (matchForm) {

    matchForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            match = {

                opponent:
                    document.getElementById(
                        "opponentInput"
                    ).value.trim(),

                date:
                    document.getElementById(
                        "dateInput"
                    ).value,

                time:
                    document.getElementById(
                        "timeInput"
                    ).value,

                venue:
                    document.getElementById(
                        "venueInput"
                    ).value.trim()

            };


            localStorage.setItem(
                "civilFCMatch",
                JSON.stringify(match)
            );


            renderMatch();


            const message =
                document.getElementById(
                    "saveMessage"
                );

            if (message) {

                message.textContent =
                    "Match saved successfully!";

                setTimeout(() => {

                    message.textContent = "";

                }, 2500);

            }

        }
    );

}


// ======================================================
// SAVE NOTICE
// ======================================================

const noticeForm =
    document.getElementById("noticeForm");


if (noticeForm) {

    noticeForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const title =
                document.getElementById(
                    "noticeTitle"
                ).value.trim();

            const text =
                document.getElementById(
                    "noticeText"
                ).value.trim();


            const newNotice = {

                id: Date.now(),

                title,

                text,

                date:
                    new Date()
                        .toISOString()
                        .split("T")[0]

            };


            notices.unshift(newNotice);


            localStorage.setItem(
                "civilFCNotices",
                JSON.stringify(notices)
            );


            renderNotices();


            noticeForm.reset();


            const message =
                document.getElementById(
                    "noticeMessage"
                );


            if (message) {

                message.textContent =
                    "Notice published successfully!";

                setTimeout(() => {

                    message.textContent = "";

                }, 2500);

            }

        }
    );

}


// ======================================================
// ADMIN NOTICE LIST
// ======================================================

function renderAdminNotices() {

    const list =
        document.getElementById(
            "adminNoticeList"
        );

    if (!list) return;

    list.innerHTML = "";


    notices.forEach(notice => {

        const item =
            document.createElement("div");

        item.className =
            "admin-notice-item";


        item.innerHTML = `

            <div>

                <strong>
                    ${notice.title}
                </strong>

                <p style="
                    color:var(--muted);
                    font-size:12px;
                    margin-top:5px;
                ">
                    ${notice.text}
                </p>

            </div>

            <button
                class="delete-notice"
                data-id="${notice.id}"
            >
                Delete
            </button>

        `;


        list.appendChild(item);

    });


    document
        .querySelectorAll(".delete-notice")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            this.dataset.id
                        );


                    notices =
                        notices.filter(
                            notice =>
                                notice.id !== id
                        );


                    localStorage.setItem(
                        "civilFCNotices",
                        JSON.stringify(notices)
                    );


                    renderNotices();

                }
            );

        });

}


// ======================================================
// THEME
// ======================================================

const themeBtn =
    document.getElementById("themeBtn");


const savedTheme =
    localStorage.getItem("civilFCTheme");


if (
    savedTheme === "light" &&
    themeBtn
) {

    document.body.classList.add("light");

    themeBtn.textContent = "🌙";

}


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );


            const isLight =
                document.body.classList.contains(
                    "light"
                );


            localStorage.setItem(
                "civilFCTheme",
                isLight
                    ? "light"
                    : "dark"
            );


            themeBtn.textContent =
                isLight
                    ? "🌙"
                    : "☀";

        }
    );

}


// ======================================================
// MOBILE MENU
// ======================================================

const menuBtn =
    document.getElementById("menuBtn");

const mainNav =
    document.querySelector(".navbar nav");


if (menuBtn && mainNav) {

    menuBtn.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle("open");

        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "open"
                    );

                }
            );

        });

}


// ======================================================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// ======================================================

if (adminLoginModal) {

    adminLoginModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                adminLoginModal
            ) {

                adminLoginModal.classList.add(
                    "hidden"
                );

            }

        }
    );

}


if (adminModal) {

    adminModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                adminModal
            ) {

                adminModal.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ======================================================
// INITIAL RENDER
// ======================================================

renderPlayers();
renderMatch();
renderNotices();

console.log("Civil FC script loaded successfully.");
