      let compMove = "";
      let playermove = "";
      let result = "";
      let score = JSON.parse(localStorage.getItem("score")) || {
        wins: 0,
        losses: 0,
        ties: 0,
      };
      function updateScoreElement() {
        document.querySelector(
          ".js-score"
        ).innerHTML = `Wins:${score.wins},Losses:${score.losses},Ties:${score.ties}`;
      }

      let isautoplaying = false;
      let intervalId;
      function autoplay() {
        if (!isautoplaying) {
          document.querySelector(".js-autoplay").innerHTML = "Stop Playing";
          intervalId = setInterval(() => {
            const playermove = pickcompmove();
            playGame(playermove);
          }, 1000);
          isautoplaying = true;
        } else {
          document.querySelector(".js-autoplay").innerHTML = "Auto Play";
          clearInterval(intervalId);
          isautoplaying = false;
        }
      }
      document.querySelector(".js-autoplay").addEventListener("click", () => {
        autoplay();
      });
      document
        .querySelector(".js-rock-button")
        .addEventListener("click", () => {
          playGame("Rock");
        });
      document
        .querySelector(".js-paper-button")
        .addEventListener("click", () => {
          playGame("Paper");
        });
      document
        .querySelector(".js-scissors-button")
        .addEventListener("click", () => {
          playGame("Scissors");
        });
      document.body.addEventListener("keydown", (event) => {
        if (event.key === "r") {
          playGame("Rock");
        } else if (event.key === "p") {
          playGame("Paper");
        } else if (event.key === "s") {
          playGame("Scissors");
        } else if (event.key === "a") {
          autoplay();
        } else if (event.key === "Backspace") {
          showResetConfirmation();
        }
      });
      function resetScore() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem("score");
        updateScoreElement();
      }
      document
        .querySelector(".reset-score-button")
        .addEventListener("click", () => {
          showResetConfirmation();
        });

      document.querySelector(".js-reset").addEventListener("click", () => {
        showResetConfirmation();
      });

      function showResetConfirmation() {
        document.querySelector(".js-reset-confirmation").innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">Yes
          </button>
        <button class="js-reset-confirm-no reset-confirm-button">No</button>`;
        document
          .querySelector(".js-reset-confirm-yes")
          .addEventListener("click", () => {
            resetScore();
            hideResetconfirmation();
            document.querySelector(".js-moves").innerHTML = "";
          });
        document
          .querySelector(".js-reset-confirm-no")
          .addEventListener("click", () => {
            hideResetconfirmation();
          });
      }
      function hideResetconfirmation() {
        document.querySelector(".js-reset-confirmation").innerHTML = "";
      }
      function playGame(playermove) {
        const compmove = pickcompmove();
        if (playermove === "Rock") {
          if (compMove === "Rock") {
            result = "Ties";
          } else if (compMove === "Paper") {
            result = "You Win.";
          } else {
            result = "You Lose.";
          }
        }
        if (playermove === "Paper") {
          if (compMove === "Paper") {
            result = "Tie.";
          } else if (compMove === "Rock") {
            result = "You Win.";
          } else {
            result = "You Lose.";
          }
        }
        if (playermove === "Scissors") {
          if (compMove === "Scissors") {
            result = "Tie.";
          } else if (compMove === "Rock") {
            result = "You Win.";
          } else {
            result = "You Lose.";
          }
        }
        if (result === "You Win.") {
          score.wins += 1;
        } else if (result === "You Lose.") {
          score.losses += 1;
        } else {
          score.ties += 1;
        }
        localStorage.setItem("score", JSON.stringify(score));
        updateScoreElement();
        document.querySelector(
          ".js-moves"
        ).innerHTML = `You <img src="/Images/${playermove}-emoji.png" class="img-icon">
        <img src="/Images/${compMove}-emoji.png" class="img-icon">Computer`;
        document.querySelector(".js-result").innerHTML = `${result}`;
      }
      function pickcompmove() {
        const randomnum = Math.random();
        if (randomnum >= 0 && randomnum <= 1) {
          if (randomnum <= 1 / 3) {
            compMove = "Rock";
          } else if (randomnum <= 2 / 3) {
            compMove = "Paper";
          } else {
            compMove = "Scissors";
          }
          return compMove;
        }
      }