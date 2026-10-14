// Navigate home (if needed) and smooth-scroll to a section by id.
export const scrollToSection = (navigate, pathname, id) => {
  const scroll = () => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (pathname !== "/") {
    navigate("/");
    setTimeout(scroll, 80);
  } else {
    scroll();
  }
};
