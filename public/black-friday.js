export function compareDeal({ previous, offer, shipping, budget }) {
  const values = [previous, offer, shipping, budget];
  if (values.some(value => typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1000000) || previous < 0.01) {
    throw new RangeError('Invalid comparison amounts');
  }
  // Work in cents so decimal inputs cannot create a false budget overrun.
  const [referenceCents, offerCents, shippingCents, budgetCents] = values.map(value => Math.round(value * 100));
  const totalCents = offerCents + shippingCents;
  return {
    total: totalCents / 100,
    discount: (referenceCents - offerCents) / referenceCents * 100,
    saving: (referenceCents - totalCents) / 100,
    remaining: (budgetCents - totalCents) / 100,
  };
}

if (typeof document !== 'undefined') {
  const form = document.querySelector('#deal-form');
  if (form) {
    const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
    const percentage = new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: 1 });
    const results = document.querySelector('#deal-results');
    const error = document.querySelector('#deal-error');
    const budgetStatus = document.querySelector('#deal-budget');

    function updateComparison() {
      if (!form.checkValidity()) {
        results.hidden = true;
        error.hidden = false;
        return;
      }
      const amounts = Object.fromEntries(['previous', 'offer', 'shipping', 'budget'].map(name => [name, form.elements.namedItem(name).valueAsNumber]));
      const result = compareDeal(amounts);
      document.querySelector('#deal-total').textContent = currency.format(result.total);
      document.querySelector('#deal-discount').textContent = percentage.format(result.discount / 100);
      document.querySelector('#deal-saving').textContent = result.saving < 0
        ? `${currency.format(-result.saving)} más caro`
        : `${currency.format(result.saving)} menos`;
      budgetStatus.textContent = result.remaining < 0
        ? `Supera tu presupuesto en ${currency.format(-result.remaining)}.`
        : `Quedan ${currency.format(result.remaining)} de tu presupuesto.`;
      budgetStatus.classList.toggle('over-budget', result.remaining < 0);
      error.hidden = true;
      results.hidden = false;
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      updateComparison();
    });
    form.addEventListener('input', updateComparison);
    updateComparison();
    form.querySelector('button[type="submit"]').disabled = false;
  }
}
