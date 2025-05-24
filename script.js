  const teams = [
      {
        id: "team1",
        name: "NAVI",
        image: "img/navi.png",
        description: "Top-tier team from Europe",
      },
      {
        id: "team2",
        name: "Team Liquid",
        image: "img/teamLiquid.png",
        description: "Aggressive and strategic squad",
      },
      {
        id: "team3",
        name: "BNE",
        image: "img/bne.png",
        description: "Kosovo's Passion and Legacy",
      },
    ];

    const container = document.getElementById("team-cards");

    teams.forEach(team => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${team.image}" alt="${team.name}" />
        <h2>${team.name}</h2>
        <p>${team.description}</p>
      `;

      card.addEventListener("click", () => {
        // Navigate to team page with team id as query param
        window.location.href = `teams.html?team=${team.id}`;
      });

      container.appendChild(card);
    });