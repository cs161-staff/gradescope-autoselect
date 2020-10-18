// Copy paste this first into inspect element console.

/*
 * Returns the the index of the rubric item to be selected. If the honor code
 * is non-empty, FILLED is returned, else BLANK.
 */
function score() {
    const FILLED = 0;
    const BLANK = 1;

    const textBox = document.querySelector("[id^='question_'] .form--textInput span");
    const text = textBox.innerHTML;
    const isBlank = text.search(/[^\s]/) != -1; // Look for anything other than whitespace.

    return isBlank ? FILLED : BLANK;
}

// Run score() on console to see if it produces the correct grade.

// Next, copy paste this into the console.

/*
 * Grades the current submission based on the return value of score().
 */
function grade() {
    let scoredRubric = score();
    let rubric = document.querySelectorAll('.rubricItem--key');
    rubric[scoredRubric].click();
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
