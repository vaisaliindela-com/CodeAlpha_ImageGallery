
const images = [
    {
        title: "Mountain Lake",
        category: "nature",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
        alt: "Mountain landscape"
    },
    {
        title: "Ocean Sunset",
        category: "travel",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
        alt: "Ocean and beach"
    },
    {
        title: "Wild Deer",
        category: "animals",
        url: "https://images.unsplash.com/photo-1484406566174-9da000fda645?w=900",
        alt: "Deer in nature"
    },
    {
        title: "City Lights",
        category: "cities",
        url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900",
        alt: "City skyline"
    },
    {
        title: "Green Forest",
        category: "nature",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900",
        alt: "Green forest"
    },
    {
        title: "Golden Retriever",
        category: "animals",
        url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=900",
        alt: "Golden retriever"
    },
    {
        title: "Tropical Beach",
        category: "travel",
        url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900",
        alt: "Tropical beach"
    },
    {
        title: "Modern Architecture",
        category: "cities",
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900",
        alt: "Modern building"
    },
    {
        title: "Beautiful Flowers",
        category: "nature",
        url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900",
        alt: "Colorful flowers"
    },
    {
        title: "Waterfall",
        category: "nature",
        url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=900",
        alt: "Waterfall"
    },
    {
        title: "Cute Cat",
        category: "animals",
        url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900",
        alt: "Cat portrait"
    },
    {
        title: "Delicious Pizza",
        category: "food",
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900",
        alt: "Fresh pizza"
    },
    {
        title: "Coffee Time",
        category: "food",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900",
        alt: "Coffee cup"
    },
    {
        title: "Modern Technology",
        category: "technology",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",
        alt: "Electronic circuit board"
    },
    {
        title: "Sports Car",
        category: "cars",
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900",
        alt: "Sports car"
    }
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCount = document.getElementById("lightbox-count");
const imageCount = document.getElementById("image-count");

let visibleImages = [...images];
let currentIndex = 0;

function renderGallery() {
    gallery.innerHTML = "";

    imageCount.textContent = `Showing ${visibleImages.length} images`;

    if (visibleImages.length === 0) {
        gallery.innerHTML = '<p class="no-results">No images found.</p>';
        return;
    }

    visibleImages.forEach((image, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = image.url;
        img.alt = image.alt;
        img.loading = "lazy";

        img.onerror = function () {
            this.alt = "Image unavailable: " + image.alt;
            this.style.opacity = "0.3";
        };

        const caption = document.createElement("div");
        caption.className = "caption";
        caption.textContent = image.title;

        item.append(img, caption);
        item.addEventListener("click", () => openLightbox(index));

        gallery.appendChild(item);
    });
}

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
    document.getElementById("close").focus();
}

function updateLightbox() {
    const image = visibleImages[currentIndex];

    if (!image) return;

    lightboxImg.src = image.url;
    lightboxImg.alt = image.alt;
    lightboxTitle.textContent = image.title;
    lightboxCount.textContent =
        `${currentIndex + 1} / ${visibleImages.length}`;
}

function nextImage() {
    if (!visibleImages.length) return;

    currentIndex = (currentIndex + 1) % visibleImages.length;
    updateLightbox();
}

function prevImage() {
    if (!visibleImages.length) return;

    currentIndex =
        (currentIndex - 1 + visibleImages.length) % visibleImages.length;

    updateLightbox();
}

function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
}

document.getElementById("next").addEventListener("click", nextImage);
document.getElementById("prev").addEventListener("click", prevImage);
document.getElementById("close").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
    if (event.key === "Escape") closeLightbox();
});

document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filters .active")
            ?.classList.remove("active");

        button.classList.add("active");

        const category = button.dataset.category;

        visibleImages = category === "all"
            ? [...images]
            : images.filter(image => image.category === category);

        renderGallery();
    });
});

renderGallery();
