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

            <p class="project-description"><u>Descripción:</u> ${project.description}</p>
            <p class="project-status"><u>Estado:</u> ${project.status}</p>
            <p class="project-category"><u>Categoría:</u> ${project.category}</p>
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
