const pet = document.getElementById('pet');
const moodSpan = document.getElementById('mood');
const hungerSpan = document.getElementById('hunger');
const energySpan = document.getElementById('energy');

let state = JSON.parse(localStorage.getItem('petState')) || {
    mood: 'Happy',
    hunger: 50,
    energy: 50
  };

const updateUI = () => {
  moodSpan.textContent = state.mood;
  hungerSpan.textContent = state.hunger;
  energySpan.textContent = state.energy;

  const moodColors = {
    Happy: 'lightgreen',
    Hungry: 'orange',
    Tired: 'lightblue',
    Default: 'gray'
  };

  pet.style.backgroundColor = moodColors[state.mood]
  localStorage.setItem('petState', JSON.stringify(state));
};

const updateMood = () => {
    if (state.hunger > 70) {
      state.mood = 'Hungry';
    } else if (state.energy < 30) {
      state.mood = 'Tired';
    } else {
      state.mood = 'Happy';
    }
  };

const modifyState = (hungerDelta, energyDelta) => {
  state.hunger += hungerDelta;
  if (state.hunger < 0) {
    state.hunger = 0;
  }
  if (state.hunger > 100) {
    state.hunger = 100;
  }

  state.energy += energyDelta;
  if (state.energy < 0) {
    state.energy = 0;
  }
  if (state.energy > 100) {
    state.energy = 100;
  }

  updateMood();
  updateUI();
};

document.getElementById('feedButton').addEventListener('click', () => modifyState(-20, 0));
document.getElementById('playButton').addEventListener('click', () => modifyState(10, -10));
document.getElementById('sleepButton').addEventListener('click', () => modifyState(10, 30));

setInterval(() => modifyState(1, -1), 3000);

updateMood();
updateUI();
