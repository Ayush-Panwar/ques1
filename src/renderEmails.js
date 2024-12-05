import { emailListElement } from "./components/emailListElement";
import { selectedEmailDetail } from "./components/selectedEmailDetail";
import { state } from "./state";
export const renderEmail = async (emails) => {
  if (emails && !state.filter) {
    state.setEmails(emails);
  }
  if (emails && state.filter == "unread") {
    state.setEmails(emails);
    console.log(state.selectedEmail);
    emails = emails.filter(
      (email) =>
        !state.readEmail.includes(email.id) || email.id === state.selectedEmail
    );
  }
  if (emails && state.filter == "read") {
    state.setEmails(emails);
    emails = emails.filter((email) => state.readEmail.includes(email.id));
  }
  if (emails && state.filter == "favorites") {
    state.setEmails(emails);
    emails = emails.filter((email) => state.favoritesEmail.includes(email.id));
  }

  if (!emails || emails.length === 0) {
    return `
      <div class="no-emails">
        <p>No emails to display.</p>
      </div>
    `;
  }

  if (!state.selectedEmail) {
    return `<ul class="emailListContainer">
${emails.map((email) => `${emailListElement(email)}`).join("\n")}
  </ul>`;
  }
  if (state.selectedEmail) {
    const [selectedEmail] = emails.filter(
      (email) => email.id === state.selectedEmail
    );

    return `<ul class="emailListContainer">
${emails.map((email) => `${emailListElement(email, true)}`).join("\n")}
  </ul>
  ${await selectedEmailDetail(selectedEmail)}</div>`;
  }
};
