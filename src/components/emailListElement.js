import { formatDate } from "../helpers";
import { state } from "../state";
import "./styles.css";
export function emailListElement(email, shrink) {
  return `<li 
  class="email ${state.readEmail.includes(email.id) ? "read" : ""} ${
    state.selectedEmail === email.id ? "selected" : ""
  }" data-id="${email.id}">
      <div class="image">${email.from.name
        .split("")[0]
        .toLocaleUpperCase()}</div>
      <div class="emailDetails">
       <div> From: <span>${email.from.email}</span></div>
        <div>Subject: <span> ${email.subject}</span></div>
       <p> ${
         shrink
           ? `${email.short_description.slice(0, 36)}...`
           : email.short_description
       } </p>
      
<div class="dateFavoriteContainer">
<p> ${formatDate(email.date)}</p>
${state.favoritesEmail.includes(email.id) ? "<span> Favorite</span>" : ""}
</div>
     
      </div>
    </li>`;
}
