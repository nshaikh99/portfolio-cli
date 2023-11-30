function help(args) {
    if(args.length !== 0) return 'error: help: too many arguments!\n'
    return 'The following is a list of available commands:\n  ls\n  cat\n  wget\n  open\n'
}

function ls(args) {
    if(args.length === 0) return 'home.txt    about.txt    skills.txt    projects.txt    resume.pdf\n'
    const files = ['home.txt', 'about.txt', 'skills.txt', 'projects.txt', 'resume.pdf']
    return args.map((file) => files.includes(file) ? file + '\n' : 'ls: ' + file + ': no such file or directory\n')
}

function cat(args) {
    if(args.length === 0) return 'error: cat: no arguments specified!\n'
    const files = ['home.txt', 'about.txt', 'skills.txt', 'projects.txt']
    const content = [
`home.txt
----
Hi, my name is Nabeel Shaikh. I'm a computer science student at UCLA. Welcome to the command-line version of my personal website.
----
`,
`about.txt
----
I am passionate about being part of a team that builds extensible and scalable software for customer-facing applications. My interests lie in the realm of data-driven decision-making and predictive analytics.
----
`,
`skills.txt
----
My favorite technologies to work with are:
  Python
  JavaScript
  Node.js
  Express
  React
  Tailwind
  C++
  scikit-learn
  Git
----
`,
`projects.txt
----
  Bingsoo: a configurable multi-threaded web server with support for echoing HTTP requests, serving static content, handling CRUD API requests, and rendering HTML from Markdown
  Project Theia: a full stack web application that can take snapshots of websites from different geographic locations
  Heart Disease Binary Classification: a series of models that predict whether a patient will suffer from heart disease with up to 85% accuracy based on age, sex, lab results, and history of disease
----
`
    ]
    return args.map((file) => file === 'resume.pdf' ? 'error: cat: cannot cat resume.pdf, did you mean wget?\n' : files.includes(file) ? content[files.indexOf(file)] : 'cat: ' + file + ': no such file or directory\n')
}

function wget(args) {
    if(args.length === 0) return 'error: wget: no arguments specified!\n'
    for(let i = 0; i < args.length; i++) {
        switch(args[i]) {
            case 'resume.pdf':
                window.open('https://www.nabeelshaikh.com/static/media/Resume%20-%20Nabeel%20Shaikh.d2cb1549442cf6e4240c.pdf', '_blank')
                return 'Opening file in new window...'
            default:
                window.open(args[i].slice(0, 7) === 'http://' || args[i].slice(0, 8) === 'https://' ? args[i] : 'http://' + args[i], '_blank')
                return 'Opening URL in new window...'
        }
    }
}

function open(args) {
    if(args.length === 0) return 'error: open: no URL specified!\n'
    if(args.length !== 1) return 'error: help: too many arguments!\n'
    window.open(args[0].slice(0, 7) === 'http://' || args[0].slice(0, 8) === 'https://' ? args[0] : 'http://' + args[0], '_blank')
    return 'Opening URL in new window...'
}

export default function compute(line) {
    const args = line.split(' ')
    const cmd = args.shift()

    switch(cmd) {
        case 'help':
            return help(args)
        case 'ls':
            return ls(args)
        case 'cat':
            return cat(args)
        case 'wget':
            return wget(args)
        case 'open':
            return open(args)
        default:
            return 'command not found: ' + cmd + '\n'
    }
}