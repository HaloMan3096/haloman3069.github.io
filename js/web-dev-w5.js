document.addEventListener("DOMContentLoaded", function () {
    const electrons = document.querySelectorAll(".electron");
    let angles = Array.from({ length: electrons.length }, () => Math.random() * 360);
    let speeds = [1.5, 2, 1]; // Different speeds for variety

    function animateElectrons() {
        electrons.forEach((electron, index) => {
            angles[index] += speeds[index]; // Increment angle
            let radian = (angles[index] * Math.PI) / 180;

            // Unique orbit tilt
            let tiltX = index * 40 + 30;
            let tiltY = index * 50 + 20;
            let orbitRadiusX = 80 + index * 10;
            let orbitRadiusZ = 50 + index * 5;

            // Elliptical movement
            let x = orbitRadiusX * Math.cos(radian);
            let z = orbitRadiusZ * Math.sin(radian);

            electron.style.transform = `
                translate(-50%, -50%) 
                rotateX(${tiltX}deg) rotateY(${tiltY}deg) 
                translateX(${x}px) translateZ(${z}px) 
                rotateY(${-tiltY}deg) rotateX(${-tiltX}deg)
            `;

            electron.style.zIndex = z > 0 ? "3" : "1";
        });

        requestAnimationFrame(animateElectrons);
    }

    animateElectrons();
});