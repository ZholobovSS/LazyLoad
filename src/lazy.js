import './lazy.css'

class LazyElements {
	constructor( selector ) {
		this.$els = [...document.querySelectorAll(selector)];
		this.dataAttr = 'lazyload';
		this.observerOptions = {
			threshold: 0.51
		}
		this.observer;
		this.callbackObserver
		this.addClasses = ['loaded'];
	}

	watch () {
		this.createObserverCallback();
		this.createObserver();
		this.initObserver();
	}

	createObserverCallback() {
		this.callbackObserver = (entries, observer) => {
			entries.forEach( entry => {
				if (entry.isIntersecting) {
					switch (entry.target.tagName) {
						case 'IMG':
							this.setSrc(entry.target)
							this.addClass(entry.target)
							break;
						default:
							this.addClass(entry.target)
							break;
					}
				}
			});
			
		}
	}

	createObserver () {
		this.observer = new IntersectionObserver(this.callbackObserver, this.observerOptions);
	}

	initObserver () {
		this.$els.forEach( element => {
			this.observer.observe(element);
		});
	}

	addClass (element) {
		this.addClasses.forEach( className => {
			element.classList.add(className);
		});
		this.unObserve(element);
	}

	unObserve(element) {
		this.observer.unobserve(element);
	}

	setSrc (element) {
		element.src = element.dataset[this.dataAttr];
		element.removeAttribute('data-'+this.dataAttr);
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const newLazyImgs = new LazyElements('[data-lazyload]');
	newLazyImgs.watch();
});