import { initializeCalendars } from './Calendar/Events.js';
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.combo-calendar-button');
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            var _a;
            const calendarPart = `
        <div class="module-calendar">
            <div class="calendar-month-selector">
              <button class="prev-month">
                <span class="material-symbols-outlined" aria-hidden="true">
                  arrow_back_ios
                </span>
              </button>
              <span class="calendar-month-label"></span>
              <button class="next-month">
                <span class="material-symbols-outlined" aria-hidden="true">
                  arrow_forward_ios
                </span>
              </button>
            </div>
            <div class="days">
              <div class="day-name">Su</div>
              <div class="day-name">Mo</div>
              <div class="day-name">Tu</div>
              <div class="day-name">We</div>
              <div class="day-name">Th</div>
              <div class="day-name">Fr</div>
              <div class="day-name">Sa</div>
            </div>
        </div>
            `;
            let calendarHtml = `<div class="combo-calendar">`;
            for (let i = 0; i < 2; i++) {
                calendarHtml += calendarPart;
            }
            calendarHtml += '</div>';
            const calendarElement = document.createElement('div');
            calendarElement.innerHTML = calendarHtml;
            calendarElement.style.position = 'absolute';
            const buttonRect = event.target.getBoundingClientRect();
            calendarElement.style.top = `${buttonRect.bottom}px`;
            calendarElement.style.left = `${buttonRect.left}px`;
            const container = (_a = button.closest('elysium-app')) !== null && _a !== void 0 ? _a : document.body;
            container.appendChild(calendarElement);
            setTimeout(() => {
                const clickOutsideHandler = (clickEvent) => {
                    if (!calendarElement.contains(clickEvent.target) && clickEvent.target !== button) {
                        calendarElement.remove();
                        document.removeEventListener('click', clickOutsideHandler);
                    }
                };
                document.addEventListener('click', clickOutsideHandler);
                initializeCalendars();
            }, 0);
        });
    });
});
//# sourceMappingURL=Calendar.js.map