onmessage = (e) => {
    const {
        eX,
        eY,
        leftW,
        rightW,
        topH,
        bottomH,
        splitX,
        splitY,
        containerWidth,
        containerHeight,
        direct,
    } = e.data;

    let isDragging = true;

    let leftPer = (leftW + (eX - splitX)) / containerWidth * 100;
    let rightPer = (rightW - (eX - splitX)) / containerWidth * 100;

    let topPer = (topH + (eY - splitY)) / containerHeight * 100;
    let botPer = (bottomH - (eY - splitY)) / containerHeight * 100;

    if (direct === 'row') {
        if (leftPer < 30 || rightPer < 50) isDragging = false;
    } else if (direct === 'col') {
        if (topPer < 30 || botPer < 30) isDragging = false;
    }

    postMessage({
        leftPer,
        rightPer,
        topPer,
        botPer,
        isDragging,
    });
};