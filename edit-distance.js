// Copy paste this first into inspect element console.

/*
 * Returns the the index of the rubric item to be selected. If the edit distance
 * is 0, the DISTANCE_ITEMS[0]'th rubric item will be returned. If the edit
 * distance is 1, the DISTANCE_ITEMS[1]'th item will be returned, etc. If the
 * edit distance is too great, INCORRECT will be returned.
 */
function score() {
    const DISTANCE_ITEMS = [0, 1];
    const INCORRECT = 2;
    const SOL = [false, false, true, true, true, false, false, false, false, true, false, false, false, false];

    const checkboxes = Array.from(document.querySelectorAll("[id^='question_'] input[type='checkbox']"))
    const marked = checkboxes.map((e) => e.checked);

    let editDistance = 0;
    for (let i = 0; i < SOL.length; i++) {
         if (SOL[i] !== marked[i]) {
             editDistance++;
         }
    }

    let ret;
    if (editDistance < DISTANCE_ITEMS.length) {
        ret = DISTANCE_ITEMS[editDistance];
    } else {
        ret = INCORRECT;
    }
    return ret;
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

// If it works, paste this input into the console to start the autograding
// procedure.

/*
 * Starts the autograding by polling for changes in the href of the window.
 * When it changes, we have successfully loaded the next submission, so we
 * grade and then hit the "Next Ungraded" button again.
 */
{
    let href = window.location.href;
    let nextGraded = document.querySelector('[title="Shortcut: Z"]')
    setInterval(() => {
        /* Wait for updated URL. */
        if (href != window.location.href) {
            href = window.location.href;
            /* Grade the submission. */
            grade();
            /* Go to next ungraded. */
            nextGraded.click();
        }
    }, 50);
    grade();
    nextGraded.click();
}
