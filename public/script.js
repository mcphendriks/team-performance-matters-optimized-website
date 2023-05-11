// Filteren
const difficultyFilter = document.querySelectorAll('[name="difficulty"]');
const urlParams = new URLSearchParams(window.location.search);

if (difficultyFilter) {
  const param = urlParams.get("difficult");
  const active = document.querySelector(
    `[name="difficulty"][value="${param}"]`
  );
  if (active) {
    active.checked = true;
  } else {
    document.querySelector('[name="difficulty"][value="all"]').checked = true;
  }
  difficultyFilter.forEach((filter) => {
    filter.addEventListener("change", (event) => {
      let value = filter.value == "true" ? true : false;
      if (filter.value == "all") {
        value = "all";
      }
      setParameters("difficult", value);
    });
  });
}

const setParameters = (query, value) => {
  urlParams.set(query, value);
  window.location.search = urlParams;
};

// Skeleton
window.addEventListener("load", function () {
  // simulate content loading delay
  setTimeout(function () {
    const skeleton = document.querySelector(".skeleton");
    const skeletonText = document.querySelector(".skeleton-text");
  }, 2000);

  // show skeleton layout and hide content
  document.querySelector(".skeleton").classList.toggle("hidden");
  document.querySelector(".skeleton-text").classList.toggle("hidden");
});

// DROP DOWN FILTER MENUH

document.addEventListener("DOMContentLoaded", () => {
  const dropButton = document.querySelector(".filter-btn");
  const dropContent = document.querySelector(".drop-list");

  dropButton.addEventListener("click", () => {
    dropContent.classList.toggle("show");
  });
});
