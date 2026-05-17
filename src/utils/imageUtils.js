/**
 * Mengompresi gambar menggunakan elemen canvas HTML5.
 * Mengganti background transparan menjadi putih untuk mencegah latar hitam pada format JPEG.
 * 
 * @param {File} file - File gambar mentah dari input pengguna.
 * @param {number} maxWidth - Lebar maksimal gambar yang dihasilkan (default: 300px).
 * @param {number} quality - Kualitas kompresi JPEG, dari 0.0 hingga 1.0 (default: 0.7).
 * @returns {Promise<string>} String Base64 dari gambar hasil kompresi.
 */
export const compressImage = (file, maxWidth = 300, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onerror = error => reject(error);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
  
          // Proporsikan tinggi dan lebar
          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          // Isi kanvas dengan warna putih terlebih dahulu
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
          
          // Gambar ulang image di atas kanvas putih
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert ke base64 JPEG
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
      };
    });
  };