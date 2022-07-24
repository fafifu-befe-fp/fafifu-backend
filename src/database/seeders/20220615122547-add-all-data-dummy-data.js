("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      `INSERT INTO public."Users" (id, "publicId", email, password, "createdAt", "updatedAt") VALUES (1, 'b764cb31-7add-4cc3-bcf1-fe02322e9f60', 'adi@mail.com', '$2b$10$YQ9Q22CCpBH/QOfLQUPBgeMkDrnPQKClPvsfbVU0upjVi8zXNFbw.', '2022-07-13 08:03:26.786000 +00:00', '2022-07-13 08:03:26.786000 +00:00');
INSERT INTO public."Users" (id, "publicId", email, password, "createdAt", "updatedAt") VALUES (2, '057829c4-f36c-490d-930a-76f1131d829a', 'bimo@mail.com', '$2b$10$esrSBlHbPKqlnUnIXZup6.qEPkyCiKE.wJmfRZmHkF1G3asM0JvQy', '2022-07-13 08:22:54.477000 +00:00', '2022-07-13 08:22:54.477000 +00:00');
INSERT INTO public."Users" (id, "publicId", email, password, "createdAt", "updatedAt") VALUES (3, '10cfa7c8-b382-4a3b-9dbf-fe6c37dbe771', 'test@mail.com', '$2b$10$wcNB6RGM1E1eie3qRLqykOnQ/hAemBbdLavT3fuM6ZTipFEjEI8qm', '2022-07-13 08:35:47.104000 +00:00', '2022-07-13 08:35:47.104000 +00:00');
INSERT INTO public."Users" (id, "publicId", email, password, "createdAt", "updatedAt") VALUES (4, '4d6522a0-87f0-4e21-8d12-2d540cc47718', 'ramday@mail.com', '$2b$10$iWG0rThVk4BegqDgNgHWM.ljzNezzGfN/BtsHCBuWT4Mb9zemKVti', '2022-07-13 08:44:33.755000 +00:00', '2022-07-13 08:44:33.755000 +00:00');
INSERT INTO public."Users" (id, "publicId", email, password, "createdAt", "updatedAt") VALUES (6, 'd880daa0-b58e-4aed-97d4-5886e85ab32d', 'adikurniawan@mail.com', '$2b$10$LBnh.ag.gDqy6/bSgvUKtuILUeHr2dJi2CKSB75WHD/HsIpDr6NuC', '2022-07-14 03:15:10.313000 +00:00', '2022-07-14 03:15:10.313000 +00:00');
INSERT INTO public."UserBiodatas" ("userId", name, city, address, handphone, "imageUrl", "createdAt", "updatedAt") VALUES (1, 'Adi Kurniawan', 'Sungai Penuh', 'Jalan Pahlawan Bangsa', '080908090909', 'https://res.cloudinary.com/adikurniawan/image/upload/v1657699474/zewukvoz03iuzqvkqulc.png', '2022-07-13 08:03:26.796000 +00:00', '2022-07-13 08:04:35.671000 +00:00');
INSERT INTO public."UserBiodatas" ("userId", name, city, address, handphone, "imageUrl", "createdAt", "updatedAt") VALUES (4, 'Aditya Ramday', 'Sungai Penuh', 'Jalan Pahlawan Bangsa', '080908090909', 'https://res.cloudinary.com/adikurniawan/image/upload/v1657702558/ngmzo568mdnhvoxekryc.jpg', '2022-07-13 08:44:33.759000 +00:00', '2022-07-13 08:55:59.290000 +00:00');
INSERT INTO public."UserBiodatas" ("userId", name, city, address, handphone, "imageUrl", "createdAt", "updatedAt") VALUES (3, 'TEST AKUN', null, null, null, null, '2022-07-13 08:35:47.107000 +00:00', '2022-07-13 08:35:47.107000 +00:00');
INSERT INTO public."UserBiodatas" ("userId", name, city, address, handphone, "imageUrl", "createdAt", "updatedAt") VALUES (2, 'Paulus Bimo', 'Jakarta', 'Jalan Pahlawan Bangsa', '080908090909', 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700720/evssgltdbbwzp4p66dey.jpg', '2022-07-13 08:22:54.481000 +00:00', '2022-07-13 08:25:21.470000 +00:00');
INSERT INTO public."UserBiodatas" ("userId", name, city, address, handphone, "imageUrl", "createdAt", "updatedAt") VALUES (6, 'Adi Kurniawan', null, null, null, null, '2022-07-14 03:15:10.327000 +00:00', '2022-07-14 03:15:10.327000 +00:00');
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (2, '8bdf8cf7-7b27-46c4-bed4-7380b5edf711', '[DEBUG#2]Case Custom Akrilik Keyboard Mechanical Vortex Series GT6 - Clear', 'Custom Case Akrilik GASKET mount untuk Vortex series GT6

Dengan menggunakan plate akrilik 1.5mm & poron foam 12 buah
', 450000, 1, true, true, '2022-07-13 08:12:49.561000 +00:00', '2022-07-13 08:12:49.561000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (10, 'da101baf-754a-4a0f-bd67-6f09ca41d008', '[DEBUG#10]HiLo Teen Yoghurt Banana 250gr - Susu Tinggi Kalsium', 'Usia Remaja waktunya punya mimpi dan prestasi setinggi-tingginya. Untuk mereka terus semangat dan aktif, selalu penuhi kebutuhan nutrisinya. Minum Susu Hilo Teen setiap hari, susu tinggi kalsium dan lebih rendah lemak dengan rasa yang enak untuk bantu pertumbuhan usia remaja.
Memenuhi kebutuhan nutrisi juga penting untuk menjaga daya tahan tubuh. HiLo Teen dilengkapi dengan 12 vitamin dan 5 mineral. Cobain rasa lain yang enak banget: Chocolate, Vanilla Caramel, dan Yoghurt Banana!
HiLo Teen, Tumbuh Tuh Ke Atas!

Petunjuk Pemakaian :
Konsumsi setiap hari untuk menunjang masa pertumbuhan remaja

Cara penyajian:
Campurkan 4 sendok susu Hilo dalam 200 ml air hangat atau air dingin

Konsultasikan langsung manfaat dari susu Hilo melalui customer relation kami di nomor 021-4607777
', 30500, 2, true, true, '2022-07-13 08:39:58.947000 +00:00', '2022-07-13 08:39:58.947000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (4, 'c4a73ae2-6949-470e-8b39-8a2c0403cebd', '[DEBUG#4]CHESTER X keyboard case | GDYNMCS GEAR tas keyboard Mechanical 60 65 - Navy
', 'CHESTER X keyboard case | GDYNMCS GEAR tas keyboard 60 65 75 %
Mechanical keyboard case ten keyless size Keychron K8

dimensi : 32 x (13,5 s/d 16) x 4 cm . tali buckle bisa di geser
keyboard 60% 65% mechanical semisalnya

Keychron K6
Keychron K2
Keychron K3
ROG Falchion
Dareu EK868
RK80
RK84
Daxa m84 pro
Daxa m84 ultimate ( 1 baris atas keycap agak nongol )
Meca Air 68
Koodo Arcadia 68%
Leopold FC650 MDS
Noir N1
MX Key mini ( agak longgar, sisanya bisa untuk kabel)
Mojo 68
VortexSeries GT8

Case pouch desain dari GDYNMCS GEAR
Melindungi Keyboard dari debu ketika di ajak bepergian.
Inner yang halus dan lembut untuk menjaga keycaps dari gesekan
Fitur HANDSTRAP pada bagian belakang agar betah memegangnya.
dan X fitur dari seri ini dengan adanya Connected Strap untuk dukungan mobilitas Gamers
sehingga mudah untuk dibawa model selempang

Bahan anti air
Warna Royal Blue
Buckle clip
Connected Strap

Pemakaian simple

Tunggu apalagi ! CHESTER X sudah ada di marketplace favorit kamu !

SELAMAT BERBELANJA!
', 195000, 1, true, true, '2022-07-13 08:18:38.875000 +00:00', '2022-07-13 08:18:38.875000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (3, '8e3f315e-d598-4194-b1d0-8d0fd56695e4', '[DEBUG#3]Eva Foam Plate Keyboard Mechanical Vortex Series VX5 60%', 'Paket Eva Foam 2MM untuk rexus Vortex Series vx5..
Eva Foam Plate 3mm
Eva Foam Case 2mm
*note : Jika pada bagian frame eva foam bagian paling luar ada yang putus itu wajar karena bagian paling hanya 1-1.5mm tipis jadi rawan terkena laser dan putus .
', 85000, 1, true, true, '2022-07-13 08:15:28.164000 +00:00', '2022-07-13 08:15:28.164000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (11, 'e6eb7f32-d671-4a67-ad5c-31eeda6211a8', '[DEBUG#11]FDR FLEMINO 90/90-14 TL Ban Luar Motor Matic', 'BAN MOTOR FDR FLEMINO 90/90-14 TL (TUBELESS) GRATIZ PENTIL TUBELESS BESI

Cocok untuk kendaraan anda menambah elegan motor anda.

Bisa digunakan di motor dengan velg 14

Silahkan di order', 205000, 4, true, true, '2022-07-13 08:50:30.886000 +00:00', '2022-07-13 08:50:30.886000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (9, '537b2616-207c-41d4-9b28-472f8a41c3a4', '[DEBUG#9]VITACIMIN 1 pack isi 20 tablet-vitamin c rasa lemon', 'READY STOCK! LANGSUNG KIRIM

VITACIMIN rasa lemon
VITAMIN C 500mg tablet Hisap
1 pack isi 20 tablet
10 papan

pembelian 3 box bisa free ongkir dengan memilih pengiriman bebas ongkir

mari jaga daya tahan tubuh dengan mengkonsumsi vitamin C setiap harinya.
', 30500, 2, true, true, '2022-07-13 08:38:05.221000 +00:00', '2022-07-13 08:38:05.221000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (5, 'e88c8ecf-9937-483c-9195-6a332f816b62', '[DEBUG#5]BUNDLING Samurai Collection - PRDX Artisan Keycaps', 'Bundling Samurai Collection Artisan Keycaps

Includes:

- RYŪ ( 2.5cm x 3cm x 2.5cm)
- OROCHI ( 2.5cm x 3cm x 2.5cm)
- Arok ( 2cm x 2.5cm x 2cm)

Resin-based 3D Keycaps
Airbrushed
Cherry MX Stem

PRDX Artisan Keycaps are made in Indonesia

Garansi bila cacat, dengan syarat di rekam saat unboxing.

Pemesanan: Senin - Jumat
Pemesanan hari Sabtu dan Minggu akan di proses pada hari Senin
', 320000, 1, true, true, '2022-07-13 08:21:52.426000 +00:00', '2022-07-13 08:21:52.426000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (6, '75900da8-8083-4f09-876f-244652243fa2', '[DEBUG#6]Pharmaton Formula 25s - Multivitamin Jaga Stamina dan Kesehatan', 'Pharmaton merupakan satu-satunya multivitamin di Indonesia yang mengandung Ginseng G115 (Ginseng terstandarisasi), yang dapat memberikan energi 56% lebih banyak dibandingkan dengan multivitamin tanpa Ginseng G115. Selain itu, Pharmaton juga dilengkapi dengan 11 vitamin dan 8 mineral

Pharmaton Formula merupakan varian Pharmaton yang mengandung antioksidan DMAE yang dapat meningkatkan konsentrasi pada saat bekerja
Kandungan:
-Ekstrak Ginseng G115
-Antioksidan DMAE
-Vitamin: Vitamin A, B1, B2, Nikotinamid(B3), B6 , Biotin (B7), Asam Folat (B9), B12, C, D3, dan E
-Mineral: Tembaga, Mangan, Magnesium, Besi, Seng, Kalsium, Titanium dioksida, dan Besi oksida

Manfaat:
-Meningkatkan konsentrasi dengan kandungan antioksidan DMAE
-Meningkatkan & memelihara stamina dengan kandungan Ginseng G115
-Menjaga kesehatan tubuh
-Membantu memenuhi kebutuhan vitamin dan mineral

Penyimpanan:
Simpan dalam wadah tertutup rapat, di tempat yang kering, pada suhu kamar (15-30C) & terlindung dari cahaya matahari

Dosis dan Cara Pemakaian :
Dewasa: Dosis yang dianjurkan adalah 1x sehari , dianjurkan diminum pagi hari setelah sarapan
Anak Anak: Tidak dianjurkan untuk digunakan pada anak anak di bawah usia 12 tahun
Lanjut Usia: Tidak ada rekomendasi dosis yang khusus utuk lanjut usia

Exp Date: Oktober 2023

Beli Banyak Lebih Hemat!: https://tinyurl.com/PHTFor50s
Tersedia juga Pharmaton Vit untuk membantu menjaga stamina-mu: https://tinyurl.com/PHTVit5s

Yuk, follow toko Sanofi Official Store & gabung jadi TokoMember untuk mendapatkan voucher spesial & update promo terbaru yang menarik

Kata kunci: pharmaton , multivitamin , multi vitamin , suplemen , supplement , food supplement , vitamin , multivitamin dewasa , multi vitamin dewasa , vitamin c , vitamin b , vitamin d , vitamin d3 , vitamin dewasa , stamina pria , multivitamin & minerals
', 130000, 2, true, true, '2022-07-13 08:26:34.064000 +00:00', '2022-07-13 08:26:34.064000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (7, '725926a6-a7a1-42bd-b26c-81bc6bf25064', '[DEBUG#7]Natur-E Daily Nourishing Natural Vitamin E 100 IU isi 32 kapsul', 'Mengandung vitamin E alami dari minyak biji gandum dan minyak biji bunga matahari untuk merawat kesehatan dan kecantikan kulitmu dari dalam sesuai kebutuhan.

Dosis: 1x sehari setelah makan. 1-3 kapsul setiap hari.
', 30200, 2, true, true, '2022-07-13 08:28:05.214000 +00:00', '2022-07-13 08:28:05.214000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (1, 'fde47313-940c-4acc-abe3-51b097b25233', '[DEBUG#1]APOLLO61 Wireless Mechanical Keyboard by Press Play - Gateron Brown', 'FREE TOTEBAG UNTUK PEMBELIAN DI ATAS 1JT (tidak termasuk bubble wrap).

APOLLO61 v2 Wireless Mechanical Keyboard by Press Play.

WARNING: Hanya cas dengan kabel bawaan dan port usb laptop atau PC. Dilarang menggunakan casan lain nya. Jika menggunakan casan lain warranty akan void.

Included in box:
- 1 unit APOLLO61 v2
- Braided type-c cable
- Original design sticker pack by Press Play
- Switch puller
- Keycap puller
- Manual book
- 7 extra keycaps

Specs:
- 61 key layout
- Original design PBT Dye Sub Keycap
- Extra Esc, Spacebar, Enter, 4 Arrow Keys
- 3 mode connectivity (Bluetooth, 2.4ghz dongle, wired type-c)
- Gateron Brown and Gateron Yellow
- Bluetooth up to 3 devices
- Case foam and plate foam included
- Pre-lubed stablilizers
- 3/5 pin universal hotswap
- North facing PCB
- 1900mah Battery
- Custom software
- RGB
- Dedicated Mac and Windows button
- Kickstand

6 Month warranty harus di register dalam 7 hari terima barang (instruksi ada di manual/belakang kotak)


Jadwal Pengiriman:
Senin - Sabtu : Pesenan sebelum Jem 12 siang akan dikirim hari yang sama
Minggu & Hari Libur: Tutup (tidak ada pengiriman)

Pesanan yang sudah di proses (pesanan diterima) tidak bisa di batalkan lagi.
', 1099000, 1, true, true, '2022-07-13 08:09:56.429000 +00:00', '2022-07-13 08:09:56.429000 +00:00', null);
INSERT INTO public."Products" (id, "publicId", name, description, price, "userId", "isPublished", "isAvailable", "createdAt", "updatedAt", "deletedAt") VALUES (8, '1af6afeb-19a3-4628-908f-aa923799bef2', '[DEBUG#8]Paket Sido Muncul Vitamin C1000mg 3 Pack Lemon dan 2 Pack Sweet Orange', 'Detail Isi:
3 x Sido Muncul Vitamin C 1000 Serbuk Lemon 6''s - Jaga Daya Tahan Tubuh
2 x Sido Muncul Vitamin C 1000 Serbuk Orange 6''s - Jaga Daya Tahan Tubuh

Sido Muncul Vitamin C 1000 merupakan suplemen Vitamin C yang bermanfaat untuk membantu menjaga kesehatan tubuh setiap hari.

Komposisi: Tiap sachet Sido Muncul C1000 (dengan Ekstrak Lemon/Sweet Orange) mengandung Vitamin C 1000 Mg, Vitamin E 25 Mg, Vitamin B3 10 Mg, Vitamin B6 5 Mg, Vitamin B12 5 Mcg, Honey 100 Mg.

Manfaat:
- Minuman kesegaran dengan Vit. C untuk menjaga daya tahan tubuh
- Vit. E untuk antioksidan menangkal radikal bebas
- Vit. B3, B6 dan B12 untuk menjaga sistem syaraf dan meningkatkan energi

Perhatian:
Baca aturan konsumsi/pemakaian yang tertera pada kemasan produk.

No Barcode : 8998898842104
No BPOM : POM SD 152247861

No Barcode : 8998898842210
No BPOM : POM SD 152247851
', 48450, 2, true, true, '2022-07-13 08:35:29.948000 +00:00', '2022-07-13 08:35:29.948000 +00:00', null);
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (1, 1, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657699796/y0b7dhcfubfgujzii9xu.jpg', '2022-07-13 08:09:58.169000 +00:00', '2022-07-13 08:09:58.169000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (2, 1, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657699796/wwwlbh4rxbz3qtuv6hhb.jpg', '2022-07-13 08:09:58.169000 +00:00', '2022-07-13 08:09:58.169000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (3, 1, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657699797/rmtgsxqfizlp4eauo9gk.jpg', '2022-07-13 08:09:58.169000 +00:00', '2022-07-13 08:09:58.169000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (4, 1, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657699797/muzu6awv0ohossd6gmsk.jpg', '2022-07-13 08:09:58.169000 +00:00', '2022-07-13 08:09:58.169000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (5, 1, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657699797/wwg4nje8svq6vqhzlabz.jpg', '2022-07-13 08:09:58.169000 +00:00', '2022-07-13 08:09:58.169000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (6, 2, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657699969/g1vuskmg7xkniy8a25dm.jpg', '2022-07-13 08:12:50.432000 +00:00', '2022-07-13 08:12:50.432000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (7, 2, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657699970/cjsjaeyxuynkma1b80jy.jpg', '2022-07-13 08:12:50.432000 +00:00', '2022-07-13 08:12:50.432000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (8, 3, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700128/jynrlr4gcsyy170h2nck.jpg', '2022-07-13 08:15:29.080000 +00:00', '2022-07-13 08:15:29.080000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (9, 3, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700128/edjzm4hrxmjkdnzi3pu1.jpg', '2022-07-13 08:15:29.080000 +00:00', '2022-07-13 08:15:29.080000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (10, 4, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700318/wsgucd3pd4fwmpuresge.jpg', '2022-07-13 08:18:41.787000 +00:00', '2022-07-13 08:18:41.787000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (11, 4, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700319/edmghuvkke75zypr55nl.jpg', '2022-07-13 08:18:41.787000 +00:00', '2022-07-13 08:18:41.787000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (12, 4, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700320/mvv0e4pm29tcjkwrnh6l.jpg', '2022-07-13 08:18:41.787000 +00:00', '2022-07-13 08:18:41.787000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (13, 4, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700321/co12ymk0psoeatulh7zt.jpg', '2022-07-13 08:18:41.787000 +00:00', '2022-07-13 08:18:41.787000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (14, 4, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700321/wcsfjf6cfhpgngjyeh69.jpg', '2022-07-13 08:18:41.787000 +00:00', '2022-07-13 08:18:41.787000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (15, 5, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700512/v4kgtuvha6joloxjirk1.jpg', '2022-07-13 08:21:54.756000 +00:00', '2022-07-13 08:21:54.756000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (16, 5, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700513/fvfaao9riddjkdjwzqmk.jpg', '2022-07-13 08:21:54.756000 +00:00', '2022-07-13 08:21:54.756000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (17, 5, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700513/wxsh8hgv7wwwet9gzoy2.jpg', '2022-07-13 08:21:54.756000 +00:00', '2022-07-13 08:21:54.756000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (18, 5, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700514/d5yqigz2lbcsavrqgxxr.jpg', '2022-07-13 08:21:54.756000 +00:00', '2022-07-13 08:21:54.756000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (24, 7, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700885/naaasjajhd1rrsgytv6l.jpg', '2022-07-13 08:28:05.523000 +00:00', '2022-07-13 08:28:05.523000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (25, 6, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700794/oddz1os3kkypvbfcpofl.jpg', '2022-07-13 08:28:05.523000 +00:00', '2022-07-13 08:28:05.523000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (26, 6, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700794/ofwmu93aiyhfvgihaurj.jpg', '2022-07-13 08:28:05.523000 +00:00', '2022-07-13 08:28:05.523000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (27, 6, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700794/tllici5j0ygvpkhcbzht.jpg', '2022-07-13 08:28:05.523000 +00:00', '2022-07-13 08:28:05.523000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (28, 6, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700795/q7uin0nhjymymdinktro.jpg', '2022-07-13 08:28:05.523000 +00:00', '2022-07-13 08:28:05.523000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (29, 6, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657700795/ucuz11ul90u38pmtrtev.jpg', '2022-07-13 08:28:05.523000 +00:00', '2022-07-13 08:28:05.523000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (30, 8, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701329/o5tiinx3n6amhjwm3w3q.jpg', '2022-07-13 08:35:31.858000 +00:00', '2022-07-13 08:35:31.858000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (31, 8, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701330/ppam51t2nmbwmtj7jqys.jpg', '2022-07-13 08:35:31.858000 +00:00', '2022-07-13 08:35:31.858000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (32, 8, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701330/cwhfzlh1b2pa6eukkgei.jpg', '2022-07-13 08:35:31.858000 +00:00', '2022-07-13 08:35:31.858000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (33, 8, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701331/vqu2kvawvn55dgnvg7xx.jpg', '2022-07-13 08:35:31.858000 +00:00', '2022-07-13 08:35:31.858000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (34, 8, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701331/vjkz1dbfdbyrmw0m8e3s.jpg', '2022-07-13 08:35:31.858000 +00:00', '2022-07-13 08:35:31.858000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (35, 9, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701485/hk6gbdd0eslcwk7qvvgj.jpg', '2022-07-13 08:38:07.692000 +00:00', '2022-07-13 08:38:07.692000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (36, 9, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701486/ozaaqyylduijjiye1d3c.jpg', '2022-07-13 08:38:07.692000 +00:00', '2022-07-13 08:38:07.692000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (37, 9, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701486/joh2tboii4c3igdvaxk2.jpg', '2022-07-13 08:38:07.692000 +00:00', '2022-07-13 08:38:07.692000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (38, 9, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701486/iallesodnda6el9pjzfx.jpg', '2022-07-13 08:38:07.692000 +00:00', '2022-07-13 08:38:07.692000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (39, 9, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701487/cotrzk9luhbiso3igzyi.jpg', '2022-07-13 08:38:07.692000 +00:00', '2022-07-13 08:38:07.692000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (40, 10, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701598/lyvajqvygdmaaiahxcwu.jpg', '2022-07-13 08:40:00.006000 +00:00', '2022-07-13 08:40:00.006000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (41, 10, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701599/ohqmr6zohjhde1fm8iy7.jpg', '2022-07-13 08:40:00.006000 +00:00', '2022-07-13 08:40:00.006000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (42, 10, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657701599/e0g1aku1pqpehfbpif3e.jpg', '2022-07-13 08:40:00.006000 +00:00', '2022-07-13 08:40:00.006000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (43, 11, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657702230/m9cw1od9bilqaimjknbh.jpg', '2022-07-13 08:50:31.900000 +00:00', '2022-07-13 08:50:31.900000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (44, 11, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657702231/bq6enijr2we9eixflccq.jpg', '2022-07-13 08:50:31.900000 +00:00', '2022-07-13 08:50:31.900000 +00:00');
INSERT INTO public."ProductImages" (id, "productId", "imageUrl", "createdAt", "updatedAt") VALUES (45, 11, 'https://res.cloudinary.com/adikurniawan/image/upload/v1657702231/upr88m0trftl8omnbu49.jpg', '2022-07-13 08:50:31.900000 +00:00', '2022-07-13 08:50:31.900000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (1, 1, 1, '2022-07-13 08:09:58.175000 +00:00', '2022-07-13 08:09:58.175000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (2, 1, 4, '2022-07-13 08:09:58.175000 +00:00', '2022-07-13 08:09:58.175000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (3, 2, 1, '2022-07-13 08:12:50.435000 +00:00', '2022-07-13 08:12:50.435000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (4, 2, 4, '2022-07-13 08:12:50.435000 +00:00', '2022-07-13 08:12:50.435000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (5, 3, 1, '2022-07-13 08:15:29.084000 +00:00', '2022-07-13 08:15:29.084000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (6, 3, 4, '2022-07-13 08:15:29.084000 +00:00', '2022-07-13 08:15:29.084000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (7, 4, 1, '2022-07-13 08:18:41.791000 +00:00', '2022-07-13 08:18:41.791000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (8, 4, 3, '2022-07-13 08:18:41.791000 +00:00', '2022-07-13 08:18:41.791000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (9, 5, 1, '2022-07-13 08:21:54.760000 +00:00', '2022-07-13 08:21:54.760000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (11, 7, 5, '2022-07-13 08:28:05.525000 +00:00', '2022-07-13 08:28:05.525000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (12, 6, 5, '2022-07-13 08:28:35.060000 +00:00', '2022-07-13 08:28:35.060000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (13, 8, 5, '2022-07-13 08:35:31.874000 +00:00', '2022-07-13 08:35:31.874000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (14, 9, 5, '2022-07-13 08:38:07.695000 +00:00', '2022-07-13 08:38:07.695000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (15, 10, 5, '2022-07-13 08:40:00.009000 +00:00', '2022-07-13 08:40:00.009000 +00:00');
INSERT INTO public."ProductCategory" (id, "productId", "categoryId", "createdAt", "updatedAt") VALUES (16, 11, 2, '2022-07-13 08:50:31.904000 +00:00', '2022-07-13 08:50:31.904000 +00:00');

    `
    );
  },

  async down(queryInterface, Sequelize) {},
};
