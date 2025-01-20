// Create a map to store audio elements
const audioMap = new Map();

// Load all audio files from the sections
document.querySelectorAll('section').forEach(section => {
  const audioSrc = section.getAttribute('data-audio');
  const audio = new Audio(audioSrc);
  audio.loop = true;  // Enable looping for smoother transitions
  audio.volume = 0;   // Start with volume at 0
  audioMap.set(section.id, audio);
});

// Function to fade in audio
function fadeIn(audio) {
  let volume = 0;
  audio.volume = volume;
  audio.play();

  const fadeInInterval = setInterval(() => {
    if (volume < 1) {
      volume += 0.05;
      audio.volume = volume;
    } else {
      clearInterval(fadeInInterval);
    }
  }, 100);
}

// Function to fade out audio
function fadeOut(audio) {
  let volume = audio.volume;

  const fadeOutInterval = setInterval(() => {
    if (volume > 0) {
      volume -= 0.05;
      audio.volume = volume;
    } else {
      audio.pause();
      clearInterval(fadeOutInterval);
    }
  }, 100);
}

// Function to start the experience
function startExperience() {
  document.getElementById('start-button').style.display = 'none'; // Hide the button

  // Create the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const audio = audioMap.get(entry.target.id);

      if (entry.isIntersecting) {
        // Fade in the audio for the visible section
        fadeIn(audio);

        // Fade out all other audio
        audioMap.forEach((otherAudio, key) => {
          if (key !== entry.target.id) {
            fadeOut(otherAudio);
          }
        });
      }
    });
  }, { threshold: 0.5 });

  // Observe each section
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}



