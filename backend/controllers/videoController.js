const Video = require('../models/Video');

async function listVideos(req, res, next) {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    next(error);
  }
}

async function getVideoById(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    next(error);
  }
}

async function createVideo(req, res, next) {
  try {
    const { title, url, description } = req.body;
    const created = await Video.create({ title, url, description });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

async function updateVideo(req, res, next) {
  try {
    const { title, url, description } = req.body;
    const updated = await Video.findByIdAndUpdate(
      req.params.id,
      { title, url, description },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

async function deleteVideo(req, res, next) {
  try {
    const deleted = await Video.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
};


