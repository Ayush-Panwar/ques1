import { fetchEmails } from "./api";
import { getLocalStorage } from "./helpers";
import { renderEmail } from "./renderEmails";
import { state } from "./state";
import "./style.css";

document.addEventListener("DOMContentLoaded", async function () {
  const emails = await fetchEmails();
  const readEmailIds = getLocalStorage("readEmail");
  if (readEmailIds) {
    state.setReadEmail(readEmailIds);
  }

  const favoritesEmailIds = getLocalStorage("favoritesEmail");
  if (favoritesEmailIds) {
    state.setFavoritesEmail(favoritesEmailIds);
  }

  const emailListContainer = document.querySelector("#emailContainer");

  emailListContainer.addEventListener("click", async function (event) {
    if (event.target.matches("#favorite_btn")) {
      if (state.favoritesEmail.includes(event.target.getAttribute("data-id"))) {
        state.removeFavoritesEmail(event.target.getAttribute("data-id"));
        if (state.filter == "favorites") {
          state.setSelectedEmail(null);
        }
      } else {
        state.setFavoritesEmail(event.target.getAttribute("data-id"));
      }

      const markup = await renderEmail(state.emails);

      emailListContainer.innerHTML = "";
      emailListContainer.innerHTML = markup;
    }

    if (event.target.closest(".email")) {
      const targetEmail = event.target.closest(".email");

      state.setSelectedEmail(targetEmail.getAttribute("data-id"));
      state.setReadEmail(targetEmail.getAttribute("data-id"));
      console.log("Check");

      const markup = await renderEmail(state.emails);
      emailListContainer.innerHTML = "";
      emailListContainer.innerHTML = markup;
    }
  });

  const filterContainer = document.getElementById("filterContainer");

  filterContainer.addEventListener("click", async (event) => {
    const filter_buttons = document.querySelectorAll(".filter button");
    filter_buttons.forEach((buttons) => buttons.classList.remove("active"));

    if (event.target.id == "unread") {
      state.setSelectedEmail(null);
      if (state.filter === "unread") {
        state.filter = null;
        event.target.classList.remove("active");
      } else {
        state.filter = "unread";
        event.target.classList.add("active");
      }

      const markup = await renderEmail(state.emails);
      emailListContainer.innerHTML = "";
      emailListContainer.innerHTML = markup;
    }
    if (event.target.id == "read") {
      state.setSelectedEmail(null);
      if (state.filter === "read") {
        state.filter = null;
        event.target.classList.remove("active");
      } else {
        state.filter = "read";
        event.target.classList.add("active");
      }
      const markup = await renderEmail(state.emails);
      emailListContainer.innerHTML = "";
      emailListContainer.innerHTML = markup;
    }
    if (event.target.id == "favorites") {
      state.setSelectedEmail(null);

      if (state.filter === "favorites") {
        state.filter = null;
        event.target.classList.remove("active");
      } else {
        state.filter = "favorites";
        event.target.classList.add("active");
      }

      const markup = await renderEmail(state.emails);
      emailListContainer.innerHTML = "";
      emailListContainer.innerHTML = markup;
    }
  });
  const pagination = document.getElementById("pagination");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const pageIndicator = document.getElementById("pageIndicator");

  async function updateEmails() {
    const emails = await fetchEmails(state.currentPage);
    state.setEmails(emails);
    const markup = await renderEmail(emails);
    emailListContainer.innerHTML = markup;
    pageIndicator.textContent = `Page ${state.currentPage}`;
    prevPageBtn.disabled = state.currentPage === 1;
    nextPageBtn.disabled = state.currentPage === state.totalPages;
  }

  prevPageBtn.addEventListener("click", async () => {
    console.log(state);
    if (state.currentPage > 1) {
      state.setCurrentPage(state.currentPage - 1);
      state.setSelectedEmail(null);
      await updateEmails();
    }
  });

  nextPageBtn.addEventListener("click", async () => {
    console.log(state);
    if (state.currentPage < state.totalPages) {
      state.setCurrentPage(state.currentPage + 1);
      state.setSelectedEmail(null);

      await updateEmails();
    }
  });
  await updateEmails();
});
