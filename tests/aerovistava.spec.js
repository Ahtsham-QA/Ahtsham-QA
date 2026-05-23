import { test } from '@playwright/test';

test('navigate to aerovistava and click Our Services', async ({ page }) => {
  await page.goto('https://aerovistava.com');

  // Handle cookie/consent if present
  const accept = page.getByRole('button', { name: /I agree|Accept|Accept all|Agree|Allow/i });
  if (await accept.isVisible()) {
    await accept.click();
  }

  const ourServices = page.getByRole('link', { name: /Our Services|Services/i }).first();
  await ourServices.waitFor({ state: 'visible', timeout: 20000 });
  await ourServices.click();

  await page.waitForLoadState('networkidle');
});