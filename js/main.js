document.addEventListener('DOMContentLoaded', () => {
  // Advanced Dynamic Contact Form Logic
  const form = document.getElementById('consultationForm');
  const serviceSelect = document.getElementById('service');
  const dynamicField = document.getElementById('dynamicFieldGroup');

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
            <div style="text-align:center; padding: 60px 20px;">
              <h3 style="font-size:28px; color:var(--accent-gold); margin-bottom:16px;">Engagement Request Received</h3>
              <p style="color:var(--text-muted); max-width:40ch; margin:0 auto;">Your requirements have been securely logged. Our senior partner will review your profile and initiate contact within 24 hours.</p>
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

  // Interactive Calculator Logic (Services Page)
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
