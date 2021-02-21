document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const dark_mode_menu_item = document.querySelector('.dark-mode-menu-item');
    const navbar_toggler = document.querySelector('.navbar-toggler');
    const navbar_toggler_button = document.querySelector('.navbar-toggler-button');
    const navbar_menu = document.querySelector('.navbar-menu');
    const toastNotifications = document.querySelector('.toast-notifications');
    const notificationTime = 5000; //ms
    const typings = document.querySelectorAll('.typing');
    const menuCards = document.querySelector('.menu-cards');

    dark_mode_menu_item?.addEventListener('click', toggleDarkMode);

    if (navbar_toggler && navbar_menu) {
      navbar_toggler.addEventListener('click', () => {
        navbar_menu.classList.toggle('show');
        navbar_toggler_button.classList.toggle('open');
      });
    }

    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('sticky', window.scrollY > 0);
    });

    setTimeout(() => {
      // Preload removes all transitions at loading.
      document.documentElement.classList.remove('preload');
    }, 0);

    function toggleDarkMode() {
      notification(document.documentElement.classList.contains('dark') ? 'Light Mode' : 'Dark Mode');
      // Save preferences
      localStorage.setItem(
        'prefers-color-scheme',
        document.documentElement.classList.contains('dark') ? 'light' : 'dark'
      );
      setTimeout(() => {
        // toggle dark mode
        document.documentElement.classList.toggle('dark');
      }, 0);
    }

    function notification(message = 'Test notification') {
      const notif = document.createElement('div');
      notif.classList.add('toast');
      notif.innerText = message;

      const close = document.createElement('button');
      close.classList.add('close');
      close.innerText = 'X';
      close.addEventListener('click', () => toastNotifications.removeChild(notif));

      notif.appendChild(close);

      toastNotifications.insertBefore(notif, toastNotifications.firstChild);

      setTimeout(() => {
        notif.classList.add('show');
      }, 0);
      setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => {
          toastNotifications.removeChild(notif);
        }, 500);
      }, notificationTime);
    }

    typings.forEach((e) => autoText(e));

    function autoText(typingElement) {
      const texts = typingElement.dataset.target.split('|');

      let index = 1;
      let wordIndex = 0;
      let increase = true;

      let speed = 150;
      let step = speed;

      autoTextWriteText();

      function autoTextWriteText() {
        typingElement.innerText = texts[wordIndex].slice(0, index);
        setTimeout(() => {
          autoTextNextStep();
          autoTextWriteText();
        }, step);
      }

      function autoTextNextStep() {
        if (increase) {
          index++;
          // 50%-150% random step speed
          step = speed;
          // Math.floor(speed * 0.5 + Math.random() * speed);

          if (index >= texts[wordIndex].length) {
            increase = false;
            step = 2000;
          }
        } else {
          index--;
          step = speed / 5;
          if (index <= 0) {
            increase = true;
            step = 1000;
            wordIndex++;
            if (wordIndex >= texts.length) {
              wordIndex = 0;
            }
          }
        }
      }
    }

    menuCards && useMenuCards();

    function useMenuCards() {
      const menuCards = document.querySelectorAll('.menu-card');
      const menuHidden = document.querySelectorAll('.menu-hidden');
      const menuContainer = document.querySelector('.menu-container');

      menuCards.forEach((card, idx) =>
        card.addEventListener('click', (e) => {
          menuCards.forEach((c) => c.classList.remove('active'));
          card.classList.add('active');
          menuContainer.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            menuContainer.classList.remove('show');
            setTimeout(() => {
              menuContainer.innerHTML = menuHidden[idx].innerHTML;
              menuContainer.classList.add('show');

              notification(`${menuContainer.querySelector('h2').innerText} loaded`);
            }, 500);
          }, 500);
        })
      );
    }
  }
};
