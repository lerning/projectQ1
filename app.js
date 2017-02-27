$(document).ready(function(){
   // this event listener is exclusively for the solids tab
   $('button.solidB').click(function(e){
      e.preventDefault();
      $('#Srecipes').empty()
      userSearch = $('input.Sinput').val()
      if (userSearch !== ''){
         $.ajax({
           method: 'GET',
           url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${userSearch}&limitLicense=false&number=6&ranking=2`,
           dataType: 'json',
           success: function(data){
             let ds = data.Search
            //  console.log('data', data);
            // this loops through the recipe data and eventually creates a div with the recipe image, link, and name
             for (let r of data){
                 let id = r.id
                 let image = r.image
               //   console.log(r);
                 let coll = $('<div>').addClass('col s6 m6 l4')
                 let card = $('<div>').addClass('card hoverable')
                 let title = $('<h6>').addClass('card-title center').text(r.title)
                 let content = $('<div>').addClass('card-content clicky')
                 let link = $('<a>').attr('href', '#modal1')
                 let recPic = $('<img>').attr({src: r.image, id: r.id})
                 $('#Srecipes').append(coll)
                 coll.append(card)
                 card.append(content)
               //   content.append(recPic)
                 content.append(link)
                 link.append(recPic)
                 content.append(title)
             }
            //  this clears the search input
               $('input').val('')
               // this allows recipes to be shown after clicking the card
               $('img').click(function(){
                  target = event.target.id
                  console.log('target', target);
                  $.ajax({
                     method: "GET",
                     url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${target}/analyzedInstructions`,
                     dataType: 'json',
                     success: function(data){
                        console.log('data', data);
                        let steps = data[0].steps
                        for (s of steps){
                           console.log(s.step);
                           listData = $('<p>').text(s.step)
                           $('div.modal-content').append(listData)

                        }
                        $('.modal').modal()
                        //  window.location.href = "info.html"
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
