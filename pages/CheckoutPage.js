export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.confirmationMessage = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillDetails(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName ?? '');
    await this.lastNameInput.fill(lastName ?? '');
    await this.postalCodeInput.fill(postalCode ?? '');
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getConfirmationMessage() {
    return await this.confirmationMessage.textContent();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
