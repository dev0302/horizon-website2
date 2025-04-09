/**
 * tabs.js - Handles tab functionality and other UI interactions
 */

// Team section tabs functionality
function initTeamTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const searchContainers = document.querySelectorAll('.search-container');
  
    // Hide search container in core team tab by default
    const coreTeamSearch = document.querySelector('#core-team .search-container');
    if (coreTeamSearch) {
        coreTeamSearch.style.display = 'none';
    }
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
  
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        const activeContent = document.getElementById(tabId);
        activeContent.classList.add('active');

        // Show/hide search container based on tab
        searchContainers.forEach(container => {
            if (tabId === 'execoms') {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });

        // Clear search when switching tabs
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            input.value = '';
            input.dispatchEvent(new Event('input'));
        });
      });
    });
  }
  
  // About section scroll animation
  function initAboutAnimation() {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-reveal");
        }
      });
    }, { threshold: 0.3 });
  
    const aboutTarget = document.querySelector(".content-left");
    if (aboutTarget) {
      aboutObserver.observe(aboutTarget);
    }
  }
  
  // Family section scroll animations
  function initFamilyAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal');
            }
        });
    }, observerOptions);

    // Observe all team sections
    document.querySelectorAll('.testimonial-outer, .card, .testimonial-container, .member-list-container').forEach(el => {
        observer.observe(el);
    });
  }
  
  // Event timeline scroll animation
  function initEventAnimations() {
    const eventObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });
  
    document.querySelectorAll('.event-timeline-item').forEach(el => {
      eventObserver.observe(el);
    });
  }
  
  function initTeamSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    const searchButtons = document.querySelectorAll('.search-button');
    const suggestionsContainers = document.querySelectorAll('.search-suggestions');
    const memberLists = document.querySelectorAll('.name-grid span, .testimonial-details h3, .team-heads .members span');

    searchInputs.forEach((searchInput, index) => {
        const suggestionsContainer = suggestionsContainers[index];

        // Show suggestions while typing
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            suggestionsContainer.innerHTML = '';
            
            if (searchTerm.length > 0) {
                const matches = Array.from(memberLists).filter(member => 
                    member.textContent.toLowerCase().includes(searchTerm)
                );

                if (matches.length > 0) {
                    matches.forEach(match => {
                        const suggestion = document.createElement('div');
                        suggestion.className = 'suggestion-item';
                        suggestion.textContent = match.textContent;
                        
                        // Click suggestion to fill search and highlight member
                        suggestion.addEventListener('click', () => {
                            searchInput.value = match.textContent;
                            suggestionsContainer.classList.remove('active');
                            
                            // Remove any existing highlights
                            memberLists.forEach(m => m.classList.remove('member-highlight'));
                            
                            // Add highlight to the selected member
                            match.classList.add('member-highlight');
                            
                            // Scroll to the member with smooth behavior
                            match.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        });
                        
                        suggestionsContainer.appendChild(suggestion);
                    });
                    suggestionsContainer.classList.add('active');
                } else {
                    suggestionsContainer.classList.remove('active');
                }
            } else {
                suggestionsContainer.classList.remove('active');
                // Remove highlights when search is cleared
                memberLists.forEach(m => m.classList.remove('member-highlight'));
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                suggestionsContainer.classList.remove('active');
            }
        });

        // Hide suggestions on Enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                suggestionsContainer.classList.remove('active');
            }
        });
    });

    // Clear search when switching tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchInputs.forEach(input => {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            });
            suggestionsContainers.forEach(container => {
                container.classList.remove('active');
            });
            memberLists.forEach(m => m.classList.remove('member-highlight'));
        });
    });
  }
  
  // Initialize all UI interactions
  document.addEventListener('DOMContentLoaded', () => {
    initTeamTabs();
    initAboutAnimation();
    initFamilyAnimations();
    initEventAnimations();
    initTeamSearch();
  });
