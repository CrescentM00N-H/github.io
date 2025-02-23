"use strict";
/*
Names: William Dawson, Hilaal Mansoor
Student IDs: 100945808, 100957010
Date: 02-22-2025
 */

//IIFE - Immediately invoked functional expression.



document.addEventListener('DOMContentLoaded', function() {
    // Existing code...

    // Search functionality
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        if (query) {
            // Perform search logic here
            console.log('Searching for:', query);
            // Example: Redirect to a search results page
            window.location.href = `search.html?query=${encodeURIComponent(query)}`;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const resultsContainer = document.getElementById('results');

    if (query) {
        // Perform search and display results
        resultsContainer.innerHTML = `<p>Results for "${query}":</p>`;
        // Example: Display a list of results
        const results = searchItems(query); // Implement this function to search your data
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `<p>${result}</p>`;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No search query provided.</p>';
    }
});

function searchItems(query) {
    // Implement your search logic here
    // Example: Return a list of matching items
    const items = ['Item 1', 'Item 2', 'Item 3']; // Replace with your actual data
    return items.filter(item => item.toLowerCase().includes(query));
}




document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.getElementById('navbarDropdown');
    var menu = dropdown.nextElementSibling;

    dropdown.addEventListener('click', function(event) {
        event.preventDefault();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target) && !menu.contains(event.target)) {
            menu.style.display = 'none';
        }
    });
});
(function () {


    /**
     * Checks to see if the user is logged in, adjusting the navbar login/logout dynamically
     * based on if they are or are not logged in.
     */
    function CheckLogin(){
        console.log("Checking user login status")

        const loginNav = document.getElementById("loginNav");

        if (!loginNav) {
            console.warn("Login Nav element not found.")
            return;
        }

        const userSession = sessionStorage.getItem("user");
        if (userSession) {
            loginNav.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
            loginNav.href = "#";

            loginNav.addEventListener("click", (event) => {
                event.preventDefault();
                sessionStorage.removeItem("user");
                location.href = "login.html";
            });
        }
    }

    /**
     * Checks to user.json file to see if we have a user matching input credentials then stores the user in
     * session storage if they match.
     */
    function DisplayLoginPage(){
        console.log("Calling DisplayLoginPage()");
        let messageArea = document.getElementById("messageArea");
        messageArea.style.display = "none";
        fetch('data/user.json')
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let users = data;
                let userName = document.getElementById("username");
                let password = document.getElementById("password");
                let loginButton = document.getElementById("loginButton");
                let validUser = new main.User;
                loginButton.addEventListener("click", function(){
                    let valid = false;
                    users["users"].forEach((user)=>{
                        if(user.Username === userName.value && user.Password === password.value){
                            valid = true;
                            validUser.fromJSON(user);
                        }
                    })
                    if(valid){
                        messageArea.style.display = "none";
                        window.sessionStorage.setItem(`user`, JSON.stringify({
                            DisplayName: validUser.DisplayName,
                            EmailAddress: validUser.EmailAddress,
                            Username: validUser.Username,
                        }));
                        location.href = "index.html";
                    }else{
                        userName.focus();
                        messageArea.classList.add("alert", "alert-danger");
                        messageArea.textContent = "Username or password incorrect.";
                        messageArea.style.display = "block";
                    }
                })
            })
            .catch(error => {
                // Handle any errors
                console.error('There was a problem with the fetch operation:', error);
            });

        let cancelButton = document.getElementById("cancelButton");
        cancelButton.addEventListener("click", function(){
            document.getElementById("loginForm").reset();
            location.href = "index.html";
        })
    }
    /**
     * Updates the active nav link class to be equal to current page.
     */
    function UpdateActiveNavLink(){
        console.log("[INFO] Updating active nav link..");

        const currentPage = document.title.trim();
        const navLinks = document.querySelectorAll("nav a");

        navLinks.forEach(link => {
            if (link.textContent.trim() === currentPage) {
                link.classList.add("active");
            }else{
                link.classList.remove("active");
            }
        })
    }
    /**
     * Loads the nav bar dynamically for each page.
     */
    function LoadHeader(){
        console.log("[INFO] Loading header...");

        return fetch("header.html")
            .then(response => response.text())
            .then(data => {
                document.querySelector("header").innerHTML = data;
                UpdateActiveNavLink();
            })
            .catch(error => console.log(error));
    }

    /**
     * displays the home page and runs the functions for it to work.
     */
    function DisplayHomePage(){
        console.log("Calling DisplayHomePage()");

        let aboutUsBtn = document.getElementById("getInvolvedBtn");
        aboutUsBtn.addEventListener("click", function(){
            location.href="opportunities.html";
        });
    }

    /**
     * displays the opportunities page and runs all functions required for it to work.
     */
    function DisplayOpportunitiesPage(){
        console.log("Calling DisplayOpportunitiesPage()");

        fetch("data/events.json").then(response => response.json()).then(data => {
            //console.log(data);
            const events = data.events;
            // data["events"].forEach(event => {
            //     events.push(event);
            // })
            console.log(events);

            // const events = [
            //     { title: 'Fundraiser Gala', description: "Assist at a fundraiser", date: '2023-11-05', category: 'fundraisers' },
            //     { title: 'Community Cleanup',description: "Help cleanup around the community.", date: '2023-11-12', category: 'cleanups' },
            //     { title: 'Coding Workshop', description: "Assist teaching at a coding workshop.", date: '2023-11-19', category: 'workshops' },
            //     { title: 'Charity Run',description: "Participate in a run to gather funds for a charity.", date: '2023-11-26', category: 'fundraisers' },
            //     { title: 'Beach Cleanup', description: "Help cleanup around the local beach.", date: '2023-12-03', category: 'cleanups' },
            //     { title: 'Art Workshop',description: "Assist in a local art workshop." , date: '2023-12-10', category: 'workshops' }
            // ];

            // Programmatically adding the list of events.
            let pageData = `    
        <tr>
            <td>#</td>
            <td>Title</td>
            <td>Description</td>
            <td>Date and Time</td>
            <td></td>
        </tr>
        `;
            let index = 1
            let opportunityList = document.getElementById("opportunities");
            for (const event of events) {
                pageData += `
                <tr>
                <td>${index}</td>
                <td>${event.title}</td>
                <td>${event.description}</td>
                <td>${event.date}</td>
                <td> <button id="getInvolved${index}" class="btn btn-primary" name="getInvolved">Sign Up</button></td>
            </tr>
            `
                index++;
            }
            opportunityList.innerHTML = pageData;

            // Adding an event to each button in the list.
            let getInvolvedBtn = document.getElementsByName("getInvolved");
            const formModal = new bootstrap.Modal(document.getElementById(`formModal`));
            for (const btn of getInvolvedBtn) {
                btn.addEventListener("click", function () {
                    formModal.show(btn);
                    //location.href="contact.html";
                });
            }

            // Form submission
            let formSubmit = document.getElementById("formModalSubmit");
            let modalBody = document.querySelector('.modal-body');
            let modalHTML = modalBody.innerHTML;
            let formClose = document.getElementById("formModalCancel");
            formSubmit.addEventListener("click", function () {
                let modalName = document.getElementById("fullName")
                let modalEmail = document.getElementById("emailAddress");
                let modalRole = document.getElementById("preferredRole");
                if (modalName.value.length > 0 && modalEmail.value.length > 0 && modalRole.value.length > 0) {
                    modalBody.innerHTML = `Submission confirmed.`;
                    setTimeout(function () {
                        formModal.hide();
                        modalBody.innerHTML = modalHTML;
                    }, 2000)
                } else {
                    modalBody.innerHTML = modalHTML + `<br> Missing one or more fields.`
                }
            })
            formClose.addEventListener("click", function () {
                modalBody.innerHTML = modalHTML;
            })
        }).catch(error => console.error('Error loading events:', error));
    }

    /**
     * logs runs all functions required for the contacts page to work.
     */
    function DisplayContactsPage() {
        console.log("Calling DisplayContactsPage()");
        let confModal = new bootstrap.Modal(document.getElementById(`confirmationModal`));
        let submitBtn = document.getElementById("Sendbtn");
        submitBtn.addEventListener("click", function(event){
            // prevent form from submitting and get the contents of each field
            event.preventDefault();
            let emailAddress = document.getElementById("emailAddress");
            let fullName = document.getElementById("fullName");
            let subject = document.getElementById("subject");
            let message = document.getElementById("message");
            // confirm that all feilds are acceptable, and then save the content to the modal
            if(emailAddress.checkValidity() && fullName.checkValidity() && subject.checkValidity() && message.checkValidity()) {
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <p>Full Name: ${fullName.value}</p>
                    <p>Email Address: ${emailAddress.value}</p>
                    <p>Subject: ${subject.value}</p>
                    <p>Message: ${message.value}</p>
                `;
                //show modal when submit button is clicked
                confModal.show(submitBtn);
                // commented timeout function as we may need it later but A2 has told us to not reload contact page
                // setTimeout(function () {
                //     location.href = "contact.html";
                // }, 5000)
            } else {
                alert("Please fill out all required fields correctly.");
            }
        });
    }

    /**
     * runs all functions required for the display events page to work.
     */
    function DisplayEventsPage() {
        console.log(" Displaying Events Page...");

        fetch("data/events.json").then(response => response.json()).then(data => {

            const events = data.events;
            const calendarEl = document.getElementById('calendar');

            /**
             * Renders the calendar based on the events and the filter.
             * @param eventsToRender all the events
             * @param filter the category to filter by
             */
            function renderCalendar(eventsToRender, filter) {
                calendarEl.innerHTML = '';

                const daysInMonth = new Date(2025, 2, 0).getDate(); // February 2025
                const firstDay = new Date(2025, 1, 1).getDay(); // February 1, 2025

                let calendarHTML = '<table class="table table-bordered"><thead><tr>';
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                daysOfWeek.forEach(day => {
                    calendarHTML += `<th>${day}</th>`;
                });
                calendarHTML += '</tr></thead><tbody><tr>';

                for (let i = 0; i < firstDay; i++) {
                    calendarHTML += '<td></td>';
                }
                // Check if the current day should start a new row in the calendar table
                for (let day = 1; day <= daysInMonth; day++) {
                    if ((day + firstDay - 1) % 7 === 0) {
                        calendarHTML += '</tr><tr>';
                    }
                    //The const gets the time in UTC due to an issue where going from EST to UTC would cause the date to be off by 1
                    // really silly, I know.
                    const event = eventsToRender.find(event => new Date(event.date).getUTCDate() === day);
                    if (event && event.category === filter || event && filter === 'all') {
                        const eventClass = filter === 'all' ? '' : (event.category === filter ? 'highlighted-event' : 'greyed-out-event');
                        calendarHTML += `<td class="${eventClass}">${day}<br>${event.title}</td>`;
                    } else {
                        calendarHTML += `<td>${day}</td>`;
                    }
                }

                calendarHTML += '</tr></tbody></table>';
                calendarEl.innerHTML = calendarHTML;
            }

            function callEvent(event) {
                console.log(`Calling event: ${event.title} on ${event.date} (${event.category})`);
            }

            renderCalendar(events, 'all');

            const addEventBtn = document.getElementById("addEventBtn");
            addEventBtn.addEventListener("click", () => {
                const eventTitleInput = document.getElementById("eventTitle");
                const eventDateInput = document.getElementById("eventDate");
                const eventCategoryInput = document.getElementById("eventCategoryInput");

                const title = eventTitleInput.value;
                const date = eventDateInput.value;
                const category = eventCategoryInput.value;

                if (title && date && category) {
                    const newEvent = {title, date, category};
                    events.push(newEvent);
                    renderCalendar(events, 'all');

                    eventTitleInput.value = "";
                    eventDateInput.value = "";
                    eventCategoryInput.value = "fundraisers";

                    console.log(`Event added: ${title} on ${date} (${category})`);
                    callEvent(newEvent);
                }
            });
            //the filter will change the text of unselected events to gray and highlight the selected ones
            const eventCategoryFilter = document.getElementById("eventCategory");
            eventCategoryFilter.addEventListener("change", () => {
                const filter = eventCategoryFilter.value;
                renderCalendar(events, filter);
            });
        }).catch(error => console.error('Error loading events:', error));
    }

    /**
     * Start function that runs the right page based on page title. Invoked everytime any page is loaded.
     */
    function Start() {
        console.log("Starting....");

        LoadHeader().then(() => {
            CheckLogin()
        })

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break
            case "Contact":
                DisplayContactsPage();
                break
            case "Opportunities":
                DisplayOpportunitiesPage();
                break
            case "Events":
                DisplayEventsPage();
                break
            case "Login":
                DisplayLoginPage();
                break
        }

    }window.addEventListener("load", Start);

})();