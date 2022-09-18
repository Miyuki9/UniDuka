const sendData = (btn) => {
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const searchResults = document.getElementById("searchResults");
  let match = btn.value.match(/^[a-zA-Z ]*/);
  let match2 = btn.value.match(/\s*/);
  if (match2[0] === btn.value) {
    searchResults.innerHTML = "";
    return;
  }
  if (match[0] === btn.value) {
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "csrf-token": csrf,
      },
      body: JSON.stringify({ payload: btn.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        let payload = data.payload;
        searchResults.innerHTML = "";
        if (payload.length < 1) {
          searchResults.innerHTML = "<p>Sorry. Nothing Found</p>";
          return;
        }
        payload.forEach((item, index) => {
          if (index > 0) searchResults.innerHTML += "<hr>";
          searchResults.innerHTML += `               
          <ul class="custom-scroll">
          <li>
            <div class="product-cart media">
              <img
                src="/${item.frontImageUrl}"
                class="img-fluid blur-up lazyload"
                alt=""
              />
              <div class="media-body">
                <a href="/item?productId=${item._id}">
                  <h6 class="mb-1">${item.title}</h6>
                </a>
                <p class="mb-0 mt-1">$${item.price}</p>
              </div>
            </div>
          </li>
        </ul>`;
        });
      });
    return;
  }
  searchResults.innerHTML = "";
};
