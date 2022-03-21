function updateAttributes(oldNode: any, newNode: any) {
  for (const { name, value } of [...newNode.attributes]) {
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }
  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) || newNode.hasAttribute(name)) continue;
    oldNode.removeAttribute(name);
  }
}

export function updateElement(parent: any, newNode: any, oldNode: any) {
  // 1. oldNode만 있는 경우
  if (!newNode && oldNode) return oldNode.remove();

  // 2. newNode만 있는 경우
  if (newNode && !oldNode) return parent.appendChild(newNode);

  // 3. oldNode와 newNode 모두 text 타입일 경우
  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  // 4. oldNode와 newNode의 태그 이름이 다를 경우
  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }

  // 5. oldNode와 newNode의 태그 이름(type)이 같을 경우
  updateAttributes(oldNode, newNode);

  // 6. newNode와 oldNode의 모든 자식 태그를 순회하며 1 ~ 5의 내용을 반복한다.
  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}
