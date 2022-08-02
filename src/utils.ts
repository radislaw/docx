export function saveFile(filename: string, blob: Blob) {
  alert(
    "Downloading files is no longer supported by CodeSandbox runtime.\n" +
      "To run the code locally please follow the insturctions here:\n" +
      "https://github.com/alonrbar/easy-template-x/issues/21#issuecomment-570793141"
  );

  // get downloadable url from the blob
  const blobUrl = URL.createObjectURL(blob);

  // create temp link element
  let link = document.createElement("a");
  link.download = filename;
  link.href = blobUrl;

  // use the link to invoke a download
  document.body.appendChild(link);
  link.click();

  // remove the link
  setTimeout(() => {
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
    link = null;
  }, 0);
}

export function chooseFile(accept?: string): Promise<File> {
  return new Promise((resolve, reject) => {
    try {
      // create
      let input = document.createElement("input");
      input.type = "file";
      input.accept = accept;
      input.width = 0;

      // prepare dispose logic
      let isResolved = false;
      const removeInput = () => {
        input.remove();
        input.value = null;
        input = null;
      };

      // wait for file selection
      input.onchange = () => {
        // get the file
        let file: File;
        if (input.files.length) {
          file = input.files.item(0);
        }

        // return
        isResolved = true;
        resolve(file);

        // remove
        setTimeout(removeInput, 0);
      };

      // use
      document.body.appendChild(input);
      input.click();

      // garbage collect
      //
      // Note: Garbage collection is required since no event is fired
      // when the user hit the 'cancel' button (see:
      // https://stackoverflow.com/questions/34855400/cancel-event-on-input-type-file).

      setTimeout(() => {
        if (input) {
          removeInput();
        }
        if (!isResolved) {
          resolve();
        }
      }, 60 * 1000);
    } catch (e) {
      reject(e);
    }
  });
}
