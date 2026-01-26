console.log('funcionando')

fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
        const container = document.getElementById("projects");

        projects.forEach(project => {
            const card = document.createElement("article");
            card.classList.add("project-card");

            const progress = Number(project.progress);

            if (progress === 0) {
                card.classList.add("progress-none");
            } else if (progress === 100) {
                card.classList.add("progress-complete");
            } else {
                card.classList.add("progress-some");
            }

            const milestones = Array.isArray(project.milestones) ? project.milestones : [];

            const milestonesHTML = milestones.length
                ? milestones.map(m => `
            <div class="milestone" style="left:${m.value}%">
                <span>${m.label}</span>
            </div>
        `).join("")
                : "";

            // ========== TAREAS COMPLETADAS ==========
            let doneTasksHTML = "";

            if (Array.isArray(project.doneTasks) && project.doneTasks.length > 0) {
                const group = project.doneTasks[0];
                const tasks = Object.values(group);

                doneTasksHTML = tasks
                    .map(task => `<li>${task}</li>`)
                    .join("");
            }

            // ========== TAREAS PENDIENTES ==========
            let undoneTasksHTML = "";

            if (Array.isArray(project.undoneTasks) && project.undoneTasks.length > 0) {
                const group = project.undoneTasks[0];
                const tasks = Object.values(group);

                undoneTasksHTML = tasks
                    .map(task => `<li>${task}</li>`)
                    .join("");
            }
            // ========== ICONOS DE SOFTWARE ==========

            let iconHTML = "";

            if (project.software) {
                // Object.values → ["assets/img/logoWordpress.png", "assets/img/logoElementor.png", ...]
                const icons = Object.values(project.software).filter(Boolean);

                if (icons.length > 0) {
                    iconHTML = `
            <div class="software">
                    <p class="project-software-used"><u>Software:</u></p>
                <div class="software-icons">
                    ${icons.map(src => `<img src="${src}" alt="Software usado">`).join("")}
                </div>
            </div>
        `;
                }
            }

            card.innerHTML = `
    <div class="front">
        <h2 class="project-title">${project.title}</h2>
        <div class="progress-wrapper">
            <div class="progress-bar">
                <div class="progress-fill" style="width:${progress}%">
                    <span class="progress-number">${progress}%</span>
                    <div class="bubbles"></div>
                </div>
                ${milestonesHTML}
            </div>
        </div>
        ${iconHTML}
        <p class="project-description"><u>Descripción:</u> ${project.description}</p>
        <p class="project-status"><u>Estado:</u> ${project.status}</p>
        <p class="project-category"><u>Categoría:</u> ${project.category}</p>
        <p class="card-click">PULSA PARA GIRAR</p>

        
    </div>

    <div class="back">
        <h3>Tareas completadas</h3>
        <ul>
            ${doneTasksHTML || "<li>No hay tareas completadas.</li>"}
        </ul>

        <h3>Tareas por completar</h3>
        <ul>
            ${undoneTasksHTML || "<li>No hay tareas pendientes.</li>"}
        </ul>
        <p class="card-click">PULSA PARA GIRAR</p>
    </div>
`;

            card.addEventListener("click", () => {
                card.classList.toggle("flipped");
            });

            container.appendChild(card);
        });

    })
    .catch((error) => {
        console.error("Error cargando projects.json", error);
    });

const banner = document.getElementById("info-banner");
const closeBtn = document.getElementById("close-banner");

if (localStorage.getItem("infoBannerSeen")) {
    banner.style.display = "none";
}

closeBtn.addEventListener("click", () => {
    banner.style.display = "none";
    localStorage.setItem("infoBannerSeen", "true");
});
