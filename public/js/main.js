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

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    let calendar = new Calendar(calendarEl, {
        plugins: [timeGridPlugin, dayGridPlugin],
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        defaultView: 'timeGridWeek',
        height: parent,
        contentHeight: 600,
        // eventClick: editEvent,
        selectable: true,
        // editable: true,
        eventLimit: false,
        allDaySlot: false,
        minTime: "08:00:00",
        maxTime: "19:00:00"
    });

    calendar.render();

    getEvents().then(eventData => {
        return calendar.addEventSource(eventData)
    })

    $('#datepicker').datepicker({
        //set options here
        onSelect: (dateText, inst) => {
            $("input[name='date']").val(dateText)
        }
    });

    $('#timepicker').timepicker({
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




















// var config = {
//     apiKey: "AIzaSyBic7VK4KiZZ_BWLk5myzYOm2QYFZp5PLU",
//     authDomain: "qbs-calendar.firebaseapp.com",
//     databaseURL: "https://qbs-calendar.firebaseio.com",
//     projectId: "qbs-calendar",
//     storageBucket: "qbs-calendar.appspot.com",
//     messagingSenderId: "734877053083"
// };
// firebase.initializeApp(config);
// var database = firebase.database();

// var getEvents = database.ref('Events').once('value').then(function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//         var eventData = childSnapshot.val();

//         $('#calendar').fullCalendar('addEventSource', {
//             events: [eventData]
//         });

//     });
// });

// var getClientInfo = database.ref('Clients').once('value').then(function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//         childKey = childSnapshot.key;
//         var clientData = childKey;
//         var clientHours = childSnapshot.val();
//         if (clientData !== "NA") {
//             $("#clientSelect").append("<option>" + clientData + "</option>");
//             $(".table").append("<tr id=\"newName\"> <th scope=\"row\">" + clientData + "</th><td id=\"Sup\">" + clientHours.Current_Done.June.Sup + "</td><td id=\"Ind\">" + clientHours.Current_Done.June.PE + "</td><td id=\"PE\">" + clientHours.Current_Done.June.Ind + "</td></tr>");
//         }
//     });
// });

// // var onMonth= $(".fc-toolbar > .fc-left > h2").text;
// // console.log(onMonth);

// var addEvent = function () {
//     openModal();}
//     var dateStr;
//     var month;
//     var check;
//     var period;
//     var sessionLength;
//     var start;
//     var startObject;
//     var end;
//     var endObject;
//     var startHour;
//     var startMin;
//     var sessionCode;
//     var clientSession;

//     $("#submit").on('click', function () {
//         dateStr = $("#datepicker").val();
//         period = $("#timePeriodSelect").val();
//         sessionLength = $("#timeDurationSelect").val();
//         startHour;
//         check = moment(dateStr, 'YYYY-MM-DD');
//         month = check.format('MMMM');

//         if (period == "AM") {
//             startHour = $("." + ($("#timeHourSelect").val()) + "period").data("am");
//         } else if (period == "PM") {
//             startHour = $("." + ($("#timeHourSelect").val()) + "period").data("pm");
//         }
//         startMin = $("#timeMinuteSelect").val();
//         sessionCode = $("#codeSelect").val();
//         clientSession = $("#clientSelect").val();
//         start = (startHour + ":" + startMin);
//         startObject = (dateStr + " " + start);
//         end = moment(start, 'HH:mm').add(sessionLength, 'h').format('HH:mm');
//         endObject = (dateStr + " " + end);

//         if (clientSession == 'NA') {
//             database.ref().child('/Clients/' + clientSession + '/Current_Done/June/' + sessionCode + "/").once("value", function (snapshot) {
//                 var hours = snapshot.val();
//                 var newClientHours = (hours - sessionLength);
//                 database.ref('/Clients/' + clientSession + '/Current_Done/June/' + sessionCode + "/").set(newClientHours);
//             });

//             var eventKey = database.ref().child('/Events/').push().key;

//             database.ref('/Events/' + eventKey + '/id/').set(eventKey);
//             database.ref('/Events/' + eventKey + '/start/').set(startObject);
//             database.ref('/Events/' + eventKey + '/end/').set(endObject);
//             database.ref('/Events/' + eventKey + '/title/').set("Clinic Development");
//             setTimeout(function update() {
//                 location.reload();
//             }, 1000);
//         } else {
//             database.ref().child('/Clients/' + clientSession + '/Current_Done/June/' + sessionCode + "/").once("value", function (snapshot) {
//                 var hours = snapshot.val();
//                 var newClientHours = (hours - sessionLength);
//                 database.ref('/Clients/' + clientSession + '/Current_Done/June/' + sessionCode + "/").set(newClientHours);
//             });

//             var eventKey = database.ref().child('/Events/').push().key;

//             database.ref('/Events/' + eventKey + '/id/').set(eventKey);
//             database.ref('/Events/' + eventKey + '/start/').set(startObject);
//             database.ref('/Events/' + eventKey + '/end/').set(endObject);
//             database.ref('/Events/' + eventKey + '/title/').set(sessionCode + " for " + clientSession);
//             setTimeout(function update() {
//                 location.reload();
//             }, 1000);
//         }

//         event.preventDefault()

// });

// var editEvent = function (calEvent) {
//     console.log(calEvent.title);
//     var title = calEvent.title;
//     var sessionInfo = title.split(" ");
//     var clientSession = sessionInfo[2];
//     var sessionCode = sessionInfo[0];
//     var end = moment(calEvent.source.rawEventDefs[0].end);
//     var start = moment(calEvent.source.rawEventDefs[0].start);
//     var Duration = (end - start);
//     var sessionLength = moment.duration(Duration).asHours();
//     var Delete = confirm("Delete this event?");

//     if (Delete == true) {
//         database.ref().child('/Clients/' + clientSession + '/Current_Done/June/' + sessionCode + "/").once("value", function (snapshot) {
//             var hours = snapshot.val();
//             var newClientHours = (hours + sessionLength);
//             database.ref('/Clients/' + clientSession + '/Current_Done/June/' + sessionCode + "/").set(newClientHours);
//         });
//         database.ref('/Events/' + calEvent.id).remove();
//         setTimeout(function update() {
//             location.reload();
//         }, 1000);
//     } else {
//         alert("Event deletion cancelled.")
//     }
// }

// var openModal = function () {
//     $(".modal").css("display", "block");

//     $("#close").on('click', function () {
//         $(".modal").css("display", "none");
//     });
// }

// $(function datePicker() {
//     $("#datepicker").datepicker();$.datepicker.setDefaults({
//         showOn: "both",
//         buttonImageOnly: true,
//         buttonImage: "calendar.gif",
//         buttonText: "Calendar"
//       });
//     // $("#format").on("change", function () {
//     //     $("#datepicker").datepicker("option", "dateFormat", $(this).val());
//     // });
// });

// $(document).ready(function () {
//     $('#calendar').fullCalendar({
//         schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
//         // put your options and callbacks here
//         defaultView: 'agendaWeek',
//         contentHeight: 600,
//         eventClick: editEvent,
//         selectable: true,
//         // editable: true,
//         eventLimit: false,
//         allDaySlot: false,
//         minTime: "08:00:00",
//         maxTime: "20:00:00",
//         footer: {
//             center: 'addEventButton'
//         },
//         header: {
//             center: 'month, agendaWeek, agendaDay',
//             right: 'prev, next'
//         },
//         customButtons: {
//             addEventButton: {
//                 text: 'Add Event',
//                 // click: addEvent,
//                 click: openModal,
//             }
//         },
//     });
// });