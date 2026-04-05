/* main.js */
document.addEventListener("DOMContentLoaded", function() {
    // 1. Setup Global Features
    setupCursor();
    setupActiveLinks();
    setupParticles();
    
    // 2. Setup Page-Specific Features (Only runs if the element exists on the page)
    if(document.getElementById('typing')) setupTypingEffect();
    if(document.querySelector('.bar-fill')) triggerSkillBars();
    if(document.getElementById('terminal-input')) setupTerminal();
    if(document.getElementById('cpu-chart')) initGrafanaCharts();
    if(document.getElementById('repo-list')) fetchGitHubStats();
});

function toggleMenu() { 
    document.getElementById('navMenu').classList.toggle('show'); 
}

function setupCursor() {
    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");
    if(!cursorDot || !cursorOutline) return;

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX; const posY = e.clientY;
        cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    });
    
    const interactiveElements = document.querySelectorAll("a, button, li, .card, .contact-btn, .modal-close-btn, .j-circle");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursorOutline.style.width = "50px"; cursorOutline.style.height = "50px";
            cursorOutline.style.borderColor = "var(--primary)"; cursorOutline.style.backgroundColor = "rgba(56, 189, 248, 0.1)";
        });
        el.addEventListener("mouseleave", () => {
            cursorOutline.style.width = "30px"; cursorOutline.style.height = "30px";
            cursorOutline.style.borderColor = "var(--secondary)"; cursorOutline.style.backgroundColor = "transparent";
        });
    });
}

function setupActiveLinks() {
    // Automatically highlights the nav link matching the current page URL
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-menu li a');
    menuItems.forEach(a => {
        if(a.href === currentLocation) {
            a.parentElement.classList.add('active-link');
        }
    });
}

function setupParticles() {
    if(typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": { "number": { "value": 70 }, "color": { "value": ["#38bdf8", "#6366f1", "#10b981"] }, "opacity": { "value": 0.4 }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 1.2 } },
            "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } } } }
        });
    }
}

function setupTypingEffect() {
    const roles = ["AWS Cloud Engineer", "Kubernetes Specialist", "Terraform / IaC Expert", "CI/CD Automation Expert"];
    let i=0, j=0, isDel=false;
    function type() {
        let current = roles[i];
        document.getElementById('typing').innerHTML = current.substring(0, j) + '<span style="border-right: 2px solid var(--primary); animation: blink 0.7s infinite;"></span>';
        if(!isDel) {
            j++; if(j > current.length) { isDel=true; setTimeout(type, 2000); return; }
        } else {
            j--; if(j === 0) { isDel=false; i = (i+1) % roles.length; }
        }
        setTimeout(type, isDel ? 50 : 100);
    }
    type();
}

function triggerSkillBars() {
    const bars = document.querySelectorAll('.bar-fill');
    setTimeout(() => { bars.forEach(b => b.style.width = b.getAttribute('data-width')); }, 500); 
}

function setupTerminal() {
    const terminalBody = document.getElementById("terminal-body");
    const terminalInput = document.getElementById("terminal-input");
    const terminalCommands = {
        'help': 'Available commands: help, whoami, clear, ls, kubectl get projects, cat skills.txt, cat resume.pdf',
        'ls': 'projects.yaml   resume.pdf   skills.txt   whoami.sh',
        'cat resume.pdf': 'Error: Cannot print binary file to terminal. Please use the "Trigger Build" button in the Home section to download.',
        'whoami': 'Dipak Chavan | DevOps Engineer | AWS Expert',
        'kubectl get projects': 'NAMESPACE\t\tNAME\t\t\t\t\tSTATUS\tAGE\nprojects\t\tgitops-pipeline\t\t\t\tActive\t2h\nprojects\t\teks-migration-enterprise\t\tActive\t2d\nprojects\t\tiac-modules-suite\t\t\tActive\t5d',
        'cat skills.txt': 'Cloud: AWS (EC2, S3, VPC, EKS, IAM, CloudWatch)\nContainers: Docker, Kubernetes, Helm\nIaC: Terraform\nCI/CD: Jenkins, Git, SonarQube\nMonitoring: Prometheus, Grafana',
    };

    terminalInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const command = terminalInput.value.trim();
            const response = terminalCommands[command.toLowerCase()];
            const commandLine = document.createElement("div");
            commandLine.innerHTML = `<span class="t-prompt">dipak-shell:~$</span> <span class="t-command">${command}</span>`;
            terminalBody.insertBefore(commandLine, terminalInput.parentNode);
            terminalInput.value = "";
            const outputSpan = document.createElement("span");
            outputSpan.className = "t-output";
            if (response) {
                outputSpan.textContent = response;
            } else if (command === 'clear') {
                document.querySelectorAll(".t-output, .terminal-body div").forEach(el => el.remove());
                terminalBody.innerHTML = '<div class="t-input-line"><span class="t-prompt">dipak-shell:~$</span><input type="text" id="terminal-input" autofocus></div>';
                document.getElementById("terminal-input").addEventListener("keydown", arguments.callee);
                document.getElementById("terminal-input").focus();
                return;
            } else {
                outputSpan.textContent = `shell: command not found: ${command}. Try 'help'`;
                outputSpan.style.color = "#ff5f56";
            }
            terminalBody.insertBefore(outputSpan, terminalInput.parentNode);
        }
    });
}

