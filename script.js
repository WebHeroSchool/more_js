setTimeout(() => {
  let preloader = document.querySelector('.preloader');
  preloader.classList.add('visible');
  let body = document.body;
  let getName = () => {
    let url_1 = window.location.toString();
    let user = url_1.split('=');
    let name = user[1];
    if (name == undefined) {
      name = 'Anastasija779';
    }
    return name;
  }
  let url = `https://api.github.com/users/${getName()}`;
  let date = new Date();
  let getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject("Error date!"), 1500)
    });
  let getUrl = new Promise((resolve, reject) => {
    setTimeout(() => url ? resolve(url) : reject("Error URL!"), 1500)
  });

Promise.all([getUrl, getDate])
  .then(([url, date]) => fetch(url))
  .then(res => res.json())
  .then(json => {
    let avatar = new Image();
    avatar.src = json.avatar_url;
    body.append(avatar);
    avatar.classList.add('image');
    let name = document.createElement('a');
    if (json.name != null) {
      name.innerHTML = json.name;
    } else {
      name.innerHTML = 'Пользователь не найден';
    }
    body.append(name);
    name.href = json.html_url;
    name.title = json.login;
    name.innerText = json.login;
    name.classList.add('link');
    let bio = document.createElement('p');
    if (json.bio != null) {
      bio.innerHTML = json.bio;
    } else {
      bio.innerHTML = 'Пользователь не найден';
    }
    body.append(bio);
    bio.classList.add('bio');
    body.append(date);
    date.classList.add('date');
  })
  .catch(err => alert('Информация о пользователе недоступна'));
}, 3000)
