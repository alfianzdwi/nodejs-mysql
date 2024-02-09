const { nanoid } = require('nanoid');
const { pool } = require('./dbconnect');

// Fungsi Menambahkan Catatan
const addKonsumenHandler = async (request, h) => {
    const {nik, nama, tlahir, skawin, dpasangan } = request.payload;
  

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'INSERT INTO konsumen (nik, nama, tgl_lahir, status_perkawinan, data_pasangan) VALUES (?, ?, ?, ?, ?)';
            const params = [nik, nama, tlahir, skawin, dpasangan];
            await connection.execute(query, params);

            const response = h.response({
                status: 'success',
                message: 'Data Konsumen Berhasil Ditambahkan',
                data: {
                    konsumenId: nik,
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
            message: 'Data gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
};

// Fungsi Menampilkan Data Konsumen
const getAllKonsumenHandler = async () => {
    try {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM konsumen';
            const [konsumen] = await connection.execute(query);

            return {
                status: 'success',
                data: {
                    konsumen,
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

// Fungsi Menampilkan Catatan Berdasarkan ID
const getKonsumenByIdHandler = async (request, h) => {
    const { nik } = request.params;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'SELECT * FROM konsumen WHERE nik = ?';
            const [konsumen] = await connection.execute(query, [nik]);

            if (konsumen.length > 0) {
                return {
                    status: 'success',
                    data: {
                        konsumen: konsumen[0],
                    },
                };
            }

            const response = h.response({
                status: 'failed',
                message: 'Gagal Menampilkan Data',
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

// Fungsi Mengedit Catatan Berdasarkan ID
const editKonsumenByIdHandler = async (request, h) => {
    const { nik } = request.params;
    const {nama, tlahir, skawin, dpasangan } = request.payload;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE konsumen SET nama = ?, tgl_lahir = ?, status_perkawinan = ?, data_pasangan = ? WHERE nik = ?';
            const params = [nama, tlahir, skawin, dpasangan, nik ];
            const [result] = await connection.execute(query, params);

            if (result.affectedRows > 0) {
                const response = h.response({
                    status: 'success',
                    message: 'Data berhasil diperbarui',
                });
                response.code(200);
                return response;
            }

            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui data. NIK tidak ditemukan',
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

// Fungsi Menghapus Catatan Berdasarkan ID
const deleteKonsumenByIdHandler = async (request, h) => {
    const { nik } = request.params;

    try {
        const connection = await pool.getConnection();

        try {
            const query = 'DELETE FROM konsumen WHERE nik = ?';
            const [result] = await connection.execute(query, [nik]);

            if (result.affectedRows > 0) {
                const response = h.response({
                    status: 'success',
                    message: 'Data berhasil dihapus',
                });
                response.code(200);
                return response;
            }

            const response = h.response({
                status: 'fail',
                message: 'Gagal menghapus data. Data tidak ditemukan',
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

module.exports = { addKonsumenHandler, getAllKonsumenHandler, getKonsumenByIdHandler, editKonsumenByIdHandler, deleteKonsumenByIdHandler };

