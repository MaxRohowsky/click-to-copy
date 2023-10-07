document.addEventListener("mouseover", (event) => {
    const target = event.target;
    const styles = window.getComputedStyle(target);
    const cssText = Array.from(styles)
      .map((prop) => `${prop}: ${styles.getPropertyValue(prop)}`)
      .join("<br>");
    chrome.runtime.sendMessage({ cssText });
  });