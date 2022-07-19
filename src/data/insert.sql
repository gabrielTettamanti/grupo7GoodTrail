-- -----------------------------------------------------
-- Users insert
-- -----------------------------------------------------
INSERT INTO `user`(id, first_name, last_name, email, `password`, image, bio)
Values (default, "Ignacio", "Lopez", "ignaciolopestela12@gmail.com", "$2a$10$OPkwQVeeDzuxLythxBfNvur7DkwApqgVaBTTaxvFr4CkKMMtkw6z2", "1654440409516-avatar-test.jpeg", "Me dicen Nacho. Soy uno de los creadores de la página. Aguante Boca!"),(default, "Gabriel", "Tettamanti", "gabrieltettamanti.dev@gmail.com", "$2a$10$K03891dZx9vohC1biqhCP.OvFJ.nrn8bKkUtZQJIR4hmbwxFAZ2sO", "profile-default.jpg", ""), (default, "Julian", "Julian", "julian@gmail.com", "$2a$10$.mShdg4qCVmimsFBi.snoOribx0T0n772QYK6xGP8n7LowTBzNYGC", "1655250027506-938446.jpg", ""),(default, "lucre", "lucre", "lucrerios95@gmail.com", "$2a$10$gYl9kN7ckhF86h/6CVHhtODgSx8FGg2G2kkE0cOnAO4i6f8HTQpWG", "profile-default.jpg", "");

-- -----------------------------------------------------
-- Experiences insert
-- -----------------------------------------------------
INSERT INTO experience(id, `name`, `description`, category, location, people_quantity, duration, duration_type, currency, price, map_direction, `user_id`)
Values (1, "Santiago Bernabeu", "Visita el icónico estadio de Madrid y viví una noche de UEFA Champions League única. ", "Aventura", "Madrid - España", 2, 2, "dia", "$", 310000, "Santiago Bernabeu, Madrid", 2),(2, "Giza", "Visita la tierra de los faraones y descubre una de las maravillas del mundo. Entre la arena y los rayos de sol del desierto podras visitar las grandes piramides, un recuerdo de una de las mas grandes civilizaciones de la antiguedad.", "Viaje", "Giza - Egipto", 2, 3, "días", "$", 350000, "Pirámides de Guiza, Egipto", 2),(3, "Roma", "Un recorrido asombroso en la capital de Italia. Explora las calles y recovecos de la historia en la hermosa ciudad de los Gnocchi. ", "Aventura", "Roma - Italia", "2", "4", "dia", "$", 350000, "Coliseo de Roma, Italia", 2),(4, "Liverpool", "Vive un partido del Liverpool FC y escucha el emblematico You will never walk alone.", "Viaje", "Liverpool - Inglaterra", 1, 4, "días", "$", 250000, "Anfield Liverpool, Inglaterra", 2),(5, "La Stampa", "Cena para 2 en el famoso restaurant italiano de la ciudad de Buenos Aires.", "Gourmet", "CABA - Buenos Aires", 2, 0, "días", "$", 5000, "Posadas 1011 CABA, Argentina", 2),(6, "The Temple Bar", "Noche de cervezas con amigos en uno de los bares más populares de Buenos Aires.", "Gourmet", "CABA - Buenos Aires", 3, 0, "días", "$", 3000, "Casa Temple Buenos Aires, Argentina", 2),(7, "Hotel Madero", "Una noche para 2 personas en el prestigioso hotel de Puerto Madero.", "Hoteleria", "CABA - Buenos Aires", 2, 1, "día", "$", 65000, "Hotel Madero Buenos Aires, Argentina", 2),(8, "Rabieta", "Cena para 4 personas en el bar ubicado en el hipodromo de Palermo.", "Gourmet", "CABA - Buenos Aires", 4, 0, "día", "$", 8000, "Rabieta Avenida Libertador, Buenos Aires", 2),(9, "Golden State Warriors", "Noche de NBA en la casa del gran Stephen Curry.", "Viaje", "San Francisco - USA", 2, 2, "días", "$", 500000, "Chase Center San Francisco, California", 2);

-- -----------------------------------------------------
-- Experiences images insert
-- -----------------------------------------------------
INSERT INTO experience_image (id, url, experience_id) 
VALUES (1, 'bernabeuCatalog.jpg', 1), (2, 'gizaCatalog.png', 2), (3, 'romaCatalog.jpg', 3), (4, 'liverpool.jpg' , 4), (5, 'stampa.jpg' ,5), (6, 'temple.jpg' ,6), (7, 'hotelMadero.avif' ,7), (8, 'rabieta.jpg' ,8), (9, 'warriors.jpg',9);

-- -----------------------------------------------------
-- Offer insert
-- -----------------------------------------------------
INSERT INTO Offer (id, status, discount, limit_date, experience_id)
VALUES (1, 0, null, null, 1),(2, 0, null, null, 2),(3, 0, null, null, 3),(4, 0, null, null, 4),(5, 0, null, null, 5),(6, 0, null, null, 6),(7, 0, null, null, 7),(8, 0, null, null, 8),(9, 0, null, null, 9);
