const questions = [
  { id: "tan", answer: 30 },
  { id: "k",   answer: 180 },
  { id: "cot", answer: 90 },
  { id: "k1",  answer: 90 },
];

const mcAnswers = { c1: "C", c2: "A1", c3: "A2", c4: "D3", c5: "D4" };

function parseNumber(text) {
  text = text.trim().replace(",", ".");
  if (text.includes("/")) {
    const [a, b] = text.split("/");
    return Number(a) / Number(b);
  }
  return Number(text);
}

function checkInputs(list) {
  let score = 0;
  list.forEach((q) => {
    const input = document.getElementById(q.id);
    const user = parseNumber(input.value);
    input.classList.remove("correct", "wrong");
    if (input.value.trim() !== "" && Math.abs(user - q.answer) < 0.01) {
      score++;
      input.classList.add("correct");
    } else {
      input.classList.add("wrong");
    }
  });
  return score;
}

function checkMC(answers) {
  let score = 0;
  for (const name in answers) {
    document.querySelectorAll(`input[name="${name}"]`).forEach((r) =>
      r.parentElement.classList.remove("correct", "wrong")
    );
    const chosen = document.querySelector(`input[name="${name}"]:checked`);
    if (!chosen) continue;
    if (chosen.value === answers[name]) {
      score++;
      chosen.parentElement.classList.add("correct");
    } else {
      chosen.parentElement.classList.add("wrong");
    }
  }
  return score;
}

function checkAnswers() {
  const score = checkInputs(questions) + checkMC(mcAnswers);
  const total = questions.length + Object.keys(mcAnswers).length;
  document.getElementById("result4").textContent = `Điểm: ${score}/${total}`;
}