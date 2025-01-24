document.addEventListener("DOMContentLoaded", () => {
    const typingEffect = document.getElementById("typing-effect");
    const texts = [
        "DEV | HTML5 | CSS3 | JavaScript | Cibersegurança |Kali linux"
    ];
    let charIndex = 0;

    function typeText() {
        if (charIndex < texts[0].length) {
            typingEffect.innerHTML = `
                ${texts[0].slice(0, charIndex + 1)}
                <span class="blinking-cursor"></span>`;
            charIndex++;
            setTimeout(typeText, 100); // Velocidade de digitação
        } else {
            typingEffect.innerHTML = `${texts[0]}<span class="blinking-cursor"></span>`;
        }
    }

    typeText(); // Inicia o efeito de digitação
});

document.addEventListener('scroll', () => {
    const aboutCard = document.querySelector('.about-card');
    const rect = aboutCard.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= windowHeight * 0.25 && rect.bottom <= windowHeight * 0.75) {
        aboutCard.classList.add('active');
    } else {
        aboutCard.classList.remove('active');
    }
});

// Adicionando evento apenas para o card
const aboutCard = document.querySelector(".about-card");

aboutCard.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = aboutCard.getBoundingClientRect();

    // Coordenadas relativas ao card
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calcula ângulos de rotação
    const rotateX = (y / height - 0.5) * -20; // Eixo vertical
    const rotateY = (x / width - 0.5) * 20; // Eixo horizontal

    // Aplica a transformação no card
    aboutCard.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)`;
});

// Reseta animação quando o mouse sai do card
aboutCard.addEventListener("mouseleave", () => {
    aboutCard.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
});


document.addEventListener("DOMContentLoaded", () => {
    const typingEffect2 = document.getElementById("typing-effect-2");
    const fixedText = "Gostou do meu trabalho? ";
    const variableTexts = [
      { text: "Entre em Contato!", color: "#00ffcc" }, 
      { text: "Veja meus repositórios Git!", color: "#00ffcc" } ,
      { text: "Acesse meu LinkedIn!", color: "#00ffcc" }, 
      { text: "Mande um email!", color: "#00ffcc" } 
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeSecondEffect() {
      const currentText = variableTexts[textIndex];
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingEffect2.innerHTML = `
        ${fixedText}<span style="color: ${currentText.color};">${currentText.text.slice(0, charIndex)}</span>
        <span class="blinking-cursor"></span>`;

      if (!isDeleting && charIndex === currentText.text.length) {
        setTimeout(() => (isDeleting = true), 2000); // Pausa ao terminar de digitar
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % variableTexts.length; // Alterna para a próxima frase
      }

      const typingSpeed = isDeleting ? 50 : 100; // Velocidade ao apagar e digitar
      setTimeout(typeSecondEffect, typingSpeed);
    }

    typeSecondEffect(); // Inicia o segundo efeito de digitação
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card__article');
  
    // Cria o observer para verificar quando os cards entram na tela
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
     
        if (entry.isIntersecting) {
          entry.target.querySelector('.card__data').classList.add('visible'); 
          observer.unobserve(entry.target); // 
        }
      });
    }, {
      threshold: 0.5 
    });
  
    // Inicia a observação dos cards
    cards.forEach(card => {
      observer.observe(card);
    });
  });
  let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1'); // Define o canvas 
    canvas.position(0, 0); //  canvas  tela

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 58, 67); //  paleta 
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
        for (let j = i + 1; j < particles.length; j++) {
            let d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (d < 80) {
                stroke(0, 255, 204, 100); 
                line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    show() {
        noStroke();
        fill(0, 255, 204);
        circle(this.x, this.y, 5);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
