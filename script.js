
        AOS.init({
            duration: 800, // values from 0 to 3000, with step 50ms
            once: true, // whether animation should happen only once - while scrolling down
        });

        // Dynamic Year for Footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // Burger Menu Toggle
        const burgerMenu = document.getElementById('burger-menu');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = navMenu.querySelectorAll('a');

        burgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('nav-active');
            burgerMenu.classList.toggle('toggle');
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true' || false;
            burgerMenu.setAttribute('aria-expanded', !isExpanded);
        });

        // Close nav menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('nav-active')) {
                    navMenu.classList.remove('nav-active');
                    burgerMenu.classList.remove('toggle');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Navbar hide on scroll down, show on scroll up
        let lastScrollTop = 0;
        const header = document.getElementById('main-header');
        const headerHeight = header.offsetHeight;

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > headerHeight * 2) { // scroll down
                header.classList.add('nav-hidden');
            } else { // scroll up or at top
                header.classList.remove('nav-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }, false);


        // Active Nav Link Highlighting on Scroll
        const sections = document.querySelectorAll('main section[id]');
        function navHighlighter() {
            let scrollY = window.pageYOffset;
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 100; // Adjusted for header height
                let sectionId = current.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
                } else {
                    document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
                }
            });
        }
        window.addEventListener('scroll', navHighlighter);
        navHighlighter(); // Call on load

        // Sprinkles Canvas (Optional - basic version, replace with your actual script.js if more complex)
        const canvas = document.getElementById('sprinkles-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particles = [];
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            function Particle(x, y, size, color, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.color = color;
                this.speedX = speedX;
                this.speedY = speedY;
            }

            Particle.prototype.update = function() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.05; // Shrink
            };

            Particle.prototype.draw = function() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            };

            function createParticles(e) {
                const xPos = e.clientX || (e.touches && e.touches[0].clientX);
                const yPos = e.clientY || (e.touches && e.touches[0].clientY);
                if (!xPos && !yPos) return;

                for (let i = 0; i < 2; i++) { // Number of particles per event
                    particles.push(new Particle(
                        xPos,
                        yPos,
                        Math.random() * 3 + 1, // Size
                        `rgba(186, 24, 27, ${Math.random() * 0.5 + 0.2})`, // Color (secondary with opacity)
                        (Math.random() - 0.5) * 2, // speedX
                        (Math.random() - 0.5) * 2  // speedY
                    ));
                }
            }
            
            // Create particles on mouse move
            // window.addEventListener('mousemove', createParticles);
            // window.addEventListener('touchmove', createParticles); // For touch devices

            // Create initial random particles for subtle background effect
            function initParticles() {
                for (let i = 0; i < 20; i++) { // Number of initial particles
                    particles.push(new Particle(
                        Math.random() * canvas.width,
                        Math.random() * canvas.height,
                        Math.random() * 2 + 0.5, // Size
                        `rgba(186, 24, 27, ${Math.random() * 0.2 + 0.1})`, // Color (secondary with low opacity)
                        (Math.random() - 0.5) * 0.3, // speedX (slower)
                        (Math.random() - 0.5) * 0.3  // speedY (slower)
                    ));
                }
            }
            initParticles();


            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                    if (particles[i].size <= 0.2 || 
                        particles[i].x < 0 || particles[i].x > canvas.width ||
                        particles[i].y < 0 || particles[i].y > canvas.height) {
                        particles.splice(i, 1);
                        i--;
                    }
                }
                requestAnimationFrame(animateParticles);
            }
            animateParticles();

            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                // Re-initialize or adjust particles if needed on resize
            });
        } else {
            console.log("Sprinkles canvas not found.");
        }
 