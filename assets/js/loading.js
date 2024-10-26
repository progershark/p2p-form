document.addEventListener('DOMContentLoaded', () => {
    const loadingSection = document.querySelector('.loadingItem');
    document.body.style.overflow = 'hidden';

    // Скрываем загрузочный экран после загрузки страницы
    window.addEventListener('load', () => {
        loadingSection.remove();
        document.body.style.overflow = 'inherit';
    });
});