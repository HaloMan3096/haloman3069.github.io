document.addEventListener("DOMContentLoaded", function () {
    const siteRoot = "final_site";
    const currentPath = window.location.pathname;

    const rootIndex = currentPath.indexOf(siteRoot);
    if (rootIndex === -1) {
        console.error("Couldn't find final_site/ in the path:", currentPath);
        return;
    }

    const afterRoot = currentPath.slice(rootIndex + siteRoot.length);
    const depth = afterRoot.split("/").filter(Boolean).length;

    // Never go above final_site
    let prefix = "";
    for (let i = 1; i < depth; i++) {
        prefix += "../";
    }

    const navbarPath = `${prefix}assets/html/nav-bar.html`;

    fetch(navbarPath)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById("navbar-placeholder");
            container.innerHTML = data;

            // Fix links inside the loaded navbar
            container.querySelectorAll("a").forEach(link => {
                const href = link.getAttribute("href");

                if (!href || href.startsWith("http") || href.startsWith("/")) return;

                // Fix *all* internal links by prepending the right prefix
                link.setAttribute("href", prefix + href);
            });
        })
        .catch(error => console.error("Failed to load navbar:", error));
});
