/* =====================================================
   CIVIL FC WEBSITE
   ===================================================== */


/* ================= PLAYER DATA ================= */

const players = [

    {
        name: "Fahim",
        position: "CM",
        role: "Midfielder",
        number: "11"
    },

    {
        name: "Liyon",
        position: "RW",
        role: "Winger",
        number: "09"
    },

    {
        name: "Siam",
        position: "GK",
        role: "Goalkeeper",
        number: "67"
    },

    {
        name: "Prince",
        position: "GK",
        role: "Goalkeeper",
        number: "23"
    },

    {
        name: "Nadim",
        position: "CB",
        role: "Defender",
        number: "05"
    },

    {
        name: "Sohag",
        position: "TM",
        role: "Team Member",
        number: "06"
    },

    {
        name: "Tanvir",
        position: "CM",
        role: "Midfielder",
        number: "10",
        captain: true
    },

    {
        name: "Jihad",
        position: "ST",
        role: "Forward",
        number: "07"
    },

    {
        name: "Rezaul",
        position: "LB",
        role: "Defender",
        number: "08"
    }

];


/* ================= DEFAULT MATCH ================= */

const defaultMatch = {

    opponent: "Opponent",

    date: "",

    time: "",

    venue: "Shymoli"

};


let match =
    JSON.parse(
        localStorage.getItem("civilFCMatch")
    ) || defaultMatch;


/* ================= DEFAULT NOTICES ================= */

const defaultNotices = [

    {
        title: "Welcome to Civil FC",
        text: "Welcome to the official Civil FC website.",
        date: "Welcome"
    },

    {
        title: "Team Update",
        text: "Civil FC team information is now available.",
        date: "Team"
    }

];


let notices =
    JSON.parse(
        localStorage.getItem("civilFCNotices")
    ) || defaultNotices;


/* =====================================================
   LOGIN
   ===================================================== */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        const error =
            document.getElementById("loginError");


        if (
            username === "tanvir" &&
            password === "tanvir"
        ) {

            localStorage.setItem(
                "civilFCLoggedIn",
                "true"
            );

            error.textContent = "";

            showWebsite();

        } else {

            error.textContent =
                "Incorrect username or password.";

        }

    }
);


/* ================= SHOW WEBSITE ================= */

function showWebsite() {

    document
        .getElementById("loginScreen")
        .classList.add("hidden");

    document
        .getElementById("website")
        .classList.remove("hidden");

    loadMatch();

    renderPlayers();

    displayNotices();

}


/* ================= INITIAL LOGIN CHECK ================= */

if (
    localStorage.getItem("civilFCLoggedIn")
    === "true"
) {

    showWebsite();

}


/* =====================================================
   PLAYER SYSTEM
   ===================================================== */

