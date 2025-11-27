// static/modules/data.js

export const allUsers = [
    { email: "admin@farmaplus.com", password: "admin123", role: "admin", name: "Admin FarmaPlus" }
];

// AQUÍ LA CORRECCIÓN: Agregamos '/static' antes de cada ruta de imagen
export const allProducts = [
    { id: "1", name: "Paracetamol 500mg", description: "Analgésico y antipirético.", price: 99, image: "/static/imagenes/paracetamol.png", rating: 5, badge: "-20%", category: "medicamentos" },
    { id: "2", name: "Ibuprofeno 400mg", description: "Antiinflamatorio.", price: 130, image: "/static/imagenes/ibuprofeno.png", rating: 5, category: "medicamentos" },
    { id: "5", name: "Crema Hidratante", description: "Hidratación 24h.", price: 320, originalPrice: 460, image: "/static/imagenes/crema-hidratante.png", rating: 4, badge: "-30%", category: "cuidado-personal" },
    { id: "6", name: "Protector Solar", description: "Protección alta.", price: 339, originalPrice: 439, image: "/static/imagenes/protector-solar.png", rating: 5, badge: "Nuevo", category: "cuidado-personal" },
    { id: "9", name: "Vitamina C", description: "Refuerza sistema inmune.", price: 250, image: "/static/imagenes/vitamina-c.png", rating: 5, category: "vitaminas" },
    { id: "13", name: "Pañales Bebé", description: "Máxima absorción.", price: 379, image: "/static/imagenes/pañales.png", rating: 5, category: "bebe" },
    { id: "17", name: "Kit Primeros Auxilios", description: "Botiquín completo.", price: 499, image: "/static/imagenes/kit-primeros-auxilios.png", rating: 5, category: "primeros-auxilios" },
    { id: "20", name: "Tensiómetro Digital", description: "Medición automática.", price: 699, image: "/static/imagenes/tensiometro.png", rating: 5, category: "primeros-auxilios" }
];