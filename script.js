window.addEventListener("load", (event) => {
    obtenerListaDigis('https://digimon-api.com/api/v1/digimon');
});

async function obtenerListaDigis(url) {

    let configuracion = {
        method: 'GET'
    };

    let respuesta = await fetch(url, configuracion);
    let datos = await respuesta.json();


    let contenedorContenido = document.querySelector('.contenido');
    contenedorContenido.innerHTML = "";
    for (let i = 0; i < datos.content.length; i++) {
        let urlDigi = datos.content[i].href;
        let respuestaDigi = await fetch(urlDigi, configuracion);
        let datosDigi = await respuestaDigi.json();

        contenedorContenido.innerHTML += `
        <div class="digi-card">
        <div class="card-header">
            
            <h5 class="nombreDigi"> <button class="detal" onclick="detalleDigi('${datos.content[i].href}');">${datos.content[i].name}</button></h5>
            <span class="numeroDigi">${datos.content[i].id}</span>
        </div>

        <div class="card-body">
            <img class="imgDigi"  src="${datos.content[i].image}" alt="nombredigi">

            <div class="datosDigi">
                <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Attribute</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>   
                        <td id="levels${datos.content[i].id}" class ="datosTabla"></td>
                        <td id="atributos${datos.content[i].id}" class="datosTabla"></td>
                        <td id="tipos${datos.content[i].id}" class="datosTabla"></td>
                      </tr>

                    </tbody>
                  </table>
            </div>
        </div>

        <div class="card-footer">
            <span class="fields">Fields</span>
            <div id="fields${datos.content[i].id}" class="atributos"> 
            
            </div>
        </div>
    </div>`;

        datosDigi.levels.forEach((level) => {
            let l = document.getElementById("levels" + datos.content[i].id);
            l.innerHTML += level.level + " ";
        });

        datosDigi.attributes.forEach((attributes) => {
            let l = document.getElementById("atributos" + datos.content[i].id);
            l.innerHTML += attributes.attribute + " ";
        });

        datosDigi.types.forEach((types) => {
            let l = document.getElementById("tipos" + datos.content[i].id);
            l.innerHTML += types.type + " ";
        });

        datosDigi.fields.forEach((fields) => {
            let l = document.getElementById("fields" + datos.content[i].id);
            l.innerHTML += ` <img  class="digiFields" src="${fields.image}" alt="${fields.field}">`;
        });
    }


    let footer = document.querySelector('.footer');
    footer.innerHTML = ` 
    <ul class="paginator">
    <li><a onclick="obtenerListaDigis('${datos.pageable.previousPage}')">&laquo;</a></li>
    <li><a class="actual" onclick="obtenerListaDigis('${datos.pageable.currentPage}')">${datos.pageable.currentPage + 1}</a></li>
    <li><a onclick="obtenerListaDigis('https://digimon-api.com/api/v1/digimon?page=${datos.pageable.currentPage + 1}')">${datos.pageable.currentPage + 2}</a></li>
    <li><a onclick="obtenerListaDigis('https://digimon-api.com/api/v1/digimon?page=${datos.pageable.currentPage + 2}')">${datos.pageable.currentPage + 3}</a></li>
    <li><a onclick="obtenerListaDigis('https://digimon-api.com/api/v1/digimon?page=${datos.pageable.currentPage + 3}')">${datos.pageable.currentPage + 4}</a></li>
    <li><a onclick="obtenerListaDigis('https://digimon-api.com/api/v1/digimon?page=${datos.pageable.currentPage + 4}')">${datos.pageable.currentPage + 5}</a></li>
</ul>
    `;

}



