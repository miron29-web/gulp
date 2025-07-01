document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slider__slides');
  const slides = document.querySelectorAll('.slider__slide-image');
  const controlsContainer = document.querySelector('.slider__controls');

  let currentIndex = 0;
  const slideCount = slides.length;
  const intervalTime = 10000;
  let interval;

  slides.forEach((_, index) => {
    const btn = document.createElement('span');
    btn.classList.add('slider__controls-btn');
    if(index === 0) btn.classList.add('is-active');
    btn.dataset.slide = index;
    controlsContainer.appendChild(btn);
  });

  const controlsBtn = document.querySelectorAll('.slider__controls-btn');

  function goToSlide(index) {
  const allContents = document.querySelectorAll('.slider__content');
  allContents.forEach(content => content.classList.remove('is-active'));

  setTimeout(() => {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    controlsBtn.forEach(btn => btn.classList.remove('is-active'));
    controlsBtn[index].classList.add('is-active');

    const currentSlide = document.querySelectorAll('.slider__slide')[index];
    const content = currentSlide.querySelector('.slider__content');
    content.classList.add('is-active');

    currentIndex = index;
  }, 600);
}

 controlsBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.slide);
      goToSlide(index);
      resetInterval();
    });
  });

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slideCount;
    goToSlide(nextIndex);
  }

  function startInterval() {
    interval = setInterval(nextSlide, intervalTime);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  // Старт
  startInterval();

});