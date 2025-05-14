function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minut: 60,
  };
  for (const key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}

// QUOTE UI MODAL OPEN CLOSE LOGIC
const addQuoteContainer = document.querySelector(".add-quote-wrapper");
const sidebarCreate = document.querySelectorAll("#create");
const closeBtns = document.querySelectorAll("#close-btn");
const optionModal = document.querySelector(".option-modal-wrapper");

if (window.innerWidth > 600) {
  sidebarCreate[0].addEventListener("click", () => {
    addQuoteContainer.style.display = "flex";
  });
} else {
  sidebarCreate[1].addEventListener("click", () => {
    addQuoteContainer.style.display = "flex";
  });
}

closeBtns.forEach((closeBtn) =>
  closeBtn.addEventListener("click", () => {
    addQuoteContainer.style.display = "none";
    optionModal.style.display = "none";
    const newUrl = window.location.origin + window.location.pathname;
    history.pushState(null, "", newUrl);
    window.location.reload();
  })
);

// QUOTE OPTION BTN LOGIC
function handleOptionModal(quoteId) {
  optionModal.style.display = "flex";

  const params = new URLSearchParams(window.location.search);
  params.set("quote", quoteId);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
}

//QUOTE CREATED AT DATE FORMATED
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#quote-createdAt").forEach((element) => {
    const timeString = element.getAttribute("createdAt");
    element.textContent = timeAgo(timeString);
  });
});