async function buscarDigi(evento) {
    evento.preventDefault();
    let footer = document.querySelector('.footer');
    footer.innerHTML = '';


    let nombreDigi = document.getElementById("nombreDigi").value;
    if (nombreDigi === '') {
        obtenerListaDigis('https://digimon-api.com/api/v1/digimon');
    }else {


        let url = "https://digimon-api.com/api/v1/digimon/" + nombreDigi;

        let configuracion = {
            method: 'GET'
        };


        let respuesta = await fetch(url, configuracion);
        let datos = await respuesta.json();
        let contenedorContenido = document.querySelector('.contenido');
        contenedorContenido.innerHTML = "";
        if(datos.error == 1){
            contenedorContenido.innerHTML += `
                <div class ="notFound">
                <img src="notFound.png" alt="notFound"> 
                </div>
            `;
            document.getElementById("nombreDigi").value = '';
        }else{
       
        
        
        contenedorContenido.innerHTML += `
        <div class="digi-card">
        <div class="card-header">
            
            <h5 class="nombreDigi"> <button class="detal" onclick="detalleDigi('https://digimon-api.com/api/v1/digimon/${datos.id}');">${datos.name}</button></h5>
            <span class="numeroDigi">${datos.id}</span>
        </div>

        <div class="card-body">
            <img class="imgDigi" id="imgDigi"  alt="nombredigi">

            <div class="datosDigi">
                <table class="table table-borderless">
                    <thead>
                    <tr>
                        <th>Level</th>
                        <th>Attribute</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>   
                        <td id="levels${datos.id}" class ="datosTabla"></td>
                        <td id="atributos${datos.id}" class="datosTabla"></td>
                        <td id="tipos${datos.id}" class="datosTabla"></td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

        <div class="card-footer">
            <span class="fields">Fields</span>
            <div id="fields${datos.id}" class="atributos"> 
            
            </div>
        </div>
    </div>`;

        datos.images.forEach((img) => {
            let i = document.getElementById("imgDigi");
            i.setAttribute("src", img.href);
        });

        datos.levels.forEach((level) => {
            let l = document.getElementById("levels" + datos.id);
            l.innerHTML += level.level + " ";
        });

        datos.attributes.forEach((attributes) => {
            let l = document.getElementById("atributos" + datos.id);
            l.innerHTML += attributes.attribute + " ";
        });

        datos.types.forEach((types) => {
            let l = document.getElementById("tipos" + datos.id);
            l.innerHTML += types.type + " ";
        });

        datos.fields.forEach((fields) => {
            let l = document.getElementById("fields" + datos.id);
            l.innerHTML += ` <img  class="digiFields" src="${fields.image}" alt="${fields.field}">`;
        });

        document.getElementById("nombreDigi").value = '';
    }
    }
}




