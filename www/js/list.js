const listHtml = `
<div class="row justify-content-center m-3">
    <div class="col-12 col-md-6 bg-warning rounded m-3 p-5 text-center">
        <b>__sujet__</b>
    </div>
</div>
`;

const titleHtml = `
<h1 class="text-center mt-3">Top de __title__ <button onclick="deleteTop()">🗑</button></h1>
`
const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const fetchApiDone = (json) => {
  const divList = document.getElementById("list");
  console.log(json)
  if(!json) {
    alert('Erreur\n aucun top correspondant n\'a été trouvé');
  }
  const newTitle = titleHtml.replace('__title__', json.title);
  divList.appendChild(htmlToElement(newTitle));
  json.sujets.forEach((sujet, i) => {
    const newDivList = listHtml
      .replace("__sujet__", (i + 1) + '. ' + sujet);

    divList.appendChild(htmlToElement(newDivList));
  });
};

const fetchApiLists = () => {
  const lists = JSON.parse(window.localStorage.getItem('lists'));
  const queryString = new URLSearchParams(window.location.search);
  const listId = queryString.get('id');
  console.log(listId)

  fetchApiDone(lists.find(l => l.title = listId));
};

function deleteTop() {
  const lists = JSON.parse(window.localStorage.getItem('lists'));
  const queryString = new URLSearchParams(window.location.search);
  const listId = queryString.get('id');

  const newTops = lists.filter(l => l.title !== listId);
  window.localStorage.setItem('lists',JSON.stringify(newTops));
  window.location = 'index.html';
}

if ("cordova" in window) {
  document.addEventListener("deviceready", fetchApiLists);
} else {
  document.addEventListener("DOMContentLoaded", fetchApiLists);
}
