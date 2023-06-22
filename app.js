const accessKey = "9e71239d5159ad550258ff725760635f";
const urlDocument = document.getElementById("url-input");
const submitButton = document.querySelector(".submit-button");
const errorMessage = document.getElementById("error-message");

//Main Funtion
submitButton.addEventListener("click", async function (e) {
  clearError();
  e.preventDefault();
  let url = urlDocument.value;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }
  let finalUrl = `http://api.pdflayer.com/api/convert?access_key=${accessKey}&document_url=${url}&test=1`;
  try {
    //make the api request
    const response = await fetch(finalUrl, {
      method: "POST",
      body: finalUrl,
    });
    // Check if the response is a PDF
    if (response.headers.get("content-type") === "application/pdf") {
      // Generate a unique filename
      const timestamp = Date.now();
      const filename = `converted_${timestamp}.pdf`;

      // Download the PDF file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();

      // Clean up the URL object
      URL.revokeObjectURL(url);
    } else {
      // Handle other types of responses
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    // Handle any errors
    displayerror(error);
    console.log(response.error.info);
  }

  // Clear the input field

  document.getElementById("myForm").reset();
});

function displayerror(message) {
  errorMessage.textContent = message;
}
function clearError() {
  errorMessage.textContent = "";
}
