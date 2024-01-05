function addCssToHead(cssRules) {
  var styleElement = document.createElement('style');
  styleElement.textContent = cssRules;
  document.head.appendChild(styleElement);
}

var css = ` 
#magnifier {
  position: absolute;
  display: none;
  width: 110px; 
  height: 110px; 
  border: 0px;
  border-radius: 0%;
  overflow: hidden;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: 1000;
  cursor: zoom-in;
  background: #fff;
}

#hand img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  visibility: hidden;
}`;

addCssToHead(css);

function nrzMagnify(image_) {
  const magnifier = document.createElement('div');
  magnifier.id = 'magnifier';
  document.body.appendChild(magnifier);

  let targetElement;
  const zoomLevel = 2; 

  document.addEventListener('mousemove', (event) => {
    if (targetElement) {
      updateMagnifierPosition(event);
    }
  });

  document.querySelectorAll(`[data-acc-text='${image_}']`).forEach(element => {
    element.addEventListener('mouseenter', () => {
      targetElement = element;
      startMagnifier(targetElement);
    });

    element.addEventListener('mouseleave', () => {
      stopMagnifier();
    });
  });

  function startMagnifier(element) {
    const image = element.querySelector('svg image');

    if (image) {
      const imagePath = image.getAttribute('xlink:href') || image.getAttribute('href');
      magnifier.style.backgroundImage = `url('${imagePath}')`;
      magnifier.style.display = 'block';
      document.body.style.cursor = 'zoom-in'; 
    } else {
      console.error("Image not found within the specified element.");
    }
  }

  function stopMagnifier() {
    targetElement = null;
    magnifier.style.display = 'none';
    document.body.style.cursor = 'auto'; 
  }

function updateMagnifierPosition(event) {
  const rect = targetElement.getBoundingClientRect();

  const offsetX = magnifier.offsetWidth / 2;
  const offsetY = magnifier.offsetHeight / 2;

  
  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;


  magnifier.style.left = `${x}px`;
  magnifier.style.top = `${y}px`;

  
  const imageX = Math.min(100, Math.max(0, (x - rect.left) / targetElement.offsetWidth * 100 * zoomLevel));
  const imageY = Math.min(100, Math.max(0, (y - rect.top) / targetElement.offsetHeight * 100 * zoomLevel));

  magnifier.style.backgroundPosition = `${imageX}% ${imageY}%`;
}

}
