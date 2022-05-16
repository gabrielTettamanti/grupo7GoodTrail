let experiences = [
    {
        id: 1,
        nombre: 'Santiago Bernabeu',
        descripcion: 'Una visita guiada por uno de los estadios mas importantes en el mundo del fútbol.',
        imagen: 'bernabeuCatalog.jpg',
        precio: '$310.000',
        rating: 5,
        ubication: 'Madrid - España',
        days: '2',
        peopleQuantity: '2',
        detailDescription: 'Estadia en Madrid para 2 personas. 2 días de estadias. Viaje incluido. Vivi la experiencia de ver un partido de UEFA Champions League del Real Madrid en el grandioso Santiago Bernabeu.',
        googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.0426330626033!2d-3.692847685271651!3d40.45219336140707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e2fe54acd3%3A0x7bdf12a106fcb23e!2sSantiago%20Bernabeu!5e0!3m2!1ses-419!2sar!4v1650753609969!5m2!1ses-419!2sar"
    },

    {
        id: 2,
        nombre: 'Giza',
        descripcion: 'Visita la tierra de los faraones y descubre una de las maravillas del mundo.',
        imagen: 'gizaCatalog.png',
        precio: '$350.000',
        rating: 4,
        ubication: 'Giza - Egipto',
        days: '3',
        peopleQuantity: '2',
        detailDescription: '',
        googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98273.55947475434!2d31.11199047685871!3d29.976588930703745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584514019cd63f%3A0xcd9b620a6cdaf277!2sPir%C3%A1mides%20de%20Guiza!5e0!3m2!1ses-419!2sar!4v1652632518404!5m2!1ses-419!2sar"
    },

    {
        id: 3,
        nombre: 'Roma',
        descripcion: 'Explora las calles y recovecos de la historia en la hermosa ciudad de los Gnocchi.',
        imagen: 'romaCatalog.jpg',
        precio: '$350.000',
        rating: 5,
        ubication: 'Roma - Italia',
        days: '4',
        peopleQuantity: '2',
        detailDescription: '',
        googleMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.123073808986!2d12.490042215441486!3d41.89021017922119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColiseo%20de%20Roma!5e0!3m2!1ses-419!2sar!4v1652645816136!5m2!1ses-419!2sar'
    },

    {
        id: 4,
        nombre: 'Liverpool',
        descripcion: 'Vive un partido del Liverpool FC y escucha el emblematico You will never walk alone.',
        imagen: 'liverpool.jpg',
        precio: '$250.000',
        rating: 5,
        ubication: 'Liverpool - Inglaterra',
        days: '4',
        peopleQuantity: '1',
        detailDescription: '',
        googleMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5081.800814010485!2d-2.963903659422149!3d53.42923419316127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b21654b02538b%3A0x84576a57e21973ff!2sAnfield!5e0!3m2!1ses-419!2sar!4v1652646028140!5m2!1ses-419!2sar'
    },

    {
        id: 5,
        nombre: 'La Stampa',
        descripcion: 'Cena para 2 en el famoso restaurant italiano de la ciudad de Buenos Aires.',
        imagen: 'stampa.jpg',
        precio: '$5.000',
        rating: 4,
        ubication: 'CABA - Buenos Aires',
        days: '0',
        peopleQuantity: '2',
        detailDescription: '',
        googleMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18381.138862942604!2d-58.39058705895161!3d-34.59371359932359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab0f465191b%3A0x6da1423e5f34b78!2sLa%20Stampa!5e0!3m2!1ses-419!2sar!4v1652646242219!5m2!1ses-419!2sar'
    },

    {
        id: 6,
        nombre: 'The Temple Bar',
        descripcion: 'Noche de cervezas con amigos en uno de los bares más populares de Buenos Aires.',
        imagen: 'temple.jpg',
        precio: '$3.000',
        rating: 3,
        ubication: 'CABA - Buenos Aires',
        days: '0',
        peopleQuantity: '3',
        detailDescription: '',
        googleMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d708.2410542592529!2d-58.427272817284376!3d-34.588174541276224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x508b1b12186da6e7!2sTemple%20Craft%20Soho!5e0!3m2!1ses-419!2sar!4v1652646337594!5m2!1ses-419!2sar'
    },

    {
        id: 7,
        nombre: 'Hotel Madero',
        descripcion: 'Una noche para 2 personas en el prestigioso hotel de Puerto Madero.',
        imagen: 'hotelMadero.avif',
        precio: '$65.000',
        rating: 4,
        ubication: 'CABA - Buenos Aires',
        days: '1',
        peopleQuantity: '2',
        detailDescription: '',
        googleMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.453115740122!2d-58.364409856396804!3d-34.61798807820555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb601a567735f%3A0x307c7f8ed4683460!2sHotel%20Madero!5e0!3m2!1ses-419!2sar!4v1652646460447!5m2!1ses-419!2sar'
    },

    {
        id: 8,
        nombre: 'Rabieta',
        descripcion: 'Cena para 4 personas en el bar ubicado en el hipodromo de Palermo.',
        imagen: 'rabieta.jpg',
        precio: '$8.000',
        rating: 4,
        ubication: 'CABA - Buenos Aires',
        days: '0',
        peopleQuantity: '4',
        detailDescription: '',
        googleMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10459.790100541297!2d-58.42871829626127!3d-34.56657863276878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5989d4c3801%3A0xa668e50e97c28989!2sRabieta!5e0!3m2!1ses-419!2sar!4v1652646606029!5m2!1ses-419!2sar'
    },

    {
        id: 9,
        nombre: 'Golden State Warriors',
        descripcion: 'Noche de NBA en la casa del gran Stephen Curry.',
        imagen: 'warriors.jpg',
        precio: '$500.000',
        rating: 5,
        ubication: 'San Francisco - USA',
        days: '2',
        peopleQuantity: '2',
        detailDescription: '',
        googleMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1991.436431564132!2d-122.38880064229781!3d37.7676736684068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7fc67f4400e9%3A0x7d6793e3d8a141e3!2sChase%20Center!5e0!3m2!1ses-419!2sar!4v1652646764325!5m2!1ses-419!2sar'
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
    editor: (req, res) => {
        res.render('editor');
    },
    notFound: (req, res) => {
        res.render('notFound');
    }
}

module.exports = mainController