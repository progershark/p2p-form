document.addEventListener('DOMContentLoaded', () => {
    const loadingSection = document.querySelector('.loadingItem');
    document.body.style.overflow = 'hidden';

    // Скрываем загрузочный экран после загрузки страницы
    window.addEventListener('load', () => {
        loadingSection.style.display = 'none';
        document.body.style.overflow = 'inherit';
    });
});