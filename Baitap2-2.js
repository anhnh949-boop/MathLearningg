const mcAnswers = {
  i: "d",  
  2: "A",  
  3: "B1",
  ii:"c2",
  iii:"a3",
  6:"a4", 
};

function checkMC(answers) {
  let score = 0;
  for (const name in answers) {
    document.querySelectorAll(`input[name="${name}"]`).forEach((r) =>
      r.parentElement.classList.remove("correct", "wrong")
    );

    const chosen = document.querySelector(`input[name="${name}"]:checked`);
    if (!chosen) continue; // chưa chọn thì bỏ qua

    if (chosen.value === answers[name]) {
      score++;
      chosen.parentElement.classList.add("correct");
    } else {
      chosen.parentElement.classList.add("wrong");
      // hiện luôn đáp án đúng
      document
        .querySelector(`input[name="${name}"][value="${answers[name]}"]`)
        .parentElement.classList.add("correct");
    }
  }
  return score;
}

function checkAnswers() {
  const score = checkMC(mcAnswers);
  const total = Object.keys(mcAnswers).length;
  document.getElementById("result2-2").textContent = `Điểm: ${score}/${total}`;
}