let forms = document.querySelectorAll(".delete-form");

forms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    let ans = confirm("Are you sure you want to delete this chat?");

    if (!ans) {
      e.preventDefault();
    }
  });
});
