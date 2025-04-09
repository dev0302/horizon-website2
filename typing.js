class Typewriter {
  constructor(element, text, options = {}) {
    this.element = element;
    this.text = text;
    this.options = {
      typingSpeed: 100,
      deletingSpeed: 50,
      pauseTime: 2000,
      ...options
    };
    this.isDeleting = false;
    this.currentText = '';
    this.currentIndex = 0;
    this.timeout = null;
  }

  type() {
    if (this.isDeleting) {
      this.currentText = this.text.substring(0, this.currentIndex - 1);
      this.currentIndex--;
    } else {
      this.currentText = this.text.substring(0, this.currentIndex + 1);
      this.currentIndex++;
    }

    this.element.textContent = this.currentText.toUpperCase();

    let typingSpeed = this.isDeleting ? this.options.deletingSpeed : this.options.typingSpeed;

    if (!this.isDeleting && this.currentText === this.text) {
      typingSpeed = this.options.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.currentIndex = 0;
    }

    this.timeout = setTimeout(() => this.type(), typingSpeed);
  }

  start() {
    this.type();
  }

  stop() {
    clearTimeout(this.timeout);
  }
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const upcomingEventTitle = document.querySelector('.upcoming-event-title');
  if (upcomingEventTitle) {
    const text = upcomingEventTitle.textContent;
    const typewriter = new Typewriter(upcomingEventTitle, text, {
      typingSpeed: 100,
      deletingSpeed: 50,
      pauseTime: 2000
    });
    typewriter.start();
  }
}); 