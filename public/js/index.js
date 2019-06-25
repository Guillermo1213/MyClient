var mySidebar = document.getElementById('mySidebar');
var clientModal = document.getElementById('clientModal');
var eventModal = document.getElementById('eventModal');

function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
  } else {
    mySidebar.style.display = 'block';
  }
}

function w3_close() {
  mySidebar.style.display = 'none';
}

function openEventModal() {
  if (eventModal.style.display === 'block') {
    eventModal.style.display = 'none';
  } else {
    eventModal.style.display = 'block';
  }
}

function closeEventModal() {
  eventModal.style.display = 'none';
}

function openClientModal() {
  if (clientModal.style.display === 'block') {
    clientModal.style.display = 'none';
  } else {
    clientModal.style.display = 'block';
  }
}

function closeClientModal() {
  clientModal.style.display = 'none';
}

function tabs() {
  document.getElementsByClassName('tablink')[0].click();
}

function openClient(evt, clientName) {
  var i, x, tablinks;
  x = document.getElementsByClassName('client');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablink');
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove('w3-light-grey');
  }
  document.getElementById(clientName).style.display = 'block';
  evt.currentTarget.classList.add('w3-light-grey');
}

function checkSize() {
  if ($("#mainDisplay").css("display") == "table") {
    $('#mainDisplay').removeClass('w3-row');
    $('#clientTable').removeClass('w3-col');
    $('#calendar').removeClass('w3-col');
  } else if ($("#mainDisplay").css("display") !== "table") {
    $('#mainDisplay').addClass('w3-row');
    $('#clientTable').addClass('w3-col');
    $('#calendar').addClass('w3-col');
  }
}

$(document).ready(function () {
  checkSize();
  tabs();
  $(window).resize(checkSize);
});