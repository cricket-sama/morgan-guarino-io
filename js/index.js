// Add footer
const footerElement = document.createElement('footer');
document.body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('footer');

const copyright = document.createElement('p');
copyright.innerHTML = `<b><i>Morgan Guarino</i></b> &copy ${thisYear}`

footer.appendChild(copyright);

//Add skills to skills section
const skills = [
    'Languages: JavaScript, HTML, CSS',
    'Libraries and Frameworks: React, Vite, Tailwind CSS',
    'Project Management Tools: GitHub, Jira',
    'Areas of Knowledge: Frontend Development, Design, Debugging',
    'Soft Skills: Communication, Empathy, Teamwork, Adaptability'
];

const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
}

// Display messages section only if there are messages
function checkListContents() {
    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');

    if (messageList.children.length === 0) {
        messageSection.style.display = 'none';
    } else {
        messageSection.style.display = 'block';
    }
}

checkListContents();

// Create form for leaving messages
const messageForm = document.querySelector('form[name="leave_message"]');

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = event.target.elements['usersName'].value;
    const email = event.target.elements['usersEmail'].value;
    const message = event.target.elements['usersMessage'].value;

    console.log(name, email, message);

    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');

    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span> : ${message} </span>`;

    const removeButton = document.createElement('button');
    removeButton.innerText = "remove";
    removeButton.type = "button";
    removeButton.addEventListener('click', function() {
        const entry = removeButton.parentNode;
        entry.remove();
        checkListContents();
    });
    
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset(); 

    checkListContents();
});

// Display projects from Github
fetch('https://api.github.com/users/cricket-sama/repos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Oops! Request Failed');
        }
        return response.json();
    })
    .then(repositories => {
        console.log(repositories);
        
        const projectSection = document.querySelector('#projects');
        const projectList = projectSection.querySelector('ul');

        for (let i = 0; i < repositories.length; i++) {
            let project = document.createElement('li');
            let link = document.createElement('a');
            link.href = repositories[i].html_url;
            link.textContent = repositories[i].name;
            link.target = "_blank";

            project.appendChild(link);
            
            projectList.appendChild(project);
        }
    })
    .catch(error => {
        console.error(error);

        const projectSection = document.querySelector('#projects');
        const errorMessage = document.createElement('div');

        errorMessage.innerText = 'Uh-oh! There was an issue finding the repositories :(';
        errorMessage.style.color = 'red';
        const projectList = projectSection.querySelector('ul');
        projectList.appendChild(errorMessage);
    });

