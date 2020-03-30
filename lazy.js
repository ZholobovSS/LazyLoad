document.addEventListener('DOMContentLoaded', function() {
	
	class LazyElements {

		constructor(selector) {
			this.$els = Array.from(document.querySelectorAll(selector));
		}

		inView(element) {

			let elementTop = element.getBoundingClientRect().top;
			let elementBottom = element.getBoundingClientRect().bottom;
			let screenHeight = document.documentElement.clientHeight;

			if ( (elementTop > 0 && elementTop < screenHeight) ||
				 (elementBottom > 0 && elementBottom < screenHeight) ) {
				return true;
			} else {
				return false;
			}

		}

	}


	class LazyImgs extends LazyElements {

		constructor(selector) {

			super(selector);
			this.dataLazy = 'lazyload';
			this.lazyLoadSlider = 'lazyloadslider';
			this.initLazySlider = false;

		}

		checkInView() {
			this.$els.forEach( element => {
				if (this.inView(element) && element.dataset.hasOwnProperty(this.dataLazy); && element.dataset[this.dataLazy].length) {

					this.setSrc(element);

					if (element.dataset.hasOwnProperty(this.lazyLoadSlider) && !this.initLazySlider) {
						this.checkSlider();
						this.initLazySlider = true;
					}

				}				
			} );

		}

		checkSlider() {

			this.$els.forEach( element => {

				if ( element.dataset[this.dataLazy].length  && element.dataset.hasOwnProperty(this.lazyLoadSlider) ) {
					this.setSrc(element);
				}

			});


		}

		setSrc(element) {

			element.src = element.dataset[this.dataLazy];
			element.dataset[this.dataLazy] = "";

		}

	}

	const newLazyImgs = new LazyImgs('.lazyload');
	newLazyImgs.checkInView();
	

	document.addEventListener('scroll', function() {

		newLazyImgs.checkInView();

	});

});