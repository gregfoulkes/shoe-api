axios.get ('/api/shoes')
    .then(function(result){
    console.log(result);

    const shoeElem = document.querySelector('.shoes');
    result.data.data.forEach(shoe => {
        let sh = "<li >" + shoe.brand + ' - ' + shoe.color + "</li>";
        shoeElem.innerHTML += sh;
    });
    

});