const Fakultas = require("../models/fakultas");

// Mendapatkan semua data fakultas
const getAllFakultas = async (req, res) => {
  try {
    const fakultas = await Fakultas.find();
    res.status(200).json(fakultas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mendapatkan data fakultas berdasarkan ID
const getFakultasById = async (req, res) => {
  try {
    const fakultas = await Fakultas.findById(req.params.id);
    if (!fakultas) {
      return res.status(404).json({ message: 'Fakultas not found' });
    }
    res.status(200).json(fakultas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Membuat fakultas baru
const createFakultas = async (req, res) => {
  try {
    const newFakultas = new Fakultas({
      nama: req.body.nama,
      singkatan: req.body.singkatan,
    });
    const savedFakultas = await newFakultas.save();
    res.status(201).json(savedFakultas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Memperbarui data fakultas
const updateFakultas = async (req, res) => {
  try {
    const fakultas = await Fakultas.findById(req.params.id);
    if (!fakultas) {
      return res.status(404).json({ message: 'Fakultas not found' });
    }
    if (req.body.nama) fakultas.nama = req.body.nama;
    if (req.body.singkatan) fakultas.singkatan = req.body.singkatan;
    const updatedFakultas = await fakultas.save();
    res.status(200).json(updatedFakultas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Menghapus fakultas
const deleteFakultas = async (req, res) => {
  try {
    const fakultas = await Fakultas.findByIdAndDelete(req.params.id);
    if (!fakultas) {
      return res.status(404).json({ message: 'Fakultas not found' });
    }
    res.status(200).json({ message: 'Fakultas deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllFakultas, createFakultas, getFakultasById, updateFakultas, deleteFakultas };