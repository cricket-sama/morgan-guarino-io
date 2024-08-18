const footerElement = document.createElement('footer');
// footerElement.textContent = 'My Footer';
document.body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('footer');

const copyright = document.createElement('p');
copyright.innerHTML = `<b><i>Morgan Guarino</i></b> &copy ${thisYear}`

footer.appendChild(copyright);

const skills = ['JavaScript', 'HTML', 'CSS', 'GitHub'];

const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
}

