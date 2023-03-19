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


/*

// IF POST
body: JSON.stringify(options), // body data type must match "Content-Type" header

method: "get",
mode: "no-cors", // no-cors, *cors, same-origin
cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
credentials: "same-origin", // include, *same-origin, omit
headers: {
  "Content-Type": "application/json",
  // 'Content-Type': 'application/x-www-form-urlencoded',
},
redirect: "follow", // manual, *follow, error
referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

*/

export { loadMembers, renderMembers };
