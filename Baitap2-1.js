const mcAnswers = {
  cau1: "d",   // câu SAI: cos(a - b) = cosa.cosb + sina.sinb mới đúng
  cau2: "a1",  // sin(a + b) = sina.cosb + cosa.sinb
  cau3: "c2",  // sin2a = 2sina.cosa
  cau4: "c3",  // tan(a - b) = (tana - tanb)/(1 + tana.tanb)
  cau5: "b4",
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
  document.getElementById("result1").textContent = `Điểm: ${score}/${total}`;
}