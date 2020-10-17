//copy paste this first into inspect element console.
function score() {
  const marked = Array.from(document.getElementsByName('questions[5011939][0][]')).map(e => e.checked);
  // you must inspect element to swap out '3208544' with appropriate question #.
  // Grading logic here. Return a rubric (ret) which is an array of trues/falses corresponding to which
  // rubric items that need to be marked. In the example below, ans_mask means [A, B, C] is the correct answer.
  // However, the rubric uses negative scoring, so you only apply a rubric item when the answer is wrong.
  const ans_mask = [0, 1, 0];
  let ret = [];
  let all_correct = true; // We have an all correct rubric item so Gradescope marks the submission as graded.
  for (let i = 0; i < ans_mask.length; i++) {
      if (ans_mask[i] != marked[i] | 0) {
          ret.push(true);
          all_correct = false;
      } else {
          ret.push(false);
      }
  }
  ret.push(all_correct);
  return ret;
}
//run score() on console to see if it produces the correct grade.
function grade() {
  let scored_rubric = score();
  let rubric = document.getElementsByClassName('rubricItem--key');
  if (scored_rubric[0]) {
      rubric[0].click();
  } else if (scored_rubric[2]) {
      rubric[0].click();
  } else {
      rubric[1].click();
  }
  //go to next ungraded. This means whatever submission is already graded is unaffected by this script.
  document.getElementsByClassName('actionBar--action-next')[0].click();
}
function grade() {
  let scored_rubric = score();
  let rubric = document.getElementsByClassName('rubricItem--key');
  if (scored_rubric[scored_rubric.length - 1]) {
      rubric[0].click();
  } else {
      rubric[1].click();
  }
  //go to next ungraded. This means whatever submission is already graded is unaffected by this script.
  document.getElementsByClassName('actionBar--action-next')[0].click();
}
function grade() {
  let scored_rubric = score();
  let rubric = document.getElementsByClassName('rubricItem--key');
  for (let i = 0; i < scored_rubric.length; i++) {
      // Apply the item rubric[i] if scored_rubric[i] is true.
      if (scored_rubric[i]) {
          rubric[i].click();
      }
  }
  //go to next ungraded. This means whatever submission is already graded is unaffected by this script.
  document.getElementsByClassName('actionBar--action-next')[0].click();
}
//run grade() on console to see if correct choice selected.
//1000 = 1 sec. Change this accordingly based on how fast your browser/internet runs.
setInterval(grade, 500);
