import './lazy.css'

class LazyElements {

	constructor ( selector ) {
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
		this.createWrapper();
		this.createObserverCallback();
		this.createObserver();
		this.initObserver();
	}

	createObserverCallback () {
		this.callbackObserver = (entries, observer) => {
			entries.forEach( entry => {
				if (entry.isIntersecting) {
					switch (entry.target.tagName) {
						case 'IMG':
							this.setSrc(entry.target);
							this.unObserve(entry.target);
							break;
						default:
							this.addClass(entry.target);
							this.unObserve(entry.target);
							break;
					}
				}
			});
		}
	}

	createWrapper ( ) {
		this.$els.forEach ( element => {
			switch (element.tagName) {
				case 'IMG':
					this.createTemplate( element );
					break;
				default:
					break;
			}
		});	
	}

	createTemplate ( element ) {
		let parent = element.parentElement;
		let wrapper = document.createElement('div');
		wrapper.className = 'relative';
		wrapper.append(element);
		wrapper.insertAdjacentHTML('beforeend', ` <div class="lazyload__loader">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>`);
		this.applyWrapper(wrapper, parent);
	}

	applyWrapper ( template, parent ) {
		parent.innerHTML = '';
		parent.append(template);
	}

	createObserver () {
		this.observer = new IntersectionObserver(this.callbackObserver, this.observerOptions);
	}

	initObserver () {
		this.$els.forEach( element => {
			this.observer.observe(element);
		});
	}

	addClass ( element ) {
		this.addClasses.forEach( className => {
			element.classList.add(className);
		});
	}

	unObserve ( element ) {
		this.observer.unobserve ( element );
	}

	setSrc ( element ) {
		element.src = element.dataset[this.dataAttr];
		element.addEventListener('load', () => {
			this.addClass(element);
		})
		element.removeAttribute('data-'+this.dataAttr);
	}

}

document.addEventListener( 'DOMContentLoaded', function () {
	const newLazyImgs = new LazyElements ('[data-lazyload]');
	newLazyImgs.watch ();
});