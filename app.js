$(document).ready(function(){
   recipes = []
   $('button').click(function(e){
      e.preventDefault();
      $('#recipes').empty()
      userSearch = $('input').val()
      if (userSearch !== ''){
         $.ajax({
           method: 'GET',
           url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${userSearch}&limitLicense=false&number=5&ranking=1`,
           dataType: 'json',
           success: function(data){
             let ds = data.Search
             console.log('data', data);
            // this loops through the recipe data and eventually creates a div with the recipe image, link, and name
             for (let r of data){
                 let id = r.id
                 let image = r.image
                 console.log('r.image', r.image)
                 let coll = $('<div>').addClass('col s6')
                 let card = $('<div>').addClass('card')
                 let content = $('<div>').addClass('card-content')
                 let recPic = $('<img>').attr({src: r.image})
                 $('#recipes').append(coll)
                 coll.append(card)
                 card.append(content)
                 content.append(recPic)
                 recipes.push(coll)
             }
            //  this clears the search input
               $('input').val('')
           },
           error: function(){
             console.log('ruh roh');
          },
           beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "7D3Xzr7UyvmshVdn9ReVmm3sqT6jp1wMVMljsnJ2QLQ0Ks4Rej");
            }
          })
       }
   })

})
