const selector = {
  RADIO_BUTTON: '[data-selling-plan-radio]',
  DATA_PRICE: 'data-selling-plan-price',
  SELLING_PLAN_ID: 'data-selling-plan-id',
  PRICE_ITEM: '.price-item.price-item--last',
  PRODUCT_SELLING_PLAN: 'product-selling-plan',
  RADIO_ACTIVE: 'radio--button__active',
  INPUT_SELLING_PLAN: 'input[name="selling_plan"]',
  RADIO_SUBSCRIBE: '.radio--button__subscribe'
}

if (!customElements.get(selector.PRODUCT_SELLING_PLAN)) {
  customElements.define(
    selector.PRODUCT_SELLING_PLAN,
    class ProductSellingPlan extends HTMLElement {
      constructor() {
        super();
        this.radioButtons = this.querySelectorAll(selector.RADIO_BUTTON)
        this.priceItem = document.querySelector(selector.PRICE_ITEM)
        this.inputSellingPlan = document.querySelector(selector.INPUT_SELLING_PLAN)
        this.radioSubscribe = this.querySelector(selector.RADIO_SUBSCRIBE)
        this.init()
      }

      // Update every varaint change
      // Changing sub ties into current system
      connectedCallback() {
        subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
          let { selling_plan_allocations, price } = event.data.variant;

          let subOptions = Array.from(this.radioButtons)
          subOptions.forEach((n) => {
            let isActive = n.classList.contains(selector.RADIO_ACTIVE)

            let radioPrice = n.getAttribute(selector.DATA_PRICE)
            let id = n.getAttribute(selector.SELLING_PLAN_ID)

            let discountPriceWidget = n.querySelector('.purchase__price')
            let priceWidget = n.querySelector('.normal__price')

            let currencySymbol = priceWidget.innerHTML[0]

            if (!id) {
              let formattedPrice = this.formatCurrency(price, currencySymbol)
              priceWidget.innerHTML = formattedPrice
              n.setAttribute(selector.DATA_PRICE, formattedPrice)
            } else {
              let radioSellingPlan = selling_plan_allocations.find((n) => n.selling_plan_id == id)

              if (!radioSellingPlan) {
                console.error("No selling plan found in allocations for subscription widget")
                return;
              }

              // let formattedPrice = Shopify.formatMoney(radioSellingPlan.compare_at_price, 'amount')
              let formattedDiscountPrice = this.formatCurrency(radioSellingPlan.price, currencySymbol)
              let formattedPrice = this.formatCurrency(radioSellingPlan.compare_at_price, currencySymbol)

              discountPriceWidget.innerHTML = formattedDiscountPrice
              priceWidget.innerHTML = formattedPrice

              n.setAttribute(selector.DATA_PRICE, formattedDiscountPrice)
            }

            if (isActive) {
              this.onClickRadio(n, true)
            }
          })
        });
      }

      formatCurrency(cents, symbol) {
        if (typeof cents == 'string') { cents = cents.replace('.', ''); }
        let precision = 2
        let thousands = ','
        let decimal = '.'

        if (isNaN(cents) || cents == null) { return 0; }

        cents = (cents / 100.0).toFixed(precision);

        var parts = cents.split('.'),
          dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
          cents = parts[1] ? (decimal + parts[1]) : '';

        return symbol + dollars + cents;
      }

      init() {
        if (this.radioSubscribe) this.onClickRadio(this.radioSubscribe)
        this.radioButtons.forEach(radio => radio.addEventListener('click', () => this.onClickRadio(radio)))
      }

      onClickRadio(radio, forceOverride) {
        if (radio && !radio.classList.value.includes(selector.RADIO_ACTIVE) || forceOverride) {
          const newPrice = radio.getAttribute(selector.DATA_PRICE)
          const sellingPlanID = radio.getAttribute(selector.SELLING_PLAN_ID)
          const url = new URL(window.location.href);
          const inputSellingPlan = document.querySelector(selector.INPUT_SELLING_PLAN)

          this.radioButtons.forEach(button => button.classList.remove(selector.RADIO_ACTIVE))
          radio.classList.add(selector.RADIO_ACTIVE)

          url.search = sellingPlanID ? `?selling_plan=${sellingPlanID}` : ''
          window.history.pushState({}, '', url.toString());


          if (inputSellingPlan) inputSellingPlan.setAttribute('value', sellingPlanID || "")
          if (this.priceItem) this.priceItem.textContent = newPrice
          this.dispatchEvent(new Event('change'), { bubbles: true })

          document.querySelectorAll('.price.price--large .price-item--last').forEach(function (element) {
            element.innerHTML = newPrice
          });
        }
      }
    }
  );
}