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
import 'w3-css/w3.css'
import '../css/animate.css'
import '../css/app-landing.css'
import '../css/bootstrap.css'
import '../css/calendar.css'
import '../css/colors.css'
import '../css/custom.css'
import '../css/dark.css'
// import '../css/font-icons.css'
import '../css/fonts.css'
import '../css/intro-fonts.css'
import '../css/magnific-popup.css'
import '../css/responsive.css'
import '../css/style2.css'
import '../css/swiper.css'





async function getEvents() {
    try {
        const res = await axios
            .get('/event/view');
        var eventData = (res.data);
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
        $('#event_id_input').attr('value', event.event.id)
        $('#event_duration_input').attr('value', event.event.extendedProps.duration)
        $('#event_client_name_input').attr('value', event.event.extendedProps.client)
        $('#event_code_input').attr('value', event.event.extendedProps.code)
        $('#event_billing_month_input').attr('value', event.event.extendedProps.billing_month)
    }
}

function editClient() {

    openEditClientModal()
    var client = $('.selected').data('name')
    var ogSup = $('#' + client + 'supTd').data('original')
    var ogPe = $('#' + client + 'peTd').data('original')
    var ogInd = $('#' + client + 'indTd').data('original')
    var supValue = $('#' + client + 'supValue').val()
    var peValue = $('#' + client + 'peValue').val()
    var indValue = $('#' + client + 'indValue').val()
    var hours = {
        sup: supValue,
        pe: peValue,
        ind: indValue,
        client: client,
        ogSup: ogSup,
        ogPe: ogPe,
        ogInd: ogInd,
    }

    axios.post('/client/edit', hours)
    .then(location.reload())

}

$('#updateDiv').on('click', '#editClient', editClient)

// document.addEventListener('DOMContentLoaded', function () {

//     var calendarEl = document.getElementById('calendar');

//     let calendar = new Calendar(calendarEl, {
//         plugins: [timeGridPlugin, dayGridPlugin],
//         schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
//         defaultView: 'timeGridWeek',
//         height: parent,
//         contentHeight: 500,
//         header: {
//             right: 'prev, next'
//         },
//         eventClick: editEvent,
//         selectable: true,
//         // editable: true,
//         eventLimit: false,
//         allDaySlot: false,
//         minTime: "08:00:00",
//         maxTime: "19:00:00",
//         eventRender: function (info) {
//             var id = info.event.id
//             $(info.el).attr('id', id)
//         }
//     });

//     // calendar.render();

//     getEvents().then(eventData => {
//         return calendar.addEventSource(eventData)
//     })

//     $('#datepicker1').datepicker({
//         //set options here
//         onSelect: (dateText) => {
//             $("input[name='date']").val(dateText)
//         }
//     });

//     $('#datepicker2').datepicker({
//         //set options here
//         onSelect: (dateText) => {
//             $("input[name='date']").val(dateText)
//         }
//     });

//     $('#timepicker1').timepicker({
//         timeFormat: 'h:mm p',
//         interval: 15,
//         minTime: '8:00am',
//         maxTime: '6:00pm',
//         defaultTime: '8',
//         startTime: '8:00',
//         dynamic: true,
//         dropdown: true,
//         scrollbar: true,
//         zindex: 999
//     });

//     $('#timepicker2').timepicker({
//         timeFormat: 'h:mm p',
//         interval: 15,
//         minTime: '8:00am',
//         maxTime: '6:00pm',
//         defaultTime: '8',
//         startTime: '8:00',
//         dynamic: true,
//         dropdown: true,
//         scrollbar: true,
//         zindex: 999
//     });

//     calendar.render();
// })

$(document).ready(function () {
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
        timeZone: 'America/Los_Angeles',
        eventRender: function (info) {
            var id = info.event.id
            $(info.el).attr('id', id)
        }
    });

    // calendar.render();

    getEvents().then(eventData => {
        console.log(eventData)
        calendar.addEventSource(eventData)
        calendar.refetchEvents()
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

    calendar.render();
});