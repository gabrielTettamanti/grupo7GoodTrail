let experiencias = [
    {
        id: 1,
        nombre: 'Santiago Bernabeu',
        descripcion: 'Una visita guiada por uno de los estadios mas importantes en el mundo del fútbol.',
        imagen: 'bernabeuCatalog.jpg',
        precio: '$310.000',

    },
    {
        id: 2,
        nombre: 'Giza',
        descripcion: 'Visita la tierra de los faraones y descubre una de las maravillas del mundo.',
        imagen: 'gizaCatalog.png',
        precio: '$350.000',

    },
    {
        id: 3,
        nombre: 'Roma',
        descripcion: 'Explora las calles y recovecos de la historia en la hermosa ciudad de los Gnocchi.',
        imagen: 'romaCatalog.jpg',
        precio: '$350.000',

    },
    {
        id: 4,
        nombre: 'Liverpool',
        descripcion: 'Vive un partido del Liverpool FC y escucha el emblematico You will never walk alone.',
        imagen: 'liverpool.jpg',
        precio: '$250.000',

    },
    {
        id: 5,
        nombre: 'La Stampa',
        descripcion: 'Cena para 2 en el famoso restaurant italiano de la ciudad de Buenos Aires.',
        imagen: 'stampa.jpg',
        precio: '$5.000',

    },
    {
        id: 6,
        nombre: 'The Temple Bar',
        descripcion: 'Noche de cervezas con amigos en uno de los bares más populares de Buenos Aires.',
        imagen: 'temple.jpg',
        precio: '$3.000',

    }
];




const mainController ={

    index: (req, res) => {
        let detalleExperiencias = productos.find(experiencia => experiencia.id == req.params.id)
        return res.render('detallePlato', {idExperiencias: detalleExperiencias, experiencias: experiencias});
    },
    experienceCatalog:(req, res) => {
        return res.render('experienceCatalog');
    },
    productDescription: (req, res) => {
        let detalleExperiencias = productos.find(experiencia => experiencia.id == req.params.id)
        return res.render('detallePlato', {idExperiencias: detalleExperiencias});
    },
    buyCart: (req, res) => {
        return res.render('buyCart');
    },
    login: (req, res) => {
        return res.render('login');
    },
    register: (req, res) => {
        return res.render('register');
    },
    notFound: (req, res) => {
        return res.render('notFound');
    },

    
}

module.exports = mainController