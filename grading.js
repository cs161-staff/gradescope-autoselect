// Copy paste this first into inspect element console.

/*
 * Returns an array of booleans such that the ith rubric item corresponds to
 * whether the ith rubric item should be selected for the currently viewed
 * submission. This currently assumes an additive rubric and that the last
 * rubric item is an "Incorrect/blank" rubric item so that Gradescope marks the
 * submission as graded. This also assumes that "None of the above" is the
 * final answer choice after the answers in ANS_MASK. If "None of the above" is
 * selected, grading proceeds as if no answer choices were selected. If
 * everything is blank, no points are received.
 */
function score() {
    const ANS_MASK = [0, 1, 0];

    const checkboxes = Array.from(document.querySelectorAll("[id^='question_'] input[type=checkbox]"))
    const marked = checkboxes.map((e) => e.checked);

    let ret;
    if (!marked.some((e) => e)) {
        /* No marked boxes. Incorrect/blank. */
        ret = new Array(ANS_MASK.length);
        ret.fill(false);
        ret.push(true);
    } else {
        /* Something was marked. */
        ret = ANS_MASK.map((solution, i) => solution == marked[i]);
        /* If all false, push true at the end, else push false. */
        ret.push(ret.every((e) => !e));
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
    let rubric = document.querySelectorAll('.rubricItem--key');
    for (let i = 0; i < scoredRubric.length; i++) {
        // Apply the item rubric[i] if scoredRubric[i] is true.
        if (scoredRubric[i]) {
            rubric[i].click();
        }
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

//function grade() {
//  let scored_rubric = score();
//  let rubric = document.getElementsByClassName('rubricItem--key');
//  if (scored_rubric[0]) {
//      rubric[0].click();
//  } else if (scored_rubric[2]) {
//      rubric[0].click();
//  } else {
//      rubric[1].click();
//  }
//  //go to next ungraded. This means whatever submission is already graded is unaffected by this script.
//  document.getElementsByClassName('actionBar--action-next')[0].click();
//}
//
//function grade() {
//  let scored_rubric = score();
//  let rubric = document.getElementsByClassName('rubricItem--key');
//  if (scored_rubric[scored_rubric.length - 1]) {
//      rubric[0].click();
//  } else {
//      rubric[1].click();
//  }
//  //go to next ungraded. This means whatever submission is already graded is unaffected by this script.
//  document.getElementsByClassName('actionBar--action-next')[0].click();
//}
//

// vim: ts=4 sts=4 sw=4
