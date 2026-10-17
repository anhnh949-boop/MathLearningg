const questions = [
  { id: "cot", answer: [1] },
  { id: "sin", answer: [0.5, -0.5] },
];

// value phải khớp với HTML của bạn (q3 dùng A2..D2)
const mcAnswers = { q1: "A", q2: "C1", q3: "D2" };

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
    const ok = input.value.trim() !== "" &&
      q.answer.some((a) => Math.abs(user - a) < 0.01);
    if (ok) { score++; input.classList.add("correct"); }
    else input.classList.add("wrong");
  });
  return score;
}

function checkMC() {
  let score = 0;
  for (const name in mcAnswers) {
    document.querySelectorAll(`input[name="${name}"]`).forEach((r) =>
      r.parentElement.classList.remove("correct", "wrong"));
    const chosen = document.querySelector(`input[name="${name}"]:checked`);
    if (!chosen) continue;
    if (chosen.value === mcAnswers[name]) {
      score++;
      chosen.parentElement.classList.add("correct");
    } else {
      chosen.parentElement.classList.add("wrong");
    }
  }
  return score;
}

function checkAnswers() {
  const score = checkInputs(questions) + checkMC();
  const total = questions.length + Object.keys(mcAnswers).length;
  document.getElementById("result").textContent = `Điểm: ${score}/${total}`;
}