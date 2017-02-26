$(document).ready(function(){
   // this event listener is exclusively for the solids tab
   $('button.solidB').click(function(e){
      e.preventDefault();
      $('#Srecipes').empty()
      userSearch = $('input.Sinput').val()
      if (userSearch !== ''){
         console.log(userSearch);
         $.ajax({
           method: 'GET',
           url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${userSearch}&limitLicense=false&number=5&ranking=1`,
           dataType: 'json',
           success: function(data){
             let ds = data.Search
            //  console.log('userSearch', userSearch);
             console.log('data', data);
            // this loops through the recipe data and eventually creates a div with the recipe image, link, and name
             for (let r of data){
                 let id = r.id
                 let image = r.image
                 console.log(r);
                 let coll = $('<div>').addClass('col s12 m6 l4')
                 let card = $('<div>').addClass('card hoverable')
                 let title = $('<h6>').addClass('card-title center').text(r.title)
                 let content = $('<div>').addClass('card-content clicky')
                 let recPic = $('<img>').attr({src: r.image, id: r.id})
                 $('#Srecipes').append(coll)
                 coll.append(card)
                 card.append(content)
                 content.append(recPic)
                 content.append(title)
             }
            //  this clears the search input
               $('input').val('')
               // this allows recipes to be shown after clicking the card
               $('img').click(function(){
                  console.log('we clicked!');
                  target = event.target.id
                  console.log(target);
                  $.ajax({
                     method: "GET",
                     url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/164166/information',
                     dataType: 'json',
                     sucess: function(data){
                        console.log('sucess');
                     },
                     error: function(){
                        console.log('ERROR!');
                     },
                     beforeSend: function(xhr) {
                      xhr.setRequestHeader("X-Mashape-Authorization", "7D3Xzr7UyvmshVdn9ReVmm3sqT6jp1wMVMljsnJ2QLQ0Ks4Rej");
                      }
                  })
               })
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
