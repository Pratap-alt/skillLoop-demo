// components.js
// Data + render functions that create the category cards (using Unsplash images)

// Categories Data (using Unsplash URLs)
const categories = [
    { name: 'Business', courses: 1200, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40' },
    { name: 'Artificial Intelligence', courses: 850, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995' },
    { name: 'Data Science', courses: 950, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
    { name: 'Web Development', courses: 1500, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
    { name: 'Mobile Development', courses: 680, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c' },
    { name: 'Design', courses: 920, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5' },
    { name: 'Marketing', courses: 740, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
    { name: 'Finance', courses: 580, image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e' },
    { name: 'Health & Wellness', courses: 450, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773' },
    { name: 'Languages', courses: 620, image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d' },
    { name: 'Photography', courses: 380, image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d' },
    { name: 'Music', courses: 340, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d' }
];

// (optional) Trending & Featured sample data kept for other render functions
// NOTE: price fields removed
const trendingCourses = [
    { title: 'Machine Learning Specialization', instructor: 'Andrew Ng', category: 'AI', rating: 4.9, reviews: 25000, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995' },
    { title: 'Full Stack Web Development', instructor: 'Angela Yu', category: 'Web Dev', rating: 4.8, reviews: 18000, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
    { title: 'Data Science Professional Certificate', instructor: 'IBM', category: 'Data Science', rating: 4.7, reviews: 15000, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
    { title: 'UX/UI Design Bootcamp', instructor: 'Sarah Chen', category: 'Design', rating: 4.9, reviews: 12000, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5' }
];

const featuredCourses = [
    { title: 'Python for Everybody', instructor: 'Dr. Charles Severance', category: 'Programming', rating: 4.8, reviews: 50000, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935' },
    { title: 'Digital Marketing Masterclass', instructor: 'Neil Patel', category: 'Marketing', rating: 4.7, reviews: 22000, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
    { title: 'iOS App Development', instructor: 'Angela Yu', category: 'Mobile', rating: 4.8, reviews: 16000, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c' },
    { title: 'Financial Markets', instructor: 'Yale University', category: 'Finance', rating: 4.9, reviews: 35000, image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e' }
];

// Testimonials
const testimonials = [
    { name: 'Sarah Johnson', role: 'Data Analyst at Tech Corp', image: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64', testimonial: 'SkillLoop helped me transition into data analytics...' , rating: 5 },
    { name: 'Michael Chen', role: 'Software Developer', image: 'https://images.unsplash.com/photo-1701980889802-55ff39e2e973', testimonial: 'The flexibility to learn at my own pace...', rating: 5 },
    { name: 'Emma Williams', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1762341116897-921e2a52f7ff', testimonial: 'The professional certificates from top universities...', rating: 5 }
];

// Utility: convert a category name to a URL-friendly ID
function slugify(text) {
    return text.toString().toLowerCase()
        .trim()
        .replace(/&/g, '-and-')         // convert & to -and-
        .replace(/[\s\W-]+/g, '-')      // spaces and non-word -> dash
        .replace(/^-+|-+$/g, '');       // trim dashes
}

// Render category cards (each card gets an id slug)
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;

    grid.innerHTML = categories.map(cat => {
        const id = slugify(cat.name); // e.g. "Artificial Intelligence" -> "artificial-intelligence"
        return `
            <div class="category-card" id="${id}">
                <img src="${cat.image}?w=800&h=520&fit=crop" alt="${cat.name}" loading="lazy">
                <div class="category-overlay">
                    <h3>${cat.name}</h3>
                    <p>${cat.courses.toLocaleString()} courses</p>
                </div>
            </div>
        `;
    }).join('');
}

// Render other sections (courses / testimonials) - kept compatible with main.js
function renderCourses(courses, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = courses.map(course => `
        <div class="course-card">
            <img src="${course.image}?w=600&h=350&fit=crop" alt="${course.title}" class="course-image" loading="lazy">
            <div class="course-content">
                <span class="course-category">${course.category}</span>
                <h3>${course.title}</h3>
                <p class="course-instructor">By ${course.instructor}</p>
                <div class="course-footer">
                    <div class="course-rating">
                        <span class="stars">${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5 - Math.floor(course.rating))}</span>
                        <span>${course.rating} (${course.reviews.toLocaleString()})</span>
                    </div>
                    <!-- Price intentionally removed -->
                </div>
            </div>
        </div>
    `).join('');
}

function renderTestimonials() {
    const grid = document.getElementById('testimonialGrid');
    if (!grid) return;

    grid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="quote-icon">"</div>
            <div class="testimonial-profile">
                <img src="${t.image}?w=120&h=120&fit=crop&crop=faces" alt="${t.name}" class="profile-image">
                <div class="profile-info">
                    <h4>${t.name}</h4>
                    <p>${t.role}</p>
                </div>
            </div>
            <div class="testimonial-rating">${'★'.repeat(t.rating)}</div>
            <p class="testimonial-text">"${t.testimonial}"</p>
        </div>
    `).join('');
}
// components.js
// Data + render functions that create the category cards (using Unsplash images)

// Categories Data (using Unsplash URLs)
const categories = [
    { name: 'Business', courses: 1200, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40' },
    { name: 'Artificial Intelligence', courses: 850, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995' },
    { name: 'Data Science', courses: 950, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
    { name: 'Web Development', courses: 1500, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
    { name: 'Mobile Development', courses: 680, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c' },
    { name: 'Design', courses: 920, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5' },
    { name: 'Marketing', courses: 740, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
    { name: 'Finance', courses: 580, image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e' },
    { name: 'Health & Wellness', courses: 450, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773' },
    { name: 'Languages', courses: 620, image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d' },
    { name: 'Photography', courses: 380, image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d' },
    { name: 'Music', courses: 340, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d' }
];

// (optional) Trending & Featured sample data kept for other render functions
// NOTE: price fields removed
const trendingCourses = [
    { title: 'Machine Learning Specialization', instructor: 'Andrew Ng', category: 'AI', rating: 4.9, reviews: 25000, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995' },
    { title: 'Full Stack Web Development', instructor: 'Angela Yu', category: 'Web Dev', rating: 4.8, reviews: 18000, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
    { title: 'Data Science Professional Certificate', instructor: 'IBM', category: 'Data Science', rating: 4.7, reviews: 15000, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
    { title: 'UX/UI Design Bootcamp', instructor: 'Sarah Chen', category: 'Design', rating: 4.9, reviews: 12000, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5' }
];

const featuredCourses = [
    { title: 'Python for Everybody', instructor: 'Dr. Charles Severance', category: 'Programming', rating: 4.8, reviews: 50000, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935' },
    { title: 'Digital Marketing Masterclass', instructor: 'Neil Patel', category: 'Marketing', rating: 4.7, reviews: 22000, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
    { title: 'iOS App Development', instructor: 'Angela Yu', category: 'Mobile', rating: 4.8, reviews: 16000, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c' },
    { title: 'Financial Markets', instructor: 'Yale University', category: 'Finance', rating: 4.9, reviews: 35000, image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e' }
];

// Testimonials
const testimonials = [
    { name: 'Sarah Johnson', role: 'Data Analyst at Tech Corp', image: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64', testimonial: 'SkillLoop helped me transition into data analytics...' , rating: 5 },
    { name: 'Michael Chen', role: 'Software Developer', image: 'https://images.unsplash.com/photo-1701980889802-55ff39e2e973', testimonial: 'The flexibility to learn at my own pace...', rating: 5 },
    { name: 'Emma Williams', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1762341116897-921e2a52f7ff', testimonial: 'The professional certificates from top universities...', rating: 5 }
];

// Utility: convert a category name to a URL-friendly ID
function slugify(text) {
    return text.toString().toLowerCase()
        .trim()
        .replace(/&/g, '-and-')         // convert & to -and-
        .replace(/[\s\W-]+/g, '-')      // spaces and non-word -> dash
        .replace(/^-+|-+$/g, '');       // trim dashes
}

// Render category cards (each card gets an id slug)
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;

    grid.innerHTML = categories.map(cat => {
        const id = slugify(cat.name); // e.g. "Artificial Intelligence" -> "artificial-intelligence"
        return `
            <div class="category-card" id="${id}">
                <img src="${cat.image}?w=800&h=520&fit=crop" alt="${cat.name}" loading="lazy">
                <div class="category-overlay">
                    <h3>${cat.name}</h3>
                    <p>${cat.courses.toLocaleString()} courses</p>
                </div>
            </div>
        `;
    }).join('');
}

// Render other sections (courses / testimonials) - kept compatible with main.js
function renderCourses(courses, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = courses.map(course => `
        <div class="course-card">
            <img src="${course.image}?w=600&h=350&fit=crop" alt="${course.title}" class="course-image" loading="lazy">
            <div class="course-content">
                <span class="course-category">${course.category}</span>
                <h3>${course.title}</h3>
                <p class="course-instructor">By ${course.instructor}</p>
                <div class="course-footer">
                    <div class="course-rating">
                        <span class="stars">${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5 - Math.floor(course.rating))}</span>
                        <span>${course.rating} (${course.reviews.toLocaleString()})</span>
                    </div>
                    <!-- Price intentionally removed -->
                </div>
            </div>
        </div>
    `).join('');
}

function renderTestimonials() {
    const grid = document.getElementById('testimonialGrid');
    if (!grid) return;

    grid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="quote-icon">"</div>
            <div class="testimonial-profile">
                <img src="${t.image}?w=120&h=120&fit=crop&crop=faces" alt="${t.name}" class="profile-image">
                <div class="profile-info">
                    <h4>${t.name}</h4>
                    <p>${t.role}</p>
                </div>
            </div>
            <div class="testimonial-rating">${'★'.repeat(t.rating)}</div>
            <p class="testimonial-text">"${t.testimonial}"</p>
        </div>
    `).join('');
}
