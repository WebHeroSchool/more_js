let body = document.body;
let url = window.location.toString();
let preloader = document.querySelector('.preloader');
setTimeout(function() {
  preloader.classList.add('visible');
}, 2000);

let getNameFromUrl = (url) => {
  let url2 = url.split('=');
  let name = url2[1];
  if (name == undefined) {
    name = 'Anastasija779';
  }
  let url1 = 'https://api.github.com/users/'+ name;
  return url1;
}

let getUrl = getNameFromUrl(url);

let getName = new Promise((resolve, reject) => {
  setTimeout(() => getUrl ? resolve(getUrl) : reject('Имя не найдено'), 2000);
});

let now = new Date();
let getDate = new Promise((resolve, reject) => {
  setTimeout(() => now ? resolve(now) : reject('Дата не обнаружена'), 2000);
});

Promise.all([getName, getDate])
  .then(([getUrl, now]) => fetch(getUrl))
  .then(res => res.json())
  .then(json => {
    console.log(json.avatar_url);
    console.log(json.name);
    console.log(json.bio);
    console.log(json.html_url);
    let avatar = new Image();
    avatar.src = json.avatar_url;
    body.append(avatar);
    avatar.classList.add('image');
    let name = document.createElement('h2');
    if (json.name != null) {
      name.innerHTML = json.name;
    } else {
      name.innerHTML = 'Пользователь не найден';
    }
    body.append(name);
    name.addEventListener("click", () => window.location = json.html_url);
    name.classList.add('link');
    let bio = document.createElement('h2');
    if (json.bio != null) {
      bio.innerHTML = json.bio;
    } else {
      bio.innerHTML = 'Пользователь не найден';
    }
    body.append(bio);
    bio.classList.add('bio');
    let date = document.createElement('p');
    date.innerHTML = now;
    document.body.append(date);
    date.classList.add('date');
  })
.catch(err => alert('Информация о пользователе недоступна'));
