function evaluate() {
  const pulse = parseFloat(document.getElementById("pulse").value);
  const spo2 = parseFloat(document.getElementById("spo2").value);
  const temp = parseFloat(document.getElementById("temp").value);
  const pallor = document.getElementById("pallor").checked;

  const alertsDiv = document.getElementById("alerts");
  const summaryDiv = document.getElementById("summary");

  alertsDiv.innerHTML = "";
  summaryDiv.innerHTML = "";

  let results = [];

  function addAlert(name, message, color) {
    results.push({ name, message, color });

    const div = document.createElement("div");
    div.className = "card " + color;
    div.innerHTML = `<strong>${name}</strong>: ${message}`;
    alertsDiv.appendChild(div);
  }

  // Pulse
  if (!isNaN(pulse)) {
    if (pulse > 120 || pulse < 50) {
      addAlert("Pulse", "Critical abnormal pulse", "red");
    } else if (pulse > 100 || pulse < 60) {
      addAlert("Pulse", "Mild abnormal pulse", "yellow");
    } else {
      addAlert("Pulse", "Normal", "green");
    }
  }

  // SpO2
  if (!isNaN(spo2)) {
    if (spo2 < 90) {
      addAlert("SpO₂", "Hypoxemia", "red");
    } else if (spo2 < 95) {
      addAlert("SpO₂", "Low oxygen", "yellow");
    } else {
      addAlert("SpO₂", "Normal", "green");
    }
  }

  // Temperature
  if (!isNaN(temp)) {
    if (temp > 38.5 || temp < 35) {
      addAlert("Temperature", "Critical temperature", "red");
    } else if (temp > 37.5) {
      addAlert("Temperature", "Fever", "yellow");
    } else {
      addAlert("Temperature", "Normal", "green");
    }
  }

  // Pallor
  if (pallor) {
    addAlert("Pallor", "Possible anemia", "yellow");
  }

  // Summary
  let overall = "green";

  if (results.some(r => r.color === "red")) overall = "red";
  else if (results.some(r => r.color === "yellow")) overall = "yellow";

  summaryDiv.className = overall;

  summaryDiv.innerHTML = `
    <h3>
      ${overall === "red" ? "🔴 HIGH RISK" :
        overall === "yellow" ? "🟡 MODERATE" :
        "🟢 STABLE"}
    </h3>
  `;
}
