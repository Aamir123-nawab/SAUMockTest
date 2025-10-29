// View counting system using localStorage (persistent)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize view counts for each test
    const tests = ['math-basic', 'science-advanced', 'english-proficiency', 'gk'];
    
    tests.forEach(test => {
        // Get existing count or initialize to 0
        const count = localStorage.getItem(`view-count-${test}`) || 0;
        updateViewCount(test, parseInt(count));
    });
    
    // Set up click handlers for test links
    document.querySelectorAll('.test-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const test = this.getAttribute('data-test');
            
            // Increment the view count
            incrementViewCount(test);
            
            // Send to PHP backend for permanent storage
            sendViewToServer(test);
        });
    });
    
    // Update total views display
    updateTotalViews();
});

function incrementViewCount(test) {
    const currentCount = parseInt(localStorage.getItem(`view-count-${test}`)) || 0;
    const newCount = currentCount + 1;
    
    // Save to localStorage
    localStorage.setItem(`view-count-${test}`, newCount);
    
    // Update display
    updateViewCount(test, newCount);
    updateTotalViews();
}

function updateViewCount(test, count) {
    const viewElements = document.querySelectorAll(`.view-count[data-test="${test}"]`);
    viewElements.forEach(el => {
        el.textContent = count;
        
        // Add animation effect
        el.parentElement.style.background = '#d4edda';
        setTimeout(() => {
            el.parentElement.style.background = '#eef4ff';
        }, 500);
    });
}

function updateTotalViews() {
    let total = 0;
    document.querySelectorAll('.view-count').forEach(el => {
        total += parseInt(el.textContent) || 0;
    });
    document.getElementById('total-views').textContent = total;
}

// PHP backend integration
function sendViewToServer(test) {
    const currentCount = parseInt(localStorage.getItem(`view-count-${test}`)) || 0;
    
    fetch('php/update_views.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `test=${encodeURIComponent(test)}&count=${currentCount}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('View count updated on server:', data);
    })
    .catch(error => {
        console.error('Error updating view count on server:', error);
    });
}

// Load view counts from server on page load (optional)
function loadViewCountsFromServer() {
    fetch('php/get_views.php')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update local storage and display with server data
            Object.keys(data.views).forEach(test => {
                localStorage.setItem(`view-count-${test}`, data.views[test]);
                updateViewCount(test, data.views[test]);
            });
            updateTotalViews();
        }
    })
    .catch(error => {
        console.error('Error loading view counts from server:', error);
    });
}