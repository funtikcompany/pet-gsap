
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('#burger-menu');
    const burgerMenuLine = document.querySelector('.burger-menu-line');
    const menu = document.querySelector('#menu');
    const menuFooter = document.querySelector('.menu-footer'); 
    const menuItems = document.querySelectorAll('.menu-list-item');
    const menuRightSide = document.querySelector('.menu-right-side');
    let header = document.querySelector('#header'),
    headerH = header.offsetHeight;
    let scrollOffsetAfterLoad = window.pageYOffset || document.documentElement.scrollTop;
    let timeOpen=null;

    const toggleMenu = () => {
        const isOpen = menu.classList.contains('open');
        // document.querySelector('.burger-menu-line').classList.toggle('active');
        document.querySelector('body').classList.toggle('no-scroll');

        if (!isOpen) {
            
            menu.classList.add('open');
            burger.classList.add('active');
            burgerMenuLine.classList.add('active');
            clearTimeout(timeOpen)
            timeOpen=setTimeout(()=>{
                menuItems.forEach((item, index) => {
                    const delay = index * 0.2; 
                    item.style.transitionDelay = `${delay}s`;
                    item.classList.add('animate-list');
                });
    
                const footerDelay = menuItems.length * 0.2;
                setTimeout(() => {
                    menuFooter.style.transitionDelay = `${0.2}s`; 
                    menuFooter.classList.add('animate-footer');
                }, footerDelay * 1000);
            },500)
        } else {
           
            // Видаляємо клас 'animate-footer' з footer спочатку
            menuFooter.classList.remove('animate-footer');
            menuFooter.style.transitionDelay = `${0}s`; 

            // Видаляємо клас 'animate-list' з кожного елемента з затримкою у зворотному порядку
            menuItems.forEach((item, index) => {
                const delay = (menuItems.length - index - 1) * 0.3;
                item.style.transitionDelay = `${delay}s`;
                item.classList.remove('animate-list');
            });

            // Після завершення анімації зникнення, видаляємо клас 'open' та 'active'
            const totalHideDelay = menuItems.length * 0.3 + 0.5; 
            setTimeout(() => {
                menu.classList.remove('open');
                burgerMenuLine.classList.remove('active');
                burger.classList.remove('active');
            }, totalHideDelay * 1000);
        }
    };

    burger.addEventListener('click', toggleMenu);

    document.addEventListener('click', (event) => {
        if (!menuRightSide.contains(event.target) && !burger.contains(event.target) && menu.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Закриття меню при натисканні клавіші Esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu.classList.contains('open')) {
            toggleMenu();
        }
    });

    const  checkScroll=(scrollOffset) =>{
		if (scrollOffset >= 40) {
			header.classList.add("scroll");
		} else {
			header.classList.remove("scroll");
		}
	}
    checkScroll(scrollOffsetAfterLoad)

    document.querySelector(".scroll-to-footer").addEventListener("click", function () {
        const footer = document.querySelector("footer");
        footer.scrollIntoView({ behavior: "smooth" });
      });


    window.addEventListener("scroll", function () {
        let scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
        checkScroll(scrollOffset);
    });

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".section:not(:last-child)", {
      yPercent: -100, 
      ease: "none",
      stagger: 0.5,
      scrollTrigger: {
        trigger: "#main-wrapper",
        start:`top top`,
         end: () => "+=" + (document.querySelector("#main-wrapper").offsetHeight),
        scrub: true,
        pin: true,
        // markers: true
      }
    });
    
    
    gsap.set(".section", {zIndex: (i, target, targets) => targets.length - i});

    function make_mask() {
        [].forEach.call(document.querySelectorAll('.tel'), function(input) {
            var keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                var pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                var matrix = "+38(___)-___-__-__",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");
    
                // Перевіряємо та додаємо '0' після '38' якщо його там немає
                if (val.startsWith("38") && val.length >= 3 && val[2] !== '0') {
                    val = val.slice(0, 2) + '0' + val.slice(2);
                }
    
                // Генерація нового значення з урахуванням матриці та введених цифр
                var new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
    
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i);
                }
    
                // Видалення зайвих символів, якщо номер не відповідає формату
                if (new_value.length > matrix.length) {
                    new_value = new_value.slice(0, matrix.length);
                }
    
                // Перевірки валідності введеного номера
                var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function(a) {
                        return "\\d{1," + a.length + "}";
                    }).replace(/[+()\-]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
    
                // Перевірка відповідності регулярному виразу та коректність вводу
                if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
                    this.value = new_value;
                }
    
                // Видаляємо значення, якщо воно не валідне під час втрати фокусу
                if (event.type == "blur" && this.value.length < 5) {
                    this.value = "";
                }
            }
    
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false);
        });
    }
    make_mask()
});