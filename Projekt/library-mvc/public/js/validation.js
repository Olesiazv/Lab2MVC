document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("[data-validate]");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      const invalid = form.querySelector(":invalid");
      if (invalid) {
        event.preventDefault();
        invalid.focus();
      }
    });
  });
});
