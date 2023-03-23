async function loadMembers(request) {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "prjctX (https://github.com/sabuein/prjctX)",
    "Accept-Charset": "utf-8",
    "Connection": "keep-alive",
  }

  return await (await fetch(request, {
    method: "get",
    mode: "cors",
    headers: headersList
  }).catch(handleError)).text();
}

const addMember = async (data) => {
  const request = new Request("http://localhost:8888/collectors/add");
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "prjctX (https://github.com/sabuein/prjctX)",
    "Accept-Charset": "utf-8",
    "Connection": "keep-alive",
    "Content-Type": "application/json"
  }
  return await (await fetch(request, {
    method: "post",
    mode: "no-cors",
    headers: headersList,
    body: JSON.stringify(data)
  }).catch(handleError)).text();
}

async function updateMember(request, id) {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "prjctX (https://github.com/sabuein/prjctX)",
    "Accept-Charset": "utf-8",
    "Connection": "keep-alive",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    "name": "Zainab Al-Abdulrahman",
    "email": "zainab.alabdulrahman@example.com",
    "phone": "+966561234567"
  });

  request.url = `${request.url}${id}`

  return await (await fetch(request, {
    method: "put",
    mode: "cors",
    headers: headersList,
    body: bodyContent
  }).catch(handleError)).text();
}

const handleError = (error) => {
  console.warn(error);
  return new Response(
    JSON.stringify({
      code: 400,
      message: "There has been a problem with fetch operation"
    })
  );
}

const renderMembers = (input, output) => {
  const members = JSON.parse(input);
  for (const member of members) {
    const row = document.createElement("tr");
    row.appendChild(document.createElement("th")).textContent = member.id;
    row.appendChild(document.createElement("td")).textContent = member.name;
    row.appendChild(document.createElement("td")).innerHTML = `<a href="mailto:${member.email}">${member.email}</a>`;
    row.appendChild(document.createElement("td")).innerHTML = `<a href="tel:${member.phone}">${member.phone}</a>`;
    row.firstElementChild.setAttribute("scope", "row");
    output.appendChild(row);
  }
  const row = document.createElement("tr");
  const final = document.createElement("td");
  final.setAttribute("colspan", 4);
  final.setAttribute("scope", "row");
  final.textContent = `Our community is made up of ${output.childElementCount} members — and counting...`;
  row.appendChild(final);
  output.appendChild(row);
}

export { loadMembers, addMember, updateMember, renderMembers };