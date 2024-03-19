const people = []

document.querySelector(".search").addEventListener('click', function () {
  const search =document.querySelector("#search-query").value;

  fetchInfo(search);
  document.querySelector('#search-query').value = '';
});

const fetchInfo = function (search) {
  const url = 'https://api.github.com/repos/facebook/react/commits/' + search;
  fetch(url, {
    method: 'GET',
    datatype: 'json',
  })
    .then(data => data.json())
    .then(data => addPictures(data));
};

const addPictures = function (data) {
  const personData = {
    login: data.author.login || null,
    avatar_url: data.author.avatar_url || null
  }
  people.push(personData);
  renderPage();
}

const renderPage = function () {
  document.querySelector('.people').replaceChildren();

  for (let i = 0; i < people.length; i++) {
    const person = people[i];

    const template = `
    <div class="col-md-4">
      <div class="person">
        <h4>Login: ${person.login}</h4>
        <img src=${person.avatar_url} class=class="img-thumbnail">
      </div>
    </div>`;

    document.querySelector(".people").insertAdjacentHTML("beforeend", template);
  }
};

renderPage();