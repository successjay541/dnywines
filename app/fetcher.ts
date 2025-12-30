// Asset preloader utility
class AssetFetcher {
  private loadedImages = new Set<string>();

  // Create and show loading screen with logo only
  private createLoadingScreen(): void {
    // Remove any existing loading screen
    const existingLoader = document.getElementById('asset-preloader');
    if (existingLoader) {
      existingLoader.remove();
    }

    // Create loading screen container with white background
    const loader = document.createElement('div');
    loader.id = 'asset-preloader';
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    `;

    // Create logo image with blur effect
    const logoImg = document.createElement('img');
    logoImg.src = '/image/dnylogo.jpg';
    logoImg.alt = 'Hero';
    logoImg.style.cssText = `
      width: 200px;
      height: 200px;
      object-fit: contain;
      filter: blur(8px);
      opacity: 0.8;
      border-radius: 8px;
    `;

    // Assemble loading screen
    loader.appendChild(logoImg);
    document.body.appendChild(loader);
  }

  // Hide loading screen
  private hideLoadingScreen(): void {
    const loader = document.getElementById('asset-preloader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }
  }

  // Preload the logo
  async preloadLogo(): Promise<void> {
    this.createLoadingScreen();
    
    const logoUrl = '/image/dnylogo.jpg';
    
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = logoUrl;
      img.onload = () => {
        this.loadedImages.add(logoUrl);
        
        // Clear the blur effect
        const loader = document.getElementById('asset-preloader');
        if (loader) {
          const logoImg = loader.querySelector('img');
          if (logoImg) {
            logoImg.style.filter = 'blur(0)';
            logoImg.style.opacity = '1';
            logoImg.style.transition = 'all 0.5s ease';
          }
        }
        
        // Wait a moment, then hide
        setTimeout(() => {
          this.hideLoadingScreen();
          resolve();
        }, 300);
      };
      img.onerror = () => {
        this.hideLoadingScreen();
        resolve();
      };
    });
  }

  // Clear cache
  clearCache(): void {
    this.loadedImages.clear();
  }
}

// Singleton instance
const assetFetcher = new AssetFetcher();

export default assetFetcher;