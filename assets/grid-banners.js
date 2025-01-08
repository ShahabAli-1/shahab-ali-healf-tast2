var quizBannerInterval = 40; // Show quiz banner every 40 products
var bfcmBannerInterval = 4; // Show BFCM banner every 100 products
var findifyGridSelector = 'ul.findify-components-common--grid'
var lastInjectedQuizBanner = 0;
var lastInjectedBFCMBanner = 0;
var bannerInserted = false;

/*
    Need to include the section - collection-grid-scoll-banners.liquid, that adds this script and uses elements from there
*/

    function injectQuizBanner(grid, position) {
        let quizBannerOrigin = document.querySelector('div.bs-devshop__quiz-banner-container');
        if (!quizBannerOrigin) {
            return;
        }
    
        let quizBanner = quizBannerOrigin.cloneNode(true);
        quizBanner.classList.add('injected-quiz-banner');
        quizBanner.classList.remove('hidden');
    
        const gridStyle = window.getComputedStyle(grid);
        const columnCount = parseInt(gridStyle.getPropertyValue('grid-template-columns').split(' ').length);
    
        const bannerPosition = Math.ceil(position / columnCount) * columnCount + 1;
    
        quizBanner.style.order = bannerPosition;
        quizBanner.style.gridColumn = `1 / -1`;
    
        let insertPosition = bannerPosition;
        while (insertPosition > 0 && !grid.children[insertPosition - 1].classList.contains('findify-components-common--grid__column')) {
            insertPosition--;
        }
    
        if (grid.children[insertPosition]) {
            grid.insertBefore(quizBanner, grid.children[insertPosition]);
        } else {
            grid.appendChild(quizBanner);
        }
    }


window.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const grid = document.querySelector(findifyGridSelector);
    
    
        let productCount = 0;
        const observerConfig = { childList: true, subtree: false };
        const observerQuizBanner = new MutationObserver((mutations) => {
            const grid = document.querySelector(findifyGridSelector);
            if (!grid) return;
    
            const productItems = grid.querySelectorAll('.findify-components-common--grid__column');
            const totalProducts = productItems.length;
    
            if (totalProducts > lastInjectedQuizBanner + quizBannerInterval) {
                let nextBannerPosition = Math.ceil((lastInjectedQuizBanner + quizBannerInterval) / quizBannerInterval) * quizBannerInterval;
                if (nextBannerPosition > 200) {
                    nextBannerPosition = nextBannerPosition + 1;
                }
                injectQuizBanner(grid, nextBannerPosition);
                lastInjectedQuizBanner = nextBannerPosition;
            }
        });
    
        observerQuizBanner.observe(grid, observerConfig);
    }, 2000);
})

function injectBFCMBanner(grid, position) {
    let bfcmBannerOrigin = document.querySelector('div.bs-devshop__bfcm-banner-container');
    if (!bfcmBannerOrigin) {
        return;
    }

    let bfcmBanner = bfcmBannerOrigin.cloneNode(true);
    bfcmBanner.classList.add('injected-bfcm-banner');
    bfcmBanner.classList.remove('hidden');

    const gridStyle = window.getComputedStyle(grid);
    const columnCount = parseInt(gridStyle.getPropertyValue('grid-template-columns').split(' ').length);

    const bannerPosition = Math.ceil(position / columnCount) * columnCount + 1;

    bfcmBanner.style.order = bannerPosition;
    const screenWidth = window.innerWidth;
    if (screenWidth < 1000) {
        bfcmBanner.style.flexBasis = `calc(100% - 26px)`;
    } else if (screenWidth >= 1000 && screenWidth < 1200) {
        bfcmBanner.style.flexBasis = `calc(66.67% - 26px)`;
    } else {
        bfcmBanner.style.flexBasis = `calc(50% - 26px)`;
    }
    const productElements = grid.querySelectorAll('.findify-components-common--grid__column');
    let productHeight = 0;
    
    const bannerGridPosition = Math.floor(bannerPosition / columnCount);
    
    for (let i = bannerGridPosition * columnCount; i < (bannerGridPosition + 1) * columnCount; i++) {
        if (productElements[i]) {
            const height = productElements[i].offsetHeight;
            if (height > productHeight) {
                productHeight = height;
            }
        }
    }

    if (productHeight > 0) {
        const bannerImageWrapper = bfcmBanner.querySelector('.bs-devshop__bfcm-banner-image .image-element-wrapper');
        if (bannerImageWrapper) {
            bannerImageWrapper.style.minHeight = `${productHeight}px`;
            bannerImageWrapper.style.height = `${productHeight}px`;
        }
    }

    let insertPosition = bannerPosition;
    while (insertPosition > 0 && !grid.children[insertPosition - 1].classList.contains('findify-components-common--grid__column')) {
        insertPosition--;
    }

    if (grid.children[insertPosition]) {
        grid.insertBefore(bfcmBanner, grid.children[insertPosition]);
        bannerInserted = true;
    } else {
        grid.appendChild(bfcmBanner);
    }
}

window.addEventListener('DOMContentLoaded', function () {
    const waitForGrid = setInterval(() => {
        const grid = document.querySelector(findifyGridSelector);
        if (!grid) return;

        const productItems = grid.querySelectorAll('.findify-components-common--grid__column');
        if (productItems.length > 0) {
            clearInterval(waitForGrid);
            if (bannerInserted) return;
            
            // Initial injection
            injectBFCMBanner(grid, bfcmBannerInterval);
            lastInjectedBFCMBanner = bfcmBannerInterval;

            // Set up observer for future updates
            const observerConfig = { childList: true, subtree: false };
            const observer = new MutationObserver((mutations) => {
                const grid = document.querySelector(findifyGridSelector);
                if (!grid) return;
                if (bannerInserted) return;
            });
        
            observer.observe(grid, observerConfig);
        }
    }, 1000);
});