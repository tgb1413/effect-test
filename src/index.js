let numberOfEffect = 0;

function Effect(container, config) {
  const effectInfo = {
    id: numberOfEffect++,
    number: 10,
    direction: '',
    speed: 0,
    ...config,
  };

  const startPoint = new StartPoint(effectInfo.id);
  const containerElement = container ? container : document.body;

  // 움직일 거리
  const distanceY =
    containerElement.offsetHeight <= 0
      ? window.innerHeight
      : containerElement.offsetHeight;

  let animationCss = `
  @-webkit-keyframes effect_${effectInfo.id}_y { 
    from { 
      -webkit-transform: translateY(${0}px);
    } 
    to { 
      -webkit-transform: translateY(${distanceY}px);
    }
  }
  @keyframes effect_${effectInfo.id}_y {
    from { 
      transform: translateY(${0}px);
    } 
    to { 
      transform:translateY(${distanceY}px);
    }
  }`;

  if (!document.getElementById(`effect-animation-${effectInfo.id}`)) {
    const styleNode = document.createElement('style');
    styleNode.textContent = animationCss;
    styleNode.id = `effect-animation-${effectInfo.id}`;

    document.body.appendChild(styleNode);
  }

  const somethingArray = Array.from(
    new Array(effectInfo.number),
    () => new Something(effectInfo.id),
  );

  return {
    start: function () {
      startPoint.append(...somethingArray);

      if (!document.getElementById(`effect-start-point-${effectInfo.id}`)) {
        container
          ? container.appendChild(startPoint)
          : document.body.appendChild(startPoint);
      }
    },
    stop: function () {
      startPoint.remove();
    },
  };
}

function StartPoint(id) {
  const startPoint = document.createElement('div');
  startPoint.id = `effect-start-point-${id}`;
  startPoint.style.position = 'fixed';
  startPoint.style.top = '0';
  startPoint.style.left = '0';
  startPoint.style.width = '100%';
  startPoint.style.height = '1px';

  return startPoint;
}

function Something(id) {
  const thing = document.createElement('div');
  /**
   * 내부에서 선언된 이 스타일들은 파라미터를 통해서 결정해야할 수도
   */
  thing.style.animation = `effect_${id}_y`;
  thing.style.animationDuration =
    (Math.random() * (8 - 6) + 6).toString() + 's';
  thing.style.animationIterationCount = 'infinite';
  thing.style.position = 'absolute';
  thing.style.top = '0';
  thing.style.left = (Math.random() * 100).toString() + '%';
  thing.style.width = '12px';
  thing.style.height = '12px';
  thing.style.backgroundColor = 'red';

  return thing;
}

module.exports = {
  Effect,
};
