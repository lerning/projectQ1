$(document).ready(function(){
   $('select').material_select();
   // this event listener for the ingrediant search tab
   $('button.solidB').click(function(e){
      e.preventDefault();
      $('#Srecipes').empty()
      userSearch = $('input.Sinput').val()
      if (userSearch !== ''){
         let title ;
         let image ;
         $.ajax({
           method: 'GET',
           url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${userSearch}&limitLicense=false&number=24&ranking=1`,
           dataType: 'json',
           success: function(data){
             let ds = data.Search
            // this loops through the recipe data and eventually creates a div with the recipe image, link, and name
             for (let r of data){
               //   console.log(r);
                 let id = r.id
                 var image = r.image
                 var rTitle = r.title
                 let coll = $('<div>').addClass('col s6 m4 l3')
                 let card = $('<div>').addClass('card hoverable')
                 let title = $('<h6>').addClass('card-title center').text(r.title)
                 let content = $('<div>').addClass('card-content clicky center')
                 let link = $('<a>').attr('href', '#modal1')
                 let recPic = $('<img>').attr({src: r.image, id: r.id, data: r.title})
                 $('#Srecipes').append(coll)
                 coll.append(card)
                 card.append(content)
               //   content.append(recPic)
                 content.append(link)
                 link.append(recPic)
                 content.append(title)
             }
            //  this clears the search input
               // $('input').val('')
               // this allows recipes to be shown after clicking the card
               $('img').click(function(){
                  let target = event.target.id
                  var title = this.getAttribute('data')
                  var image = this.getAttribute('src');
                  $('.modal').modal()
                  $.ajax({
                     method: "GET",
                     url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${target}/analyzedInstructions`,
                     dataType: 'json',
                     success: function(data){
                        $('#recipeRR').empty()
                        $('#momo').empty().addClass('center')
                        console.log('annoying', data.length);
                        if (data.length > 0){
                           console.log('data.0 rec steps', data[0]);
                           let steps = data[0].steps
                           // console.log('kevin was definitely right', image);
                           recTitle = $('<h5>').text(title).attr('style','text-align: center')
                           recImage = $('<img>').attr({src: image, style: 'height: 190px; width: auto'})

                           $('#momo').append(recTitle)
                           $('#momo').append(recImage)

                           for (s of steps){
                              // console.log.(s.step);
                              listData = $('<p>').text(s.step)
                              $('#recipeRR').append(listData)
                              // $('div.modal-content').append(recModal)
                           }
                        } else {
                           console.log('fail');
                           $('#momo').text("we didn't find no recipe. serry")
                           $('#recipeRR').append($('<img>').addClass('noRec').attr({src: 'http://i.imgur.com/RBMLj.jpg' }))
                        }
                        // $('.modal').modal()
                        //  window.location.href = "info.html"
                     },
                     error: function(){
                        console.log('ERROR!');
                     },
                     beforeSend: function(xhr) {
                      xhr.setRequestHeader("X-Mashape-Authorization", "7D3Xzr7UyvmshVdn9ReVmm3sqT6jp1wMVMljsnJ2QLQ0Ks4Rej");
                      }
                  })
                  $.ajax({
                     method: "GET",
                     url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${target}/information`,
                     dataType: 'json',
                     success: function(data){
                        let trial = data.extendedIngredients
                        console.log('trial', trial);
                        $('#ingredientsII').empty()
                        for (i of trial){
                           console.log(i.originalString);
                           listData = $('<p>').text(i.originalString)
                           $('#ingredientsII').append(listData)
                           // $('div.modal-content').append(recModal)
                        }
                        // $('.modal').modal()
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

// this is the event listener for the advanced search
   $('button.liquidsB').click(function(e){
      e.preventDefault();
      $('#Lrecipes').empty()
      let userSearch = $('input.Linput').val()
      let dropSearch = $('li.active')

      var ethnicity = ''
      var mealType = ''
      var diet = ''
      var intolerances = ''
      let i = 0

      if(dropSearch[0] !==  undefined){
         var ethnicity = dropSearch[i].childNodes[0].innerText
         i ++
         console.log('here 1');
      }
      if (dropSearch[1] !==  undefined){
         var mealType = dropSearch[i].childNodes[0].innerText
         i ++
         console.log('here 2');
      }
      if (dropSearch[2] !==  undefined){
         var diet = dropSearch[i].childNodes[0].innerText
         i++
         console.log('here 3');
      }
      if (dropSearch[3] !==  undefined){
         var intolerances = dropSearch[i].childNodes[0].innerText
      }


      console.log('dd0', dropSearch[0]);
      console.log('dd1', dropSearch[1]);
      console.log('dd2', dropSearch[2]);
      console.log('dd3', dropSearch[3]);
      console.log(i);
      console.log('dropSearch', dropSearch);
      console.log('search', userSearch);
      console.log('ethnicity', ethnicity);
      console.log('mealType', mealType);
      console.log('diet', diet);
      console.log('intolerances', intolerances);


      // let ethnicity =
         let title ;
         let image ;
         $.ajax({
           method: 'GET',
           url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=${ethnicity}&diet=${diet}&excludeIngredients=&instructionsRequired=false&intolerances=${intolerances}&limitLicense=false&number=24&offset=0&query=${userSearch}&type=${mealType}`,
           dataType: 'json',
           success: function(data){
             let ds = data.Search
             let dr = data.results
            // this loops through the recipe data and eventually creates a div with the recipe image, link, and name
             for (let r of dr){
               //   console.log(r);
                 let id = r.id
                 var rTitle = r.title
                 let coll = $('<div>').addClass('col s6 m4 l3')
                 let card = $('<div>').addClass('card hoverable')
                 let title = $('<h6>').addClass('card-title center').text(r.title)
                 let content = $('<div>').addClass('card-content clicky center')
                 let link = $('<a>').attr('href', '#modal2')
                 let recPic = $('<img>').attr({src: 'https://spoonacular.com/recipeImages/' + r.image, id: r.id, data: r.title}).addClass('img2')
               //   console.log(recPic);
                 $('#Lrecipes').append(coll)
                 coll.append(card)
                 card.append(content)
               //   content.append(recPic)
                 content.append(link)
                 link.append(recPic)
                 content.append(title)
             }
            //  this clears the search input
               $('input.Linput').val('')


               $('.img2').click(function(){
                  let target = event.target.id
                  var title = this.getAttribute('data')
                  var image = this.getAttribute('src');
                  // console.log('image clicked');
                  $('#modal2').modal()
                  $.ajax({
                     method: "GET",
                     url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${target}/analyzedInstructions`,
                     dataType: 'json',
                     success: function(data){
                        $('#recipeRRR').empty()
                        $('#momo2').empty().addClass('center')
                        // console.log('annoying', data.length);
                        if (data.length > 0){
                           // console.log('data.0 rec steps', data[0]);
                           let steps = data[0].steps
                           // console.log('kevin was definitely right', image);
                           recTitle = $('<h5>').text(title).attr('style','text-align: center')
                           recImage = $('<img>').attr({src: image, style: 'height: 190px; width: auto'})

                           $('#momo2').append(recTitle)
                           $('#momo2').append(recImage)

                           for (s of steps){
                              // console.log.(s.step);
                              listData = $('<p>').text(s.step)
                              $('#recipeRRR').append(listData)
                              // $('div.modal-content').append(recModal)
                           }
                        } else {
                           console.log('fail');
                           $('#momo2').text("we didn't find no recipe. serry")
                           $('#recipeRRR').append($('<img>').addClass('noRec').attr({src: 'http://i.imgur.com/RBMLj.jpg' }))
                        }
                     },
                     error: function(){
                        console.log('ERROR!');
                     },
                     beforeSend: function(xhr) {
                      xhr.setRequestHeader("X-Mashape-Authorization", "7D3Xzr7UyvmshVdn9ReVmm3sqT6jp1wMVMljsnJ2QLQ0Ks4Rej");
                      }
                  })
                  $.ajax({
                     method: "GET",
                     url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${target}/information`,
                     dataType: 'json',
                     success: function(data){
                        let trial = data.extendedIngredients
                        console.log('trial', trial);
                        $('#ingredientsIII').empty()
                        for (i of trial){
                           console.log(i.originalString);
                           listData = $('<p>').text(i.originalString)
                           $('#ingredientsIII').append(listData)
                           // $('div.modal-content').append(recModal)
                        }
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
   })
})
