const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

// Serve static files from "assets" folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve static files from the root folder (so index.html can be served)
app.use(express.static(path.join(__dirname)));

// Ensure the assets directory exists
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Projects data file
const projectsFile = path.join(__dirname, 'projects.json');

// Helper function to read projects from file
const readProjects = () => {
    if (!fs.existsSync(projectsFile)) {
        return [];
    }
    const data = fs.readFileSync(projectsFile);
    return JSON.parse(data);
};

// Helper function to write projects to file
const writeProjects = (projects) => {
    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
};

// API endpoint to get all projects
app.get('/api/projects', (req, res) => {
    res.json(readProjects());
});

// API endpoint to upload a new project
app.post('/api/projects', upload.single('thumbnail'), (req, res) => {
    const newProject = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        thumbnail: `/assets/${req.file.filename}`,
        liveLink: req.body.liveLink
    };
    const projects = readProjects();
    projects.push(newProject);
    writeProjects(projects);
    res.status(201).json(newProject);
});

// Fallback route to serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
