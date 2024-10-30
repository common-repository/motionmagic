

AOS.init({
  duration: objeto.duration,
  easing: objeto.ease,
  once:objeto.once, 
}); 
setTimeout(() => {
  AOS.refresh();
}, 500);
 
const elements = document.querySelectorAll(".kocka");

elements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.style.transitionDuration = "700ms";
    element.style.transitionDelay = "0ms";
  });

});
