document.addEventListener('DOMContentLoaded', () => {
  // Navigation Selectors
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const drawerClose = document.getElementById('drawerClose');
  const navBackdrop = document.getElementById('navBackdrop');

  // Popup Modal Selectors
  const consultModal = document.getElementById('consultModal');
  const modalClose = document.getElementById('modalClose');
  const modalTriggers = document.querySelectorAll('.btn-trigger-modal');

  // Form & Dynamic Selectors
  const form = document.getElementById('consultationForm');
  const serviceSelect = document.getElementById('service');
  const dynamicField = document.getElementById('dynamicFieldGroup');

  // --- 1. Mobile Drawer Navigation ---
  function openMobileNav() {
    if (navLinks) navLinks.classList.add('active');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeMobileNav() {
    if (navLinks) navLinks.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  if (navToggle) navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    openMobileNav();
  });

  if (drawerClose) drawerClose.addEventListener('click', closeMobileNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);

  // Auto-close drawer when clicking internal links
  const drawerAnchors = navLinks ? navLinks.querySelectorAll('a') : [];
  drawerAnchors.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // --- 2. Consultation Modal Logic ---
  function openModal(e) {
    if (e) e.preventDefault();
    closeMobileNav();
    if (consultModal) {
      consultModal.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  }

  function closeModal() {
    if (consultModal) {
      consultModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }

  modalTriggers.forEach(btn => btn.addEventListener('click', openModal));
  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (consultModal) {
    consultModal.addEventListener('click', (e) => {
      if (e.target === consultModal) closeModal();
    });
  }

  // --- 3. Dynamic Form Field Injection ---
  if (serviceSelect && dynamicField) {
    serviceSelect.addEventListener('change', (e) => {
      const value = e.target.value;
      if (value === 'Monthly Bookkeeping' || value === 'Full Service Management') {
        dynamicField.innerHTML = `
          <div class="field full">
            <label for="monthly_vol">Estimated Monthly Transaction Volume</label>
            <select id="monthly_vol" name="monthly_vol">
              <option>Under 100 transactions/mo</option>
              <option>100 - 300 transactions/mo</option>
              <option>300+ transactions/mo</option>
            </select>
          </div>
        `;
      } else if (value === 'Foundation Setup') {
        dynamicField.innerHTML = `
          <div class="field full">
            <label for="entity_type">Entity Structure</label>
            <select id="entity_type" name="entity_type">
              <option>LLC</option>
              <option>C-Corporation</option>
              <option>S-Corporation</option>
              <option>Sole Proprietorship</option>
            </select>
          </div>
        `;
      } else {
        dynamicField.innerHTML = '';
      }
    });
  }

  // --- 4. Form Submission Handling ---
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          form.innerHTML = `
            <div style="text-align:center; padding: 40px 10px;">
              <h3 style="font-size:24px; color:var(--accent-gold); margin-bottom:12px;">Engagement Request Received</h3>
              <p style="color:var(--text-muted); font-size:14px; max-width:40ch; margin:0 auto;">Your requirements have been securely logged. Our senior partner will review your profile and initiate contact within 24 hours.</p>
            </div>
          `;
        } else {
          alert('Transmission Error: ' + result.message);
        }
      } catch (err) {
        console.error('Submission failure', err);
        alert('Network transmission failed. Direct email available at jimmyservices12@gmail.com');
      }
    });
  }

  // --- 5. Retainer Interactive Estimator ---
  const calcTx = document.getElementById('calc_tx');
  const calcOutput = document.getElementById('calc_output');
  if (calcTx && calcOutput) {
    calcTx.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      let estimatedBase = 350;
      if (val > 100) estimatedBase = 650;
      if (val > 250) estimatedBase = 1200;
      calcOutput.textContent = '$' + estimatedBase + ' / month';
    });
  }
});