function fetchGitHubStats() {
    setTimeout(() => {
        // Updated with your actual 'portfolio' repository
        const topRepos = [
            { name: 'portfolio', stars: 0, forks: 0 },
            { name: 'all-in-one-gitops-pipeline', stars: 21, forks: 8 },
            { name: 'aws-eks-terraform-modules', stars: 15, forks: 6 },
        ];
        const repoList = document.getElementById("repo-list");
        repoList.innerHTML = "";
        topRepos.forEach(repo => {
            const repoItem = document.createElement("li");
            repoItem.className = "repo-item";
            repoItem.innerHTML = `
                <a href="https://github.com/dipakchavan97/${repo.name}" target="_blank">${repo.name}</a>
                <div class="repo-stats">
                    <span class="stat-badge"><i class="fas fa-star"></i> ${repo.stars}</span>
                    <span class="stat-badge"><i class="fas fa-code-branch"></i> ${repo.forks}</span>
                </div>`;
            repoList.appendChild(repoItem);
        });
    }, 1500);
}

function initGrafanaCharts() {
    const cpuChart = document.getElementById('cpu-chart');
    const podChart = document.getElementById('pod-chart');
    for(let i=0; i<20; i++) {
        let cpuBar = document.createElement('div'); cpuBar.className = 'chart-bar'; cpuBar.style.height = Math.floor(Math.random() * 80 + 10) + '%';
        let podBar = document.createElement('div'); podBar.className = 'chart-bar'; podBar.style.height = Math.floor(Math.random() * 40 + 50) + '%';
        podBar.style.background = 'var(--secondary)';
        cpuChart.appendChild(cpuBar); podChart.appendChild(podBar);
    }
    setInterval(() => {
        let newCpu = Math.floor(Math.random() * 60 + 20);
        document.getElementById('cpu-val').innerHTML = newCpu + '<span class="grafana-unit">%</span>';
        cpuChart.removeChild(cpuChart.firstElementChild);
        let newCpuBar = document.createElement('div'); newCpuBar.className = 'chart-bar'; newCpuBar.style.height = newCpu + '%';
        cpuChart.appendChild(newCpuBar);
    }, 2500);
}

/* Modals & Incident Response */
function openModal(id) { document.getElementById(id).style.display = "flex"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }

function revealIncidentStep(stepNum) {
    document.getElementById(`inc-step-${stepNum}`).style.display = 'block';
    document.getElementById(`inc-btn-${stepNum}`).style.borderColor = 'var(--accent-green)';
    document.getElementById(`inc-btn-${stepNum}`).style.color = 'var(--accent-green)';
    document.getElementById(`inc-btn-${stepNum}`).innerHTML = document.getElementById(`inc-btn-${stepNum}`).innerHTML.replace('down', 'check');
    if(document.getElementById(`inc-btn-${stepNum + 1}`)) {
        document.getElementById(`inc-btn-${stepNum + 1}`).style.display = 'block';
    }
}

/* Jenkins Pipeline Simulator & Resume Download Trigger */
function startPipeline() {
    openModal('jenkins-modal');
    const fillLine = document.getElementById('j-fill');
    const logs = document.getElementById('j-logs');
    const steps = [document.getElementById('j-step-1'), document.getElementById('j-step-2'), document.getElementById('j-step-3'), document.getElementById('j-step-4')];
    
    fillLine.style.width = '0%';
    steps.forEach(s => { s.className = 'j-circle'; s.innerHTML = s.getAttribute('data-icon') || s.innerHTML; });
    logs.innerHTML = "[INFO] Initializing pipeline execution...<br>";

    let currentStep = 0;
    const messages = [
        " > git fetch --tags --progress origin<br> > git checkout -b main",
        " > sonar-scanner -Dsonar.projectKey=resume<br> > Quality Gate: PASSED",
        " > compiling LaTeX to PDF...<br> > Output generated: resume.pdf",
        " > aws s3 cp resume.pdf s3://dipak-portfolio/<br> > Upload successful. Pipeline Complete."
    ];

    function runStep() {
        if (currentStep > 0) {
            steps[currentStep-1].classList.remove('active');
            steps[currentStep-1].classList.add('success');
            steps[currentStep-1].innerHTML = '<i class="fas fa-check"></i>';
        }
        if (currentStep < steps.length) {
            fillLine.style.width = (currentStep * 33.3) + '%';
            steps[currentStep].classList.add('active');
            if(!steps[currentStep].hasAttribute('data-icon')) {
                steps[currentStep].setAttribute('data-icon', steps[currentStep].innerHTML);
            }
            setTimeout(() => {
                logs.innerHTML += messages[currentStep] + "<br>";
                logs.scrollTop = logs.scrollHeight;
                currentStep++;
                setTimeout(runStep, 1500);
            }, 1000); 
        } else {
            // Pipeline Finished -> Trigger File Download
            setTimeout(() => {
                logs.innerHTML += "<br><span style='color: var(--accent-green)'>[SUCCESS] Document Ready. Triggering Download...</span>";
                
                let link = document.createElement('a');
                // Make sure your file is named exactly 'resume.pdf' and is in the same folder as your HTML
                link.href = 'resume.pdf'; 
                link.download = 'Dipak_Chavan_Resume.pdf'; // The name the user will see when it downloads
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 1000);
        }
    }
    setTimeout(runStep, 800);
}
