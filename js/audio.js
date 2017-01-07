$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'http://darshanwashimkar.github.io/audio/darshan.mp3');                    
    
    $('#name-audio').click(function() {
        audioElement.play();
    });        
});