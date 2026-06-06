export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async addItemToCartByName(itemName) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async removeItemFromCartByName(itemName) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }
}
