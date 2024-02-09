const { nanoid } = require('nanoid');
const { pool } = require('./dbconnect');

// Fungsi Menambahkan Data Pinjaman
const addPinjamanHandler = async (request, h) => {
    const {asuransi, dpayment, lkredit, angsuran } = request.payload;
    const id_pinjaman = nanoid(16);
    try {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO pinjaman (id_pinjaman, asuransi, dpayment, lkredit, angsuran) VALUES (?, ?, ?, ?, ?)';
            const params = [id_pinjaman, asuransi, dpayment, lkredit, angsuran];
            await connection.execute(query, params);

            const response = h.response({
                status: 'success',
                message: 'Data Pinjaman Berhasil Ditambahkan',
                data: {
                    id_pinjaman,
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
            message: 'Gagal menambahkan data pinjaman',
        });
        response.code(500);
        return response;
    }
};

// Fungsi Menampilkan Semua Data Pinjaman
const getAllPinjamanHandler = async () => {
    try {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM pinjaman';
            const [pinjaman] = await connection.execute(query);

            return {
                status: 'success',
                data: {
                    pinjaman,
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

// Fungsi Menampilkan Data Pinjaman Berdasarkan ID
const getPinjamanByIdHandler = async (request, h) => {
    const { id_pinjaman } = request.params;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM pinjaman WHERE id_pinjaman = ?';
            const [pinjaman] = await connection.execute(query, [id_pinjaman]);

            if (pinjaman.length > 0) {
                return {
                    status: 'success',
                    data: {
                        pinjaman: pinjaman[0],
                    },
                };
            }

            const response = h.response({
                status: 'failed',
                message: 'Gagal Menampilkan Data Pinjaman. ID Pinjaman tidak ditemukan',
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

// Fungsi Mengedit Data Pinjaman Berdasarkan ID
const editPinjamanByIdHandler = async (request, h) => {
    const { id_pinjaman } = request.params;
    const { asuransi, dpayment, lkredit, angsuran } = request.payload;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE pinjaman SET asuransi = ?, dpayment = ?, lkredit = ?, angsuran = ? WHERE id_pinjaman = ?';
            const params = [asuransi, dpayment, lkredit, angsuran, id_pinjaman];
            const [result] = await connection.execute(query, params);

            if (result.affectedRows > 0) {
                const response = h.response({
                    status: 'success',
                    message: 'Data pinjaman berhasil diperbarui',
                });
                response.code(200);
                return response;
            }

            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui data pinjaman. ID Pinjaman tidak ditemukan',
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

// Fungsi Menghapus Data Pinjaman Berdasarkan ID
const deletePinjamanByIdHandler = async (request, h) => {
    const { id_pinjaman } = request.params;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'DELETE FROM pinjaman WHERE id_pinjaman = ?';
            const [result] = await connection.execute(query, [id_pinjaman]);

            if (result.affectedRows > 0) {
                const response = h.response({
                    status: 'success',
                    message: 'Data pinjaman berhasil dihapus',
                });
                response.code(200);
                return response;
            }

            const response = h.response({
                status: 'fail',
                message: 'Gagal menghapus data pinjaman. Data tidak ditemukan',
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

module.exports = { addPinjamanHandler, getAllPinjamanHandler, getPinjamanByIdHandler, editPinjamanByIdHandler, deletePinjamanByIdHandler };
