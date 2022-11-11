const { Telegraf } = require('telegraf');

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
        shorturl.at/alpL8

        `;

bot.command(['start', 'help'], (ctx) => {
    let listTag = `

    Semangat Pagi, Pagi , Pagi
    --------------------------

    /info - untuk melihat link aplikasi kimia farma
    /fj - untuk melihat faktor jual ==> On Progress
    /harga - untuk melihat harga obat ==> On Progress
    
    `;
    ctx.reply(listTag);
});

//cara bikin command contoh /start /info /help dll
bot.command('info', (ctx) => {
    ctx.reply(helpMessage);
})

// bot.command('barcode', (ctx) => {
//     let messageBarcode = `

//     Upload Foto Barcode Produk OTC 
//         -----------------------------

//         foto barcode diberi nama 
//         kode obat-nama obat  ====> contoh : 133230-Sanmol Syr 60 Ml

//         link upload ==> https://drive.google.com/drive/folders/1sBS7bk8-6oBSgvPFHR3L5lgeiHQKRYDh?usp=sharing
    
//     `;

//     ctx.reply(messageBarcode);

    
// })

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


bot.launch();