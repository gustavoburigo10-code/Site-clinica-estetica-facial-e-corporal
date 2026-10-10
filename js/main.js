/* ============================================================
   Clínica Nayara Magalhães — interações do site
   ============================================================ */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5511998933728';
  var BASE_MESSAGE = 'Olá! Gostaria de conhecer os tratamentos e agendar uma avaliação.';

  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }

  /* ---------- Cabeçalho compacto ao rolar ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu-mobile');
  var closeBtn = document.querySelector('.menu-close');
  var lastFocused = null;

  function openMenu() {
    if (!menu) return;
    lastFocused = document.activeElement;
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('is-open'); });
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    window.setTimeout(function () { menu.hidden = true; }, 420);
    if (lastFocused) lastFocused.focus();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menu) {
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Link ativo na navegação ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-list a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Animações de rolagem ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Modal de tratamentos ---------- */
  var TREATMENTS = {
    'harmonizacao': {
      categoria: 'Estética facial',
      titulo: 'Harmonização facial',
      imagem: 'images/resultado-labios-3.webp',
      alt: 'Resultado de tratamento facial realizado na clínica',
      descricao: 'A harmonização facial parte de uma avaliação atenta das proporções e das características do rosto. A partir dela, são definidos os procedimentos adequados para cada pessoa, sempre orientando expectativas de forma clara e realista.',
      pontos: ['Avaliação individual antes de qualquer procedimento', 'Planejamento ajustado às características do rosto', 'Orientação completa sobre cuidados antes e depois']
    },
    'limpeza': {
      categoria: 'Estética facial',
      titulo: 'Limpeza de pele',
      imagem: 'images/trat-limpeza.webp',
      alt: 'Aplicação de máscara facial com pincel durante limpeza de pele',
      descricao: 'A limpeza de pele é um cuidado de higienização e manutenção, indicado conforme o tipo de pele e as suas necessidades. A indicação é sempre definida após a avaliação.',
      pontos: ['Indicação conforme o tipo de pele', 'Cuidado de manutenção para o rosto', 'Orientação de rotina domiciliar']
    },
    'rejuvenescimento': {
      categoria: 'Estética facial',
      titulo: 'Rejuvenescimento facial',
      imagem: 'images/resultado-testa.webp',
      alt: 'Antes e depois de tratamento de rejuvenescimento facial',
      descricao: 'Cuidados voltados para a aparência da pele e para marcas do tempo, combinando técnicas conforme a avaliação de cada caso. Os resultados variam de pessoa para pessoa.',
      pontos: ['Avaliação da pele e das áreas a tratar', 'Protocolo definido caso a caso', 'Acompanhamento ao longo das sessões']
    },
    'textura': {
      categoria: 'Estética facial',
      titulo: 'Textura e luminosidade',
      imagem: 'images/resultado-perfil.webp',
      alt: 'Antes e depois de tratamento facial para textura e luminosidade',
      descricao: 'Tratamentos orientados para a textura, a uniformidade e o aspecto luminoso da pele do rosto, com cuidados definidos a partir da avaliação da pele.',
      pontos: ['Foco na textura e na uniformidade', 'Cuidados compatíveis com a rotina de cada pessoa', 'Manutenção planejada com a profissional']
    },
    'cuidados-faciais': {
      categoria: 'Estética facial',
      titulo: 'Cuidados faciais personalizados',
      imagem: 'images/equipe-atendimento.webp',
      alt: 'Dra. Nayara Magalhães registrando orientações durante o atendimento',
      descricao: 'Um plano de cuidado desenhado especialmente para você, unindo orientação de rotina e procedimentos em consultório, respeitando características, necessidades e objetivos individuais.',
      pontos: ['Plano de cuidado individual', 'Combinação de rotina e procedimentos', 'Reavaliação conforme a evolução']
    },
    'corporais': {
      categoria: 'Estética corporal',
      titulo: 'Cuidados corporais',
      imagem: 'images/trat-corporal-1.webp',
      alt: 'Aplicação de óleo durante tratamento corporal',
      descricao: 'Tratamentos corporais conduzidos com abordagem individual, respeitando o momento e os objetivos de cada pessoa. O protocolo é definido após a avaliação.',
      pontos: ['Avaliação das áreas e objetivos', 'Sessões planejadas individualmente', 'Ambiente reservado e confortável']
    },
    'bem-estar': {
      categoria: 'Estética corporal',
      titulo: 'Protocolos de bem-estar',
      imagem: 'images/trat-corporal-2.webp',
      alt: 'Pedras quentes e orquídeas em sessão de bem-estar',
      descricao: 'Combinados de cuidados corporais pensados para o conforto e para o bem-estar, conduzidos com calma e atenção em cada sessão.',
      pontos: ['Sessões conduzidas com calma', 'Combinações definidas na avaliação', 'Momento de cuidado e conforto']
    },
    'pele-corporal': {
      categoria: 'Estética corporal',
      titulo: 'Aparência da pele no corpo',
      imagem: 'images/trat-corporal-3.webp',
      alt: 'Sessão de cuidado corporal focada na aparência da pele',
      descricao: 'Tratamentos orientados para o cuidado com a textura e a aparência da pele em diferentes áreas do corpo, com indicação definida caso a caso.',
      pontos: ['Avaliação da pele por região', 'Protocolo definido conforme a necessidade', 'Orientação de cuidado contínuo']
    },
    'corporais-personalizados': {
      categoria: 'Estética corporal',
      titulo: 'Procedimentos corporais personalizados',
      imagem: 'images/trat-corporal-4.webp',
      alt: 'Frascos de óleo e sérum usados em procedimentos corporais',
      descricao: 'Combinações de procedimentos corporais definidas após a avaliação, de acordo com as necessidades e os objetivos de cada pessoa.',
      pontos: ['Plano corporal individual', 'Combinação de técnicas conforme o caso', 'Reavaliação periódica']
    }
  };

  var modal = document.getElementById('modal-tratamento');
  var modalImg = document.getElementById('modal-imagem');
  var modalCat = document.getElementById('modal-categoria');
  var modalTitle = document.getElementById('modal-titulo');
  var modalDesc = document.getElementById('modal-descricao');
  var modalList = document.getElementById('modal-lista');
  var modalCta = document.getElementById('modal-cta');
  var modalOpener = null;

  function openModal(key, trigger) {
    var data = TREATMENTS[key];
    if (!data || !modal) return;
    modalOpener = trigger || null;
    modalImg.src = data.imagem;
    modalImg.alt = data.alt;
    modalCat.textContent = data.categoria;
    modalTitle.textContent = data.titulo;
    modalDesc.textContent = data.descricao;
    modalList.innerHTML = '';
    data.pontos.forEach(function (p) {
      var li = document.createElement('li');
      li.textContent = p;
      modalList.appendChild(li);
    });
    modalCta.href = waLink('Olá! Gostaria de saber mais sobre ' + data.titulo.toLowerCase() + ' e agendar uma avaliação.');
    modal.hidden = false;
    document.body.classList.add('menu-open');
    modal.querySelector('.modal-close').focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('menu-open');
    if (modalOpener) modalOpener.focus();
  }

  document.querySelectorAll('[data-open-treatment]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-open-treatment'), btn);
    });
  });
  if (modal) {
    modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
  }

  /* ---------- Lightbox da galeria ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var currentIndex = 0;
  var galleryOpener = null;

  function showGalleryItem(index) {
    if (!galleryItems.length) return;
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    var item = galleryItems[currentIndex];
    var img = item.querySelector('img');
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.getAttribute('data-caption') || img.alt;
  }

  function openLightbox(index, trigger) {
    if (!lightbox) return;
    galleryOpener = trigger || null;
    showGalleryItem(index);
    lightbox.hidden = false;
    document.body.classList.add('menu-open');
    lightbox.querySelector('.lightbox-close').focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImg.removeAttribute('src');
    document.body.classList.remove('menu-open');
    if (galleryOpener) galleryOpener.focus();
  }

  galleryItems.forEach(function (item, i) {
    item.addEventListener('click', function () { openLightbox(i, item); });
  });
  if (lightbox) {
    lightbox.querySelectorAll('[data-close-lightbox]').forEach(function (el) {
      el.addEventListener('click', closeLightbox);
    });
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  /* ---------- Teclado: Esc e setas ---------- */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
      closeLightbox();
      if (menu && !menu.hidden) closeMenu();
    }
    if (lightbox && !lightbox.hidden) {
      if (event.key === 'ArrowRight') showGalleryItem(currentIndex + 1);
      if (event.key === 'ArrowLeft') showGalleryItem(currentIndex - 1);
    }
  });

  /* ---------- Formulário de contato ---------- */
  var form = document.getElementById('form-contato');

  function setError(field, message) {
    var wrapper = field ? field.closest('.form-field') : null;
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
    var errorEl = document.getElementById('erro-' + field.id);
    if (errorEl) errorEl.textContent = message || '';
  }

  if (form) {
    ['nome', 'mensagem'].forEach(function (id) {
      var field = document.getElementById(id);
      if (field) field.addEventListener('input', function () { setError(field, ''); });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var nome = document.getElementById('nome');
      var interesse = document.getElementById('interesse');
      var mensagem = document.getElementById('mensagem');
      var consent = document.getElementById('consentimento');
      var honeypot = document.getElementById('empresa');
      var consentError = document.getElementById('erro-consentimento');
      var valid = true;

      // Proteção anti-spam: campo oculto preenchido por robôs
      if (honeypot && honeypot.value.trim() !== '') return;

      if (nome.value.trim().length < 2) {
        setError(nome, 'Informe o seu nome para continuar.');
        valid = false;
      } else {
        setError(nome, '');
      }

      if (mensagem.value.length > 600) {
        setError(mensagem, 'A mensagem pode ter no máximo 600 caracteres.');
        valid = false;
      } else {
        setError(mensagem, '');
      }

      if (!consent.checked) {
        if (consentError) consentError.textContent = 'É necessário autorizar o contato para continuar.';
        valid = false;
      } else if (consentError) {
        consentError.textContent = '';
      }

      if (!valid) {
        var firstError = form.querySelector('.has-error input, .has-error textarea') || consent;
        if (firstError) firstError.focus();
        return;
      }

      var linhas = [
        'Olá! Gostaria de agendar uma avaliação.',
        '',
        'Nome: ' + nome.value.trim(),
        'Tratamento de interesse: ' + interesse.value
      ];
      if (mensagem.value.trim() !== '') {
        linhas.push('Mensagem: ' + mensagem.value.trim());
      }

      window.open(waLink(linhas.join('\n')), '_blank', 'noopener');
    });
  }

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Fallback de links WhatsApp ---------- */
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (link) {
    if (!link.getAttribute('href').split('text=')[1]) {
      link.setAttribute('href', waLink(BASE_MESSAGE));
    }
  });
})();
