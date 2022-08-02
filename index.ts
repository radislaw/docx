import { TemplateHandler } from "easy-template-x";
import { setStatus, getTemplate, getJsonData } from "./src/form";
import { saveFile } from "./src/utils";

//
// create docx
//

const createDocxBtn = document.getElementById("create-docx-button");
createDocxBtn.addEventListener("click", async () => {
  try {
    setStatus("");

    // 1. read template file
    setStatus("Getting the template...");
    const templateFile = await getTemplate();

    // 2. read json data
    setStatus("Parsing data...");
    const jsonData = getJsonData();
    const data = JSON.parse(jsonData);

    // 3. process the template
    setStatus("Creating document...");
    const handler = new TemplateHandler();
    const docx = await handler.process(templateFile, data);

    // 4. save output
    setStatus("Done!");
    saveFile("result.docx", docx);

    setTimeout(() => setStatus(""), 1000);
  } catch (e) {
    // error handling
    setStatus("Error: " + e.message, true);
    console.error(e);
  }
});
