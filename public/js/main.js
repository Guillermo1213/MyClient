import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'jquery-timepicker/jquery.timepicker.js'
import 'jquery-timepicker/jquery.timepicker.css'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '../css/main.css'
import axios from 'axios'
var eventData;

async function getEvents() {
    try {
        const res = await axios
            .get('/event/view');
        eventData = (res.data);
        return eventData;
    }
    catch (err) {
        return console.log(err);
    }
}

function editEvent(event) {
    if (eventEditModal.style.display === 'block') {
        eventEditModal.style.display = 'none';
      } else {
        eventEditModal.style.display = 'block';
      }
    console.log(event.event.id)
}

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    let calendar = new Calendar(calendarEl, {
        plugins: [timeGridPlugin, dayGridPlugin],
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        defaultView: 'timeGridWeek',
        height: parent,
        contentHeight: 500,
        header: {
            right: 'prev, next'
        },
        eventClick: editEvent,
        selectable: true,
        // editable: true,
        eventLimit: false,
        allDaySlot: false,
        minTime: "08:00:00",
        maxTime: "19:00:00",
        eventRender: function(info){
            var id = info.event.id
            $(info.el).attr('id', id)
        }
    });

    calendar.render();

    getEvents().then(eventData => {
        return calendar.addEventSource(eventData)
    })

    $('#datepicker1').datepicker({
        //set options here
        onSelect: (dateText) => {
            $("input[name='date']").val(dateText)
        }
    });

    $('#datepicker2').datepicker({
        //set options here
        onSelect: (dateText) => {
            $("input[name='date']").val(dateText)
        }
    });

    $('#timepicker1').timepicker({
        timeFormat: 'h:mm p',
        interval: 15,
        minTime: '8:00am',
        maxTime: '6:00pm',
        defaultTime: '8',
        startTime: '8:00',
        dynamic: true,
        dropdown: true,
        scrollbar: true,
        zindex: 999
    });

    $('#timepicker2').timepicker({
        timeFormat: 'h:mm p',
        interval: 15,
        minTime: '8:00am',
        maxTime: '6:00pm',
        defaultTime: '8',
        startTime: '8:00',
        dynamic: true,
        dropdown: true,
        scrollbar: true,
        zindex: 999
    });
})