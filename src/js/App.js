import { DocumentHandler } from './DocumentHandler';
new (class FormHandler extends DocumentHandler {
	#state = { taxYear: null, employees: null, loan: null };
	constructor() {
		super();
		this.#handleTaxYear();
		this.#handleEmployees();
		this.#handleLoan();
		this.#handleEstimate();
	}
	#handleTaxYear() {
		const taxYearBtns = document.querySelectorAll('input[name="tax-year"]');
		taxYearBtns.forEach((btn) =>
			btn.addEventListener('change', ({ target }) => {
				this.#updateHeadline('tax-year', target.value);
				this.handleSectionSubmit('tax-year');
				this.#state.taxYear = Number(target.value);
			}),
		);
	}
	#updateHeadline(id, value) {
		const headline = document.querySelector(`#${id} .section-header__headline`);
		const initialValue = headline.innerText;
		headline.innerText = `${initialValue}: ${value}`;
		headline.style.color = 'var(--color-primary)';
	}
	#handleEmployees() {
		const input = document.getElementById('numEmployees');
		input.addEventListener('change', ({ target }) => {
			this.#state.employees = Number(input.value);
			this.#updateHeadline('employees', target.value);
			this.handleSectionSubmit('employees');
		});
	}
	#handleLoan() {
		const input = document.getElementById('loanAmount');
		input.addEventListener('change', ({ target }) => {
			this.#state.loan = Number(input.value);
			this.handleSectionSubmit('loan');
			this.#updateHeadline('loan', target.value);
		});
	}
	#handleEstimate() {
		const button = document.getElementById('estimateBtn');
		button.addEventListener('click', () => {
			const valid = this.#checkState();
			if (valid) {
				this.calcSavings();
			}
		});
	}
	#checkState() {
		const values = Object.values(this.#state);
		if (values.some((value) => value === null)) {
			const alert = this.createAlert(
				'error',
				'All fields must be set and confirmed!',
			);
			document
				.querySelector('.buttons')
				.insertAdjacentElement('afterbegin', alert);
			throw new Error('One or more values returned false!');
		} else return true;
	}
	#calcReturn() {
		this.#state.erc =
			(1e4 * this.#state.employees - this.#state.loan) *
			(2021 === this.#state.taxYear ? 0.7 : 0.5);
	}
	calcSavings() {
		this.#calcReturn();
		const savings = document.querySelector('.output .text-box span');
		let output;
		if (this.#state.erc <= 0)
			output = 'You are not eligible for the Employee Retention Credit.';
		else {
			const n = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(this.#state.erc);
			this.#state.erc = n;
			output =
				'2021' == this.#state.taxYear
					? `${this.#state.erc} per quarter!`
					: `${this.#state.erc}!`;
		}
		savings.innerHTML = output;
	}
})();
