import { saveFile, chooseFile } from "./utils";

//
// template
//

let theTemplate: Blob;

const downloadTemplateBtn = document.getElementById("download-template-button");
downloadTemplateBtn.addEventListener("click", async () => {
  const request = await fetch("/res/template.docx");
  const templateFile = await request.blob();
  saveFile("template.docx", templateFile);
});

const uploadTemplateBtn = document.getElementById("upload-template-button");
uploadTemplateBtn.addEventListener("click", async () => {
  try {
    theTemplate = await chooseFile(".docx");
    const templateThumb = document
      .getElementsByClassName("template-thumb")
      .item(0) as HTMLElement;
    templateThumb.style.display = "none";
    const customTemplateMessage = document
      .getElementsByClassName("custom-template-message")
      .item(0) as HTMLElement;
    customTemplateMessage.style.display = "block";
  } catch (e) {
    console.error("Failed to upload template file.", e);
  }
});

async function getTemplate(): Promise<Blob> {
  if (theTemplate) return theTemplate;
  const request = await fetch("/res/template.docx");
  const defaultTemplate = await request.blob();
  return defaultTemplate;
}

//
// data
//

const helpTest = document.getElementById("data-help-text");

const dataTextbox = document.getElementById(
  "template-data-txt"
) as HTMLTextAreaElement;

dataTextbox.value = `{
  "Beers": [
    { "Brand": "Carlsberg", "Price": 1 },
    { "Brand": "Leaf Blonde", "Price": 2 },
    { "Brand": "Weihenstephan", "Price": 1.5 }
  ]
}`;
dataTextbox.addEventListener("keyup", () => {
  try {
    JSON.parse(dataTextbox.value);
    helpTest.classList.remove("error");
    helpTest.innerText = "Feel free to edit the data...";
  } catch (e) {
    helpTest.classList.add("error");
    helpTest.innerText = "JSON parse error. See console output for details.";
    console.error(e);
  }
});

function getJsonData(): string {
  return dataTextbox.value;
}

//
// status
//

function setStatus(status: string, isError?: boolean) {
  const statusBox = document.getElementById("create-docx-status");

  statusBox.innerText = status;

  if (isError) {
    statusBox.classList.add("error");
  } else {
    statusBox.classList.remove("error");
  }
}

//
// exports
//

export { setStatus, getJsonData, getTemplate };
