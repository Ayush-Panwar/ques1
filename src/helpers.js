export const formatDate = (emaildate) => {
  const date = new Date(emaildate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedDate = `${day}/${month}/${year} ${hours}:${formattedMinutes} ${period}`;
  return formattedDate;
};

export function setLocalStorage(key, array) {
  if (Array.isArray(array)) {
    localStorage.setItem(key, JSON.stringify(array));
  } else {
    console.error("Provided value is not an array.");
  }
}

export function getLocalStorage(key) {
  const storedValue = localStorage.getItem(key);
  try {
    const parsedValue = JSON.parse(storedValue);
    if (Array.isArray(parsedValue)) {
      return parsedValue;
    } else {
      console.error("Stored value is not an array.");
      return [];
    }
  } catch (e) {
    console.error("Error parsing stored value.", e);
    return [];
  }
}
