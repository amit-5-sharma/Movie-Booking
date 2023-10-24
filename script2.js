var multipleCardCarousel1 = document.querySelector(
  "#carouselExampleControls1"
);
if (window.matchMedia("(min-width: 536px)").matches) {
  var carousel = new bootstrap.Carousel(multipleCardCarousel1, {
    interval: false,
  });
  var carouselWidth1 = $(".carousel-inner")[0].scrollWidth;
  var cardWidth1 = $(".carousel-item").width();
  var scrollPosition1 = 0;
  $("#carouselExampleControls1 .carousel-control-next").on("click", function () {
    if (scrollPosition1 < carouselWidth1 - cardWidth1 * 5) {
      // console.log('next');
      scrollPosition1 += cardWidth1;
      $("#carouselExampleControls1 .carousel-inner").animate(
        { scrollLeft: scrollPosition1 },
        600
      );
    }
  });
  $("#carouselExampleControls1 .carousel-control-prev").on("click", function () {
    if (scrollPosition1 > 0) {
      scrollPosition1 -= cardWidth1;
      $("#carouselExampleControls1 .carousel-inner").animate(
        { scrollLeft: scrollPosition1 },
        600
      );
    }
  });
} else {
  $(multipleCardCarousel1).addClass("slide");
}