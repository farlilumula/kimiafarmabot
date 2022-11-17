// const { res, req } = require("express");
const { Telegraf } = require('telegraf');
const mysql = require('mysql');
// const mongoose = require("mongoose");
// const {Schema} = mongoose;

// // connect to mongodb
// const dbURI =
//   "mongodb+srv://dbadmin:Db2ibmrd7@farmokologi.xel5x.mongodb.net/farmokologi?retryWrites=true&w=majority";
// mongoose
//   .connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

 
const bot = new Telegraf('5733739052:AAF8WE4FYdzA6NRlZfV4lemp1Sg5hiWnw40');

const helpMessage = `

        Berikut Link Aplikasi kimia farma
        -----------------------------------------

        link absensi ==> https://absensi.kimiafarmaapotek.co.id/

        ---------------------------------------------------------
        link mutasi user ==> https://itkfa.kimiafarmaapotek.co.id/
        user : user.GORONTALO
        pwd : user.GORONTALO
        ---------------------------------------------------------

        link POS ==> https://pos.kimiafarma.co.id/
        link smartstock ==> https://smartstock.kimiafarma.co.id/login
        link portal ==> https://portal-dashboard.buaya.dev/index.php#
        link merchandise ==> https://merchandise.kimiafarma.co.id/
        link kfmobile ==> https://forms.gle/Z233iaGP83L8gEHS6

        link target pipline dan realisasi 2022
        --------------------
        https://app.powerbi.com/view?r=eyJrIjoiMDc1ZjM4ZjktODg2OS00ZGU1LTkwZTYtZDNlMTI5OGUxMWQwIiwidCI6IjFjNjgxNzY2LWJhOGMtNDNhNS05MTJmLWYxMzYyOTc0OGFhNyIsImMiOjEwfQ%3D%3D

        `;

bot.command(['start', 'help'], (ctx) => {
    let listTag = `
    Semangat Pagi, Pagi , Pagi
------------------------------

/info - untuk melihat link aplikasi kimia farma
/fj - untuk melihat faktor jual ==> On Progress
/harga - untuk melihat harga obat ==> On Progress_
/setoran - optimalisasi waktu setoran kasir dgn konsultan
    



--------------------------------
    
    `;
    ctx.reply(listTag);
});

//cara bikin command contoh /start /info /help dll
bot.command('info', (ctx) => {
    ctx.reply(helpMessage);
})

bot.command('setoran', (ctx) => {
    let messageBarcode = `

    Semangat Pagi 

Untuk Optimalisasi Setoran Kasir Di POS
Mohon untuk dilakukan perekaman pada saat Setoran Kasir sampai dengan keluarnya kertas struk  

Jadwalnya :
Hari  : Senin - Selasa - Sabtu dan minggu
Waktu : dilakukan Setiap shift
Outlet : KF 272

link pengisian testing
https://forms.gle/pvJ3xnAYdEJ3e1uz5

link upload video :
https://drive.google.com/drive/folders/148jjkQTeU0Gpgh7nLnlmV6fh2h2hpAOF?usp=sharing 

penamaan video
|outlet-tgl-shift|

mohon di lakukan setiap shift .. terimakasih
    
    `;

    ctx.reply(messageBarcode);

    
})

//menampilakan balasan berdasarkan text yang di ketik
bot.hears('farli lumula', (ctx) => {
    ctx.reply('nama lengakapnya Farly Cahyadi Lumula');
})


//message jika ada mention akun telegram di chat group
bot.mention('@Farly_lumula', (ctx) => {
    ctx.reply('Jika Dalam Waktu 5 Menit tidak ada balasan dari Bos IT Silahkan di Telfon melalui nomor : 082238353606  Terimakasih')
});

bot.mention('@nasiwhite', (ctx) => {
    ctx.reply('Jika Dalam Waktu 5 Menit tidak ada balasan dari Pengadaan BM Silahkan di Telfon melalui nomor : +6282210255700  Terimakasih')
});


// const materialSchema = new Schema({
//     kode_obat : String,
//     nama_obat : String,
//     satuan : String,
//     hna_ppn : Number
// })

// const Material = mongoose.model('Material', materialSchema)

// module.exports = Material;

// module.exports = {
//   index: function (req, res) {
//     let keyword = {};
//     if (req.query.keyword) {
//       keyword = {
//         $or: [
//           { kata_kunci: { $regex: req.query.keyword, $options: "i" } },
//           { nama_obat: { $regex: req.query.keyword, $options: "i" } },
//           { zat_aktif: { $regex: req.query.keyword, $options: "i" } },
//         ],
//       };
//     }

//     // cara pencarian ke satu
//     const query = Material.find(keyword)
//       // .populate("stok")
//       .sort({ hna_ppn: -1 })
//       .collation({ locale: "en_US", numericOrdering: true })
//       .limit(15);

//     query.exec(function (error, materials) {
//       if (error) console.log(error);

//       data = [];
//       materials.forEach(item => {
//         data.push({
//           nama_obat : item.nama_obat,
//           harga : item.hna_ppn
//         })
//       })
//     });
//   },

// }

// bot.command('harga', ctx => {
//   let daftarObat = `Daftar Harga Obat : \n`;

//   Material.forEach(materials => {
//     daftarObat += `${materials.nama_obat}. ${materials.hna_ppn}\n`;
//   })
//   ctx.reply(daftarObat);
// })



// mysql connect 
const conn = mysql.createConnection ({
    host : "localhost",
    user : "root",
    password : "",
    database: "bot",
    port: "3306"

})



conn.connect(function(err){
    if(err){
        throw err;
    }
    console.log("connected !");
    conn.query("Select * from item", function(err, result, fields){
        if(err) {
            throw err;
        }
        dataItems = [];
        result.forEach(item => {
            dataItems.push({
                kode_obat: item.kode_obat,
                nama_obat: item.nama_obat,
                satuan: item.satuan,
                hna_ppn: item.hna_ppn,
            })
        })
    })
})


bot.command('harga', ctx => {
    let daftarHarga = `List Harga Obat HnaPpn : \n`;
    dataItems.forEach(item => {
        daftarHarga += `${item.nama_obat}. || ${item.satuan}. || ${item.hna_ppn}\n`;
    })
    ctx.reply(daftarHarga);
})


bot.launch();


