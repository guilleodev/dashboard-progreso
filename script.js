console.log('funcionando')

fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
        const container = document.getElementById("projects");
        projects.forEach(project => {
            const card = document.createElement("article");
            card.classList.add("project-card");
            card.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <p><strong>Estado:</strong> ${project.status}</p>
    <p><strong>Categoría:</strong> ${project.category}</p>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${project.progress}%"></div>
    </div>
    <p><strong>Siguiente paso:</strong> ${project.nextStep}</p>
  `;
            container.appendChild(card);
        });
    })
    
    .catch((error) => {
        console.error("Error cargando projects.json", error);
    });