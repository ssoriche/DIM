var messenger = document.getElementById("message");
messenger.addEventListener("click", sendCustomEvent, false);

function sendCustomEvent() {
  var greeting = {"greeting" : "hello world"};
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent("addon-message", true, true, greeting);
  document.documentElement.dispatchEvent(event);
}