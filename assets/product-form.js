if (!customElements.get('product-form')) {
    customElements.define(
        'product-form',
        class ProductForm extends HTMLElement {
            constructor() {
                super();

                this.form = this.querySelector('form');
                this.form.querySelector('[name=id]').disabled = false;
                this.form.addEventListener(
                    'submit',
                    this.onSubmitHandler.bind(this)
                );
                this.cart =
                    document.querySelector('cart-notification') ||
                    document.querySelector('cart-drawer');
                this.submitButton = this.querySelector('[type="submit"]');
                if (document.querySelector('cart-drawer'))
                    this.submitButton.setAttribute('aria-haspopup', 'dialog');
                this.productInfoWrapper = document.querySelector('.product__info-wrapper');
                this.isPDPForm = window.location.href.includes('products/') && this.productInfoWrapper?.contains(this)
            }

            async onSubmitHandler(evt) {
                evt.preventDefault();
                if (this.submitButton.getAttribute('aria-disabled') === 'true')
                    return;

                this.handleErrorMessage();

                this.submitButton.setAttribute('aria-disabled', true);
                this.submitButton?.classList.add('loading');
                this.querySelector(
                    '.loading-overlay__spinner'
                )?.classList.remove('hidden');

                const config = fetchConfig('javascript');
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                delete config.headers['Content-Type'];

                const formData = new FormData(this.form);
                if (this.cart) {
                    formData.append(
                        'sections',
                        this.cart
                            .getSectionsToRender()
                            .map((section) => section.id)
                    );
                    formData.append('sections_url', window.location.pathname);
                    this.cart.setActiveElement(document.activeElement);
                }
                config.body = formData;

                /* gift product for selling plan - recharge*/
                let isAddGift = false;

                const btnSubscribe = document.querySelector('product-selling-plan .radio--button__subscribe')
                const variantId = this.form.querySelector('input[name="id"]')?.getAttribute('value')


                // Wont be gift widget if not in product info wrapper (only on PDP page for sub products)
                if (this.isPDPForm && btnSubscribe && this.productInfoWrapper && variantId) {
                    const responseCart = await fetch('/cart.js')
                    const cart = await responseCart.json()

                    const hasGift = variantId && cart.items.findIndex(item => item.properties?.isGift == variantId) > -1
                    if (
                        this.productInfoWrapper.classList.contains('ab__test--active-test') && 
                        btnSubscribe?.classList?.contains('radio--button__active') && 
                        !hasGift) {
                        isAddGift = true
                    }
                } 

                fetch(`${routes.cart_add_url}`, config)
                    .then((response) => {
                        if (!isAddGift) return response

                        const form = {
                            'items': [{
                                'id': btnSubscribe.getAttribute('data-gift-product-id'),
                                'quantity': 1,
                                'properties': {
                                    'isGift': variantId
                                }
                            }]
                        };

                        console.log('sub gift form: ', form)

                        return fetch(window.Shopify.routes.root + 'cart/add.js', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(form)
                        })
                    })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.status) {
                            this.handleErrorMessage(response.description);

                            const soldOutMessage =
                                this.submitButton.querySelector(
                                    '.sold-out-message'
                                );
                            if (!soldOutMessage) return;
                            this.submitButton.setAttribute(
                                'aria-disabled',
                                true
                            );
                            this.submitButton
                                .querySelector('span')
                                ?.classList.add('hidden');
                            soldOutMessage?.classList.remove('hidden');
                            this.error = true;
                            return;
                        }

                        const cartUpdateEvent = new Event("cartUpdateEvent");
                        document.dispatchEvent(cartUpdateEvent);

                        window.__Theme._ctx.emit('cart-item-added');
                        document.body?.classList.add('overflow-hidden');

                        this.error = false;
                        const quickAddModal = this.closest('quick-add-modal');
                        if (quickAddModal) {
                            document.body.addEventListener(
                                'modalClosed',
                                () => {
                                    setTimeout(() => {
                                        this.cart.renderContents(response);
                                    });
                                },
                                { once: true }
                            );
                            quickAddModal.hide(true);
                        } else {
                            this.cart.renderContents(response);
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    })
                    .finally(() => {
                        this.submitButton?.classList.remove('loading');
                        if (
                            this.cart &&
                            this.cart?.classList.contains('is-empty')
                        )
                            this.cart?.classList.remove('is-empty');
                        if (!this.error)
                            this.submitButton.removeAttribute('aria-disabled');
                        this.querySelector(
                            '.loading-overlay__spinner'
                        )?.classList.add('hidden');
                    });


            }

            handleErrorMessage(errorMessage = false) {
                if (this.hideErrors) return;

                this.errorMessageWrapper =
                    this.errorMessageWrapper ||
                    this.querySelector('.product-form__error-message-wrapper');
                if (!this.errorMessageWrapper) return;
                this.errorMessage =
                    this.errorMessage ||
                    this.errorMessageWrapper.querySelector(
                        '.product-form__error-message'
                    );

                this.errorMessageWrapper.toggleAttribute(
                    'hidden',
                    !errorMessage
                );

                if (errorMessage) {
                    this.errorMessage.textContent = errorMessage;
                }
            }
        }
    );
}