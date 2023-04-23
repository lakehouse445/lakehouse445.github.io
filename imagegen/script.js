const zipInput = document.getElementById('zip-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const randomImage = document.getElementById('random-image');
const correctBtn = document.getElementById('correct-btn');
const incorrectBtn = document.getElementById('incorrect-btn');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');

let images = [];
let correct = 0;
let incorrect = 0;
let zip;

zipInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    zip = await JSZip.loadAsync(file);
    images = Object.keys(zip.files).filter(filename => filename.endsWith('.jpg') || filename.endsWith('.png'));
    submitBtn.disabled = false;
});

submitBtn.addEventListener('click', () => {
    nextBtn.disabled = false;
    correctBtn.disabled = true;
    incorrectBtn.disabled = true;
});

nextBtn.addEventListener('click', async () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImageName = images[randomIndex];
    const imageBlob = await zip.files[randomImageName].async('blob');
    const imageUrl = URL.createObjectURL(imageBlob);
    randomImage.src = imageUrl;
    randomImage.style.display = 'block';

    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    document.body.style.backgroundColor = randomColor;

    correctBtn.disabled = false;
    incorrectBtn.disabled = false;
});

correctBtn.addEventListener('click', () => {
    correct++;
    correctCount.textContent = correct;
});

incorrectBtn.addEventListener('click', () => {
    incorrect++;
    incorrectCount.textContent = incorrect;
});
