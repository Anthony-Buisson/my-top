const divManga = `
<div class="col-12 col-md-4">
    <a href="list.html?id=__link__" target="_blank">
    <div class="card">
    <div class="card-body">
        <h5 class="card-title">__title__</h5>
    </div>
    </div>
    </a>
</div>
`;

const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const fetchApiDone = (json) => {
  const divList = document.getElementById("list");
  if(!json) {
    return;
  }
  json.forEach((list, i) => {
    const newDivManga = divManga
      .replace("__title__", list.name)
      .replace("__link__", list.name)
    divList.appendChild(htmlToElement(newDivManga));
  });
};

const fetchApiLists = () => {
  const lists = window.localStorage.getItem('list');
  fetchApiDone(JSON.parse(lists));
};

if ("cordova" in window) {
  document.addEventListener("deviceready", fetchApiLists);
} else {
  document.addEventListener("DOMContentLoaded", fetchApiLists);
}
