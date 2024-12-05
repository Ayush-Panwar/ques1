import { setLocalStorage } from "./helpers";

export const state = {
  emails: [],
  filter: null,
  selectedEmail: null,
  favoritesEmail: [],
  readEmail: [],
  currentPage: 1, // Current page for pagination
  totalPages: 2,
  setEmails(emails) {
    this.emails = emails;
  },
  setSelectedEmail(emailId) {
    this.selectedEmail = emailId;
  },
  setFavoritesEmail(email) {
    if (Array.isArray(email)) {
      this.favoritesEmail.push(...email);
    } else {
      this.favoritesEmail.push(email);
    }
    setLocalStorage("favoritesEmail", this.favoritesEmail);
  },
  removeFavoritesEmail(emailId) {
    this.favoritesEmail = this.favoritesEmail.filter(
      (email) => email !== emailId
    );
    setLocalStorage("favoritesEmail", this.favoritesEmail);
  },
  setReadEmail(email) {
    if (!this.readEmail.includes(email)) {
      if (Array.isArray(email)) {
        this.readEmail.push(...email);
      } else {
        this.readEmail.push(email);
      }
      setLocalStorage("readEmail", this.readEmail);
    }
  },
  setEmails(emails) {
    this.emails = emails;
  },
  setCurrentPage(page) {
    this.currentPage = page;
  },
};
