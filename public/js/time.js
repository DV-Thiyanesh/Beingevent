
var eventstext = document.getElementById("yy").innerText ;
var events = JSON.parse(eventstext);
// console.log("eventssssss..",eventstext);
console.log("json pars",JSON.parse(eventstext))
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
	total: t,
	days: days,
	hours: hours,
	minutes: minutes,
	seconds: seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
	var t = getTimeRemaining(endtime);

	daysSpan.innerHTML = t.days;
	hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
	minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
	secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

	if (t.total <= 0) {
	  clearInterval(timeinterval);
	}
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

for(let i=0;i< events.length;i++ ) {
  console.log("i",i);
 
  // if(i !== 2){
	let id= "clockdiv"+i;
  let deadline = new Date(events[i].eventStartDate);
  console.log('data is here',events[i].eventStartDate)
  initializeClock(id, deadline)
  console.log("id",id,deadline);
// }
}



