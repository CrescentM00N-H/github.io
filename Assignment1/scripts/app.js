"use strict";
/*
Names: William Dawson, Hilaal Mansoor
Student IDs: 100945808, 100957010
Date: 01-24-2025
 */

//IIFE - Immediately invoked functional expression.

(function () {

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

        const events = [
            { title: 'Fundraiser Gala', description: "Assist at a fundraiser", date: '2023-11-05', category: 'fundraisers' },
            { title: 'Community Cleanup',description: "Help cleanup around the community.", date: '2023-11-12', category: 'cleanups' },
            { title: 'Coding Workshop', description: "Assist teaching at a coding workshop.", date: '2023-11-19', category: 'workshops' },
            { title: 'Charity Run',description: "Participate in a run to gather funds for a charity.", date: '2023-11-26', category: 'fundraisers' },
            { title: 'Beach Cleanup', description: "Help cleanup around the local beach.", date: '2023-12-03', category: 'cleanups' },
            { title: 'Art Workshop',description: "Assist in a local art workshop." , date: '2023-12-10', category: 'workshops' }
        ];

        // Programmatically adding the list of events.
        let data = `    
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
        for(const event of events){
        data += `
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
        opportunityList.innerHTML = data;

        // Adding an event to each button in the list.
        let getInvolvedBtn = document.getElementsByName("getInvolved");
        const formModal = new bootstrap.Modal(document.getElementById(`formModal`));
        for(const btn of getInvolvedBtn){
        btn.addEventListener("click", function(){
            formModal.show(btn);
            //location.href="contact.html";
        });
        }

        // Form submission
        let formSubmit = document.getElementById("formModalSubmit");
        let modalBody = document.querySelector('.modal-body');
        let modalHTML = modalBody.innerHTML;
        let formClose = document.getElementById("formModalCancel");
        formSubmit.addEventListener("click", function(){
            let modalName = document.getElementById("fullName")
            let modalEmail = document.getElementById("emailAddress");
            let modalRole = document.getElementById("preferredRole");
            if(modalName.value.length > 0 && modalEmail.value.length > 0 && modalRole.value.length > 0){
                modalBody.innerHTML = `Submission confirmed.`;
                setTimeout(function () {
                    formModal.hide();
                    modalBody.innerHTML = modalHTML;
                }, 2000)
            }else{
                modalBody.innerHTML = modalHTML + `<br> Missing one or more fields.`
            }
        })
        formClose.addEventListener("click", function(){
            modalBody.innerHTML = modalHTML;
        })

    }

    /**
     * logs runs all functions required for the contacts page to work.
     */
    function DisplayContactsPage(){
        console.log("Calling DisplayContactsPage()");
        let confModal = new bootstrap.Modal(document.getElementById(`confirmationModal`));
        let submitBtn = document.getElementById("Sendbtn");
        submitBtn.addEventListener("click", function(){
            //let emailAddress = document.getElementById("emailAddress");
            //let fullName = document.getElementById("fullName");
            //let subject = document.getElementById("subject");
            //if(emailAddress.checkValidity() && fullName.checkValidity() && emailAddress.checkValidity()) {
                confModal.show(submitBtn);
                setTimeout(function () {
                    location.href = "index.html";
                }, 5000)
            //}
        })
    }

    /**
     * runs all functions required for the display events page to work.
     */
    function DisplayEventsPage() {
        console.log(" Displaying Events Page...");

        const events = [
            { title: 'Fundraiser Gala', date: '2025-02-05', category: 'fundraisers' },
            { title: 'Community Cleanup', date: '2025-02-12', category: 'cleanups' },
            { title: 'Coding Workshop', date: '2025-02-19', category: 'workshops' },
            { title: 'Charity Run', date: '2025-02-26', category: 'fundraisers' },
            { title: 'Beach Cleanup', date: '2025-02-03', category: 'cleanups' },
            { title: 'Art Workshop', date: '2025-02-10', category: 'workshops' }
        ];

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
                if (event && event.category === filter || event && filter === 'all' ) {
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
                const newEvent = { title, date, category };
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
    }

    function Start() {
        console.log("Starting....");

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
        }

    }window.addEventListener("load", Start);

})();