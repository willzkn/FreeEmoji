// Emoji data
const emojis = {
    'Sonrisas y personas': ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖'],
    'Animales y naturaleza': ['🐵','🐒','🦍','🦧','🐶','🐕','🦮','🐕‍🦺','🐩','🐺','🦊','🦝','🐱','🐈','🐈‍⬛','🦁','🐯','🐅','🐆','🐴','🫎','🫏','🐎','🦄','🦓','🦌','🦬','🐮','🐂','🐃','🐄','🐷','🐖','🐗','🐽','🐏','🐑','🐐','🐪','🐫','🦙','🦒'],
    'Comida y bebida': ['🍇','🍈','🍉','🍊','🍋','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓','🫐','🥝','🍅','🫒','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🫑','🥒','🥬','🥦','🧄','🧅','🥜','🫘','🌰','🍞','🥐','🥖','🫓','🥨','🥯','🥞','🧇'],
    'Actividades': ['⚽','⚾','🥎','🏀','🏐','🏈','🏉','🎾','🥏','🎳','🏏','🏑','🏒','🥍','🏓','🏸','🥊','🥋','🥅','⛳','⛸️','🎣','🤿','🎽','🎿','🛷','🥌','🎯','🪀','🪁','🎮','🕹️','🎰','🎲','🧩','🎨','🧵','🪡','🧶','🪢'],
    'Viajes y lugares': ['🌍','🌎','🌏','🌐','🗺️','🗾','🧭','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏞️','🏟️','🏛️','🏗️','🏘️','🏚️','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌'],
    'Objetos': ['📱','📲','☎️','📞','📟','📠','💻','🖥️','🖨️','⌨️','🖱️','🖲️','💽','💾','💿','📀','🎥','🎞️','📽️','🎬','📺','📷','📸','📹','📼','🔍','🔎','💡','🔦','🏮','📔','📕','📖','📗','📘','📙','📚','📓','📒','📃','📜'],
    'Símbolos': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','♥️','☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'],
    'Flechas': ['⬆️','↗️','➡️','↘️','⬇️','↙️','⬅️','↖️','↕️','↔️','↩️','↪️','⤴️','⤵️','🔀','🔁','🔂','🔄','🔃','🔼','⏫','🔽','⏬','⏭️','⏮️','⏯️','⏸️','⏹️','⏺️']
};


