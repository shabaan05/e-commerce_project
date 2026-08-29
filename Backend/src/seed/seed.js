/**
 * Seed script — safe to run multiple times.
 * - Upserts categories (no duplicates).
 * - Upserts products by name (no duplicates).
 * - Downloads images from public URLs and uploads to Cloudinary.
 * - Does NOT delete users, orders, or any other data.
 *
 * Run: node src/seed/seed.js
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const https = require("https");
const http = require("http");
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

// ─── Helper: download image from URL → Buffer ───────────────────────────────
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow one redirect
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download image: HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// ─── Helper: upload Buffer to Cloudinary ─────────────────────────────────────
function uploadToCloudinary(buffer, folder = "ecommerce-products") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

// ─── Helper: get or upload image (with fallback) ─────────────────────────────
async function getCloudinaryUrl(imageUrl) {
  try {
    console.log(`  ↳ Downloading: ${imageUrl}`);
    const buffer = await downloadImage(imageUrl);
    const url = await uploadToCloudinary(buffer);
    console.log(`  ✓ Uploaded to Cloudinary`);
    return url;
  } catch (err) {
    console.warn(`  ✗ Image upload failed (${err.message}), using placeholder`);
    return "https://res.cloudinary.com/demo/image/upload/v1580125016/sample.jpg";
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: "Electronics" },
  { name: "Mobiles" },
  { name: "Laptops" },
  { name: "Fashion" },
  { name: "Footwear" },
  { name: "Home Appliances" },
  { name: "Accessories" },
  { name: "Sports & Fitness" },
  { name: "Books" },
  { name: "Home & Kitchen" },
];

// ─── Products data ────────────────────────────────────────────────────────────
// imageUrl: a reliable, publicly accessible image URL
const PRODUCTS = [
  // ── Electronics ───────────────────────────────────────────────
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 24999,
    description: "Industry-leading noise cancellation with 30-hour battery life and multi-device pairing. Lightweight design with premium sound quality.",
    countInStock: 40,
    categoryName: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  },
  {
    name: "JBL Charge 5 Portable Bluetooth Speaker",
    price: 14999,
    description: "Powerful stereo sound with a massive 20-hour battery and IP67 waterproof rating. Built-in power bank to charge your devices.",
    countInStock: 55,
    categoryName: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
  },
  {
    name: "Samsung 55-inch 4K Smart TV",
    price: 49999,
    description: "Crystal 4K UHD display with HDR support, built-in Alexa, and multiple streaming apps. Slim bezels for an immersive viewing experience.",
    countInStock: 20,
    categoryName: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
  },
  {
    name: "Canon EOS 200D Mark II DSLR Camera",
    price: 59999,
    description: "24.1 MP APS-C CMOS sensor with 4K video recording. Dual Pixel autofocus for fast, accurate shooting. Ideal for beginners and enthusiasts.",
    countInStock: 18,
    categoryName: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
  },

  // ── Mobiles ───────────────────────────────────────────────────
  {
    name: "iPhone 15 Pro – 256GB",
    price: 134900,
    description: "A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom. USB-C connectivity and Action button for fast controls.",
    countInStock: 30,
    categoryName: "Mobiles",
    imageUrl: "https://images.unsplash.com/photo-1695048132105-76ba7c0fda26?w=600&q=80",
  },
  {
    name: "Samsung Galaxy S24+ – 256GB",
    price: 99999,
    description: "Snapdragon 8 Gen 3, 50MP rear camera, 4900mAh battery with 45W fast charging. Corning Gorilla Glass Armor for enhanced durability.",
    countInStock: 25,
    categoryName: "Mobiles",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
  },
  {
    name: "OnePlus 12 – 256GB",
    price: 64999,
    description: "Snapdragon 8 Gen 3, Hasselblad-tuned 50MP triple camera, 100W SUPERVOOC charging and 5400mAh battery.",
    countInStock: 35,
    categoryName: "Mobiles",
    imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80",
  },
  {
    name: "Redmi Note 13 Pro – 128GB",
    price: 24999,
    description: "200MP primary camera, 67W turbo charging, AMOLED display with 120Hz refresh rate. Premium experience at a mid-range price.",
    countInStock: 60,
    categoryName: "Mobiles",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
  },

  // ── Laptops ───────────────────────────────────────────────────
  {
    name: "Apple MacBook Air M2 – 8GB/256GB",
    price: 99900,
    description: "Apple M2 chip, 13.6-inch Liquid Retina display, 18-hour battery life. Fanless design with MagSafe charging and two Thunderbolt ports.",
    countInStock: 22,
    categoryName: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
  },
  {
    name: "Dell XPS 15 – Intel i7, 16GB, 512GB SSD",
    price: 129990,
    description: "15.6-inch OLED InfinityEdge display, Intel Core i7-12700H, NVIDIA GeForce RTX 3050 Ti, long battery life in a thin chassis.",
    countInStock: 15,
    categoryName: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
  },
  {
    name: "HP Pavilion 15 – AMD Ryzen 5, 8GB, 512GB",
    price: 55990,
    description: "AMD Ryzen 5 5500U, 15.6-inch FHD IPS display, fast SSD storage, and integrated graphics. Great everyday laptop for students and professionals.",
    countInStock: 45,
    categoryName: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&q=80",
  },
  {
    name: "ASUS ROG Strix G15 Gaming Laptop",
    price: 89990,
    description: "AMD Ryzen 9, 16GB DDR5, NVIDIA RTX 4060, 15.6-inch 165Hz FHD display. RGB backlit keyboard and advanced cooling for serious gaming.",
    countInStock: 12,
    categoryName: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=600&q=80",
  },

  // ── Fashion ───────────────────────────────────────────────────
  {
    name: "Men's Slim Fit Formal Shirt – White",
    price: 1299,
    description: "100% cotton premium weave, slim fit collar, easy iron finish. Available in sizes S, M, L, XL, XXL. Perfect for office and formal occasions.",
    countInStock: 120,
    categoryName: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
  },
  {
    name: "Women's Floral Wrap Dress",
    price: 1799,
    description: "Lightweight, breathable fabric with a flattering V-neckline and adjustable waist tie. Machine washable and available in multiple prints.",
    countInStock: 80,
    categoryName: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=600&q=80",
  },
  {
    name: "Men's Slim Fit Denim Jeans – Dark Blue",
    price: 2199,
    description: "Stretch denim for a comfortable fit, slim leg silhouette, zip fly with button closure. 5-pocket styling, suitable for casual and smart-casual wear.",
    countInStock: 95,
    categoryName: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&q=80",
  },
  {
    name: "Women's Oversized Knit Sweater",
    price: 1599,
    description: "Soft ribbed knit in a relaxed oversized silhouette. Crew neckline, drop shoulders, perfect for layering in cooler weather.",
    countInStock: 70,
    categoryName: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
  },
  {
    name: "Men's Graphic Cotton T-Shirt",
    price: 799,
    description: "180 GSM cotton jersey with a bold front graphic print. Crew neck, regular fit, pre-shrunk fabric. Easy care with machine wash.",
    countInStock: 150,
    categoryName: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&q=80",
  },

  // ── Footwear ──────────────────────────────────────────────────
  {
    name: "Nike Air Max 270 Running Shoes",
    price: 12995,
    description: "Max Air unit for all-day comfort and style. Mesh upper for breathability, foam midsole cushioning, rubber outsole for durability.",
    countInStock: 65,
    categoryName: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
  {
    name: "Adidas Ultraboost 22 Running Shoes",
    price: 16999,
    description: "Primeknit+ upper, Boost midsole for energy return, Continental rubber outsole for grip. Neutral cushioning ideal for road running.",
    countInStock: 50,
    categoryName: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
  },
  {
    name: "Women's Block Heel Sandals",
    price: 2499,
    description: "Elegant block heel with an ankle strap buckle closure. Synthetic upper with cushioned insole. Perfect for parties and evening outings.",
    countInStock: 55,
    categoryName: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
  },
  {
    name: "Men's Genuine Leather Formal Shoes",
    price: 4999,
    description: "Full-grain leather upper with a classic Oxford silhouette. Leather insole with memory foam padding. Rubber sole for comfort and durability.",
    countInStock: 40,
    categoryName: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80",
  },

  // ── Home Appliances ───────────────────────────────────────────
  {
    name: "LG 7 kg Fully Automatic Front Load Washing Machine",
    price: 34990,
    description: "6 Motion DD technology, Steam wash for deep cleaning, Energy efficient A+++ rating, Wi-Fi enabled with ThinQ app control.",
    countInStock: 15,
    categoryName: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80",
  },
  {
    name: "Philips Air Fryer HD9200",
    price: 7499,
    description: "Rapid Air technology for crispy results with up to 90% less fat. 4.1L capacity, digital touch panel, 7 preset cooking programs.",
    countInStock: 38,
    categoryName: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&q=80",
  },
  {
    name: "Dyson V12 Detect Slim Cordless Vacuum",
    price: 59990,
    description: "Laser detects microscopic dust, LCD screen shows particle count, up to 60-minute runtime. Lightweight at 2.2 kg with anti-tangle hair screw tool.",
    countInStock: 10,
    categoryName: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 8999,
    description: "Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer all in one. 6L capacity, stainless steel inner pot.",
    countInStock: 28,
    categoryName: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  },

  // ── Accessories ───────────────────────────────────────────────
  {
    name: "Apple Watch Series 9 GPS – 45mm",
    price: 44900,
    description: "Always-on Retina display, advanced health sensors including ECG, blood oxygen, and crash detection. 18-hour battery life with fast charging.",
    countInStock: 28,
    categoryName: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&q=80",
  },
  {
    name: "Ray-Ban Wayfarer Classic Sunglasses",
    price: 7490,
    description: "Iconic Wayfarer silhouette with 100% UV protection. Acetate frame in gloss black with green classic G-15 lenses. Includes branded case.",
    countInStock: 45,
    categoryName: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
  },
  {
    name: "Fossil Gen 6 Hybrid Smartwatch",
    price: 19995,
    description: "Heart rate monitoring, ReadNotify display, 2-week battery life. Classic analog dial with smart notifications. Water resistant to 3 ATM.",
    countInStock: 32,
    categoryName: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  {
    name: "Genuine Leather Bifold Wallet – Brown",
    price: 1299,
    description: "Full-grain cowhide leather, RFID blocking, 6 card slots, 2 bill compartments. Slim profile with a classic debossed design.",
    countInStock: 90,
    categoryName: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
  },
  {
    name: "Anker PowerCore 20000mAh Portable Charger",
    price: 3499,
    description: "20000mAh capacity charges an iPhone 15 almost five times. Dual USB-A + USB-C outputs. Compact build with PowerIQ technology for fast charging.",
    countInStock: 75,
    categoryName: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
  },

  // ── Sports & Fitness ──────────────────────────────────────────
  {
    name: "Decathlon 6mm Yoga Mat with Carrying Strap",
    price: 999,
    description: "Non-slip textured surface, 6mm thick for joint cushioning. Lightweight at 950g. Suitable for yoga, pilates, and floor exercises.",
    countInStock: 100,
    categoryName: "Sports & Fitness",
    imageUrl: "https://images.unsplash.com/photo-1601925228010-46c47b798e82?w=600&q=80",
  },
  {
    name: "PowerBlock Elite EXP Adjustable Dumbbells – 32kg Pair",
    price: 24999,
    description: "Select weight from 2.5kg to 32kg per dumbbell. Compact square design replaces 28 sets of weights. Easy click-and-lock weight selector.",
    countInStock: 18,
    categoryName: "Sports & Fitness",
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
  },
  {
    name: "Fitbit Charge 6 Fitness Tracker",
    price: 14999,
    description: "Built-in GPS, heart rate monitoring, SpO2 tracking, 7-day battery life. Compatible with Google Maps and Google Wallet. Water resistant to 50m.",
    countInStock: 42,
    categoryName: "Sports & Fitness",
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
  },
  {
    name: "Nivia Pro Football – Size 5",
    price: 1299,
    description: "FIFA Basic approved match ball, hand-stitched 32-panel design. Latex bladder for consistent air retention and true flight.",
    countInStock: 60,
    categoryName: "Sports & Fitness",
    imageUrl: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&q=80",
  },

  // ── Books ─────────────────────────────────────────────────────
  {
    name: "Atomic Habits by James Clear",
    price: 499,
    description: "The #1 New York Times bestseller on building good habits and breaking bad ones. Practical strategies for every improvement, big or small.",
    countInStock: 80,
    categoryName: "Books",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
  },
  {
    name: "The Psychology of Money by Morgan Housel",
    price: 399,
    description: "Timeless lessons on wealth, greed, and happiness. 19 short stories exploring the strange ways people think about money.",
    countInStock: 75,
    categoryName: "Books",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80",
  },
  {
    name: "Clean Code by Robert C. Martin",
    price: 799,
    description: "A handbook of agile software craftsmanship. Learn how to write code that's readable, maintainable, and professional.",
    countInStock: 50,
    categoryName: "Books",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  },

  // ── Home & Kitchen ────────────────────────────────────────────
  {
    name: "Borosil Glass Mixing Bowls Set of 3",
    price: 899,
    description: "BPA-free borosilicate glass, dishwasher safe, microwave safe. Three sizes (0.9L, 1.6L, 2.7L) nested for compact storage.",
    countInStock: 65,
    categoryName: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    name: "Prestige Stainless Steel 5-Piece Cookware Set",
    price: 4999,
    description: "Heavy gauge triply stainless steel construction. Set includes fry pan, two saucepans, stockpot, and sauté pan. Induction compatible.",
    countInStock: 30,
    categoryName: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=600&q=80",
  },
  {
    name: "IKEA KALLAX Shelf Unit – White",
    price: 8999,
    description: "Versatile 4-cube storage shelf. Simple, clean design fits anywhere. Holds up to 13kg per shelf. Can be used vertically or horizontally.",
    countInStock: 25,
    categoryName: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    name: "Philips 1200W Steam Iron",
    price: 2499,
    description: "OptimalTEMP technology for no-burn guarantee, steam boost of 120g/min, vertical steam for hanging clothes. Anti-calc and anti-drip.",
    countInStock: 48,
    categoryName: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

// ─── Main seeder ──────────────────────────────────────────────────────────────
async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected\n");

    // ── 1. Upsert categories ──────────────────────────────────────
    console.log("── Seeding categories ──");
    const categoryMap = {}; // name → ObjectId

    for (const catData of CATEGORIES) {
      const existing = await Category.findOne({ name: catData.name });
      if (existing) {
        categoryMap[existing.name] = existing._id;
        console.log(`  ⏭  Category already exists: ${existing.name}`);
      } else {
        const created = await Category.create({ name: catData.name });
        categoryMap[created.name] = created._id;
        console.log(`  ✓  Created category: ${created.name}`);
      }
    }

    // Also load any categories already in DB that our products reference
    const allDbCategories = await Category.find();
    allDbCategories.forEach((c) => {
      if (!categoryMap[c.name]) categoryMap[c.name] = c._id;
    });

    console.log(`\n  Total categories available: ${Object.keys(categoryMap).length}\n`);

    // ── 2. Upsert products ────────────────────────────────────────
    console.log("── Seeding products ──");
    let created = 0;
    let skipped = 0;

    for (const prod of PRODUCTS) {
      const existing = await Product.findOne({ name: prod.name });

      if (existing) {
        console.log(`  ⏭  Product already exists: ${prod.name}`);
        skipped++;
        continue;
      }

      const categoryId = categoryMap[prod.categoryName];
      if (!categoryId) {
        console.warn(`  ✗  Unknown category "${prod.categoryName}" for product "${prod.name}" — skipping`);
        skipped++;
        continue;
      }

      // Upload image to Cloudinary
      console.log(`\n  Creating: ${prod.name}`);
      const imageUrl = await getCloudinaryUrl(prod.imageUrl);

      await Product.create({
        name: prod.name,
        price: prod.price,
        description: prod.description,
        images: [imageUrl],
        countInStock: prod.countInStock,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0–5.0
        category: categoryId,
      });

      console.log(`  ✓  Created product: ${prod.name}`);
      created++;
    }

    console.log(`\n── Seed complete ──`);
    console.log(`   Products created : ${created}`);
    console.log(`   Products skipped : ${skipped} (already existed)`);
    console.log(`   Categories total : ${Object.keys(categoryMap).length}`);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

seedDB();
