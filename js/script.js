jQuery(document).ready(function ($) {
    $('#game').html('');
    $('#loading-animation1').toggleClass('d-none');

    axios.get('http://csc225.mockable.io/consoles').then(function (response) {
        const game = response.data;
        
        const videoHtml = game.map(function (em) {

            const { id, name} = em;
            
    
            return `
    
                <div data-id="${id}" class="media my-4 hover-color cursor-pointer">
                    <img src="image/games.png" class="mr-3 rounded" alt="Photo of ${name}" width = "64px" height = "64px">
                    <div class="media-body">
                        <h5 class="mt-1">${name}</h5>
                    </div>
                </div>
    
            `;
        }).join('');
    
        $('#video').html(videoHtml);
       
    });

    jQuery('#video').on('click', '.media', function () {
        const id = $(this).attr('data-id');
        const url = `http://csc225.mockable.io/consoles/${id}`;
        
        $('#game').html('');
        $('#loading-animation').toggleClass('d-none');

        axios.get(url).then(function (response) {
            $('#loading-animation').toggleClass('d-none');
            const {id, name, country, releaseYear, price, image} = response.data;
            $('#game').html(`
                <div class="container border border-danger">
                    <div class="row">
                        <div class="col-lg-12 col-lg-2 mt-2">
                            <img src="${image}" alt="Photo of ${name}">
                        </div>
                        <div class="col-12 col-lg-8 m-2">
                            <p class="m-0">Name: ${name}</p>
                            <p class="m-0">Country: ${country}</p>
                            <p class="m-0">Released Year: ${releaseYear}</p>
                            <p class="m-0">Price: ${price}</p>
                        </div>
                    </div>
                </div>
            `);
        }).catch(function (error) {
            alert('Error Occured !!!');
        });
    });
    
    


});