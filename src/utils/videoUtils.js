// utils/videoUtils.js

/**
 * Preloads a video for better performance
 * @param {string} src - Video source URL
 * @returns {Promise<HTMLVideoElement>}
 */
export const preloadVideo = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.style.display = 'none';
    
    video.oncanplaythrough = () => {
      document.body.removeChild(video);
      resolve(video);
    };
    
    video.onerror = (error) => {
      document.body.removeChild(video);
      reject(error);
    };
    
    video.src = src;
    document.body.appendChild(video);
  });
};

/**
 * Gets video dimensions
 * @param {string} src - Video source URL
 * @returns {Promise<{width: number, height: number}>}
 */
export const getVideoDimensions = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = src;
    
    video.addEventListener('loadedmetadata', () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration
      });
    });
    
    video.addEventListener('error', reject);
  });
};

/**
 * Optimizes video for web playback
 * @param {File} videoFile - Original video file
 * @returns {Promise<Blob>} - Optimized video blob
 */
export const optimizeVideoForWeb = async (videoFile) => {
  // This is a client-side optimization function
  // In production, this would be done server-side
  return videoFile;
};

/**
 * Creates a video thumbnail
 * @param {string} src - Video source URL
 * @param {number} time - Time in seconds for thumbnail
 * @returns {Promise<string>} - Data URL of thumbnail
 */
export const createVideoThumbnail = (src, time = 0) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = src;
    video.currentTime = time;
    
    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    });
    
    video.addEventListener('error', reject);
  });
};

/**
 * Formats video duration
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration (MM:SS)
 */
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Debounces video-related events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export const debounceVideoEvent = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Checks if video can autoplay
 * @returns {Promise<boolean>}
 */
export const canAutoplayVideo = async () => {
  const video = document.createElement('video');
  video.muted = true;
  video.autoplay = true;
  
  try {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      await playPromise;
      return true;
    }
  } catch (error) {
    return false;
  }
  
  return false;
};