// DOM Elements
const emojiContainer = document.getElementById('emojiContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const categoryButtons = document.querySelectorAll('.category-btn');
const notification = document.getElementById('notification');

// Current active category
let currentCategory = 'Sonrisas y personas';

// Show random ad
function showRandomAd() {
    const adContainer = document.createElement('div');
    adContainer.className = 'ad-container';
    
    const ad = anuncios[Math.floor(Math.random() * anuncios.length)];
    
    adContainer.innerHTML = `
        <div class="ad-content">
            <span class="ad-badge">Publicidad</span>
            <h3>${ad.titulo}</h3>
            <p>${ad.descripcion}</p>
            <a href="${ad.enlace}" class="ad-button">${ad.textoBoton}</a>
            <button class="close-ad">×</button>
        </div>
    `;
    
    document.body.appendChild(adContainer);
    
    // Close button functionality
    adContainer.querySelector('.close-ad').addEventListener('click', () => {
        adContainer.style.display = 'none';
    });
    
    // Show ad after 5 seconds
    setTimeout(() => {
        adContainer.classList.add('visible');
    }, 5000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadEmojis(currentCategory);
    setupEventListeners();
    setupShareButtons();
    showRandomAd();
    
    // Show a new ad every 30 seconds
    setInterval(showRandomAd, 30000);
});

// Setup share buttons functionality
function setupShareButtons() {
    const currentUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent('Mira estos emojis geniales ');
    
    // WhatsApp
    document.querySelector('.whatsapp-share').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://wa.me/?text=${shareText}${currentUrl}`, '_blank');
    });
    
    // Facebook
    document.querySelector('.facebook-share').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, '_blank', 'width=600,height=400');
    });
    
    // Twitter
    document.querySelector('.twitter-share').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}😍🔥`, '_blank', 'width=600,height=300');
    });
    
    // Copy link
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const copyLinkMessage = document.getElementById('copyLinkMessage');
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                copyLinkMessage.textContent = '¡Enlace copiado!';
                copyLinkMessage.style.display = 'block';
                copyLinkMessage.style.opacity = '1';
                
                // Hide message after 3 seconds
                setTimeout(() => {
                    copyLinkMessage.style.opacity = '0';
                    setTimeout(() => {
                        copyLinkMessage.style.display = 'none';
                    }, 300);
                }, 3000);
            }).catch(err => {
                console.error('Error al copiar el enlace:', err);
                copyLinkMessage.textContent = 'Error al copiar el enlace';
                copyLinkMessage.style.display = 'block';
            });
        });
    }
}

// Load emojis based on category
function loadEmojis(category, searchTerm = '') {
    emojiContainer.innerHTML = '';
    
    // If category is 'all', combine all emojis
    const emojiList = category === 'all' 
        ? Object.values(emojis).flat() 
        : (emojis[category] || []);
    
    // Filter emojis if search term exists
    const filteredEmojis = searchTerm 
        ? emojiList.filter(emoji => emoji.includes(searchTerm) || 
                                 emoji.codePointAt(0).toString(16).includes(searchTerm.toLowerCase()))
        : emojiList;
    
    // Display emojis in a grid
    filteredEmojis.forEach(emoji => {
        const emojiBtn = document.createElement('button');
        emojiBtn.className = 'emoji-btn';
        emojiBtn.textContent = emoji;
        emojiBtn.title = `Copiar ${emoji}`;
        emojiBtn.setAttribute('aria-label', `Emoji: ${emoji}`);
        emojiBtn.addEventListener('click', () => copyToClipboard(emoji));
        emojiContainer.appendChild(emojiBtn);
    });
    
    // Show message if no emojis found
    if (filteredEmojis.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No se encontraron emojis que coincidan con tu búsqueda.';
        emojiContainer.appendChild(noResults);
    }
}

// Obtener emoji representativo de cada categoría
function getCategoryEmoji(category) {
    const emojiMap = {
        'Sonrisas y personas': '😊',
        'Animales y naturaleza': '🐶',
        'Comida y bebida': '🍔',
        'Actividades': '⚽',
        'Deportes y juegos': '⚽',
        'Viajes y lugares': '🌍',
        'Objetos': '📱',
        'Símbolos': '❤️',
        'Flechas': '⬆️'
    };
    return emojiMap[category] || '✨';
}

// Actualizar el título de la página según la categoría
function updatePageTitle(category) {
    if (typeof document !== 'undefined') {
        document.title = `Emojis de ${category} ${getCategoryEmoji(category)} — Copiar y Pegar`;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            currentCategory = category;
            loadEmojis(category);
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            // Si el campo de búsqueda está vacío, volver a cargar la categoría actual
            loadEmojis(currentCategory);
            return;
        }
        
        // Realizar la búsqueda en todas las categorías
        let results = [];
        Object.entries(emojis).forEach(([category, emojiList]) => {
            emojiList.forEach(emoji => {
                // Buscar en el emoji y su código Unicode
                const emojiHex = Array.from(emoji).map(char => 
                    char.codePointAt(0).toString(16)
                ).join('-');
                
                if (emoji.includes(searchTerm) || emojiHex.includes(searchTerm)) {
                    results.push(emoji);
                }
            });
        });
        
        // Mostrar resultados únicos
        displaySearchResults([...new Set(results)], searchTerm);
    }
    
    function displaySearchResults(emojis, searchTerm) {
        emojiContainer.innerHTML = '';
        
        if (emojis.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `No se encontraron emojis para "<strong>${searchTerm}</strong>"`;
            emojiContainer.appendChild(noResults);
            return;
        }
        
        // Mostrar los emojis encontrados
        emojis.forEach(emoji => {
            const emojiBtn = document.createElement('button');
            emojiBtn.className = 'emoji-btn';
            emojiBtn.textContent = emoji;
            emojiBtn.title = `Copiar ${emoji}`;
            emojiBtn.setAttribute('aria-label', `Emoji: ${emoji}`);
            emojiBtn.addEventListener('click', () => copyToClipboard(emoji));
            emojiContainer.appendChild(emojiBtn);
        });
        
        // Mostrar mensaje de resultados
        const resultsInfo = document.createElement('div');
        resultsInfo.className = 'search-results-info';
        resultsInfo.textContent = `Mostrando ${emojis.length} resultado${emojis.length !== 1 ? 's' : ''} para "${searchTerm}"`;
        emojiContainer.insertBefore(resultsInfo, emojiContainer.firstChild);
        
        // Agregar botón para limpiar búsqueda
        const clearSearch = document.createElement('button');
        clearSearch.className = 'clear-search';
        clearSearch.innerHTML = '<i class="fas fa-times"></i> Limpiar búsqueda';
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            loadEmojis(currentCategory);
        });
        emojiContainer.appendChild(clearSearch);
    }
    
    // Event listeners para el buscador
    searchButton.addEventListener('click', performSearch);
    
    // Búsqueda en tiempo real con debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            loadEmojis(currentCategory);
        } else if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Copy emoji to clipboard
function copyToClipboard(emoji) {
    navigator.clipboard.writeText(emoji).then(() => {
        showNotification(`¡Copiado! ${emoji}`);
        
        // Add visual feedback to all matching emoji buttons
        const buttons = document.querySelectorAll('.emoji-btn');
        buttons.forEach(btn => {
            if (btn.textContent === emoji) {
                // Remove copied class from any previously copied emoji
                document.querySelectorAll('.emoji-btn.copied').forEach(el => {
                    el.classList.remove('copied');
                });
                
                // Add copied class to the clicked emoji
                btn.classList.add('copied');
                
                // Scroll the emoji into view if needed
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Remove the copied class after animation completes
                setTimeout(() => {
                    btn.classList.remove('copied');
                }, 1500);
            }
        });
    }).catch(err => {
        console.error('Error al copiar el emoji:', err);
        showNotification('Error al copiar el emoji');
    });
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);
}

// Initialize trending emojis
document.querySelectorAll('.trending-emojis .emoji-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        copyToClipboard(e.target.textContent);
    });
});
