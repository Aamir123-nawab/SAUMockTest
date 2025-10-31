// View counting system using localStorage (persistent)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize view counts for each test
    const tests = ['math-basic', 'science-advanced', 'english-proficiency'];
    
    // Start with 25,000 base views (distributed among tests)
    const baseViews = 25000;
    const viewsPerTest = Math.floor(baseViews / tests.length);
    
    tests.forEach(test => {
        // Get existing count or initialize with base views
        let count = localStorage.getItem(`view-count-${test}`);
        if (count === null) {
            // First time - set to base views + some random variation
            const variation = Math.floor(Math.random() * 1000) - 500; // -500 to +500
            count = viewsPerTest + variation;
            localStorage.setItem(`view-count-${test}`, count);
        } else {
            count = parseInt(count);
        }
        updateViewCount(test, count);
    });
    
    // Set up click handlers for test links
    document.querySelectorAll('.test-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const test = this.getAttribute('data-test');
            
            // Increment the view count
            incrementViewCount(test);
        });
    });
    
    // Update total views display
    updateTotalViews();
    
    // Add some random views over time to simulate real traffic
    simulateNaturalGrowth();
});

function incrementViewCount(test) {
    const currentCount = parseInt(localStorage.getItem(`view-count-${test}`)) || 0;
    const newCount = currentCount + 1;
    
    // Save to localStorage
    localStorage.setItem(`view-count-${test}`, newCount);
    
    // Update display
    updateViewCount(test, newCount);
    updateTotalViews();
    
    // Occasionally add bonus views to make it look more natural
    if (Math.random() < 0.3) { // 30% chance
        setTimeout(() => {
            const bonusCount = parseInt(localStorage.getItem(`view-count-${test}`)) || 0;
            localStorage.setItem(`view-count-${test}`, bonusCount + 1);
            updateViewCount(test, bonusCount + 1);
            updateTotalViews();
        }, 1000 + Math.random() * 4000); // 1-5 seconds delay
    }
}

function updateViewCount(test, count) {
    const viewElements = document.querySelectorAll(`.view-count[data-test="${test}"]`);
    viewElements.forEach(el => {
        // Format number with commas
        el.textContent = formatNumber(count);
        
        // Add animation effect
        el.parentElement.style.background = '#d4edda';
        setTimeout(() => {
            el.parentElement.style.background = '';
        }, 500);
    });
}

function updateTotalViews() {
    let total = 0;
    const tests = ['math-basic', 'science-advanced', 'english-proficiency'];
    
    tests.forEach(test => {
        const count = parseInt(localStorage.getItem(`view-count-${test}`)) || 0;
        total += count;
    });
    
    const totalViewsElement = document.getElementById('total-views');
    if (totalViewsElement) {
        totalViewsElement.textContent = formatNumber(total);
    }
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function simulateNaturalGrowth() {
    // Add random views periodically to simulate organic traffic
    setInterval(() => {
        if (Math.random() < 0.4) { // 40% chance every interval
            const tests = ['math-basic', 'science-advanced', 'english-proficiency'];
            const randomTest = tests[Math.floor(Math.random() * tests.length)];
            
            const currentCount = parseInt(localStorage.getItem(`view-count-${randomTest}`)) || 0;
            const newCount = currentCount + 1;
            localStorage.setItem(`view-count-${randomTest}`, newCount);
            updateViewCount(randomTest, newCount);
            updateTotalViews();
        }
    }, 30000); // Check every 30 seconds
    
    // Larger random boosts occasionally
    setInterval(() => {
        if (Math.random() < 0.2) { // 20% chance
            const tests = ['math-basic', 'science-advanced', 'english-proficiency'];
            const randomTest = tests[Math.floor(Math.random() * tests.length)];
            
            const currentCount = parseInt(localStorage.getItem(`view-count-${randomTest}`)) || 0;
            const boost = 3 + Math.floor(Math.random() * 7); // 3-9 views
            const newCount = currentCount + boost;
            localStorage.setItem(`view-count-${randomTest}`, newCount);
            updateViewCount(randomTest, newCount);
            updateTotalViews();
        }
    }, 120000); // Check every 2 minutes
}

// Make sure all test links have proper data-test attributes
document.addEventListener('DOMContentLoaded', function() {
    // Fix data-test attributes for all test links
    const testLinks = document.querySelectorAll('.test-link');
    
    testLinks.forEach((link, index) => {
        // Assign appropriate test types based on content
        const linkText = link.closest('.link-item').querySelector('.link-title').textContent;
        
        if (linkText.includes('Pre Medical')) {
            link.setAttribute('data-test', 'math-basic');
        } else if (linkText.includes('Pre Engineering')) {
            link.setAttribute('data-test', 'science-advanced');
        } else {
            link.setAttribute('data-test', 'english-proficiency');
        }
        
        // Update corresponding view count elements
        const viewCountElement = link.closest('.link-meta').querySelector('.view-count');
        if (viewCountElement) {
            viewCountElement.setAttribute('data-test', link.getAttribute('data-test'));
        }
    });
});

// Reset functionality (for testing purposes - remove in production)
function resetViewCounts() {
    if (confirm('Are you sure you want to reset all view counts?')) {
        const tests = ['math-basic', 'science-advanced', 'english-proficiency'];
        const viewsPerTest = Math.floor(25000 / tests.length);
        
        tests.forEach(test => {
            const variation = Math.floor(Math.random() * 1000) - 500;
            const count = viewsPerTest + variation;
            localStorage.setItem(`view-count-${test}`, count);
            updateViewCount(test, count);
        });
        updateTotalViews();
    }
}

// Make reset function available globally for testing
window.resetViewCounts = resetViewCounts;

// Initialize everything when page loads
window.addEventListener('load', function() {
    updateTotalViews();
});
