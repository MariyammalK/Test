const questions = [
    { section: 'A', question: 'Which gas is required for photosynthesis in plants?', options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'None of the above'], answer: 'Carbon dioxide' },
    { section: 'A', question: 'The movement of food to the different parts of a plant is through ___?', options: ['Roots', 'Phloem', 'Xylem', 'None of the above'], answer: 'Phloem' },
    { section: 'A', question: 'Synthesis of hydrolyzing enzymes during germination is induced by:', options: ['GA', 'ABA', 'IAA', 'None of the above'], answer: 'GA' },
    { section: 'A', question: 'The outer whorl is called the ____, and consists of the sepals.', options: ['Calyx', 'Corolla', 'Androecium', 'Gynaecium'], answer: 'Calyx' },
    { section: 'A', question: 'The flexibility in plants is due to a tissue called', options: ['Parenchyma', 'Collenchyma', 'Sclerenchyma', 'None of these'], answer: 'Collenchyma' },
    { section: 'B', question: 'Which of the following statement is INCORRECT?', options: ['All chordates have a ventral nerve code', 'All chordates are triploblastic', 'All chordates have paired grills pouches', 'None of these'], answer: 'All chordates have a ventral nerve cord' },
    { section: 'B', question: 'Ligaments and tendons are which connecting tissues?', options: ['Areolar connecting tissue', 'Adipose connecting tissue', 'Fibrous connecting tissue', 'None of the above'], answer: 'Fibrous connecting tissue' },
    { section: 'B', question: 'Cuttlefish belongs to phylum _____:', options: ['Enchinodermata', 'Mollusca', 'Annelida', 'Pisces'], answer: 'Mollusca' },
    { section: 'B', question: 'Which of the following is a warm-blooded?', options: ['Pigeon', 'Crocodile', 'Toad', 'Fish'], answer: 'Pigeon' },
    { section: 'B', question: 'Bacilli are bacteria which are?', options: ['Comma-shaped', 'Rod-shaped', 'Spiral', 'Spherical'], answer: 'Rod-shaped' },
    { section: 'C', question: 'The Refrigerator works on which of the following principles?', options: ['Osmosis', 'Evaporation', 'Dispersion', 'None of the above'], answer: 'Evaporation' },
    { section: 'C', question: 'Which element is used in nuclear reactor for fuel?', options: ['Uranium', 'Cadmium', 'Lutetium', 'None of the above'], answer: 'Uranium' },
    { section: 'C', question: 'The internal energy of a gas ____ in an isothermal process.', options: ['Decreases', 'Increases', 'Remains constant', 'None of the above'], answer: 'Remains constant' },
    { section: 'C', question: 'What type of waves are light wave?', options: ['Transverse wave', 'Longitudinal wave', 'Both A & B', 'None of the above'], answer: 'Transverse wave' },
    { section: 'C', question: 'The instrument ___ is used for detecting electric current is', options: ['Galvanometer', 'Tube tester', 'Altimeter', 'Fathometer'], answer: 'Galvanometer' },
    { section: 'D', question: 'Which of the following is the polymer of the monomer "Caprolactam"', options: ['Natural Rubber', 'Nylon 6', 'Buna-N', 'None of the above'], answer: 'Nylon 6' },
    { section: 'D', question: 'In which of the following, functional group isomerism in not possible', options: ['Alcohols', 'Aldehydes', 'Alkyl halides', 'None of the above'], answer: 'Alkyl halides' },
    { section: 'D', question: 'Chemical name of washing soda is:', options: ['Sodium chloride', 'Sodium hydrogen carbonate', 'Sodium carbonate', 'Sodium hydroxide'], answer: 'Sodium carbonate' },
    { section: 'D', question: 'Which acid is present in sour milk?', options: ['Citric Acid', 'Acetic Acid', 'Glycolic Acid', 'Lactic Acid'], answer: 'Lactic Acid' },
    { section: 'D', question: 'The ratio of the mass of hydrogen to the mass of oxygen in water is always ____', options: ['2:1', '1:8', '8:1', '1:2'], answer: '1:8' }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let scores = { A: 0, B: 0, C: 0, D: 0 };
let totalQuestionsPerSection = { A: 0, B: 0, C: 0, D: 0 };

// Initialize totalQuestionsPerSection
questions.forEach(q => {
    if (totalQuestionsPerSection[q.section] !== undefined) {
        totalQuestionsPerSection[q.section]++;
    }
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion(index) {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

    if (index >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[index];
    questionElement.innerHTML = `${index + 1}. ${currentQuestion.question} `;
    answerButtonsElement.innerHTML = '';

    currentQuestion.options.forEach((option, idx) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.id = `option${idx}`;
        input.value = option;

        const label = document.createElement('label');
        label.htmlFor = `option${idx}`;
        label.textContent = option;

        optionDiv.appendChild(input);
        optionDiv.appendChild(label);
        answerButtonsElement.appendChild(optionDiv);
    });

    // Update the button text
    const submitBtn = document.getElementById('submit-btn');
    if (index === questions.length - 1) {
        submitBtn.textContent = 'Submit';
    } else {
        submitBtn.textContent = 'Next';
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const selectedAnswer = selectedOption.value;
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.answer) {
            scores[currentQuestion.section]++;
        }
        userAnswers.push({ question: currentQuestion.question, selected: selectedAnswer });
    }
}

function nextQuestionOrSubmit() {
    checkAnswer(); // Save the answer of the current question
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++; // Move to the next question
        loadQuestion(currentQuestionIndex); // Load the next question
    } 
    const answeredQuestions = userAnswers.filter(answer => answer !== null).length;
    if (answeredQuestions < questions.length) {
        alert("Please answer all questions.");
        return;
    }
    else {
        if (confirm("Are you sure you want to submit your responses?")){
        showResults();
        }
    }
}

function submitQuiz() {
    checkAnswer();
    const answeredQuestions = userAnswers.length;
    if (answeredQuestions < questions.length) {
        alert("Please answer all questions.");
    } else {
        showResults();
    }
}

function showResults() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    let resultHTML = '<h3>Section-wise Results</h3>';
    for (let section in scores) {
        const totalQuestions = totalQuestionsPerSection[section];
        const correctAnswers = scores[section];
        const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
        resultHTML += `<p>Section ${section}: ${percentage}% correct</p>`;
    }
    resultHTML += '<button onclick="showChart()">Show Chart</button>';
    resultContainer.innerHTML = resultHTML;
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
}

function showChart() {
    const resultChart = document.getElementById('resultsChart');
    resultChart.style.display = 'block';
    resultChart.style.alignContent='center';
    resultChart.style.alignItems='center';
    const ctx = resultChart.getContext('2d');
    const data = [];
    const labels = [];
    for (let section in scores) {
        labels.push(`Section ${section}`);
        data.push((scores[section] / totalQuestionsPerSection[section]) * 100);
    }
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#4CAF50', '#F44336', '#FFC107', '#2196F3'],
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Section-wise Test Results'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
window.onload = () => {
    shuffle(questions);  // Shuffle questions when the page loads
    loadQuestion(currentQuestionIndex);
};