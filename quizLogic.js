function isCorrect(playerAnswer, correctAnswer) {
    return playerAnswer === correctAnswer;
}

function calculateScore(correct, total) {
    if (total === 0) return 0; // Avoid division by zero
    return Math.round((correct / total) * 100);
}

function getGrade(percent) {
    if (percent >=90) return "Perfect!";
    if (percent >=80) return "Great job!";
    if (percent >=70) return "Good effort";
    return "Keep learning";
}

module.exports = { isCorrect, calculateScore, getGrade };