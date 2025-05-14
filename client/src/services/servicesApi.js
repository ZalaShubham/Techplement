//DELETE QUOTE LOGIG
async function deleteQuote() {
  const quoteId = new URLSearchParams(window.location.search).get("quote");
  const confirmDelete = confirm("Are you sure you want to delete this quote?");

  if (!confirmDelete) return;
  try {
    const response = await fetch(`/quotes/delete/${quoteId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    console.log("Failed to delete quote! Error:" + error);
    alert("Failed to delete the quote!");
  }
}

async function editQuote() {
  //SETTING UP FRONT END URL PARAMS AND QUERY STRING
  const quoteId = new URLSearchParams(window.location.search).get("quote");
  const optionModal = document.querySelector(".option-modal-wrapper");
  const addQuoteContainer = document.querySelector(".add-quote-wrapper");
  optionModal.style.display = "none";
  addQuoteContainer.style.display = "flex";

  const response = await fetch("quotes/" + quoteId);
  const data = await response.json();
  //form data
  document.querySelector("form #quote").value = data.quote;
  document.querySelector("form #image-url").value = data.imageUrl;
  document.querySelector("form #author").value = data.author;
  document.querySelector("form #category").value = data.category;
  document.querySelector("form #add-quote-btn").textContent = "Save";

  //WHEN EDIT BUTTON CLICKED

  document
    .querySelector(".form-box form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const quoteId = new URLSearchParams(window.location.search).get("quote");

      if (quoteId) {
        const updatedQuote = {
          quote: document.querySelector("form #quote").value,
          imageUrl: document.querySelector("form #image-url").value,
          author: document.querySelector("form #author").value,
          category: document.querySelector("form #category").value,
        };

        const response = await fetch(`/quotes/edit/${quoteId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedQuote),
          credentials: "include",
        });

        if (response.ok) {
          alert("Quote updated successfully!");
          const newUrl = window.location.origin + window.location.pathname;
          history.pushState(null, "", newUrl);
          window.location.reload();
        } else {
          alert("Failed to update quote!");
        }
      }
    });
}

async function follow(userId) {
  try {
    const response = await fetch(`/user/follow/${userId}`, {
      method: "POST",
      credentials: "include",
    });

    const followers = await response.json();
    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    console.log("Failed to follow user! Error:" + error);
    alert("Failed to follow the user!");
  }
}
