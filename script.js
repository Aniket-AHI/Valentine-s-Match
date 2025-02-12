       // Load view count
       let views = localStorage.getItem("views") || 0;
       views++;
       localStorage.setItem("views", views);
       document.getElementById("viewCount").innerText = views;

       // Load recent matches
       let recentMatches = JSON.parse(localStorage.getItem("recentMatches")) || [];

       function calculateMatch() {
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