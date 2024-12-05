import { fetchEmailDetails } from "../api.js";
import { formatDate } from "../helpers.js";
import { state } from "../state.js";

export async function selectedEmailDetail(selectedEmail) {
  console.log(selectedEmail);
  const emailDetails = await fetchEmailDetails(selectedEmail.id);

  if (emailDetails) {
    selectedEmail.body = emailDetails.body;
    return `
    <div class="selectedEmail">
    <div class="image">${selectedEmail.from.name
      .split("")[0]
      .toLocaleUpperCase()}</div>
      <div class="selectedEmailDetails">

      <div class="subjectFavoritesContainer">
      <span>${selectedEmail.subject}</span>
      <button data-id="${selectedEmail.id}" id="favorite_btn">${
      state.favoritesEmail.includes(selectedEmail.id)
        ? "Remove from favorite"
        : "Mark as favorite"
    }</button>
      </div>
      <p>${formatDate(selectedEmail.date)}</p>
      <p>${selectedEmail.body}</p>
      
    </div>
  `;
  }
}
