require("dotenv").config({ path: "./.env" });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const Listing = require("../models/Listing.model");

const MONGO_URI = process.env.MONGODB_URI;

const usersData = [
  {
    name: "Sofia Müller",
    email: "sofia@example.com",
    password: "1234",
    city: "Berlin",
    age: 27,
    cleanliness: 5,
    noiseLevel: 2,
    smoker: false,
    pets: true,
    description: "Diseñadora gráfica, ordenada y tranquila. Me gusta vivir en un ambiente limpio y relajado.",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Lucas Schneider",
    email: "lucas@example.com",
    password: "1234",
    city: "Berlin",
    age: 30,
    cleanliness: 4,
    noiseLevel: 3,
    smoker: false,
    pets: false,
    description: "Trabajo en tecnología, disfruto cocinar y mantener espacios compartidos bien cuidados.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Emma Fischer",
    email: "emma@example.com",
    password: "1234",
    city: "Hamburg",
    age: 25,
    cleanliness: 3,
    noiseLevel: 4,
    smoker: false,
    pets: true,
    description: "Estudiante de máster, sociable, me gustan las plantas y los espacios luminosos.",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
  {
    name: "Mateo Weber",
    email: "mateo@example.com",
    password: "1234",
    city: "Munich",
    age: 31,
    cleanliness: 4,
    noiseLevel: 2,
    smoker: true,
    pets: false,
    description: "Consultor, bastante tranquilo, valoro el respeto y la buena convivencia.",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Laura Becker",
    email: "laura@example.com",
    password: "1234",
    city: "Cologne",
    age: 28,
    cleanliness: 5,
    noiseLevel: 1,
    smoker: false,
    pets: false,
    description: "Me encanta el orden, el café y tener una casa acogedora.",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    name: "Noah Hartmann",
    email: "noah@example.com",
    password: "1234",
    city: "Berlin",
    age: 26,
    cleanliness: 2,
    noiseLevel: 5,
    smoker: true,
    pets: true,
    description: "Músico freelance, ambiente relajado, ideal para personas sociables.",
    photoUrl: "https://images.unsplash.com/photo-1504593811423-6dd665756598",
  },
  {
    name: "Valentina Ruiz",
    email: "valentina@example.com",
    password: "1234",
    city: "Leipzig",
    age: 29,
    cleanliness: 4,
    noiseLevel: 3,
    smoker: false,
    pets: true,
    description: "Trabajo remoto, me gustan los espacios tranquilos pero con buena energía.",
    photoUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
  },
  {
    name: "Daniel Krüger",
    email: "daniel@example.com",
    password: "1234",
    city: "Frankfurt",
    age: 33,
    cleanliness: 3,
    noiseLevel: 2,
    smoker: false,
    pets: false,
    description: "Profesional del área financiera, responsable y bastante independiente.",
    photoUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
  },
];

    const listingsData = [
      {
        title: "Sunny room in central Berlin",
        city: "Berlin",
        price: 650,
        description: "Habitación luminosa cerca del metro, piso compartido con ambiente tranquilo y moderno.",
        cleanliness: 5,
        noiseLevel: 2,
        smokerAllowed: false,
        petsAllowed: true,
        photoUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        ownerEmail: "sofia@example.com",
      },
      {
        title: "Cozy flatshare near Kreuzberg",
        city: "Berlin",
        price: 720,
        description: "Perfecto para alguien sociable que quiera vivir cerca de cafés, bares y transporte.",
        cleanliness: 4,
        noiseLevel: 3,
        smokerAllowed: false,
        petsAllowed: false,
        photoUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156",
        ownerEmail: "lucas@example.com",
      },
      {
        title: "Quiet room with balcony",
        city: "Hamburg",
        price: 590,
        description: "Piso tranquilo con balcón y mucha luz natural, ideal para estudiantes o remote workers.",
        cleanliness: 3,
        noiseLevel: 2,
        smokerAllowed: false,
        petsAllowed: true,
        photoUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
        ownerEmail:"emma@example.com",
      },
      {
        title: "Modern shared apartment in Munich",
        city: "Munich",
        price: 850,
        description: "Apartamento moderno con cocina equipada y excelente conexión al centro.",
        cleanliness: 4,
        noiseLevel: 2,
        smokerAllowed: true,
        petsAllowed: false,
        photoUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        ownerEmail:"mateo@example.com",
      },
      {
        title: "Minimalist room in a calm home",
        city: "Cologne",
        price: 610,
        description: "Espacio simple y acogedor en un hogar muy limpio y silencioso.",
        cleanliness: 5,
        noiseLevel: 1,
        smokerAllowed: false,
        petsAllowed: false,
        photoUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        ownerEmail: "laura@example.com",
      },
      {
        title: "Creative flat for open-minded flatmates",
        city: "Berlin",
        price: 560,
        description: "Piso con ambiente artístico, música y espacios comunes amplios.",
        cleanliness: 2,
        noiseLevel: 5,
        smokerAllowed: true,
        petsAllowed: true,
        photoUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
        ownerEmail: "noah@example.com",
      },
      {
        title: "Warm and bright room for remote worker",
        city: "Leipzig",
        price: 540,
        description: "Ideal para quien trabaja desde casa y busca un ambiente agradable y ordenado.",
        cleanliness: 4,
        noiseLevel: 3,
        smokerAllowed: false,
        petsAllowed: true,
        photoUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
        ownerEmail: "valentina@example.com",
      },
      {
        title: "Practical room in Frankfurt",
        city: "Frankfurt",
        price: 690,
        description: "Habitación funcional en zona bien conectada, perfecta para profesionales.",
        cleanliness: 3,
        noiseLevel: 2,
        smokerAllowed: false,
        petsAllowed: false,
        photoUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        ownerEmail:"daniel@example.com",
      },
      {
        title: "Spacious room near park",
        city: "Berlin",
        price: 740,
        description: "Gran habitación cerca de un parque, con living amplio y mucha luz.",
        cleanliness: 4,
        noiseLevel: 2,
        smokerAllowed: false,
        petsAllowed: true,
        photoUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80",
        ownerEmail: "sofia@example.com",
      },
      {
        title: "Affordable shared room in lively area",
        city: "Berlin",
        price: 500,
        description: "Buena opción económica en un barrio animado con muchos servicios cerca.",
        cleanliness: 3,
        noiseLevel: 4,
        smokerAllowed: true,
        petsAllowed: false,
        photoUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        ownerEmail: "lucas@example.com",
      },
      {
        title: "Elegant apartment room with desk",
        city: "Munich",
        price: 890,
        description: "Habitación elegante con escritorio, ideal para estudiar o trabajar en casa.",
        cleanliness: 5,
        noiseLevel: 1,
        smokerAllowed: false,
        petsAllowed: false,
        photoUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        ownerEmail: "mateo@example.com",
      },
      {
        title: "Pet-friendly flatshare with character",
        city: "Hamburg",
        price: 620,
        description: "Piso con personalidad, decoración cálida y buena convivencia.",
        cleanliness: 3,
        noiseLevel: 3,
        smokerAllowed: false,
        petsAllowed: true,
        photoUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156",
        ownerEmail: "emma@example.com",
      },
    ];

   async function seed() {
  try {
    console.log("Connecting to:", MONGO_URI);

    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB:", mongoose.connection.name);

    await User.deleteMany();
    await Listing.deleteMany();

    console.log("Collections cleaned");

    const usersWithHashedPasswords = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log("Users created:", createdUsers.length);

    const userMap = {};
    createdUsers.forEach((user) => {
      userMap[user.email] = user._id;
    });

    const cleanedListings = listingsData.map((listing) => {
      const ownerId = userMap[listing.ownerEmail];

      if (!ownerId) {
        throw new Error(`No user found for ownerEmail: ${listing.ownerEmail}`);
      }

      return {
        title: listing.title,
        city: listing.city,
        price: listing.price,
        description: listing.description,
        cleanliness: listing.cleanliness,
        noiseLevel: listing.noiseLevel,
        smokerAllowed: listing.smokerAllowed,
        petsAllowed: listing.petsAllowed,
        photoUrl: listing.photoUrl,
        owner: ownerId,
      };
    });

    const createdListings = await Listing.insertMany(cleanedListings);
    console.log("Listings created:", createdListings.length);

    console.log("Total users:", await User.countDocuments());
    console.log("Total listings:", await Listing.countDocuments());

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();