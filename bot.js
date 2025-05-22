const { res, req } = require("express");
const { Telegraf } = require('telegraf');
const mongoose = require("mongoose");
const { Int32 } = require('mongodb');
const {Schema} = mongoose;
require('dotenv').config();

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//template untuk
// Inisialisasi bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Schema dan Model
const stockSchema = new mongoose.Schema({
    nama_outlet: String,
    kode_obat: String,
    nama_obat: String,
    isi_obat: String,
    satuan: String,
    qty: String,
});
const Stock = mongoose.model('Stok', stockSchema);

// Handle command /start
bot.start((ctx) => {
    ctx.reply('Selamat datang di bot stok obat. Gunakan perintah /stock [nama obat] untuk mengecek stok.');
});

// Handle command /info
bot.command('info', (ctx) => {
    ctx.reply('Gunakan perintah:\n/stock [nama obat] — untuk cek stok obat');
});

// Handle command /stock
bot.command('stock', async (ctx) => {
    const input = ctx.message.text.split(' ');
    if (input.length < 2) {
        return ctx.reply('Format: /stock [nama obat]');
    }

    const inputObat = input.slice(1).join(' ').trim();
    if (!inputObat) {
        return ctx.reply('Nama obat tidak boleh kosong');
    }

    try {
        const regex = new RegExp(inputObat, 'i');
        const stocks = await Stock.find({ nama_obat: regex });

        if (stocks.length === 0) {
            return ctx.reply(`Obat "${inputObat}" tidak ditemukan di database`);
        }

        for (const stock of stocks) {
            await ctx.replyWithHTML(
                `🏬 <b>Outlet:</b> ${stock.nama_outlet || 'Tidak diketahui'}\n` +
                `💊 <b>Obat:</b> ${stock.nama_obat}\n` +
                `📦 <b>Stok:</b> <code>${stock.qty || '0'} ${stock.satuan || ''}</code>\n`
            );
        }
    } catch (err) {
        console.error('Database error:', err);
        ctx.reply('⚠️ Terjadi kesalahan saat mencari data stok');
    }
});

// // Handle polling (dev) / webhook (production)
if (process.env.VERCEL_ENV) {
    module.exports = bot.webhookCallback('bot');
} else {
    bot.launch();
}

// // Jalankan bot
// bot.launch().then(() => {
//     console.log('Bot aktif...');
// });