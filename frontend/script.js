// ---------- CONFIG ----------
const BACKEND_URL = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://ytdownloader-flgk.onrender.com"; // <- CHANGE after deploying backend
// ----------------------------

const form = document.getElementById("convert-form");
const ytInput = document.getElementById("yt-url");
const msg = document.getElementById("msg");
const loader = document.getElementById("loader");
const table = document.getElementById("results");
const tbody = table.querySelector("tbody");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = ytInput.value.trim();
  if (!url) return;

  msg.textContent = "";
  table.classList.add("hidden");
  loader.classList.remove("hidden");

  try {
    const res = await fetch(`${BACKEND_URL}/info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    loader.classList.add("hidden");

    if (!res.ok) {
      msg.textContent = data.error || "Error fetching formats.";
      return;
    }

    // Populate table
    tbody.innerHTML = "";
    data.formats.forEach(f => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${f.quality}</td>
        <td>${f.ext}</td>
        <td>${f.size}</td>
        <td><a class="download-btn" href="${f.url}" target="_blank" download>Download</a></td>
      `;
      tbody.appendChild(tr);
    });

    table.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    loader.classList.add("hidden");
    msg.textContent = "Server unreachable.";
  }
});
