let followersContent = null;
        let followingContent = null;

        document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
            const dropZoneElement = inputElement.closest(".drop-zone");

            dropZoneElement.addEventListener("click", (e) => {
                inputElement.click();
            });

            inputElement.addEventListener("change", (e) => {
                if (inputElement.files.length) {
                    const file = inputElement.files[0];
                    updateThumbnail(dropZoneElement, file);
                    readFileContent(file).then(content => {
                        if (file.name.includes("followers")) {
                            followersContent = content;
                        } else if (file.name.includes("following")) {
                            followingContent = content;
                        }
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
                        if (file.name.includes("followers")) {
                            followersContent = content;
                        } else if (file.name.includes("following")) {
                            followingContent = content;
                        }
                    });
                }

                dropZoneElement.classList.remove("drop-zone--over");
            });
        });

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

        function readFileContent(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve(event.target.result);
                };

                reader.onerror = (event) => {
                    reject(new Error(`Error reading file: ${event.target.error}`));
                };

                reader.readAsText(file);
            });
        }

        document.getElementById("check").addEventListener("click", () => {
            if (followersContent && followingContent) {
                const parsedFollowers = JSON.parse(followersContent);
                const parsedFollowing = JSON.parse(followingContent);

                const followers = parsedFollowers.map(item => item.string_list_data[0].value);
                const following = parsedFollowing.relationships_following.map(item => item.string_list_data[0].value);

                // Find users who do not follow back
                let notFollowingBack = following.filter(user => !followers.includes(user));

                // Output users who do not follow back
                document.getElementById("result").textContent = "Users who do not follow you back:\n" + notFollowingBack.join("\n");
            } else {
                alert("Please upload both followers.json and following.json files.");
            }
        });