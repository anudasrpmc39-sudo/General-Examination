function evaluate() {
  const pulse = +document.getElementById("pulse").value;
  const spo2 = +document.getElementById("spo2").value;
  const temp = +document.getElementById("temp").value;
  const resp = +document.getElementById("resp").value;
  const bpSys = +document.getElementById("bpSys").value;

  const pallor = document.getElementById("pallor").checked;
  const cyanosis = document.getElementById("cyanosis").checked;
  const clubbing = document.getElementById("clubbing").checked;

  const icterus = document.getElementById("icterus").checked;
  const capRefill = +document.getElementById("capRefill").value;

  const jvp = document.getElementById("jvp").value;
  const edema = document.getElementById("edema").value;

  const bmi = +document.getElementById("bmi").value;
  const consciousness = document.getElementById("consciousness").value;

  const alertsDiv = document.getElementById("alerts");
  const summaryDiv = document.getElementById("summary");

  alertsDiv.innerHTML = "";
  summaryDiv.innerHTML = "";

  let results = [];

  function add(name, msg, color) {
    results.push({ name, msg, color });

    const div = document.createElement("div");
    div.className = "card " + color;
    div.innerHTML = `<strong>${name}</strong>: ${msg}`;
    alertsDiv.appendChild(div);
  }

  // 🔹 VITALS

  if (pulse) {
    if (pulse > 120 || pulse < 50) add("Pulse", "Critical abnormal", "red");
    else if (pulse > 100 || pulse < 60) add("Pulse", "Mild abnormal", "yellow");
    else add("Pulse", "Normal", "green");
  }

  if (spo2) {
    if (spo2 < 90) add("SpO₂", "Hypoxemia", "red");
    else if (spo2 < 95) add("SpO₂", "Low oxygen", "yellow");
    else add("SpO₂", "Normal", "green");
  }

  if (temp) {
    if (temp > 38.5 || temp < 35) add("Temperature", "Critical", "red");
    else if (temp > 37.5) add("Temperature", "Fever", "yellow");
    else add("Temperature", "Normal", "green");
  }

  if (resp) {
    if (resp > 24 || resp < 10) add("Respiratory rate", "Critical", "red");
    else if (resp > 20) add("Respiratory rate", "Elevated", "yellow");
    else add("Respiratory rate", "Normal", "green");
  }

  if (bpSys) {
    if (bpSys < 90 || bpSys >= 180) add("BP", "Critical BP", "red");
    else if (bpSys >= 140) add("BP", "Hypertension", "yellow");
    else add("BP", "Normal", "green");
  }

  // 🔹 HANDS

  if (pallor) add("Pallor", "Possible anemia", "yellow");
  if (cyanosis) add("Cyanosis", "Hypoxia", "red");
  if (clubbing) add("Clubbing", "Chronic disease", "yellow");

  if (capRefill) {
    if (capRefill > 2) add("Capillary refill", "Poor perfusion", "red");
    else add("Capillary refill", "Normal", "green");
  }

  // 🔹 FACE

  if (icterus) add("Icterus", "Liver disease", "red");

  // 🔹 NECK

  if (jvp === "raised") add("JVP", "Heart failure/fluid overload", "red");

  // 🔹 EDEMA

  if (edema === "mild") add("Edema", "Fluid retention", "yellow");
  if (edema === "severe") add("Edema", "Severe fluid overload", "red");

  // 🔹 BMI

  if (bmi) {
    if (bmi < 18.5) add("BMI", "Underweight", "red");
    else if (bmi >= 30) add("BMI", "Obesity", "red");
    else if (bmi >= 25) add("BMI", "Overweight", "yellow");
    else add("BMI", "Normal", "green");
  }

  // 🔹 MENTAL STATUS

  if (consciousness === "drowsy") add("Mental status", "Altered", "yellow");
  if (consciousness === "unconscious") add("Mental status", "Emergency", "red");

  // 🔹 SUMMARY

  let overall = "green";
  if (results.some(r => r.color === "red")) overall = "red";
  else if (results.some(r => r.color === "yellow")) overall = "yellow";

  summaryDiv.className = overall;

  summaryDiv.innerHTML = `
    <h3>
      ${overall === "red" ? "🔴 HIGH RISK" :
        overall === "yellow" ? "🟡 MODERATE RISK" :
        "🟢 STABLE"}
    </h3>

    <ul>
      ${results
        .filter(r => r.color !== "green")
        .map(r => `<li>${r.name}: ${r.msg}</li>`)
        .join("")}
    </ul>
  `;
}
