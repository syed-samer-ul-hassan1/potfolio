document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('thumbnail', document.getElementById('thumbnail').files[0]);
    formData.append('liveLink', document.getElementById('live-link').value);

    fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Project uploaded successfully!');
        document.getElementById('upload-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error uploading project.');
    });
});