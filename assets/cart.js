class CartRemoveButton extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('click', (event) => {
            event.preventDefault();

            // Find the cart item and get its price
            const cartItem = this.closest('.cart-item');
            let cartItemPrice = 0;
            if (cartItem) {
                const priceText = cartItem.querySelector('.cart-item__totals .price--end')?.textContent;
                cartItemPrice = parseInt(priceText.replace(/[^0-9.-]+/g, ""));
            }

            // Find the delivery message and get its price
            const totalMessageElement = document.querySelector('.cart-details-total__wrapper .cart-total-innerhtml');
            const deliveryMessageElements = document.querySelectorAll('.cart-details-section__delivery-message .price');
            let deliveryMessagePrice = 0;

            if (deliveryMessageElements.length > 0) {
                // Assuming all delivery messages have the same price
                const deliveryPriceText = deliveryMessageElements[0].textContent;
                deliveryMessagePrice = parseFloat(deliveryPriceText.replace(/[^0-9.-]+/g, ""));
            }

            // Subtract the cart item price from the delivery message price
            const priceDifference = deliveryMessagePrice - cartItemPrice;
            const formattedPriceDifference = `£${priceDifference.toFixed(2)}`;

            // Update all delivery message elements with the new price
            deliveryMessageElements.forEach(element => {
                element.textContent = formattedPriceDifference;
            });

            if (totalMessageElement) {
                totalMessageElement.textContent = formattedPriceDifference;
            }
            const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
            if (cartItems) {
                cartItems.updateQuantity(this?.dataset.index, 0);
            }
        });
    }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
    constructor() {
        super();
        this.lineItemStatusElement =
            document.getElementById('shopping-cart-line-item-status') ||
            document.getElementById('CartDrawer-LineItemStatus');

        const debouncedOnChange = debounce((event) => {
            this.onChange(event);
        }, ON_CHANGE_DEBOUNCE_TIMER);

        this.addEventListener('change', debouncedOnChange.bind(this));
    }

    cartUpdateUnsubscriber = undefined;

    connectedCallback() {
        this.cartUpdateUnsubscriber = subscribe(
            PUB_SUB_EVENTS.cartUpdate,
            (event) => {
                if (event.source === 'cart-items') {
                    return;
                }
                this.onCartUpdate();
            }
        );
    }

    disconnectedCallback() {
        if (this.cartUpdateUnsubscriber) {
            this.cartUpdateUnsubscriber();
        }
    }

    onChange(event) {
        this.updateQuantity(
            event.target?.dataset.index,
            event.target.value,
            document.activeElement.getAttribute('name'),
            event.target?.dataset.quantityVariantId
        );
    }

    onCartUpdate() {
        if (this.tagName === 'CART-DRAWER-ITEMS') {
            fetch(`${routes.cart_url}?section_id=cart-drawer`)
                .then((response) => response.text())
                .then((responseText) => {
                    const html = new DOMParser().parseFromString(
                        responseText,
                        'text/html'
                    );
                    const selectors = [
                        'cart-drawer-items',
                        '.cart-drawer__footer',
                    ];
                    for (const selector of selectors) {
                        const targetElement = document.querySelector(selector);
                        const sourceElement = html.querySelector(selector);
                        if (targetElement && sourceElement) {
                            targetElement.replaceWith(sourceElement);
                        }
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        } else {
            fetch(`${routes.cart_url}?section_id=main-cart-items`)
                .then((response) => response.text())
                .then((responseText) => {
                    const html = new DOMParser().parseFromString(
                        responseText,
                        'text/html'
                    );
                    const sourceQty = html.querySelector('cart-items');
                    this.innerHTML = sourceQty.innerHTML;
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }

    getSectionsToRender() {
        return [
            {
                id: 'main-cart-items',
                section: document.getElementById('main-cart-items')?.dataset.id,
                selector: '.js-contents',
            },
            {
                id: 'cart-icon-bubble',
                section: 'cart-icon-bubble',
                selector: '.shopify-section',
            },
            {
                id: 'cart-live-region-text',
                section: 'cart-live-region-text',
                selector: '.shopify-section',
            },
            {
                id: 'main-cart-footer',
                section:
                    document.getElementById('main-cart-footer')?.dataset.id,
                selector: '.js-contents',
            },
        ];
    }

    updateQuantity(line, quantity, name, variantId) {
        this.enableLoading(line);

        const body = JSON.stringify({
            line,
            quantity,
            sections: this.getSectionsToRender().map(
                (section) => section.section
            ),
            sections_url: window.location.pathname,
        });

        fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
            .then((response) => {
                return response.text();
            })
            .then((state) => {
                const parsedState = JSON.parse(state);
                const quantityElement =
                    document.getElementById(`Quantity-${line}`) ||
                    document.getElementById(`Drawer-quantity-${line}`);
                const items = document.querySelectorAll('.cart-item');

                if (parsedState.errors) {
                    quantityElement.value =
                        quantityElement.getAttribute('value');
                    this.updateLiveRegions(line, parsedState.errors);
                    return;
                }

                this.classList.toggle('is-empty', parsedState.item_count === 0);
                const cartDrawerWrapper = document.querySelector('cart-drawer');
                const cartFooter = document.getElementById('main-cart-footer');

                if (cartFooter)
                    cartFooter.classList.toggle(
                        'is-empty',
                        parsedState.item_count === 0
                    );
                if (cartDrawerWrapper)
                    cartDrawerWrapper.classList.toggle(
                        'is-empty',
                        parsedState.item_count === 0
                    );

                this.getSectionsToRender().forEach((section) => {
                    const elementToReplace =
                        document
                            .getElementById(section.id)
                            .querySelector(section.selector) ||
                        document.getElementById(section.id);
                    elementToReplace.innerHTML = this.getSectionInnerHTML(
                        parsedState.sections[section.section],
                        section.selector
                    );
                });
                const updatedValue = parsedState.items[line - 1]
                    ? parsedState.items[line - 1].quantity
                    : undefined;
                let message = '';
                if (
                    items.length === parsedState.items.length &&
                    updatedValue !== parseInt(quantityElement.value)
                ) {
                    if (typeof updatedValue === 'undefined') {
                        message = window.cartStrings.error;
                    } else {
                        message = window.cartStrings.quantityError.replace(
                            '[quantity]',
                            updatedValue
                        );
                    }
                }
                this.updateLiveRegions(line, message);

                const lineItem =
                    document.getElementById(`CartItem-${line}`) ||
                    document.getElementById(`CartDrawer-Item-${line}`);
                if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
                    cartDrawerWrapper
                        ? trapFocus(
                            cartDrawerWrapper,
                            lineItem.querySelector(`[name="${name}"]`)
                        )
                        : lineItem.querySelector(`[name="${name}"]`).focus();
                } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
                    trapFocus(
                        cartDrawerWrapper.querySelector('.drawer__inner-empty'),
                        cartDrawerWrapper.querySelector('a')
                    );
                } else if (
                    document.querySelector('.cart-item') &&
                    cartDrawerWrapper
                ) {
                    trapFocus(
                        cartDrawerWrapper,
                        document.querySelector('.cart-item__name')
                    );
                }

                publish(PUB_SUB_EVENTS.cartUpdate, {
                    source: 'cart-items',
                    cartData: parsedState,
                    variantId: variantId,
                });
            })
            .catch(() => {
                this.querySelectorAll('.loading-overlay').forEach((overlay) =>
                    overlay.classList.add('hidden')
                );
                const errors =
                    document.getElementById('cart-errors') ||
                    document.getElementById('CartDrawer-CartErrors');
                errors.textContent = window.cartStrings.error;
            })
            .finally(() => {
                this.disableLoading(line);
            });
    }

    updateLiveRegions(line, message) {
        const lineItemError =
            document.getElementById(`Line-item-error-${line}`) ||
            document.getElementById(`CartDrawer-LineItemError-${line}`);
        if (lineItemError)
            lineItemError.querySelector('.cart-item__error-text').innerHTML =
                message;

        this.lineItemStatusElement.setAttribute('aria-hidden', true);

        const cartStatus =
            document.getElementById('cart-live-region-text') ||
            document.getElementById('CartDrawer-LiveRegionText');
        cartStatus.setAttribute('aria-hidden', false);

        setTimeout(() => {
            cartStatus.setAttribute('aria-hidden', true);
        }, 1000);
    }

    getSectionInnerHTML(html, selector) {
        return new DOMParser()
            .parseFromString(html, 'text/html')
            .querySelector(selector).innerHTML;
    }

    enableLoading(line) {
        const mainCartItems =
            document.getElementById('main-cart-items') ||
            document.getElementById('CartDrawer-CartItems');
        mainCartItems.classList.add('cart__items--disabled');

        const cartItemElements = this.querySelectorAll(
            `#CartItem-${line} .loading-overlay`
        );
        const cartDrawerItemElements = this.querySelectorAll(
            `#CartDrawer-Item-${line} .loading-overlay`
        );

        [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) =>
            overlay.classList.remove('hidden')
        );

        document.activeElement.blur();
        this.lineItemStatusElement.setAttribute('aria-hidden', false);
    }

    disableLoading(line) {
        const mainCartItems =
            document.getElementById('main-cart-items') ||
            document.getElementById('CartDrawer-CartItems');
        mainCartItems.classList.remove('cart__items--disabled');

        const cartItemElements = this.querySelectorAll(
            `#CartItem-${line} .loading-overlay`
        );
        const cartDrawerItemElements = this.querySelectorAll(
            `#CartDrawer-Item-${line} .loading-overlay`
        );

        cartItemElements.forEach((overlay) => overlay.classList.add('hidden'));
        cartDrawerItemElements.forEach((overlay) =>
            overlay.classList.add('hidden')
        );
    }
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
    customElements.define(
        'cart-note',
        class CartNote extends HTMLElement {
            constructor() {
                super();

                this.addEventListener(
                    'change',
                    debounce((event) => {
                        const body = JSON.stringify({
                            note: event.target.value,
                        });
                        fetch(`${routes.cart_update_url}`, {
                            ...fetchConfig(),
                            ...{ body },
                        });
                    }, ON_CHANGE_DEBOUNCE_TIMER)
                );
            }
        }
    );
}
// -----------
// BSDevshop Custom code (non Dawn)
function showToastMessage(message, backgroundColor, fontSize, marginTop) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // top or bottom
        position: "center", // left, center or right
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
            background: backgroundColor,
            color: "white",
            borderRadius: "10rem",
            marginTop: marginTop,
            padding: "1rem 2rem" // Add padding to the entire notification
        },
        onClick: function () { } // Callback after click
    }).showToast();
    // Adding a short delay to ensure the Toastify element is fully rendered
    setTimeout(() => {
        const toastElement = document.querySelector(".toastify");
        if (toastElement) {
            toastElement.style.fontSize = fontSize;
            const closeButton = toastElement.querySelector(".toast-close");
            if (closeButton) {
                closeButton.style.fontSize = fontSize;
            }
        }
    }, 100); // Short delay to ensure the element is rendered
}
function addDiscountCodeToCart(code) {
    const fontSize = window.innerWidth < 834 ? "1.6rem" : "2rem";
    const marginTop = window.innerWidth < 834 ? "2.3rem" : "3.8rem";
    // Show success message immediately
    showToastMessage(`${code} applied to cart`, "rgba(0,0,0, 0.7)", fontSize, marginTop);
    const { origin } = window.location;
    fetch(`${origin}/discount/${code}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        })
        .catch((error) => {
            console.error('Unable to apply cart discount');
            console.error('Error:', error);
            // Show failure message
            showToastMessage('Unable to apply discount', "rgba(255, 0, 0, 0.7)", fontSize, marginTop);
        });
}

async function _addVariantToCart(variantId, quantity = 1) {
    const formData = {
        'items': [{
            'id': variantId,
            'quantity': quantity
        }]
    };

    let cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
    if (this.cart) {
        formData.sections = cart
            .getSectionsToRender()
            .map((section) => section.id);

        formData['sections_url'] = window.location.pathname;
        cart.setActiveElement(document.activeElement);
    }

    return await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Product added to cart:', data);

            const cartUpdateEvent = new Event("cartUpdateEvent");
            document.dispatchEvent(cartUpdateEvent);
          
            window.__Theme._ctx.emit('cart-item-added');

            return data;
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
            throw error;
        });
}

window.CartUtils = {
    addDiscountCodeToCart,
    addToCart: _addVariantToCart,
}
