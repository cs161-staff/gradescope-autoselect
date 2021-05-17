// Copy paste this first into inspect element console.

/*
 * Returns the the index of the rubric item to be selected. The ith entry in
 * ANS says that the rubric item with that index should be selected if the ith
 * choice was selected. All indices are 0-indexed. Null return values may be
 * used to indicate that no option should be selected.
 */
function score() {
    const ANS = [2, 2, 2, 0, 1];
    const INCORRECT = 2;

    const buttons = Array.from(document.querySelectorAll("[id^='question_'] input[type='radio']"));
    const markedIndex = buttons.findIndex((e) => e.checked);

    return markedIndex != -1 ? ANS[markedIndex] : INCORRECT;
}

// Run score() on console to see if it produces the correct grade.

// Next, copy paste this into the console.

/*
 * Grades the current submission based on the return value of score().
 */
function grade() {
    let scoredRubric = score();
    if (scoredRubric != null) {
        let rubric = document.querySelectorAll('.rubricItem--key');
        rubric[scoredRubric].click();
    }
}

// Run grade() on console to see if the correct choice is selected.

// If it works, paste this inpoto the console to start the autograding procedure.

/*
 * Starts the autograding by polling for changes in the href of the window.
 * When it changes, we have successfully loaded the next submission, so we
 * grade and then hit the "Next Ungraded" button again.
 */
{
    let href = window.location.href;
    let nextGraded = document.querySelector('.actionBar--action-next');
    setInterval(() => {
        if (href != window.location.href) {
            href = window.location.href;
            grade();
            // Go to next ungraded. This means whatever submission is already graded is unaffected by this script.
            nextGraded.click();
        }
    }, 50);
    grade();
    nextGraded.click();
}
