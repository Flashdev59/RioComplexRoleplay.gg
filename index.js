
  var audio;
 var firstPlayed = false;
 var lastVolume = 0;
 var upSound = 0.02;
 var downSound = 0.02;
 $(document).ready(function() {
   audio = $("audio").get(0);
 });
 $("video").on("ended", function() {
   this.load();
   this.play();
 });
 $("audio").on("ended", function() {
   this.load();
   this.play();
 });
 document.addEventListener("keypress", event => {
   //console.log(event);
   if (!event) return;
   var keyP = event.key.toLowerCase();
   var cod = event.keyCode;
   if (keyP == "p") {
     //p
     if (audio.paused) return audio.play();
     else return audio.pause();
   }
   if (keyP == "w" && audio.volume + upSound <= 1)
     //w
     return (audio.volume += upSound);
   else if (keyP == "w" && audio.volume + upSound >= 1)
     return (audio.volume = 1);
   else if (keyP == "s" && audio.volume - upSound >= 0)
     //s
     return (audio.volume -= upSound);
   else if (keyP == "s" && audio.volume - upSound <= 0)
     return (audio.volume = 0);
   else if (keyP == "a")
     //a
     return (audio.currentTime -= 3);
   else if (keyP == "d")
     //d
     return (audio.currentTime += 3);
 });
 function audioVolumeIn(q) {
   if (q.volume || q.volume == 0) {
     var InT = 0;
     var setVolume = firstPlayed ? lastVolume : 0.3; // Target volume level for new song
     var speed = 0.01; // Rate of increase
     q.volume = InT;
     var eAudio = setInterval(function() {
       InT += speed;
       q.volume = InT.toFixed(1);
       if (InT.toFixed(1) >= setVolume) {
         clearInterval(eAudio);
         //alert('clearInterval eAudio'+ InT.toFixed(1));
       }
     }, 25);
   }
 }

 function audioVolumeOut(q) {
   lastVolume = q.volume;
   if (q.volume || q.volume == 0) {
     var InT = q.volume;
     var setVolume = 0; // Target volume level for old song
     var speed = 0.002; // Rate of volume decrease
     q.volume = InT;
     var fAudio = setInterval(function() {
       InT -= speed;
       q.volume = InT.toFixed(1);
       if (InT.toFixed(1) <= setVolume) {
         clearInterval(fAudio);
         //alert('clearInterval fAudio'+ InT.toFixed(1));
       }
     }, 25);
    }
}