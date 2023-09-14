let items = document.querySelectorAll('.item');
items.forEach(function (item) {
    item.addEventListener('click', function () {
        document.querySelector('.block-add').style.display = 'block';
    });
});


// let closeAddBlock = document.querySelector('.block-add').addEventListener('click', function(){
//     document.querySelector('.block-add').style.display = 'none';
// })
