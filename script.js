document.addEventListener('DOMContentLoaded', function() {
    fetch('blog-data.json') // Adjust path as needed
        .then(response => response.json())
        .then(data => {
            const body = data.body;

            // Update title
            document.getElementById('title').innerHTML = `${body.song_name} by <a href="#">${body.artist_name}</a>`;

            // Update subtitle with hyperlinks
            const subtitle = body.subtitle;
            const artistLinks = subtitle.split(',').map(artist => {
                return artist.trim().includes('feat.') ? artist.trim() : `<a href="#">${artist.trim()}</a>`;
            }).join(', ');
            document.getElementById('subtitle').innerHTML = artistLinks;

            // Update image
            document.getElementById('artist-image').src = body.artist_image;

            // Update Spotify embed
            document.querySelector('#spotify-embed iframe').src = body.spotify_embed;

            // Update review
            document.getElementById('review-body').textContent = body.review_body;

            // Update metrics
            for (let key in body.metrics) {
                if (body.metrics.hasOwnProperty(key)) {
                    const scoreId = `${key.replace(/ /g, '-')}-score`;
                    const score = body.metrics[key];
                    document.getElementById(scoreId).textContent = `${score}/10`;
                    document.querySelector(`.scale.${key.replace(/ /g, '-')}`).style.width = `${score * 10}%`; // Adjust according to your CSS
                }
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
