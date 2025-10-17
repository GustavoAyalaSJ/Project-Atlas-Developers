document.addEventListener('DOMContentLoaded', function() {
    const profileButton = document.getElementById('profile-button');
    const profileDropdown = document.getElementById('profile-dropdown');

    const notificationsButton = document.getElementById('notifications-button');
    const notificationsDropdown = document.getElementById('notifications-dropdown');

    function toggleDropdown(targetDropdown, otherDropdown) {
        if (otherDropdown.classList.contains('show')) {
            otherDropdown.classList.remove('show');
        }
        targetDropdown.classList.toggle('show');
    }

    profileButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleDropdown(profileDropdown, notificationsDropdown);
    });

    notificationsButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleDropdown(notificationsDropdown, profileDropdown);
    });

    window.addEventListener('click', function() {
        profileDropdown.classList.remove('show');
        notificationsDropdown.classList.remove('show');
    });
});
