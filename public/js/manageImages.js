window.addEventListener('load', () => {
    const fileInput = document.querySelector('#image');
    const output = document.querySelector('#image-output');

    fileInput.addEventListener('change', e => {
        const files = e.target.files;

        for(let i=0; i < files.length; i++){
            const imageReader = new FileReader();
            imageReader.addEventListener('load', e => {
                const imageFile = e.target;
                const div = document.createElement("div");
                div.innerHTML = `<img class="image-view" src="${imageFile.result}" />`;
                output.appendChild(div);
            });
            imageReader.readAsDataURL(files[i]);
        }
    });
});