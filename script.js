document.getElementById("care-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const weight = Number(e.target.elements.weight.value);
    const result = document.querySelector("#result");
    const tooltip = document.querySelector("#weight-tooltip");
  
    // Перевірка ваги
    if (!weight || weight <= 0) {
      tooltip.classList.remove("opacity-0", "pointer-events-none");
      tooltip.setAttribute("aria-hidden", "false");
      result.textContent = "";
      result.classList.add("opacity-0");
      return;
    } else {
      tooltip.classList.add("opacity-0", "pointer-events-none");
      tooltip.setAttribute("aria-hidden", "true");
    }
  
    // Коефіцієнти активностей
    const activityCoefficients = {
      walk: 0.5,
      training: 0.3,
      play: 0.2,
    };
  
    const selectedActivities = Array.from(e.target.elements.activity)
      .filter((activity) => activity.checked);
  
    if (selectedActivities.length === 0) {
      result.textContent = "Виберіть хоча б одну активність 🐕";
      result.classList.remove("opacity-0");
      return;
    }
  
    const totalTime = selectedActivities
      .map((checkbox) => activityCoefficients[checkbox.value] * weight)
      .reduce((sum, val) => sum + val, 0);
  
    // Плавне оновлення результату
    result.textContent = "";
    result.classList.add("opacity-0");
  
    setTimeout(() => {
      result.textContent = `На сьогодні потрібно приблизно ${totalTime.toFixed(1)} хвилин догляду.`;
      result.classList.remove("opacity-0");
    }, 100);
  });

document.addEventListener("DOMContentLoaded", () => {
  const weightInput = document.querySelector("#weight");
  const tooltip = document.querySelector("#weight-tooltip");

  weightInput.addEventListener("input", () => {
    const value = parseFloat(weightInput.value);

    if (!value || value <= 0) {
      tooltip.classList.remove("opacity-0", "pointer-events-none");
      tooltip.setAttribute("aria-hidden", "false");
    } else {
      tooltip.classList.add("opacity-0", "pointer-events-none");
      tooltip.setAttribute("aria-hidden", "true");
    }
  });
});
