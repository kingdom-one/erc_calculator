export class DocumentHandler {
	constructor() {
		document
			.querySelectorAll('.arrow')
			.forEach((arrow) =>
				arrow.addEventListener('click', (ev) =>
					this.#toggleContentVisibility(ev),
				),
			);
		this.#handleFormReset();
	}
	#toggleContentVisibility({ target }) {
		target
			.closest('section')
			.querySelector('.section-content')
			.classList.toggle('hide');
	}
	#toggleActiveIcon(id) {
		const icons = document.querySelectorAll(`#${id} .section-header .icon`);
		icons[0].classList.add('hide');
		icons[1].classList.remove('hide');
	}
	#handleFormReset() {
		const reset = document
			.getElementById('resetBtn')
			.addEventListener('click', () => location.reload());
	}
	handleSectionSubmit(id) {
		const submit = document.querySelector(`#${id} .submit`);
		submit.addEventListener('click', (ev) => {
			ev.preventDefault();
			this.#toggleActiveIcon(id);
			this.#toggleContentVisibility(ev);
			submit.classList.add('confirmed');
			submit.innerHTML = `Confirmed!`;
		});
	}
	createAlert(type, message) {
		const alert = document.createElement('div');
		alert.classList.add('alert', `alert--${type}`);
		alert.innerText = message;
		return alert;
	}
}
