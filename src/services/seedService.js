import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { products, recentOrders } from "./dataService";

export const seedDatabase = async () => {
    console.log("Starting database seeding...");

    try {
        // Seed Products
        for (const product of products) {
            await addDoc(collection(db, "products"), {
                ...product,
                timestamp: new Date().toISOString()
            });
        }
        console.log("Products seeded.");

        // Seed Subscribers
        const dummySubscribers = [
            { name: "Ahmet Yılmaz", phone: "05321112233", address: "Merkez Mah. No:1", status: "Active", plan: "Gold" },
            { name: "Ayşe Demir", phone: "05354445566", address: "Gül Sokak No:5", status: "Active", plan: "Silver" },
            { name: "Mehmet Kaya", phone: "05427778899", address: "Lale Cad. No:12", status: "Suspended", plan: "Basic" }
        ];

        for (const sub of dummySubscribers) {
            await addDoc(collection(db, "subscribers"), {
                ...sub,
                timestamp: new Date().toISOString()
            });
        }
        console.log("Subscribers seeded.");

        // Seed Orders
        for (const order of recentOrders) {
            await addDoc(collection(db, "orders"), {
                ...order,
                timestamp: new Date().toISOString()
            });
        }
        console.log("Orders seeded.");

        console.log("Seeding complete!");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};
