const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const conteinerResult = document.getElementById('resultstyle');
const btnVerTodos = document.getElementById('mostrartodos');



const fetchApi = (value) =>{
     const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res)=> res.json())
    .then((data) => {
        console.log(data);
        return data;
    });
    return result; 
}
    //trocar o nome da API
    const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
    const newKeys = {
        name: 'Nome',
        status: 'Status',
        species: 'Espécie',
        gender: 'Gênero',
        origin: 'Planeta de Origem',
        episode: "Episódios",
    }

    const buildResult = (result)=> {
        return keys.map((key) =>document.getElementById(key))
        .map((elem)=>{
            //criar elementos para valores que são objetos
            if(elem.checked === true && Array.isArray (result[elem.name]) === true){
                const arrayResult = result[elem.name].join('\r\n');
                const newElem = document.createElement('p');
                newElem.innerHTML=`${newKeys[elem.name]}:${arrayResult}`;
                content.appendChild(newElem);
            }

            else if(elem.checked === true && (elem.name ==='origin')){
                const newElem = document.createElement('p');
                newElem.innerHTML=`${newKeys[elem.name]}:${result[elem.name].name}`;
                content.appendChild(newElem);
            }

            else if(elem.checked === true && typeof (result[elem.name]) !== 'object'){
                const newElem = document.createElement('p');
                newElem.innerHTML=`${newKeys[elem.name]}:${result[elem.name]}`;
                content.appendChild(newElem);
            }
        });
    }

    btnGo.addEventListener('click', async (event)=>{
        event.preventDefault();

        

        if(characterId.value===''){
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Necessário selecionar pelo menos um ítem!!!'
            errorMessage.classList.add('error-message');
            content.innerHTML = '';
            content.appendChild(errorMessage);
            return;
        }

        const result = await fetchApi(characterId.value);
        
        if(content.firstChild ===null){
            conteinerResult.className='resultstyle';
            //criando o elemento da imagem
            const image = document.createElement('img')
            //img.setAttribute('class', 'image')
            image.src = result.image;
            //adicionando o elemento de imagem a conteudo
            content.appendChild(image);
            buildResult(result);
            
        }else{
            content.innerHTML = '';
            conteinerResult.className='resultstyle';
            //criando o elemento da imagem
            const image = document.createElement('img')
            //img.setAttribute('class', 'image')
            image.src = result.image;
            //adicionando o elemento de imagem a conteudo
            content.appendChild(image);
            buildResult(result);
        };
    });

    btnReset.addEventListener('click', () => location.reload());
    
    // declara a variável content de forma global
    let container;
    
    const loadCard = async () => {
       
        const dadosApi = await fetch(`https://rickandmortyapi.com/api/character/`)
        const objDados = await dadosApi.json()
        const dados = objDados.results
        
        const content = document.getElementById('content');
        const container = document.createElement('div')

        dados.forEach((card) => {

            const div = document.createElement('div')
            const imageCard = document.createElement('img')
            const name = document.createElement('h3')
            const status = document.createElement('h3')
            const species = document.createElement('h3')
            const gender = document.createElement('h3')

           
            // set attribute
            container.setAttribute('class', 'caixa')
            div.setAttribute('class', 'results')
            
            imageCard.setAttribute('class', 'image')
           
            imageCard.src = card.image
            name.textContent = "Nome:  " + card.name
            status.textContent = "Status:  " + card.status
            species.textContent = "Espécies:  " + card.species
            gender.textContent = "Gênero:  " + card.gender
            
            div.appendChild(imageCard)
            container.appendChild(div)
            div.appendChild(name)
            div.appendChild(status)
            div.appendChild(species)
            div.appendChild(gender)
        });
        content.appendChild(container)
    }

    window.onload = () =>{
        loadCard()
    }


//função de busca de personagens
const searchCharacters = async (event) => {
    //impedir o comportamento padrão de recarregar a página
    event.preventDefault();

// Função para limpar o conteúdo do contêiner de resultados
const limparConteiner = () => {
    conteinerResult.innerHTML = '';
};

    const searchQuery = document.getElementById('pesquisa').value.trim().toLowerCase();
    
    //verifica se a pesquisa está vazia
    if (!searchQuery) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Necessário inserir um valor para pesquisar!';
        errorMessage.classList.add('error-message');
        limparConteiner();
        conteinerResult.appendChild(errorMessage);
        return;
    }
    
    //faz a requisição para a API para obter todos os personagens
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character/');
        const data = await response.json();
        const characters = data.results;
        
        //filtra os personagens com base no nome
        const filteredCharacters = characters.filter(character => {
            return character.name.toLowerCase().includes(searchQuery);
        });
        
        //limpa o conteúdo atual do contêiner de resultados
        conteinerResult.innerHTML = '';

        //se não houver resultados, exibe uma mensagem
        if (filteredCharacters.length === 0) {

            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Não encontramos nenhum personagem com o nome especificado!!!';
            errorMessage.classList.add('error-message');
            conteinerResult.innerHTML = '';
            conteinerResult.appendChild(errorMessage);
            return;
        }

        //cria um contêiner para os cards
        const container = document.createElement('div');
        container.setAttribute('class', 'caixa'); 

        //renderiza os personagens filtrados como cards
        filteredCharacters.forEach(character => {
            
            //cria um card para cada personagem
            const characterCard = document.createElement('div');
            const imageCard = document.createElement('img');

            characterCard.setAttribute('class', 'results');
            imageCard.setAttribute('class', 'image');
            
            imageCard.src = character.image;
            imageCard.alt = character.name;
                   
            //cria elementos para as informações
            const name = document.createElement('h3');
            const status = document.createElement('h3');
            const species = document.createElement('h3');
            const gender = document.createElement('h3');
            
            name.textContent = "Nome: " + character.name;
            status.textContent = "Status: " + character.status;
            species.textContent = "Espécies: " + character.species;
            gender.textContent = "Gênero: " + character.gender;
             
            //adiciona elementos ao card
            characterCard.appendChild(imageCard);
            characterCard.appendChild(name);
            characterCard.appendChild(status);
            characterCard.appendChild(species);
            characterCard.appendChild(gender);

            // Adiciona o card ao contêiner
            container.appendChild(characterCard);
        });
        
        conteinerResult.appendChild(container);

        
    } catch (error) {
        console.error('Ocorreu um erro ao buscar os personagens:', error);
        conteinerResult.innerHTML = 'Ocorreu um erro ao buscar os personagens. Por favor, tente novamente mais tarde.';
    }
};
document.getElementById('btn-pesquisa').addEventListener('click', searchCharacters);


// ao clicar em Home ele carregará os cards
const homeLink = document.querySelector('.home');

// adicionando um evento de click ao elemento home
homeLink.addEventListener('click', function(event) {
    //impede o comportamento padrão de seguir o link
    event.preventDefault();

    // Limpa o conteúdo atual do contêiner de resultados
    container.innerHTML = '';

    // chama a função loadCard
    loadCard();

});