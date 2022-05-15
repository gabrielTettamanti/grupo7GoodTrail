let experiences = [
    {
        id: 1,
        nombre: 'Santiago Bernabeu',
        descripcion: 'Una visita guiada por uno de los estadios mas importantes en el mundo del fútbol.',
        imagen: 'bernabeuCatalog.jpg',
        precio: '$310.000',
        rating: 5

    },

    {
        id: 2,
        nombre: 'Giza',
        descripcion: 'Visita la tierra de los faraones y descubre una de las maravillas del mundo.',
        imagen: 'gizaCatalog.png',
        precio: '$350.000',
        rating: 4
    },

    {
        id: 3,
        nombre: 'Roma',
        descripcion: 'Explora las calles y recovecos de la historia en la hermosa ciudad de los Gnocchi.',
        imagen: 'romaCatalog.jpg',
        precio: '$350.000',
        rating: 5
    },

    {
        id: 4,
        nombre: 'Liverpool',
        descripcion: 'Vive un partido del Liverpool FC y escucha el emblematico You will never walk alone.',
        imagen: 'liverpool.jpg',
        precio: '$250.000',
        rating: 5
    },

    {
        id: 5,
        nombre: 'La Stampa',
        descripcion: 'Cena para 2 en el famoso restaurant italiano de la ciudad de Buenos Aires.',
        imagen: 'stampa.jpg',
        precio: '$5.000',
        rating: 4
    },

    {
        id: 6,
        nombre: 'The Temple Bar',
        descripcion: 'Noche de cervezas con amigos en uno de los bares más populares de Buenos Aires.',
        imagen: 'temple.jpg',
        precio: '$3.000',
        rating: 3
    },

    {
        id: 7,
        nombre: 'Hotel Madero',
        descripcion: 'Una noche para 2 personas en el prestigioso hotel de Puerto Madero.',
        imagen: 'hotelMadero.avif',
        precio: '$65.000',
        rating: 4
    },

    {
        id: 8,
        nombre: 'Rabieta',
        descripcion: 'Cena para 4 personas en el bar ubicado en el hipodromo de Palermo.',
        imagen: 'rabieta.jpg',
        precio: '$8.000',
        rating: 4
    },

    {
        id: 8,
        nombre: 'Golden State Warriors',
        descripcion: 'Noche de NBA en la casa del gran Stephen Curry.',
        imagen: 'warriors.jpg',
        precio: '$500.000',
        rating: 5
    },

];




const mainController ={

    index: (req, res) => {
        res.render('index', {experiences: experiences});
    },
    experienceCatalog:(req, res) => {
        res.render('experienceCatalog', {experiences: experiences});
    },
    productDescription: (req, res) => {
        let experienceDetail = experiences.find(experience => experience.id == req.params.id);
        res.render('productDescription', {experienceDetail: experienceDetail});
    },
    buyCart: (req, res) => {
        res.render('buyCart');
    },
    login: (req, res) => {
        res.render('login');
    },
    registerFormulary: (req, res) => {
        res.render('registerFormulary');
    },
    notFound: (req, res) => {
        res.render('notFound');
    }
}

module.exports = mainController