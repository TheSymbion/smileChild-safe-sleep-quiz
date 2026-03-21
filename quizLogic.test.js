const {isCorrect, calculateScore, getGrade} = require('./quizLogic');
// isCorrect ----------------------------------
test ('correct when player guess matched reality', () => {
    expect(isCorrect(true,true)).toBe(true);
});

test ('wrong when player guess does not match', () => {
    expect(isCorrect(true,false)).toBe(false);
});

// calculateScore ----------------------------------
test ('calculate percentage correctly', () => {
    expect(calculateScore(7,10)).toBe(70);
});

test ('zero when percentage is zero', () => {
    expect(calculateScore(0,10)).toBe(0);
});

// getGrade ----------------------------------
test('returns Perfect for 100%', () => {
    expect(getGrade(100)).toBe('Perfect!');
});

test('returns Keep learning for low score', () => {
    expect(getGrade(40)).toBe('Keep learning');
});