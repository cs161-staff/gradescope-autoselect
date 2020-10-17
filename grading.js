// Copy paste this first into inspect element console.

/*
 * Returns an array of booleans such that the ith rubric item corresponds to
 * whether the ith rubric item should be selected for the currently viewed
 * submission. This currently assumes an additive rubric and that the last
 * rubric item is an "Incorrect/blank" rubric item so that Gradescope marks the
 * submission as graded.
 */
function score() {
  const ANS_MASK = [0, 1, 0];

  const checkboxes = Array.from(document.querySelectorAll("[id^='question_'] input[type=checkbox]"))
  const marked = checkboxes.map((e) => e.checked);

  let ret = [];
  let allIncorrect = true;
  for (let i = 0; i < ANS_MASK.length; i++) {
      if (ANS_MASK[i] == marked[i] || 0) {
          ret.push(true);
          allIncorrect = false;
      } else {
          ret.push(false);
      }
  }
  ret.push(allIncorrect);
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

  // Go to next ungraded. This means whatever submission is already graded is unaffected by this script.
  document.getElementsByClassName('actionBar--action-next')[0].click();
}
// Run grade() on console to see if the correct choice is selected.

// If it works, paste this into the console to start the autograding procedure.
// 1000 = 1 sec. Change this accordingly based on how fast your browser/internet runs.
setInterval(grade, 500);

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
