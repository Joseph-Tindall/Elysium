import { initializeCalendars } from './Calendar/Events.js';

document.addEventListener('DOMContentLoaded', (): void => {
    const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.combo-calendar-button');

    buttons.forEach((button: HTMLButtonElement): void => {
        button.addEventListener('click', (event: MouseEvent): void => {
            const calendarPart: string = `
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
            let calendarHtml: string = `<div class="combo-calendar">`;
            for (let i: number = 0; i < 2; i++) {
                calendarHtml += calendarPart;
            }
            calendarHtml += '</div>';

            const calendarElement: HTMLDivElement = document.createElement('div');
            calendarElement.innerHTML = calendarHtml;
            calendarElement.style.position = 'absolute';
            
            const buttonRect: DOMRect = (event.target as HTMLElement).getBoundingClientRect();
            calendarElement.style.top = `${buttonRect.bottom}px`;
            calendarElement.style.left = `${buttonRect.left}px`;

            const container: HTMLElement | null = button.closest('elysium-app') ?? document.body;
            container.appendChild(calendarElement);

            setTimeout((): void => {
                const clickOutsideHandler = (clickEvent: MouseEvent): void => {
                    if (!calendarElement.contains(clickEvent.target as Node) && clickEvent.target !== button) {
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