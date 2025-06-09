<<<<<<< HEAD
       // Load view count
       let views = localStorage.getItem("views") || 0;
       views++;
       localStorage.setItem("views", views);
       document.getElementById("viewCount").innerText = views;

       // Load recent matches
       let recentMatches = JSON.parse(localStorage.getItem("recentMatches")) || [];

       function calculateMatch() {

           let matchRating = (random.math())*10;
           
           let boy = document.getElementById("boyName").value.trim().toLowerCase();
           let girl = document.getElementById("girlName").value.trim().toLowerCase();

           if (boy === "" || girl === "") {
               alert("Please enter both names!");
               return;
           }

           let combinedName = (boy + girl).replace(/[^a-z]/g, ""); // Remove non-alphabet characters
           let letterCounts = {};

           // Count occurrences of each letter
           for (let char of combinedName) {
               letterCounts[char] = (letterCounts[char] || 0) + 1;
           }

           // Calculate match percentage based on letter counts
           let total = Object.values(letterCounts).reduce((sum, num) => sum + num, 0);
           let matchPercentage = (total % 100) + 10; // Ensures it's between 10-100%

           let message = "";
           if (matchPercentage > 80) {
               message = "🔥 Perfect Match!💞 Love is calling—will you answer? 💓";
           } else if (matchPercentage > 50) {
               message = "💝 Love is knocking... will you open the door? 🚪";
           } else if (matchPercentage > 30) {
               message =  "🤔 Not bad! Maybe a little more magic? 🎩✨";
           } else {
               message =  "😜 You’re the perfect partners… in crime!Not in love🔍😂";
           }

           let resultText = `❤️ ${boy} & ${girl} have a ${matchPercentage}% match! <br> ${message}`;
           document.getElementById("result").innerHTML = resultText;

           // Save recent match
           let formattedNames = `${boy.charAt(0).toUpperCase() + boy.slice(1)} ❤️ ${girl.charAt(0).toUpperCase() + girl.slice(1)} - ${matchPercentage}%`;
           recentMatches.unshift(formattedNames);
           if (recentMatches.length > 5) recentMatches.pop(); // Keep last 5 matches
           localStorage.setItem("recentMatches", JSON.stringify(recentMatches));

           updateRecentMatches();
       }

       // Update recent matches list
       function updateRecentMatches() {
           let recentList = document.getElementById("recentList");
           recentList.innerHTML = "";
           recentMatches.forEach(match => {
               let li = document.createElement("li");
               li.textContent = match;
               recentList.appendChild(li);
           });
       }
       updateRecentMatches();

       // Tab switching
       function showTab(tab) {
           document.getElementById("recent").style.display = "none";
           document.getElementById("rating").style.display = "none";
           document.getElementById(tab).style.display = "block";

           document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
           event.target.classList.add("active");
       }

       // Rating system
       function rate(stars) {
           document.querySelectorAll(".star").forEach((star, index) => {
               star.classList.toggle("active", index < stars);
           });
           let messages = ["😞 Bad", "😐 Okay", "🙂 Good", "😊 Great", "😍 Amazing!"];
           document.getElementById("ratingText").innerText = `You rated: ${messages[stars - 1]}`;
           localStorage.setItem("rating", stars);
       }

       // Load previous rating
       let savedRating = localStorage.getItem("rating");
       if (savedRating) {
           rate(parseInt(savedRating));
       }
=======
// Load and update view count
let views = localStorage.getItem("views") || 0;
views++;
localStorage.setItem("views", views);
document.getElementById("viewCount").innerText = views;

// Load and show previous rating
let savedRating = localStorage.getItem("rating");
if (savedRating) rate(parseInt(savedRating));

let recentMatches = JSON.parse(localStorage.getItem("recentMatches")) || [];

function calculateMatch() {
    let boy = document.getElementById("boyName").value.trim().toLowerCase();
    let girl = document.getElementById("girlName").value.trim().toLowerCase();

    if (boy === "" || girl === "") {
        alert("Please enter both names!");
        return;
    }

    let combined = (boy + girl).replace(/[^a-z]/g, "");

    // Step 1: ASCII sum of characters
    let asciiSum = 0;
    for (let i = 0; i < combined.length; i++) {
        asciiSum += combined.charCodeAt(i) * (i + 1);  // weight position
    }

    // Step 2: Count shared characters
    let sharedLetters = 0;
    let setBoy = new Set(boy);
    let setGirl = new Set(girl);
    setBoy.forEach(char => {
        if (setGirl.has(char)) sharedLetters++;
    });

    // Step 3: Weighted calculation
    let rawScore = asciiSum % 100;
    let matchPercentage = Math.floor((rawScore + sharedLetters * 7) % 101); // bonus from shared letters

    // Step 4: Clamp result between 10 and 100
    if (matchPercentage < 10) matchPercentage += 10;
    if (matchPercentage > 100) matchPercentage = 100;

    // Funny messages
    const messages = [
        "🔥 Perfect Match!💞 Love is calling—will you answer? 💓",
        "💝 Love is knocking... will you open the door? 🚪",
        "🤔 Not bad! Maybe a little more magic? 🎩✨",
        "😜 You’re the perfect partners… in crime! Not in love 🔍😂",
        "😂 Cupid needs a break! Try again later 🏹",
        "👀 Destiny just winked at you 😉"
    ];
    let messageIndex = matchPercentage >= 90 ? 0 : matchPercentage >= 70 ? 1 : matchPercentage >= 50 ? 2 : 3;
    let message = messages[messageIndex];

    // Show result
    let resultText = `❤️ ${boy} & ${girl} have a ${matchPercentage}% match!<br>${message}`;
    document.getElementById("result").innerHTML = resultText;

    // Save match
    let formattedNames = `${capitalize(boy)} ❤️ ${capitalize(girl)} - ${matchPercentage}%`;
    if (!recentMatches.includes(formattedNames)) {
        recentMatches.unshift(formattedNames);
        if (recentMatches.length > 5) recentMatches.pop();
        localStorage.setItem("recentMatches", JSON.stringify(recentMatches));
        updateRecentMatches();
    }

    localStorage.setItem("lastResult", resultText.replace(/<br>/g, "\n"));
}


function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function updateRecentMatches() {
    let recentList = document.getElementById("recentList");
    recentList.innerHTML = "";
    recentMatches.forEach(match => {
        let li = document.createElement("li");
        li.textContent = match;
        recentList.appendChild(li);
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
    document.querySelectorAll(".star").forEach((star, index) => {
        star.classList.toggle("active", index < stars);
    });
    const messages = ["😞 Bad", "😐 Okay", "🙂 Good", "😊 Great", "😍 Amazing!"];
    document.getElementById("ratingText").innerText = `You rated: ${messages[stars - 1]}`;
    localStorage.setItem("rating", stars);
}

function shareResult() {
    let result = localStorage.getItem("lastResult") || "Check your Valentine's Match 💕";
    let url = encodeURIComponent("https://yourwebsite.github.io"); // Replace with your deployed site
    let text = encodeURIComponent(result);

    let shareLink = `https://wa.me/?text=${text}%0A${url}`;
    window.open(shareLink, '_blank');
}
>>>>>>> change both files
