export async function fetchEmails(page = 1) {
  const response = await fetch(
    `https://flipkart-email-mock.vercel.app/?page=${page}`
  );
  const data = await response.json();
  return data.list;
}

export async function fetchEmailDetails(id) {
  const response = await fetch(
    `https://flipkart-email-mock.vercel.app/?id=${id}`
  );
  const data = await response.json();
  return data;
}
