const accessKey = "9e71239d5159ad550258ff725760635f";
const test = 1;
const urlDocument = document.getElementById("url-input");
const submitButton = document.querySelector(".submit-button");

const callDocument = async (document_url) => {
  try {
    const response = await fetch(
      `http://api.pdflayer.com/api/convert?access_key=${accessKey}&document_url=${document_url}&test=${test}`
    );
    let data = await response.json();

    return data;
  } catch (err) {
    console.error(`There was an error:`, err);
  }
};

submitButton.addEventListener("click", async function (e) {
  e.preventDefault();
  let url = urlDocument.value;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }
  console.log(await callDocument(url));

  document.getElementById("myForm").reset();
});