function renderPlayers(search = "") {

    const grid =
        document.getElementById("playerGrid");

    const query =
        search.toLowerCase().trim();


    const filtered =
        players.filter(player =>

            player.name
                .toLowerCase()
                .includes(query)

            ||

            player.position
                .toLowerCase()
                .includes(query)

            ||

            player.role
                .toLowerCase()
                .includes(query)

        );


    grid.innerHTML = "";


    if (!filtered.length) {

        grid.innerHTML = `
            <div class="notice-card">
                <h3>No player found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    filtered.forEach(player => {

        const card =
            document.createElement("div");

        card.className =
            "player-card";


        card.innerHTML = `

            <div class="player-number">
                #${player.number}
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
                player.captain
                ?
                `<span class="captain-tag">
                    ★ CAPTAIN
                </span>`
                :
                ""
            }

        `;


        card.addEventListener(
            "click",
            () => openPlayerModal(player)
        );


        grid.appendChild(card);

    });

}


/* ================= PLAYER SEARCH ================= */

document
    .getElementById("playerSearch")
    .addEventListener(
        "input",
        function() {

            renderPlayers(this.value);

        }
    );


/* ================= PLAYER MODAL ================= */

function openPlayerModal(player) {

    const modal =
        document.getElementById("playerModal");

    const content =
        document.getElementById(
            "playerModalContent"
        );


    content.innerHTML = `

        <div class="modal-icon">
            ⚽
        </div>

        <span class="section-label">
            CIVIL FC PLAYER
        </span>

        <h2 style="
            font-family:Outfit;
            font-size:35px;
            margin-top:8px;
        ">
            ${player.name}
        </h2>

        <p style="
            color:var(--muted);
            margin-top:8px;
        ">
            ${player.position} • ${player.role}
        </p>

        <div style="
            margin-top:25px;
            padding:20px;
            border:1px solid var(--border);
            border-radius:15px;
            background:var(--card);
        ">

            <strong>
                Jersey Number
            </strong>

            <div style="
                color:var(--green);
                font-family:Outfit;
                font-size:40px;
                font-weight:900;
                margin-top:5px;
            ">
                ${player.number}
            </div>

        </div>

        ${
            player.captain
            ?
            `
            <div style="
                margin-top:15px;
                color:var(--green);
                font-weight:700;
            ">
                ★ Team Captain
            </div>
            `
            :
            ""
        }

    `;


    modal.classList.remove("hidden");

}


/* =====================================================
   MATCH SYSTEM
   ===================================================== */

function loadMatch() {

    const opponent =
        document.getElementById(
            "opponentDisplay"
        );

    const opponentName =
        document.getElementById(
            "opponentName"
        );

    const date =
        document.getElementById(
            "matchDate"
        );

    const time =
        document.getElementById(
            "matchTime"
        );

    const venue =
        document.getElementById(
            "matchVenue"
        );


    opponent.textContent =
        match.opponent || "Opponent";

    opponentName.textContent =
        match.opponent || "Opponent";


    if (match.date) {

        const dateObject =
            new Date(
                match.date + "T00:00:00"
            );

        date.textContent =
            dateObject.toLocaleDateString(
                "en-BD",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    } else {

        date.textContent =
            "Not set";

    }


    if (match.time) {

        const timeObject =
            new Date(
                "2000-01-01T" +
                match.time
            );

        time.textContent =
            timeObject.toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    } else {

        time.textContent =
            "Not set";

    }


    venue.textContent =
        match.venue || "Not set";


    loadAdminFields();

}


/* ================= ADMIN MATCH FIELDS ================= */

function loadAdminFields() {

    const opponent =
        document.getElementById(
            "opponentInput"
        );

    const date =
        document.getElementById(
            "dateInput"
        );

    const time =
        document.getElementById(
            "timeInput"
        );

    const venue =
        document.getElementById(
            "venueInput"
        );


    if (!opponent) return;


    opponent.value =
        match.opponent || "";

    date.value =
        match.date || "";

    time.value =
        match.time || "";

    venue.value =
        match.venue || "";

}


/* ================= SAVE MATCH ================= */

document
    .getElementById("matchForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            match = {

                opponent:
                    document
                    .getElementById(
                        "opponentInput"
                    )
                    .value
                    .trim(),

                date:
                    document
                    .getElementById(
                        "dateInput"
                    )
                    .value,

                time:
                    document
                    .getElementById(
                        "timeInput"
                    )
                    .value,

                venue:
                    document
                    .getElementById(
                        "venueInput"
                    )
                    .value
                    .trim()

            };


            localStorage.setItem(
                "civilFCMatch",
                JSON.stringify(match)
            );


            loadMatch();


            const message =
                document.getElementById(
                    "saveMessage"
                );


            message.textContent =
                "✓ Match information saved";


            setTimeout(
                () => {
                    message.textContent = "";
                },
                3000
            );

        }
    );


/* =====================================================
   NOTICE SYSTEM
   ===================================================== */

function displayNotices() {

    const grid =
        document.getElementById(
            "noticeGrid"
        );

    const adminList =
        document.getElementById(
            "adminNoticeList"
        );


    grid.innerHTML = "";

    adminList.innerHTML = "";


    if (!notices.length) {

        grid.innerHTML = `
            <div class="notice-card">
                <h3>No notices</h3>
                <p>No notices have been published yet.</p>
            </div>
        `;

    }


    notices.forEach(
        (notice, index) => {

            /* PUBLIC NOTICE */

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "notice-card";


            card.innerHTML = `

                <span class="notice-date">
                    ${notice.date}
                </span>

                <h3>
                    ${notice.title}
                </h3>

                <p>
                    ${notice.text}
                </p>

            `;


            grid.appendChild(card);


            /* ADMIN NOTICE */

            const adminItem =
                document.createElement(
                    "div"
                );

            adminItem.className =
                "admin-notice-item";


            adminItem.innerHTML = `

                <div>

                    <strong>
                        ${notice.title}
                    </strong>

                    <div style="
                        color:var(--muted);
                        font-size:11px;
                        margin-top:5px;
                    ">
                        ${notice.text}
                    </div>

                </div>

                <button
                    class="delete-notice"
                    onclick="deleteNotice(${index})"
                >
                    Delete
                </button>

            `;


            adminList.appendChild(
                adminItem
            );

        }
    );

}


/* ================= ADD NOTICE ================= */

document
    .getElementById("noticeForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const title =
                document.getElementById(
                    "noticeTitle"
                ).value.trim();


            const text =
                document.getElementById(
                    "noticeText"
                ).value.trim();


            notices.unshift({

                title: title,

                text: text,

                date: new Date()
                    .toLocaleDateString(
                        "en-BD",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    )

            });


            localStorage.setItem(
                "civilFCNotices",
                JSON.stringify(notices)
            );


            displayNotices();


            this.reset();


            const message =
                document.getElementById(
                    "noticeMessage"
                );


            message.textContent =
                "✓ Notice published";


            setTimeout(
                () => {
                    message.textContent = "";
                },
                3000
            );

        }
    );


/* ================= DELETE NOTICE ================= */

function deleteNotice(index) {

    if (
        !confirm(
            "Delete this notice?"
        )
    ) {
        return;
    }


    notices.splice(index, 1);


    localStorage.setItem(
        "civilFCNotices",
        JSON.stringify(notices)
    );


    displayNotices();

}


/* =====================================================
   ADMIN LOGIN
   ===================================================== */

document
    .getElementById("adminOpenBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "adminLoginModal"
                )
                .classList.remove("hidden");

        }
    );


document
    .getElementById("adminLoginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document
                .getElementById(
                    "adminUsername"
                )
                .value
                .trim();


            const password =
                document
                .getElementById(
                    "adminPassword"
                )
                .value;


            const error =
                document.getElementById(
                    "adminLoginError"
                );


            /*
                Current demo credentials.

                Online version এ এগুলো
                backend authentication-এ যাবে.
            */

            if (
                username === "admin" &&
                password === "civilfc"
            ) {

                localStorage.setItem(
                    "civilFCAdmin",
                    "true"
                );


                error.textContent = "";


                document
                    .getElementById(
                        "adminLoginModal"
                    )
                    .classList.add("hidden");


                document
                    .getElementById(
                        "adminModal"
                    )
                    .classList.remove("hidden");


                this.reset();


                loadAdminFields();

                displayNotices();

            } else {

                error.textContent =
                    "Invalid admin credentials.";

            }

        }
    );


/* =====================================================
   ADMIN LOGOUT
   ===================================================== */

document
    .getElementById("adminLogout")
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "civilFCAdmin"
            );


            document
                .getElementById(
                    "adminModal"
                )
                .classList.add("hidden");

        }
    );


/* =====================================================
   THEME
   ===================================================== */

const themeBtn =
    document.getElementById(
        "themeBtn"
    );


if (
    localStorage.getItem(
        "civilFCTheme"
    ) === "light"
) {

    document.body.classList.add(
        "light"
    );

}


themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "light"
        );


        localStorage.setItem(
            "civilFCTheme",

            document.body.classList.contains(
                "light"
            )
            ?
            "light"
            :
            "dark"
        );

    }
);


/* =====================================================
   MOBILE MENU
   ===================================================== */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );


menuBtn.addEventListener(
    "click",
    function() {

        navMenu.classList.toggle(
            "open"
        );

    }
);


document
    .querySelectorAll(
        "#navMenu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {
                navMenu.classList.remove(
                    "open"
                );
            }
        );

    });


/* =====================================================
   MODAL CLOSE
   ===================================================== */

document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                const modalId =
                    this.dataset.close;


                document
                    .getElementById(
                        modalId
                    )
                    .classList.add(
                        "hidden"
                    );

            }
        );

    });


/* ================= CLOSE ON BACKDROP ================= */

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === this
                ) {

                    this.classList.add(
                        "hidden"
                    );

                }

            }
        );

    });


/* ================= ESC KEY ================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            document
                .querySelectorAll(
                    ".modal"
                )
                .forEach(modal => {

                    modal.classList.add(
                        "hidden"
                    );

                });

        }

    }
);