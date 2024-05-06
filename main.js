const getOCR = async (src) => {
    const worker = await Tesseract.createWorker('eng');
    let text = document.getElementById("text");
    const ret = await worker.recognize(src);
    text.textContent = ret.data.text;
    await worker.terminate();
}

const image = document.querySelector("img");
getOCR(image.src);

const inputFile = document.querySelector("input");
inputFile.addEventListener("change", () => {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        getOCR(reader.result)
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
})