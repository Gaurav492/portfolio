const container = document.querySelector(".blogs_container");
const yearSpan = document.querySelector(".year span");
const burger_container = document.querySelector(".burger_container");
const nav_links_container = document.querySelector(".nav_links_container");

burger_container.addEventListener("click", () => {
  nav_links_container.classList.toggle("active");
  burger_container.classList.toggle("burger_active");
});

async function gql(query, variables = {}) {
  const data = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return data.json();
}

const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "gaurav444") {
            publication {
                posts(page: $page) {
                    coverImage
                    slug
                }
            }
        }
    }
`;

let imgs = [
  "./assets/imgs/DP_reduced.jpg",
  "./assets/imgs/DP_reduced.jpg",
  "./assets/imgs/DP_reduced.jpg",
];

let blogFormate = "";

gql(GET_USER_ARTICLES, { page: 0 }).then((result) => {
  const articles = result.data.user.publication.posts;
  const blog_list = articles.slice(0, 6);

  blog_list.forEach((blog) => {
    // console.log(blog);

    let single_blog = document.createElement("div");
    let blog_img = document.createElement("div");
    let blog_link = document.createElement("div");
    single_blog.className = "single_blog";
    blog_img.className = "blog_img";
    blog_link.className = "blog_link";
    single_blog.appendChild(blog_img);
    single_blog.appendChild(blog_link);
    let img = document.createElement("img");
    let link = document.createElement("a");
    link.className = "links";
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");

    img.src = `${blog.coverImage}`;
    link.innerText = "Read more...";
    link.href = `https://gauravvala.hashnode.dev/${blog.slug}`;

    blog_img.appendChild(img);
    blog_link.appendChild(link);

    container.appendChild(single_blog);
  });
});

let year = new Date();

// yearSpan.innerHTML = `Copyright &copy;${year.getFullYear()}`;
