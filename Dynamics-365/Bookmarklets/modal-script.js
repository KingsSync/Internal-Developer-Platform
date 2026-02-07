(function() {
    // 1. Avoid duplicates: Check if modal already exists
    if (document.getElementById('my-insight-bookmarklet')) return;

    // 2. Create the host element for the Shadow DOM
    const host = document.createElement('div');
    host.id = 'my-insight-bookmarklet';
    document.body.appendChild(host);

    // 3. Attach Shadow DOM (open mode) to isolate styles
    const shadow = host.attachShadow({mode: 'open'});

    // 4. Define CSS (Won't affect the rest of the page)
    const style = document.createElement('style');
    style.textContent = `
        .overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 2147483647; /* Max z-index */
            display: flex; justify-content: center; align-items: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .modal {
            background: white; width: 400px; padding: 20px;
            border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            position: relative;
        }
        h2 { margin-top: 0; color: #333; }
        .close-btn {
            position: absolute; top: 10px; right: 10px; border: none;
            background: none; font-size: 20px; cursor: pointer; color: #666;
        }
        .data-row { margin: 10px 0; padding: 10px; background: #f4f4f4; border-radius: 4px; }
    `;

    // 5. Build the Internal Logic (Example: Page Stats)
    const title = document.title;
    const wordCount = document.body.innerText.split(/\s+/).length;
    const linkCount = document.querySelectorAll('a').length;

    // 6. Create the HTML Structure
    const container = document.createElement('div');
    container.className = 'overlay';
    container.innerHTML = `
        <div class="modal">
            <button class="close-btn">&times;</button>
            <h2>Page Insights</h2>
            <div class="data-row"><strong>Title:</strong> ${title}</div>
            <div class="data-row"><strong>Word Count:</strong> ${wordCount} words</div>
            <div class="data-row"><strong>Links Found:</strong> ${linkCount} links</div>
            <p style="font-size: 12px; color: #888;">Loaded via Bookmarklet</p>
        </div>
    `;

    // 7. Assemble the Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(container);

    // 8. Event Listeners (Close functionality)
    const closeBtn = shadow.querySelector('.close-btn');
    const overlay = shadow.querySelector('.overlay');

    const closeModal = () => host.remove();
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        // Close if clicking outside the modal box
        if (e.target === overlay) closeModal();
    });
})();
