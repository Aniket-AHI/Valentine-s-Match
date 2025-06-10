// View count
let views = localStorage.getItem("views") || 0;
views++;
localStorage.setItem("views", views);
document.getElementById("viewCount").innerText = views;

let recentMatches = JSON.parse(localStorage.getItem("recentMatches")) || [];

function calculateMatch() {
    let boy = document.getElementById("boyName").value.trim().toLowerCase();
    let girl = document.getElementById("girlName").value.trim().toLowerCase();

    if (!boy || !girl) return alert("Please enter both names!");

    let combined = (boy + girl).replace(/[^a-z]/g, "");
    let asciiSum = 0;
    for (let i = 0; i < combined.length; i++) asciiSum += combined.charCodeAt(i) * (i + 1);

    let setBoy = new Set(boy);
    let setGirl = new Set(girl);
    let shared = [...setBoy].filter(c => setGirl.has(c)).length;

    let score = (asciiSum % 100) + shared * 5;
    let matchPercentage = Math.min(100, Math.max(10, score));

    const messages = [
        "🔥 Perfect Match!💞 Love is calling—will you answer? 💓",
        "💝 Love is knocking... will you open the door? 🚪",
        "🤔 Not bad! Maybe a little more magic? 🎩✨",
        "😜 You’re the perfect partners… in crime! Not in love 🔍😂",
        "😂 Cupid needs a break! Try again later 🏹",
        "👀 Destiny just winked at you 😉"
    ];
    const msg = matchPercentage >= 90 ? messages[0] : matchPercentage >= 70 ? messages[1] : matchPercentage >= 50 ? messages[2] : messages[3];

    const resultText = `❤️ ${capitalize(boy)} & ${capitalize(girl)} have a ${matchPercentage}% match!<br>${msg}`;
    document.getElementById("result").innerHTML = resultText;

    const entry = `${capitalize(boy)} ❤️ ${capitalize(girl)} - ${matchPercentage}%`;
    if (!recentMatches.includes(entry)) {
        recentMatches.unshift(entry);
        if (recentMatches.length > 5) recentMatches.pop();
        localStorage.setItem("recentMatches", JSON.stringify(recentMatches));
    }
    updateRecentMatches();
    localStorage.setItem("lastResult", resultText.replace(/<br>/g, "\n"));
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateRecentMatches() {
    const list = document.getElementById("recentList");
    list.innerHTML = "";
    recentMatches.forEach(match => {
        let li = document.createElement("li");
        li.textContent = match;
        list.appendChild(li);
    });
}
updateRecentMatches();

function showTab(tab, e) {
    document.getElementById("recent").style.display = "none";
    document.getElementById("rating").style.display = "none";
    document.getElementById(tab).style.display = "block";

    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
}

function rate(stars) {
    document.querySelectorAll(".star").forEach((s, i) => s.classList.toggle("active", i < stars));
    document.getElementById("ratingText").innerText = ["😞 Bad", "😐 Okay", "🙂 Good", "😊 Great", "😍 Amazing!"][stars - 1];
    localStorage.setItem("rating", stars);
}

let savedRating = localStorage.getItem("rating");
if (savedRating) rate(parseInt(savedRating));

function shareResult() {
    let result = localStorage.getItem("lastResult") || "Check your Valentine's Match 💕";
    let url = encodeURIComponent("https://yourwebsite.github.io"); // Change this to your GitHub Pages link
    let text = encodeURIComponent(result);
    window.open(`https://wa.me/?text=${text}%0A${url}`, '_blank');
}
