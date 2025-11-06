// ===== Site Data =====
const siteData = {
    siteName: "Rich Kidz",
    phonesit: "+91 7710355519",
    phonesit2: "+91 7710655519",
    timeopen: "9:30 AM – 8:00 PM (All Days Open)",
    email: "info@richkidz.in",
    address: "503-A, Model Town Extension., Adjn. Spacex Gym, Near New Krishna Mandir, Ludhiana, Punjab, 141002",
    aboutText: "Welcome to Rich Kidz – shaping creativity and confidence in every child."
};

// ===== Function to apply site data =====
function applySiteData() {
    document.querySelectorAll("[data-site]").forEach(el => {
        const key = el.getAttribute("data-site");
        const value = siteData[key];
        if (!value) return;

        if (key === "phonesit" || key === "phonesit2") {
            el.innerHTML = `<a href="tel:${value}" class="text-white text-decoration-none">${value}</a>`;
        } 
        else if (key === "email") {
            el.innerHTML = `<a href="mailto:${value}" class="text-white text-decoration-none">${value}</a>`;
        } 
        else if (key === "timeopen") {
            el.textContent = value;  
        } 
        else {
            el.textContent = value;
        }
    });
}

// ===== Include HTML function (like include-html.js) =====
function includeHTML(callback) {
    const elements = document.querySelectorAll("[include-html]");
    let total = elements.length;
    if (total === 0 && callback) callback();

    elements.forEach(el => {
        const file = el.getAttribute("include-html");
        if (!file) return;

        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
                applySiteData(); // Apply data to included content
                if (--total === 0 && callback) callback();
            })
            .catch(err => {
                el.innerHTML = `<div class="text-danger small">Error loading ${file}: ${err}</div>`;
                if (--total === 0 && callback) callback();
            });
    });
}

// ===== Back to Top Button =====
function setupBackToTopButton() {
    const btn = document.getElementById("backToTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===== Run on page load =====
document.addEventListener("DOMContentLoaded", () => {
    applySiteData();
    includeHTML(() => {
        setupBackToTopButton(); // Initialize after HTML includes
    });
});
