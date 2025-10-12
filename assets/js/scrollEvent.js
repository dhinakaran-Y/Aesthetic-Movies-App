const navbarEl = document.getElementById("nav-bar");
const scrollTrigger = 160;

export function scrollEventFn() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollTrigger) {
      navbarEl.classList.replace("bg-black/10", "bg-black/80");
    } else {
      navbarEl.classList.replace("bg-black/80", "bg-black/10");
    }
  });
}