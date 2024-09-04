async function calculateNewSize(imgElement) {
  try {
    let aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
    const maxWidth = window.innerWidth * 0.70; // 70% del ancho de la ventana
    const maxHeight = window.innerHeight * 0.70; // 70% del alto de la ventana

    // Tamaño mínimo deseado para la imagen
    const minWidth = 150; // Ancho mínimo en píxeles
    const minHeight = 150; // Alto mínimo en píxeles

    let newWidth = imgElement.width < minWidth ? minWidth : imgElement.width;
    let newHeight = newWidth / aspectRatio;

    if (newHeight < minHeight) {
      newHeight = minHeight;
      newWidth = newHeight * aspectRatio;
    }

    // Asegurar que la imagen no sea más grande que la ventana
    if (newWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = newWidth / aspectRatio;
    }

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = newHeight * aspectRatio;
    }

    // Calcula el tamaño máximo respetando el aspectRatio y los límites de la ventana
    let maxWidthRespectingAspectRatio = maxWidth;
    let maxHeightRespectingAspectRatio = maxWidthRespectingAspectRatio / aspectRatio;
    if (maxHeightRespectingAspectRatio > maxHeight) {
      maxHeightRespectingAspectRatio = maxHeight;
      maxWidthRespectingAspectRatio = maxHeightRespectingAspectRatio * aspectRatio;
    }

    return {
      width: Math.round(newWidth),
      height: Math.round(newHeight),
      aspectRatio: aspectRatio,
      maxWidthScreen: maxWidth,
      maxHeightScreen: maxHeight,
      maxWidthRespectingAspectRatio: Math.round(maxWidthRespectingAspectRatio),
      maxHeightRespectingAspectRatio: Math.round(maxHeightRespectingAspectRatio)
    };
  } catch (error) {
    console.error(error);
    return null; // O manejar el error de manera adecuada
  }
}

export const getNewImgSize = async (img) => await calculateNewSize(img);
