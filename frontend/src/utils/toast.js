/**
 * Utilitário para exibir pop-ups usando a biblioteca Toastify-js
 */
export const showToast = (message, type = 'warning') => {
  if (typeof window === 'undefined') return;

  const themes = {
    warning: {
      background: 'linear-gradient(135deg, #E06D53 0%, #B94F70 100%)',
      border: '1px solid #D98CA1',
      icon: '⚠️'
    },
    error: {
      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
      border: '1px solid #F87171',
      icon: '❌'
    },
    info: {
      background: 'linear-gradient(135deg, #B94F70 0%, #7E2A44 100%)',
      border: '1px solid #E8CCD4',
      icon: 'ℹ️'
    },
    success: {
      background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
      border: '1px solid #34D399',
      icon: '✅'
    }
  };

  const theme = themes[type] || themes.warning;

  if (window.Toastify) {
    window.Toastify({
      text: `${theme.icon} ${message}`,
      duration: 3800,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true,
      close: true,
      style: {
        background: theme.background,
        color: '#FFFFFF',
        borderRadius: '14px',
        fontWeight: '700',
        fontSize: '13px',
        boxShadow: '0 10px 25px -5px rgba(37, 29, 32, 0.25)',
        border: theme.border,
        padding: '12px 18px',
        maxWidth: '380px'
      }
    }).showToast();
  } else {
    // Fallback caso a CDN do Toastify-js ainda esteja carregando
    createFallbackToast(`${theme.icon} ${message}`, theme);
  }
};

function createFallbackToast(text, theme) {
  let container = document.getElementById('toastify-fallback-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastify-fallback-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.innerText = text;
  toast.style.cssText = `
    background: ${theme.background};
    color: #fff;
    padding: 12px 18px;
    border-radius: 14px;
    font-size: 13px;
    font-weight: 700;
    box-shadow: 0 10px 25px -5px rgba(37, 29, 32, 0.25);
    border: ${theme.border};
    animation: fadeIn 0.3s ease;
    pointer-events: auto;
    max-width: 380px;
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
