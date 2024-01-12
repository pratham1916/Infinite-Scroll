let container = document.getElementById('container');
let start = 0;
let page = 10;
let flag = false;

async function fetchData() {
    flag = true;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${page}`);
        const posts = await response.json();

        appendData(posts);
        start += page;
    } catch (error) {
        console.error('Error fetching posts:', error);
        flag = false;
    } finally {
        flag = false;
    }
}

function appendData(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
        container.appendChild(postElement);
    });
}

function Scroll() {
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !flag) {
        fetchData();
    }
}

fetchData();
window.addEventListener('scroll', Scroll);