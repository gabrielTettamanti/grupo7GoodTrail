let experiences = [
    {
        id: 1,
        nombre: 'Santiago Bernabeu',
        descripcion: 'Una visita guiada por uno de los estadios mas importantes en el mundo del fútbol.',
        imagen: 'cardImages/bernabeuCatalog.jpg',
        precio: '$310.000',
        rating: 5,
        ubication: 'Madrid - España',
        days: '2',
        peopleQuantity: '2',
        googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.0426330626033!2d-3.692847685271651!3d40.45219336140707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e2fe54acd3%3A0x7bdf12a106fcb23e!2sSantiago%20Bernabeu!5e0!3m2!1ses-419!2sar!4v1650753609969!5m2!1ses-419!2sar"

    },

    {
        id: 2,
        nombre: 'Giza',
        descripcion: 'Visita la tierra de los faraones y descubre una de las maravillas del mundo.',
        imagen: 'cardImages/gizaCatalog.png',
        precio: '$350.000',
        rating: 4,
        ubication: 'Giza - Egipto',
        days: '3',
        peopleQuantity: '2',
        googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98273.55947475434!2d31.11199047685871!3d29.976588930703745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584514019cd63f%3A0xcd9b620a6cdaf277!2sPir%C3%A1mides%20de%20Guiza!5e0!3m2!1ses-419!2sar!4v1652632518404!5m2!1ses-419!2sar"
    },

    {
        id: 3,
        nombre: 'Roma',
        descripcion: 'Explora las calles y recovecos de la historia en la hermosa ciudad de los Gnocchi.',
        imagen: 'cardImages/romaCatalog.jpg',
        precio: '$350.000',
        rating: 5
    },

    {
        id: 4,
        nombre: 'Liverpool',
        descripcion: 'Vive un partido del Liverpool FC y escucha el emblematico You will never walk alone.',
        imagen: 'cardImages/liverpool.jpg',
        precio: '$250.000',
        rating: 5
    },

    {
        id: 5,
        nombre: 'La Stampa',
        descripcion: 'Cena para 2 en el famoso restaurant italiano de la ciudad de Buenos Aires.',
        imagen: 'cardImages/stampa.jpg',
        precio: '$5.000',
        rating: 4
    },

    {
        id: 6,
        nombre: 'The Temple Bar',
        descripcion: 'Noche de cervezas con amigos en uno de los bares más populares de Buenos Aires.',
        imagen: 'cardImages/temple.jpg',
        precio: '$3.000',
        rating: 3
    },

    {
        id: 7,
        nombre: 'Hotel Madero',
        descripcion: 'Una noche para 2 personas en el prestigioso hotel de Puerto Madero.',
        imagen: 'cardImages/hotelMadero.avif',
        precio: '$65.000',
        rating: 4
    },

    {
        id: 8,
        nombre: 'Rabieta',
        descripcion: 'Cena para 4 personas en el bar ubicado en el hipodromo de Palermo.',
        imagen: 'cardImages/rabieta.jpg',
        precio: '$8.000',
        rating: 4
    },

    {
        id: 9,
        nombre: 'Golden State Warriors',
        descripcion: 'Noche de NBA en la casa del gran Stephen Curry.',
        imagen: 'cardImages/warriors.jpg',
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