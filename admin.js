document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('admin-form');
    const passphraseField = document.getElementById('passphrase');
    const errorMessage = document.getElementById('error-message');

    // Handle slider value display
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.addEventListener('input', function() {
            document.getElementById(this.id + '-value').textContent = this.value;
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate passphrase
        if (passphraseField.value !== "i am the bass bear") {
            errorMessage.textContent = "Incorrect passphrase.";
            return;
        }

        // Collect form data
        const formData = {
            artist_name: document.getElementById('artist-name').value,
            song_name: document.getElementById('song-name').value,
            subtitle: document.getElementById('subtitle').value,
            artist_image: document.getElementById('artist-image').value,
            spotify_embed: document.getElementById('spotify-embed').value,
            tag: document.querySelector('input[name="tag"]:checked').value,
            metrics: {
                lyrics: parseInt(document.getElementById('lyrics').value),
                melody: parseInt(document.getElementById('melody').value),
                harmony: parseInt(document.getElementById('harmony').value),
                rhythm: parseInt(document.getElementById('rhythm').value),
                instrumentation: parseInt(document.getElementById('instrumentation').value),
                production: parseInt(document.getElementById('production').value),
                emotional_impact: parseInt(document.getElementById('emotional-impact').value),
                cultural_significance: parseInt(document.getElementById('cultural-significance').value),
                commercial_success: parseInt(document.getElementById('commercial-success').value)
            }
        };

        // Validate form data
        if (!formData.artist_image.match(/\.(jpg|jpeg)$/)) {
            errorMessage.textContent = "Artist image must be a .jpg or .jpeg file.";
            return;
        }
        if (!formData.spotify_embed.startsWith('https://open.spotify.com/embed/')) {
            errorMessage.textContent = "Spotify embed URL must start with 'https://open.spotify.com/embed/'.";
            return;
        }

        // If valid, save to JSON file or handle data (send to server)
        console.log("Form Data:", formData);
        errorMessage.textContent = "Form submitted successfully!";
        form.reset();
    });
});
