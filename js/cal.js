(function () {

  const form = document.getElementById("calcForm");
  const resultBox = document.getElementById("result");
  if (!form || !resultBox) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    
    const age = Number(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const height = Number(document.getElementById("height").value); 
    const weight = Number(document.getElementById("weight").value); 
    const activity = Number(document.getElementById("activity").value);

    
    if (!age || !height || !weight || !gender || !activity) {
      resultBox.innerText = "⚠️ Please fill in all fields.";
      return;
    }

    if (Number.isNaN(age) || Number.isNaN(height) || Number.isNaN(weight) || Number.isNaN(activity)) {
      resultBox.innerText = "⚠️ Invalid numbers. Please check your inputs.";
      return;
    }

    
    let bmr;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === "female") {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
      resultBox.innerText = "⚠️ Please select a valid gender.";
      return;
    }


    
    const calories = Math.round(bmr * activity);

    
    const carbs = Math.round((calories * 0.5) / 4);   
    const protein = Math.round((calories * 0.2) / 4); 
    const fat = Math.round((calories * 0.3) / 9);     

    resultBox.innerHTML = `
      <div class="results-card">
        <p>🔥 <strong>Daily Calories:</strong> ${calories.toLocaleString()} kcal</p>
        <p>🥖 <strong>Carbs:</strong> ${carbs} g</p>
        <p>🍗 <strong>Protein:</strong> ${protein} g</p>
        <p>🥑 <strong>Fat:</strong> ${fat} g</p>
      </div>
    `;
  });
})();

