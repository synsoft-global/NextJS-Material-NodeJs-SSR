export function scrollToSection(element) {
  const section = typeof element == 'string' ?  document.querySelector(element) : element
  const isHeroSection = section.classList.contains('hero-section')
  section?.scrollIntoView({behavior: 'smooth', block: isHeroSection? 'end' : 'start'})
}
