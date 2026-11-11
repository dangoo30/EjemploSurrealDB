DELETE likes;
DELETE follows;
DELETE song;
DELETE user;

CREATE user:ana CONTENT { username: "ana", email: "ana@correo.com", favoriteGenres: ["rock", "indie"] };
CREATE user:luis CONTENT { username: "luis", email: "luis@correo.com", favoriteGenres: ["rock"] };
CREATE user:sofia CONTENT { username: "sofia", email: "sofia@correo.com", favoriteGenres: ["pop", "reggaeton"] };
CREATE user:mateo CONTENT { username: "mateo", email: "mateo@correo.com" };

CREATE song:bohemian_rhapsody CONTENT { title: "Bohemian Rhapsody", artist: "Queen", genre: "rock", duration: 5m55s, metadata: { album: "A Night at the Opera", year: 1975 } };
CREATE song:de_musica_ligera CONTENT { title: "De Musica Ligera", artist: "Soda Stereo", genre: "rock", duration: 3m32s, metadata: { album: "Cancion Animal", year: 1990, liveVersion: true } };
CREATE song:la_bicicleta CONTENT { title: "La Bicicleta", artist: "Carlos Vives y Shakira", genre: "pop", duration: 3m48s, metadata: { year: 2016, bpm: 90 } };
CREATE song:tusa CONTENT { title: "Tusa", artist: "Karol G y Nicki Minaj", genre: "reggaeton", duration: 3m20s };
CREATE song:reptilia CONTENT { title: "Reptilia", artist: "The Strokes", genre: "indie", duration: 3m41s, metadata: { album: "Room on Fire" } };

RELATE user:ana->follows->user:luis;
RELATE user:ana->follows->user:sofia;
RELATE user:luis->follows->user:mateo;
RELATE user:sofia->follows->user:ana;

RELATE user:ana->likes->song:bohemian_rhapsody;
RELATE user:luis->likes->song:bohemian_rhapsody;
RELATE user:luis->likes->song:de_musica_ligera;
RELATE user:luis->likes->song:reptilia;
RELATE user:sofia->likes->song:la_bicicleta;
RELATE user:sofia->likes->song:de_musica_ligera;
RELATE user:mateo->likes->song:tusa;
