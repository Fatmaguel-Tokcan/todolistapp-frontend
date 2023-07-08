<template>
  <div class="container1">
    <div class="search-container py-5 h-100">
      <form class="d-flex" role="search">
        <input v-model="searchQuery" type="text" placeholder="Search" class="form-control me-2">
        <button @click="searchToDoListe" type="button" class="btn btn-primary search-button">Search</button>
      </form>
    </div>

    <div id="calendar" class="calendar-container" @click="setSelectedToDoList(selectedAufgabentitel)"></div>
  </div>
</template>


<style>
.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.search-container {
  position: absolute;
  top: 10px;
  left: 10px;
}

.calendar-container {
  width: 80%;
  height: 80%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.high-priority-event {
  background-color: #fd8888;
}

.medium-priority-event {
  background-color: #f8e07e;
}

.low-priority-event {
  background-color: #9aee9a;
}

.high-priority-event .fc-event-title {
  color: #0a0a0a;
}

.medium-priority-event .fc-event-title {
  color: black;
}

.low-priority-event .fc-event-title {
  color: black;
}

.fc-daygrid-day-number {
  color: #7fe7a9;
  text-decoration: none !important;
}

.fc-daygrid-day-header.fc-widget-header {
  color: #7fe7a9;
  text-decoration: none !important;
}

.fc-col-header-cell.fc-day a {
  color: #7fe7a9;
  text-decoration: none;
}

.fc-day-today {
  background-color: #7fe7a9;
  color: white;
}

.fc-today-button,
.fc-prev-button,
.fc-next-button {
  background-color: #7fe7a9;
  color: white;
}

.fc-today-button:hover,
.fc-prev-button:hover,
.fc-next-button:hover {
  background-color: #66d492;
}
.search-button {
  background-color: #7fe7a9 !important;
  color: #000000 !important;
}

.search-button:hover {
  background-color: #66d492 !important;
}
</style>

<script>
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import deLocale from '@fullcalendar/core/locales/de';

export default {
  name: 'SearchTodo',
  props: ['ToDoListe'],
  data() {
    return {
      searchQuery: '',
      filteredToDoListe: [],
      originalToDoListe: [],
      calendar: null,
      isSearching: false,
      selectedAufgabentitel: ''
    };
  },
  watch: {
    ToDoListe: {
      handler(newToDoListe) {
        if (newToDoListe) {
          this.originalToDoListe = newToDoListe.slice();
          if (!this.isSearching) {
            this.filteredToDoListe = newToDoListe.slice();
            this.renderCalendar();
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchToDoListe();
  },
  methods: {
    fetchToDoListe() {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todolist';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.originalToDoListe = result.map(item => ({
            ...item,
            updatedAufgabentitel: ''
          }));
          if (!this.isSearching) {
            this.filteredToDoListe = result.map(item => ({
              ...item,
              updatedAufgabentitel: ''
            }));
            this.renderCalendar();
          }
        })
        .catch(error => console.log('error', error));
    },
    searchToDoListe() {
      if (this.searchQuery.trim() === '') {
        this.filteredToDoListe = this.originalToDoListe.slice();
      } else {
        const searchResult = this.originalToDoListe.filter(ToDoList =>
          ToDoList.aufgabentitel.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        if (searchResult.length === 0) {
          alert('Keine Aufgaben mit diesem Titel gefunden.');
        }

        this.filteredToDoListe = searchResult;
      }

      this.isSearching = true;
      this.renderCalendar();
    },
    renderCalendar() {
      const calendarEl = document.getElementById('calendar');

      if (this.calendar) {
        this.calendar.destroy();
      }

      const searchDates = this.filteredToDoListe
        .filter(ToDoList =>
          ToDoList.aufgabentitel.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .map(ToDoList => new Date(ToDoList.datum).toISOString().split('T')[0]);

      const initialDate = searchDates.length > 0 ? new Date(searchDates[0]) : new Date();

      this.calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        initialDate: initialDate,
        dateIncrement: { months: 1 }, // Oder verwenden Sie { weeks: 1 } für eine wöchentliche Navigation
        events: this.filteredToDoListe.map(ToDoList => ({
          title: ToDoList.aufgabentitel,
          date: new Date(ToDoList.datum).toISOString().split('T')[0],
          classNames: this.getPriorityClassNames(ToDoList.dringlichkeit)
        })),
        locale: deLocale,
        eventTimeFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: true, meridiem: false }
      });

      this.calendar.render();
    },

    getPriorityClassNames(priority) {
      if (priority === 'HOCH') {
        return 'high-priority-event';
      } else if (priority === 'MITTEL') {
        return 'medium-priority-event';
      } else if (priority === 'NIEDRIG') {
        return 'low-priority-event';
      }

      return '';
    },

    setSelectedToDoList(id) {
      this.selectedAufgabentitel = id;
    }
  }
};
</script>
