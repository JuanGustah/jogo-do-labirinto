export class Timer{
  timerElement;
  startTime;
  elapsedTime;
  minutes;
  seconds;


  constructor(){
    this.timerElement = document.getElementById('timer');
    this.startTime = Date.now();
  }

  updateTimer() {
    this.elapsedTime = Date.now() - this.startTime;
    this.minutes = Math.floor(this.elapsedTime / 60000);
    this.seconds = Math.floor((this.elapsedTime % 60000) / 1000);
    this.timerElement.textContent = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }
}

var time = new Timer();
setTimeout(() => {
  time.updateTimer()
}, 1000);
