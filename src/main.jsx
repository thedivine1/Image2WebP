import { useState, useEffect, useRef } from 'react';
import Compressor from 'compressorjs';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [image, setImage] = useState(null);
  const [webpImage, setWebpImage] = useState(null);
  const [quality, setQuality] = useState(0.6);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No image selected. Please try again.");
      return;
    }

    setImage(null);
    setWebpImage(null);
    setLoading(true);

    new Compressor(file, {
      quality: quality,
      mimeType: 'image/webp',
      success: (compressedFile) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          setWebpImage(reader.result);
          setLoading(false);
        };
        reader.readAsDataURL(compressedFile);
      },
      error: (err) => {
        console.error('Compression error:', err.message);
        alert("Failed to compress image. Please try again.");
        setLoading(false);
      },
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) {
      alert("No image selected. Please try again.");
      return;
    }
    handleImageUpload({ target: { files: [file] } });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setImage(null);
    setWebpImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  const handleDownload = () => {
    if (webpImage) {
      const link = document.createElement('a');
      link.href = webpImage;
      link.download = 'converted.webp';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("WebP image downloaded!");
    }
  };

  const handleQualityChange = (event) => {
    setQuality(parseFloat(event.target.value));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My App</h1>
      <button
        onClick={handleThemeSwitch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
      </button>

      <div className="mt-4">
        <div
          className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
        >
          Drag and drop an image here or click to select
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
        </div>

        {loading && <p>Loading...</p>}

        {image && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Original Image</h2>
            <ImageView image={image} />
          </div>
        )}

        {webpImage && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Converted WebP Image</h2>
            <ImageView image={webpImage} />
            <button
              onClick={handleDownload}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Download WebP
            </button>
          </div>
        )}

        <div className="mt-4">
          <label htmlFor="quality" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quality: {quality.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={quality}
            onChange={handleQualityChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            id="quality"
          />
        </div>

        {image && (
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

function ImageView({ image }) {
  return (
    <div className="rounded-md overflow-hidden">
      <img src={image} alt="Uploaded" className="w-full h-auto object-cover" />
    </div>
  );
}

export default App;
