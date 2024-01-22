

document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const calendarContainer = document.getElementById("calendar");
    const selectedDatesContainer = document.getElementById("selectedDates");

    // Initial date and selected dates array
    let currentDate = new Date();
    let selectedDates = [new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())];


    // Render the calendar on page load
    function renderCalendar() {

        // Calculate the number of days in the current month and the first day of the month
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

        // Calendar HTML construction
        let calendarHtml = `
            <div class="header">
               <button onclick="prevMonth()">Prev</button>
                ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}
                <button onclick="nextMonth()">Next</button>
            </div>
            <table class="calendar-table">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
        `;


        // Creating  days
        let dayCount = 1;
        for (let i = 0; i < 42; i++) {
            if (i >= firstDay && dayCount <= daysInMonth) {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayCount);
                const isSelected = selectedDates.find(selectedDate => selectedDate.getTime() === date.getTime());

                calendarHtml += `
                    <td class="${isSelected ? 'selected' : ''}" onclick="toggleDate(${date.getTime()})">
                        ${dayCount}
                    </td>
                `;

                dayCount++;
            } else {
                calendarHtml += '<td></td>';
            }

            if ((i + 1) % 7 === 0 && i !== 41) {
                calendarHtml += '</tr><tr>';
            }
        }

        calendarHtml += '</tbody></table>';
        calendarContainer.innerHTML = calendarHtml;


        // Highlight selected dates and display them
        highlightSelectedDates();
        displaySelectedDates();
    }





    // Toggle date selection
    window.toggleDate = function (date) {
        const index = selectedDates.findIndex(selectedDate => selectedDate.getTime() === date);

        if (index === -1) {
            // If date is not in the array, add it
            selectedDates.push(new Date(date));
        } else {
            // If date is in the array, remove it (deselect)
            selectedDates.splice(index, 1);
        }

        renderCalendar();
    };



    // Highlight selected dates on the calendar
    function highlightSelectedDates() {
        const dateElements = document.querySelectorAll('.calendar-table td');

        dateElements.forEach(dateElement => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(dateElement.innerText));

            if (selectedDates.find(selectedDate => selectedDate.getTime() === date.getTime())) {
                dateElement.classList.add('selected');
            } else {
                dateElement.classList.remove('selected');
            }
        });
    }

    // Display selected dates below the calendar
    function displaySelectedDates() {
        const formattedDates = selectedDates.map(date => date.toDateString());
        selectedDatesContainer.innerHTML = `Selected Dates: ${formattedDates.join(', ')}`;
    }

    // Navigate to the previous month
    window.prevMonth = function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    };

    // Navigate to the next month
    window.nextMonth = function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    };

    // Initial render of the calendar
    renderCalendar();
});
