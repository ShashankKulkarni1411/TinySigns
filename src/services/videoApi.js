const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchVideos() {
  const res = await fetch(`${API_BASE_URL}/api/videos`);
  if (!res.ok) throw new Error('Failed to fetch videos');
  return res.json();
}

export async function createVideo(payload) {
  const res = await fetch(`${API_BASE_URL}/api/videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create video');
  return res.json();
}

export async function updateVideo(id, payload) {
  const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update video');
  return res.json();
}

export async function deleteVideo(id) {
  const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete video');
  return res.json();
}


