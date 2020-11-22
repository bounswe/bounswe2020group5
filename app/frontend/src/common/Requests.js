export function postData(url = '', data = {}) {
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return response.then(res => res.json())
}