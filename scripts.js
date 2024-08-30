document.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.querySelectorAll('.navbar-menu a');

    // Smooth scrolling for navbar links
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Collapsible sections functionality
    const headers = document.querySelectorAll('.collapsible-header');
    const popupBox = document.querySelector('.popup-box');
    const popupContent = document.querySelector('.popup-content');
    const dimmedBackground = document.querySelector('.dimmed-background');
    const popupClose = document.querySelector('.popup-close');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling.innerHTML;
            popupBox.querySelector('.popup-header').textContent = header.textContent;
            popupContent.innerHTML = content;
            popupBox.style.display = 'block';
            dimmedBackground.style.display = 'block';
        });
    });

    // Close popup functionality
    popupClose.addEventListener('click', () => {
        popupBox.style.display = 'none';
        dimmedBackground.style.display = 'none';
    });

    // Close popup when clicking outside of it
    dimmedBackground.addEventListener('click', () => {
        popupBox.style.display = 'none';
        dimmedBackground.style.display = 'none';
    });

    // List of questions
    const questions = [
        "What are the key responsibilities of this role?",
        "How is success measured in this position?",
        "What opportunities for professional growth does this role offer?",
        "Can you describe the company culture?",
        "What are the biggest challenges facing the team right now?",
        "How does this role contribute to the company's overall goals?",
        "What is the typical career path for someone in this position?", 
        "Can you tell me more about the team I will be working with?",
        "What are the next steps in the interview process?",
        "How does the company support work-life balance?",
        "Are there any upcoming projects or initiatives I should know about?",
        "What is the company's approach to feedback and performance reviews?"
    ];

    const typingSpeed = 50; // Speed of typing effect in milliseconds
    const erasingSpeed = 25;  // Speed of erasing effect in milliseconds
    const delayBetweenQuestions = 1000; // Delay before changing to the next question

    let currentIndex = 0;
    const questionElement = document.querySelector('.navbar-questions');

    function typeQuestion(question, callback) {
        let i = 0;
        questionElement.textContent = '';
        function type() {
            if (i < question.length) {
                questionElement.textContent += question.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(() => eraseQuestion(question, callback), delayBetweenQuestions);
            }
        }
        type();
    }

    function eraseQuestion(question, callback) {
        let i = question.length;
        function erase() {
            if (i > 0) {
                questionElement.textContent = question.substring(0, i - 1);
                i--;
                setTimeout(erase, erasingSpeed);
            } else {
                callback();
            }
        }
        erase();
    }

    function updateQuestion() {
        const question = questions[currentIndex];
        typeQuestion(question, () => {
            currentIndex = (currentIndex + 1) % questions.length;
            setTimeout(updateQuestion, 300); // Small delay before typing the next question
        });
    }

    // Start the typing animation
    updateQuestion();
});
