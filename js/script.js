/* Cuisine Slider */

document.querySelectorAll(".slider-wrapper").forEach(wrapper => {

    const track = wrapper.querySelector(".slider-track");
    const prev = wrapper.querySelector(".prev-btn");
    const next = wrapper.querySelector(".next-btn");
    const cards = wrapper.querySelectorAll(".dish-card");

    let index = 0;
    const visibleCards = 4; // Shows 4 at once
    const totalCards = cards.length;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20; // width + gap
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    next.addEventListener("click", () => {
        index++;
        if (index > totalCards - visibleCards) index = 0; // infinite loop
        updateSlider();
    });

    prev.addEventListener("click", () => {
        index--;
        if (index < 0) index = totalCards - visibleCards; // loop backward
        updateSlider();
    });

});
