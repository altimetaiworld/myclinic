document.addEventListener('DOMContentLoaded', () => {
    // --- Calendar Logic ---
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const selectedDateInput = document.getElementById('selected-date');

    let currentDate = new Date();

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Header
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        currentMonthYear.innerText = `${monthNames[month]} ${year}`;

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Weekday headers
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekdays.forEach(day => {
            const dayHead = document.createElement('div');
            dayHead.className = 'calendar-day-head';
            dayHead.innerText = day;
            calendarGrid.appendChild(dayHead);
        });

        // Blank days before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.innerText = day;

            // Mark today
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }

            dayElement.addEventListener('click', () => {
                // Deselect previous
                const prevSelected = document.querySelector('.calendar-day.selected');
                if (prevSelected) prevSelected.classList.remove('selected');

                // Select new
                dayElement.classList.add('selected');
                const formattedDate = `${day} ${monthNames[month]} ${year}`;
                selectedDateInput.value = formattedDate;
            });

            calendarGrid.appendChild(dayElement);
        }
    }

    prevMonthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    // --- Form & WhatsApp Logic ---
    const appointmentForm = document.getElementById('appointmentForm');
    const whatsappNumber = "918698369553"; // Dr. Sharma's number

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = selectedDateInput.value;
        const concern = document.getElementById('concern').value;

        if (!date) {
            alert("Please select a date from the calendar.");
            return;
        }

        // Basic validation
        if (!name || !phone || !concern) {
            alert("Please fill in all fields.");
            return;
        }

        // Professional WhatsApp Message Format
        const message = `*New Appointment Booking*%0A%0A` +
            `*Patient Name:* ${name}%0A` +
            `*Phone:* ${phone}%0A` +
            `*Selected Date:* ${date}%0A` +
            `*Concern:* ${concern}%0A%0A` +
            `Hello Dr. Sharma, I would like to confirm this appointment.`;

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappURL, '_blank');
    });

    // --- Smooth Scrolling for Nav ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- FAQ Interactivity ---
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
        });
    });

    // --- Reveal on Scroll ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
});
