const { nanoid } = require('nanoid');
const { pool } = require('./dbconnect');

// Fungsi Menambahkan Data Kendaraan
const addKendaraanHandler = async (request, h) => {
    const {dealer, merk, model, tipe, warna, harga } = request.payload;
    const id_kendaraan = nanoid(16);
    try {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO kendaraan (id_kendaraan, dealer, merk, model, tipe, warna, harga) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const params = [id_kendaraan, dealer, merk, model, tipe, warna, harga];
            await connection.execute(query, params);

            const response = h.response({
                status: 'success',
                message: 'Data Kendaraan Berhasil Ditambahkan',
                data: {
                    id_kendaraan,
                }
            });
            response.code(201);
            return response;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan data kendaraan',
        });
        response.code(500);
        return response;
    }
};

// Fungsi Menampilkan Semua Data Kendaraan
const getAllKendaraanHandler = async () => {
    try {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM kendaraan';
            const [kendaraan] = await connection.execute(query);

            return {
                status: 'success',
                data: {
                    kendaraan,
                },
            };
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        return {
            status: 'error',
            message: 'Internal Server Error',
        };
    }
};

// Fungsi Menampilkan Data Kendaraan Berdasarkan ID
const getKendaraanByIdHandler = async (request, h) => {
    const { id_kendaraan } = request.params;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM kendaraan WHERE id_kendaraan = ?';
            const [kendaraan] = await connection.execute(query, [id_kendaraan]);

            if (kendaraan.length > 0) {
                return {
                    status: 'success',
                    data: {
                        kendaraan: kendaraan[0],
                    },
                };
            }

            const response = h.response({
                status: 'failed',
                message: 'Gagal Menampilkan Data Kendaraan. ID Kendaraan tidak ditemukan',
            });
            response.code(404);
            return response;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        const response = h.response({
            status: 'error',
            message: 'Internal Server Error',
        });
        response.code(500);
        return response;
    }
};

// Fungsi Mengedit Data Kendaraan Berdasarkan ID
const editKendaraanByIdHandler = async (request, h) => {
    const { id_kendaraan } = request.params;
    const { dealer, merk, model, tipe, warna, harga } = request.payload;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE kendaraan SET dealer = ?, merk = ?, model = ?, tipe = ?, warna = ?, harga = ? WHERE id_kendaraan = ?';
            const params = [dealer, merk, model, tipe, warna, harga, id_kendaraan];
            const [result] = await connection.execute(query, params);

            if (result.affectedRows > 0) {
                const response = h.response({
                    status: 'success',
                    message: 'Data kendaraan berhasil diperbarui',
                });
                response.code(200);
                return response;
            }

            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui data kendaraan. ID Kendaraan tidak ditemukan',
            });
            response.code(404);
            return response;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        const response = h.response({
            status: 'error',
            message: 'Internal Server Error',
        });
        response.code(500);
        return response;
    }
};

// Fungsi Menghapus Data Kendaraan Berdasarkan ID
const deleteKendaraanByIdHandler = async (request, h) => {
    const { id_kendaraan } = request.params;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'DELETE FROM kendaraan WHERE id_kendaraan = ?';
            const [result] = await connection.execute(query, [id_kendaraan]);

            if (result.affectedRows > 0) {
                const response = h.response({
                    status: 'success',
                    message: 'Data kendaraan berhasil dihapus',
                });
                response.code(200);
                return response;
            }

            const response = h.response({
                status: 'fail',
                message: 'Gagal menghapus data kendaraan. Data tidak ditemukan',
            });
            response.code(404);
            return response;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        const response = h.response({
            status: 'error',
            message: 'Internal Server Error',
        });
        response.code(500);
        return response;
    }
};

module.exports = { addKendaraanHandler, getAllKendaraanHandler, getKendaraanByIdHandler, editKendaraanByIdHandler, deleteKendaraanByIdHandler };