async function detalleDigi(urlDigi) {

    let footer = document.querySelector('.footer');
    footer.innerHTML = '';



    let configuracion = {
        method: 'GET'
    };


    let respuesta = await fetch(urlDigi, configuracion);
    let datos = await respuesta.json();


    let contenedorContenido = document.querySelector('.contenido');
    contenedorContenido.innerHTML = "";

    contenedorContenido.innerHTML += `  
    <div class="cuerpoDetalle">
        <div class="digi-card-none">
            <div class="card-header">
                
                <h5 class="nombreDigi"> <a>${datos.name}</a></h5>
                <span class="numeroDigi">${datos.id}</span>
            </div>
        
            <div class="card-body">
                <img class="imgDigi" id="imgDigi" src="logo.svg.png" alt="nombredigi">
        
                <div class="datosDigi">
                    <table class="table table-borderless">
                        <thead>
                        <tr>
                            <th>Level</th>
                            <th>Attribute</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>   
                            <td id="levels${datos.id}" class ="datosTabla"></td>
                            <td id="atributos${datos.id}" class="datosTabla"></td>
                            <td id="tipos${datos.id}" class="datosTabla"></td>
                        </tr>
        
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <span class="fields">Fields</span>
                    <div id="fields${datos.id}" class="atributos"> 
                </div>
            </div> 
        </div>  
    </div>

    <div class="dere">
        <div class="digi-card-none">
                <div class="contenidoDere">
                    <h3 class="tDescripcion">Description</h3>
                    <div> <span class="lanzamiento"> year released: ${datos.releaseDate}<span></div>   
                    <div class="datosDigi">
                        <p id="descripcion" class="descripcion"></p>
                    </div>
                    <div class="skills">
                        <table class="table detailsDigi">
                            <thead>
                              <tr class="table-dark">
                                <th>Skill Name</th>
                                <th>Description</th>
                                
                              </tr>
                            </thead>
                            <tbody id="skillsDetails" class="skillsDetails">
                         
            
                            </tbody>
                          </table>
                    </div>
                </div>
        </div> 
    </div>

</div>

<div id="preEvos" class="carousel slide carousel-fade">
<h4 class="tittle-center">Pre evolutions </h4>
  <div class="carousel-inner" id="preEvo">
    <div class="carousel-item active">
    <div class="digi-card-evo">
    <div class="card-header">
        
        <h5 class="nombreDigi"> Pre Evolutions</h5>
        <h5 class="nombreDigi"> Of</h5>
        <span class="numeroDigi">${datos.name}</span>
    </div>

    <div class="card-body">
        <img class="imgDigi img-fluid" id="imgDigi" src="vice.gif" alt="vice">

        <div class="datosDigi-evo"> 
            <h3>Total : </h3>
            <h4>${datos.priorEvolutions.length}</h4>
        </div>
    </div>
</div>
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#preEvos" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#preEvos" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>



<div id="postEvos" class="carousel slide carousel-fade">
<h4 class="tittle-center">Post evolutions </h4>
  <div class="carousel-inner" id="postEvo">
    <div class="carousel-item active">
    <div class="digi-card-evo">
    <div class="card-header">
        
        <h5 class="nombreDigi"> Post Evolutions</h5>
        <h5 class="nombreDigi"> Of</h5>
        <span class="numeroDigi">${datos.name}</span>
    </div>

    <div class="card-body">
        <img class="imgDigi img-fluid" id="imgDigi" src="vice.gif" alt="vice">

        <div class="datosDigi-evo"> 
            <h3>Total : </h3>
            <h4>${datos.nextEvolutions.length}</h4>
        </div>
    </div>
</div>
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#postEvos" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#postEvos" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

`;

datos.priorEvolutions.forEach((preEvo)=>{
          let pre = document.getElementById("preEvo");
          pre.innerHTML += `
          <div class="carousel-item"> 
              
                  <div class="digi-card-evo">
                      <div class="card-header">
                          
                          <h5 class="nombreDigi"> <button class="detal" onclick="detalleDigi('https://digimon-api.com/api/v1/digimon/${preEvo.id}');">${preEvo.digimon}</button></h5>
                          <span class="numeroDigi">${preEvo.id}</span>
                      </div>
                  
                      <div class="card-body">
                          <img class="imgDigi img-fluid" id="imgDigi" src="${preEvo.image}" alt="${preEvo.digimon}">
                  
                          <div class="datosDigi-evo">
                              <span class="condition">Evolution condition: </span>
                              <span class="condition nobold">${preEvo.condition}</span>
                          </div>
                      </div>
                  </div>
             
          </div>
      `;
      });
   
    
        datos.nextEvolutions.forEach((nextEvo) => {
            let post = document.getElementById("postEvo");
            post.innerHTML +=  `
            <div class="carousel-item"> 
            <div class="digi-card-evo">
                <div class="card-header">
                    <h5 class="nombreDigi"> <button class="detal" onclick="detalleDigi('https://digimon-api.com/api/v1/digimon/${nextEvo.id}');">${nextEvo.digimon}</button></h5>
                    <span class="numeroDigi">${nextEvo.id}</span>
                </div>
            
                <div class="card-body">
                    <img class="imgDigi" id="imgDigi" src="${nextEvo.image}" alt="${nextEvo.digimon}">
            
                    <div class="datosDigi-evo">
                        <span class="condition">Evolution condition: </span>
                        <span class="condition nobold">${nextEvo.condition}</span>
                    </div>
               
            </div>
        </div>
    </div>
    `;
        });
   
    datos.skills.forEach((skills) => {
        let s = document.getElementById("skillsDetails");
        let descripcionSkill = "";
        if (skills.description === ' ') {
            descripcionSkill = "no existing description";
        } else {
            descripcionSkill = skills.description;
        }
        s.innerHTML += "<td>" + skills.skill + "</td>" + "<td>" + descripcionSkill + "</td>";

    });

    datos.images.forEach((img) => {
        let i = document.getElementById("imgDigi");
        i.setAttribute("src", img.href);
    });


    datos.descriptions.forEach((desc) => {
        let d = document.getElementById("descripcion");
        if (desc.language === "en_us") {
            d.innerHTML += desc.description;
        }

    });

    datos.levels.forEach((level) => {
        let l = document.getElementById("levels" + datos.id);
        l.innerHTML += level.level + " ";
    });

    datos.attributes.forEach((attributes) => {
        let l = document.getElementById("atributos" + datos.id);
        l.innerHTML += attributes.attribute + " ";
    });

    datos.types.forEach((types) => {
        let l = document.getElementById("tipos" + datos.id);
        l.innerHTML += types.type + " ";
    });

    datos.fields.forEach((fields) => {
        let l = document.getElementById("fields" + datos.id);
        l.innerHTML += `<img  class="digiFields" src="${fields.image}" alt="${fields.field}">`;
    });


}



