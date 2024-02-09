const {
    addKonsumenHandler,
    getAllKonsumenHandler,
    getKonsumenByIdHandler,
    editKonsumenByIdHandler,
    deleteKonsumenByIdHandler
} = require("./services/mySql/KonsumenHandler");

const {
    addPinjamanHandler,
    getAllPinjamanHandler,
    getPinjamanByIdHandler,
    editPinjamanByIdHandler,
    deletePinjamanByIdHandler
} = require("./services/mySql/PinjamanHandler");

const {
    addKendaraanHandler,
    getAllKendaraanHandler,
    getKendaraanByIdHandler,
    editKendaraanByIdHandler,
    deleteKendaraanByIdHandler
} = require("./services/mySql/KendaraanHandler");

const routes = [
    // Konsumen Routes
    {
        method: 'POST',
        path: '/konsumen',
        handler: addKonsumenHandler,
    },
    {
        method: 'GET',
        path: '/konsumen',
        handler: getAllKonsumenHandler,
    },
    {
        method: 'GET',
        path: '/konsumen/{nik}',
        handler: getKonsumenByIdHandler,
    },
    {
        method: 'PUT',
        path: '/konsumen/{nik}',
        handler: editKonsumenByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/konsumen/{nik}',
        handler: deleteKonsumenByIdHandler,
    },

    // Pinjaman Routes
    {
        method: 'POST',
        path: '/pinjaman',
        handler: addPinjamanHandler,
    },
    {
        method: 'GET',
        path: '/pinjaman',
        handler: getAllPinjamanHandler,
    },
    {
        method: 'GET',
        path: '/pinjaman/{id_pinjaman}',
        handler: getPinjamanByIdHandler,
    },
    {
        method: 'PUT',
        path: '/pinjaman/{id_pinjaman}',
        handler: editPinjamanByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/pinjaman/{id_pinjaman}',
        handler: deletePinjamanByIdHandler,
    },

    // Kendaraan Routes
    {
        method: 'POST',
        path: '/kendaraan',
        handler: addKendaraanHandler,
    },
    {
        method: 'GET',
        path: '/kendaraan',
        handler: getAllKendaraanHandler,
    },
    {
        method: 'GET',
        path: '/kendaraan/{id_kendaraan}',
        handler: getKendaraanByIdHandler,
    },
    {
        method: 'PUT',
        path: '/kendaraan/{id_kendaraan}',
        handler: editKendaraanByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/kendaraan/{id_kendaraan}',
        handler: deleteKendaraanByIdHandler,
    },
];

module.exports = routes;
