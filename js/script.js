async function initJar() {
    const container = document.getElementById('star-container');
    const display = document.getElementById('message-display');

    try {
        // Fetching the external JSON file
        const response = await fetch('./json/message.json');
        const data = await response.json();

        data.stars.forEach(starInfo => {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Randomize position if x/y aren't set, otherwise use JSON values
            star.style.left = `${starInfo.x}%`;
            star.style.top = `${starInfo.y}%`;
            star.style.width = `${starInfo.size}px`;
            star.style.height = `${starInfo.size}px`;
            
            // Twinkle effect
            star.style.animation = `twinkle ${3 + Math.random() * 4}s infinite ease-in-out`;
            star.style.animationDelay = `${Math.random() * 5}s`;

            star.addEventListener('click', () => {
                // Update UI Text
                display.style.opacity = 0;
                setTimeout(() => {
                    display.innerText = starInfo.msg;
                    display.style.opacity = 1;
                }, 400);

                // Visual feedback for "collected" star
                star.style.background = "var(--star-visited)";
                star.style.boxShadow = "0 0 20px #fffd9e";
            });

            container.appendChild(star);
        });
    } catch (error) {
        console.error("Error loading stars:", error);
        display.innerText = "The sky is a bit cloudy right now. Check back soon.";
    }
}

document.addEventListener('DOMContentLoaded', initJar);