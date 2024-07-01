document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click(); // Trigger the file input click event
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        const file = inputElement.files[0];
        updateThumbnail(dropZoneElement, file);
        readFileContent(file).then(content => {
          // Do something with the file content
          console.log(content); // For example, log it to the console
          // Add the file content to your workspace here
        });
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, file);
        readFileContent(file).then(content => {
          // Do something with the file content
          console.log(content); // For example, log it to the console
          // Add the file content to your workspace here
        });
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
  
    // First time - there is no thumbnail element, so let's create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
  
  /**
   * Reads the content of a file.
   *
   * @param {File} file
   * @returns {Promise<string>} A promise that resolves to the content of the file.
   */
  function readFileContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        resolve(event.target.result);
      };
  
      reader.onerror = (event) => {
        reject(new Error(`Error reading file: ${event.target.error}`));
      };
  
      reader.readAsText(file); // Change this to readAsDataURL if you need the data URL
    });
  }
  