const questions = [
  { id: "c1a", answer: 2 },
  { id: "c1b", answer: -2.5 },
  { id: "c2a", answer: 540 },
  { id: "c2b", answer: -396 },
  { id: "c3a", answer: 5.236 },
  { id: "c3b", answer: 30 },
];

// Cho phép nhập "5/2", "-2,5", "2.5"
function parseNumber(text) {
  text = text.trim().replace(",", ".");
  if (text.includes("/")) {
    const [a, b] = text.split("/");
    return Number(a) / Number(b);
  }
  return Number(text);
}

function checkAnswers() {
  let score = 0;
  questions.forEach((q) => {
    const input = document.getElementById(q.id);
    const user = parseNumber(input.value);
    input.classList.remove("correct", "wrong");

    // sai số 0.01 để chấp nhận số làm tròn
    if (input.value.trim() !== "" && Math.abs(user - q.answer) < 0.01) {
      score++;
      input.classList.add("correct");
    } else {
      input.classList.add("wrong");
    }
  });
  document.getElementById("rs").textContent =
    `Điểm: ${score}/${questions.length}`;
}

document.getElementById("submit").addEventListener("click", checkAnswers);

const mcAnswers = { q1: "A", q2: "C1", q3: "D2" };

function checkMC() {
  let score = 0;
  for (const name in mcAnswers) {
    document.querySelectorAll(`input[name="${name}"]`).forEach((r) =>
      r.parentElement.classList.remove("correct", "wrong")
    );
    const chosen = document.querySelector(`input[name="${name}"]:checked`);
    if (!chosen) continue; // chưa chọn thì bỏ qua
    if (chosen.value === mcAnswers[name]) {
      score++;
      chosen.parentElement.classList.add("correct");
    } else {
      chosen.parentElement.classList.add("wrong");
    }
  }
  return score;
}