gsap.registerPlugin(ScrollTrigger);

async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderFeaturedProducts(data.featuredProducts);
        renderTopProducts(data.topProducts);
        lucide.createIcons();
        initAnimations();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderFeaturedProducts(products) {
    const container = document.getElementById('featured-container');
    container.innerHTML = products.map(product => `
        <div class="card-hover bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 reveal-item">
            <div class="h-72 bg-gray-50 overflow-hidden flex items-center justify-center">
              <img src="${product.image}" alt="${product.name}" class="max-h-full object-contain transition-transform duration-700 hover:scale-105">
          </div>
            <div class="p-6 flex flex-col h-[220px]">
                <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                <p class="text-gray-500 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">${product.description}</p>
                <a href="${product.url}" target="_blank" class="btn-primary w-full py-3 rounded-xl text-sm font-medium text-center">
                Comprar en Amazon
                </a>
                <p class="rating">${product.rating}</p>
            </div>
        </div>
    `).join('');
}

function renderTopProducts(products) {
    const container = document.getElementById('top-container');
    container.innerHTML = products.map((product, index) => `
        <div class="top-list-item p-8 flex flex-col md:flex-row items-start md:items-center gap-6 reveal-item">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center font-semibold text-xl text-gray-300 border border-gray-100">
                ${index + 1}
            </div>
            <div class="flex-grow">
                <h3 class="font-semibold text-xl mb-2">${product.name}</h3>
                <p class="text-gray-500 text-sm md:text-base">${product.description}</p>
            </div>
            <div class="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <a href="${product.url}" class="btn-primary block px-6 py-3 rounded-xl text-sm font-medium text-center whitespace-nowrap">Comprar en Amazon</a>
            </div>
        </div>
    `).join('');
}

function initAnimations() {
    gsap.from(".reveal-hero", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.utils.toArray(".reveal-section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray("#featured-container .reveal-item").forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: "#featured-container",
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out"
        });
        gsap.set(item, { y: 40, opacity: 0 });
    });

    gsap.utils.toArray("#top-container .reveal-item").forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: "#top-container",
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration: 0.6,
            delay: i * 0.15,
            ease: "power2.out"
        });
        gsap.set(item, { y: 20, opacity: 0 });
    });
}

document.addEventListener('DOMContentLoaded', loadData);
