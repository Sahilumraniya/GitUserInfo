const username = document.getElementById("username");
const errorp = document.getElementById("error");
const show = document.getElementById("show");

window.onload = function () {
  console.log("loaded");
  errorp.style.display = "none";
  document.getElementById("form").onsubmit = function (e) {
    let uname = username.value;
    uname = uname.trim();
    uname = uname.toLowerCase();
    uname = uname.replace(/ /g, "");
    const xhr = new XMLHttpRequest();
    try {
      xhr.open("GET", "https://api.github.com/users/" + uname);
      xhr.send();
      xhr.onreadystatechange = () => {
        // console.log(xhr.readyState);
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
          const data = JSON.parse(xhr.responseText);
          console.log(data);
          errorp.style.display = "none";
          show.innerHTML = "";
          show.innerHTML = `
            <div
            class="container md:w-[50%] w-[90vw] text-white md:p-8 p-4 bg-black bg-opacity-90 opacity-100 rounded-lg overflow-hidden"
          >
            <div class="flex gap-x-10 my-7">
              <img
                class="w-20 h-20"
                src="${data.avatar_url}"
                alt="GitHub Avatar"
                class="rounded-full"
                id="user-avatar"
              />
              <h2
                class="text-2xl flex justify-center items-center font-semibold"
                id="user-name"
              >
                ${data.name ? data.name : data.login }
              </h2>
            </div>
            <div class="flex flex-col gap-y-3">
              <div class="flex">
                <p>User Followers :</p>
                <p
                  id="user-followers"
                  class="mx-2 w-fit bg-white px-3 rounded-md text-black"
                >
                  ${data.followers}
                </p>
              </div>
              <div class="flex">
                <p>User Following :</p>
                <p
                  id="user-following"
                  class="mx-2 w-fit bg-white px-3 rounded-md text-black"
                >
                  ${data.following}
                </p>
              </div>
              <div class="flex flex-row flex-wrap">
                <p class="my-2 justify-items-center">Public URL :</p>
                <p
                  id="user-public-repos"
                  class="cursor-pointer md:mx-5 md:w-fit block bg-white md:p-2 p-1 rounded-md text-blue-600 underline"
                >
                  ${data.html_url}
                </p>
              </div>
              <div class="flex">
                <p>Public Repos :</p>
                <p class="mx-2 w-fit bg-white px-3 rounded-md text-black">${data.public_repos}</p>
              </div>
            </div>
          </div>
            `;
        } else if (xhr.readyState == 4 && xhr.status == 404) {
          errorp.innerHTML = "User not found";
          errorp.style.display = "block";
          console.log("User not found");
        } else {
          console.log("Error");
        }
      };
    } catch (err) {
      console.log(err);
    }

    // You must return false to prevent the default form behavior
    // e.preventDefault(); or
    return false;
  };
};
