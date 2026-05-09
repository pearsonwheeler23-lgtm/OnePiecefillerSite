let episodes = [];

const episodeList = document.getElementById("episode-list");
const searchInput = document.getElementById("search");

// Load data
fetch("episodes.json")
  .then(res => res.json())
  .then(data => {
    episodes = data;
    displayEpisodes(episodes);
  });

// DISPLAY EPISODES
function displayEpisodes(list) {
  episodeList.innerHTML = "";

  list.forEach(ep => {
    const div = document.createElement("div");

    let className = "canon";
    if (ep.type === "Filler") className = "filler";
    if (ep.type === "Mixed Canon/Filler") className = "mixed";

    div.className = `episode ${className}`;

    div.innerHTML = `
      <h3>${ep.title}</h3>
      <p>Episode ${ep.number}</p>
      <small>Arc: ${ep.arc}</small>
      <strong>${ep.type}</strong>
    `;

    episodeList.appendChild(div);
  });
}

// TYPE FILTER (Canon / Filler)
window.filterEpisodes = function(type) {
  if (type === "All") {
    displayEpisodes(episodes);
    return;
  }

  const filtered = episodes.filter(ep => ep.type === type);
  displayEpisodes(filtered);
};

// ARC FILTER
window.filterArc = function(arc) {
  if (arc === "All") {
    displayEpisodes(episodes);
    return;
  }

  const filtered = episodes.filter(ep => ep.arc === arc);
  displayEpisodes(filtered);
};

// SEARCH
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = episodes.filter(ep =>
    ep.title.toLowerCase().includes(value) ||
    ep.number.toString().includes(value)
  );

  displayEpisodes(filtered);
});
