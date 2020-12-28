export function postData(url = "", data = {}) {
  const response = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.then((res) => res.json());
}

export async function postDataToken(url = "", data = {}, token) {
  let form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }

  for (var p of form) {
    console.log(p);
  }

  const req = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Token ${token}`,
    },
    body: form,
  };
  console.log(data);
  console.log(req.body);
  const response = fetch(url, req);

  return response.then((res) => res.json());
}

export function postDataToken2(url = "", data = {}) {
  const response = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  return response.then((res) => res.json());
}
