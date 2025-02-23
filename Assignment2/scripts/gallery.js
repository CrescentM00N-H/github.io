"use strict";

const apiKey = "QYkk0FuAfTAFmL8vM7zPe6KGtFJhwUhsf42YAkZT7Bqbmc7z6Oq7EHvv"
const query = "volunteering"

fetch(`https://api.pexels.com/v1/search?query=${query}`, {
  headers: {
    Authorization: `${apiKey}`
  }
})
    .then(response => response.json())
    .then(images => {
    console.log(images);
    const galleryContainer = document.querySelector('.row');
    const modalContent = document.querySelector('.modal-content');
    let slideIndex = 1;

    images["photos"].forEach((image, index) => {
      // Add images to the gallery
      const column = document.createElement('div');
      column.className = 'column';
      column.innerHTML = `<img src="${image.src["original"]}" onclick="openModal();currentSlide(${index + 1})" class="hover-shadow small-image">`;
      galleryContainer.appendChild(column);

      // Add images to the modal
      const slide = document.createElement('div');
      slide.className = 'mySlides';
      slide.innerHTML = `
        <div class="numbertext">${index + 1} / ${images["photos"].length}</div>
        <img src="${image.src["original"]}" style="width:100%">
      `;
      modalContent.insertBefore(slide, modalContent.querySelector('.prev'));

      // Add thumbnails to the modal
      const thumbnail = document.createElement('div');
      thumbnail.className = 'column';
      thumbnail.innerHTML = `<img class="demo small-image" src="${image.url}" onclick="currentSlide(${index + 1})" alt="${image.alt}">`;
      modalContent.appendChild(thumbnail);
    });

    showSlides(slideIndex);
  })
  .catch(error => console.error('Error loading images:', error));

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}