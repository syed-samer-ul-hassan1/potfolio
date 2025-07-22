document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projects-container');

    fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then(projects => {
            if (projects.length > 0) {
                projects.forEach(project => {
                    const projectCard = `
                        <div class="bg-gray-800 p-8 rounded-lg min-w-[300px]">
                            <img src="http://localhost:3000${project.thumbnail}" alt="${project.title}" class="rounded-lg mb-4">
                            <h3 class="text-2xl font-bold">${project.title}</h3>
                            <p class="text-gray-400 mt-2">${project.description}</p>
                            <a href="${project.liveLink}" target="_blank" class="text-green-500 font-bold mt-4 inline-block">View Live</a>
                        </div>
                    `;
                    projectsContainer.innerHTML += projectCard;
                });
            } else {
                projectsContainer.innerHTML = '<p class="text-gray-400">No projects to display yet.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            projectsContainer.innerHTML = '<p class="text-red-500">Error loading projects.</p>';
        });
});