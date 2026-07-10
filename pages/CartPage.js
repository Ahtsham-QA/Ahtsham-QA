export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartTitle = page.locator('.title');
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeItemByName(itemName) {
    const item = this.page.locator('.cart_item').filter({ hasText: itemName }).first();
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    return await this.cartItems.locator('.inventory_item_name').allTextContents();
  }
}
