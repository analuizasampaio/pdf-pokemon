const data = [{
    "name": "Bulbasaur",
    "description": "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.  Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
    "art_url": "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    "types": ["poison", "grass"]
},
{
    "name": "Ivysaur",
    "description": "There is a bud on this Pokémon's back. To support its weight, Ivysaur's legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it's a sign that the bud will bloom into a large flower soon.  There is a bud on this Pokémon's back. To support its weight, Ivysaur's legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it's a sign that the bud will bloom into a large flower soon.",
    "art_url": "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/002.png",
    "types": ["poison", "grass"]
},
{
    "name": "Venusaur",
    "description": "There is a large flower on Venusaur's back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower's aroma soothes the emotions of people.  There is a large flower on Venusaur's back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower's aroma soothes the emotions of people.",
    "art_url": "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/003.png",
    "types": ["poison", "grass"]
},
{
    "name": "Charmander",
    "description": "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.  The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.",
    "art_url": "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    "types": ["fire"]
},
{
    "name": "Charmeleon",
    "description": "Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color.  Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color.",
    "art_url": "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/005.png",
    "types": ["fire"]
}]

// imgUrl: the image origin url
// callback: when the image is converted to base64, will call this function 
// we can wrap this function to Promise-based
//  function convertImageToBase64Async(imagUrl) {
//     return new Promise(resovle => convertImageToBase64(imgUrl, resolve))
//  } 

function convertImageToBase64(imgUrl, callback) {
    let dataUrl
    const image = new Image();
    image.crossOrigin='anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      dataUrl = canvas.toDataURL();
      callback && callback(dataUrl)
    }
    image.src = imgUrl;

    return dataUrl

  }

const  app = document.getElementById("root");
const container = document.createElement("div");
container.setAttribute("class","container");
app.appendChild(container);

console.log(jsPDF)


data.forEach(pokemon => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    container.appendChild(card);

    let titulo = document.createElement("h1");
    titulo.innerHTML = pokemon.name;
    card.appendChild(titulo);

    let descricao = document.createElement("p");
    descricao.innerHTML = pokemon.description;
    card.appendChild(descricao);

    let image = document.createElement('img');
    // image.setAttribute('src', pokemon.art_url);
    image.src = pokemon.art_url
    titulo.appendChild(image)

    let botao = document.createElement('button');
    // botao.setAttribute('src', pokemon.art_url);
    console.log(pokemon.art_url)
    botao.textContent = "baixar PDF"
    botao.onclick = function(){
        var doc = new jsPDF()
        doc.text(pokemon.name, 10, 10)
        doc.text(pokemon.description.split("."), 10, 10)
        let imageBase64 = convertImageToBase64(pokemon.art_url)
        doc.addImage(imageBase64, "PNG", 15, 40, 180, 180)
        doc.save('a4.pdf')
    }
    titulo.appendChild(botao)

    let tipo = document.createElement("p")
    if (pokemon.types.length>1){
    tipo.innerHTML = "type: "+pokemon.types[0]+ " e "+pokemon.types[1]
    }else{
        tipo.innerHTML = "type: "+pokemon.types[0]  
    }
    titulo.appendChild(tipo)

});


