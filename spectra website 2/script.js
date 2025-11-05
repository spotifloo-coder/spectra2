// =======================================================
// === GLOBALNE FUNKCIJE ZA SLIDER (Pozivaju se iz HTML-a) ===
// =======================================================

let slideIndex = 0;
let autoSlideInterval;
const intervalTime = 4000; // 4 sekunde

function showSlides(n) {
    const slides = document.querySelectorAll('.mySlides');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;

    if (n === undefined) {
        slideIndex++;
    } else {
        slideIndex = n;
    }

    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    if (slideIndex < 1) {
        slideIndex = slides.length
    }

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active-dot"));

    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0) {
        dots[slideIndex - 1].classList.add("active-dot"); 
    }
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    setTimeout(() => {
        autoSlideInterval = setInterval(showSlides, intervalTime);
    }, 100); 
}

window.plusSlides = function(n) {
    resetAutoSlide();
    showSlides(slideIndex + n);
};

window.currentSlide = function(n) {
    resetAutoSlide();
    showSlides(n);
};


// =======================================================
// === GLAVNA LOGIKA (Pokreće se kada je DOM spreman) ===
// =======================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === POMOĆNA FUNKCIJA ZA PROVERU MOBILNOG ===
    const isMobileView = () => window.innerWidth <= 768;
    
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const dropdowns = document.querySelectorAll('.dropdown'); 

    // === FUNKCIJA ZA ZATVARANJE MENIJA ===
    const closeBurgerMenu = () => {
        if (nav && burger && isMobileView()) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            // Zatvori sve dropdownove
            dropdowns.forEach(d => {
                 d.classList.remove('open');
                 const content = d.querySelector('.dropdown-content');
                 if (content) {
                     content.style.maxHeight = "0";
                     setTimeout(() => { content.style.display = 'none'; }, 500);
                 }
            });
        }
    };


    // =======================================================
    // 1. Logika za Burger Meni i Dropdown na Mobilnom
    // =======================================================

    if (burger && nav) {
        
        // === FIKSIRANA FUNKCIJA ZA KLIZANJE DROPDOWNA ===
        const toggleDropdown = (dropdownElement) => {
            const content = dropdownElement.querySelector('.dropdown-content');
            if (!content) return;

            // Zatvori sve ostale (osim trenutnog)
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdownElement && otherDropdown.classList.contains('open')) {
                    otherDropdown.classList.remove('open');
                    const otherContent = otherDropdown.querySelector('.dropdown-content');
                    if (otherContent) {
                        otherContent.style.maxHeight = "0";
                        setTimeout(() => { otherContent.style.display = 'none'; }, 500); 
                    }
                }
            });

            // Prebaci klasu 'open' na trenutnom elementu
            dropdownElement.classList.toggle('open'); 

            if (dropdownElement.classList.contains('open')) {
                // OTKRIVANJE
                content.style.display = 'block'; 
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // ZATVARANJE
                content.style.maxHeight = "0";
                setTimeout(() => {
                   content.style.display = 'none';
                }, 500); 
            }
        };

        // Događaj za otvaranje/zatvaranje glavnog burger menija
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            
            // Ako se meni zatvara (nema klasu nav-active), zatvori dropdownove
            if (!nav.classList.contains('nav-active')) {
                 closeBurgerMenu();
            }
        });
        
        // Logika za Dropdown (radi samo na mobilnom)
        dropdowns.forEach(dropdown => {
            const dropBtn = dropdown.querySelector('.dropbtn');
            
            if (dropBtn) {
                dropBtn.addEventListener('click', (e) => {
                    if (isMobileView()) {
                        e.preventDefault(); 
                        
                        // OVO JE KLJUČNO! Zaustavljamo propagaciju da ne bi aktivirali logiku koja zatvara glavni meni
                        e.stopPropagation(); 
                        
                        toggleDropdown(dropdown);
                    }
                });
            }
            
            // Zatvaranje celog menija nakon klika na link UNUTAR dropdowna
            const allDropdownLinks = dropdown.querySelectorAll('.dropdown-content a');
            allDropdownLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                     // Kada klikne na link unutar dropdowna, zatvori ceo meni i idi na link
                     closeBurgerMenu();
                     // NE zaustavljamo propagaciju ovde, puštamo da klik ode na href!
                });
            });
        });
        
        // ** FIKSIRANA LOGIKA ZA ZATVARANJE MENIJA NAKON KLIKA NA OBIČAN LINK **
        // Prolazimo kroz SVE LI elemente
        navLinks.forEach(li => {
            // Selektujemo samo LI elemente KOJI NEMAJU klasu 'dropdown'
            if (!li.classList.contains('dropdown')) {
                const link = li.querySelector('a'); 
                
                if (link) {
                    link.addEventListener('click', (e) => {
                        // Kada klikne na običan link (Naslovna, O nama, itd.), zatvori ceo meni i idi na link
                        closeBurgerMenu();
                    });
                }
            }
        });
        
        // Dodatni fiks: Zatvaranje celog menija ako kliknete van njega (a otvoren je)
        window.addEventListener('click', (e) => {
            // Proveri da li je kliknuto van nav i van burger dugmeta
            if (isMobileView() && nav.classList.contains('nav-active') && 
                !nav.contains(e.target) && 
                !burger.contains(e.target) &&
                !document.querySelector('.navbar').contains(e.target)) {
                 closeBurgerMenu();
            }
        });
    }

    // =======================================================
    // 2. Inicijalizacija Slidera
    // =======================================================
    const slides = document.querySelectorAll('.mySlides');
    if (slides.length > 0) {
        showSlides(1); 
        autoSlideInterval = setInterval(showSlides, intervalTime); 
    }
    
    // =======================================================
    // 3. Logika za Modal 'Pitaj Eksperta' i WhatsApp Slanje
    // =======================================================
    
    const modal = document.getElementById("expert-modal");
    // Pretpostavljeno dugme iz navigacije
    const btn = document.querySelector('.expert-link'); 
    
    const closeBtn = document.getElementsByClassName("close-btn")[1]; 
    
    // Dohvatamo nova polja i dugme za WhatsApp
    const whatsappBtn = document.getElementById("posalji-whatsapp-btn");
    const inputIme = document.getElementById("ime-prezime");
    const inputEmail = document.getElementById("email-adresa");
    const inputPitanje = document.getElementById("pitanje");
    const formMessage = document.getElementById("form-message"); // Zadržavamo za poruke

    // Vaš WhatsApp broj (bez znakova +, - ili razmaka)
    const whatsappNumber = '381692200122'; 

    function closeModal() {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; 
            if (formMessage) formMessage.textContent = ''; 
            // Resetujemo polja
            inputIme.value = '';
            inputEmail.value = '';
            inputPitanje.value = '';
        }
    }

    function sendToWhatsApp() {
        if (inputPitanje.value.trim() === '') {
            formMessage.textContent = 'Molimo Vas da upišete Vaše pitanje.';
            formMessage.style.color = 'red';
            return;
        }

        formMessage.textContent = 'Preusmeravam na WhatsApp...';
        formMessage.style.color = '#007bff'; 

        const ime = inputIme.value.trim();
        const email = inputEmail.value.trim();
        const pitanje = inputPitanje.value.trim();

        let poruka = `*Pitanje za Eksperta Spectra Vision:*\n\n`;

        if (ime) {
            poruka += `Ime: ${ime}\n`;
        }
        if (email) {
            poruka += `Email: ${email}\n`;
        }
        
        poruka += `Pitanje: ${pitanje}`;

        // URL ENKODIRANJE je ključno za slanje teksta u URL-u
        const encodedMessage = encodeURIComponent(poruka);
        
        const whatsappURL = `https://wa.me/${+381692200122}?text=${encodedMessage}`;

        // Otvaranje WhatsApp linka u novom tabu
        window.open(whatsappURL, '_blank');
        
        // Zatvori modal nakon slanja (sa malim zakašnjenjem)
        setTimeout(() => {
            closeModal();
            formMessage.textContent = ''; // Obriši poruku nakon zatvaranja
        }, 1000); 
    }
    
    // ** DOGAĐAJI **
    
    // 1. Dugme za otvaranje modala
    if (btn && modal) {
        btn.onclick = function(e) {
            e.preventDefault(); 
            modal.style.display = "block";
            document.body.style.overflow = 'hidden'; 
        }
    }

    // 2. Dugme za zatvaranje modala (X)
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // 3. Zatvaranje klika van modala
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // 4. Klik na dugme "Pošalji Pitanje preko WhatsApp-a"
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', sendToWhatsApp);
    }

    // =======================================================
    // 4. Automatsko ažuriranje godine
    // =======================================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // =======================================================
    // 5. Logika za Hijerarhijski FAQ (Akordeon)
    // =======================================================

    const faqCategories = document.querySelectorAll('.faq-category');

    faqCategories.forEach(category => {
        const categoryHeader = category.querySelector('.category-header');
        const categoryContent = category.querySelector('.category-content');
        const subcategories = category.querySelectorAll('.faq-subcategory');

        // FUNKCIJA ZA KONTROLU GLAVNE KATEGORIJE
        categoryHeader.addEventListener('click', () => {
            const isActive = category.classList.contains('active');

            // 1. ZATVARANJE/OTVARANJE KATEGORIJE I Njenog Sadržaja
            if (isActive) {
                // ZATVARANJE GLAVNE KATEGORIJE
                category.classList.remove('active');
                categoryContent.style.maxHeight = '0';
            } else {
                // OTVARANJE GLAVNE KATEGORIJE
                category.classList.add('active');
                
                // Postavljanje maxHeight na osnovu ScrollHeight-a sadržaja
                // Moramo sačekati da se eventualno otvoreni odgovori zatvore, a potom otvoriti sadržaj
                categoryContent.style.maxHeight = categoryContent.scrollHeight + "px";

                // Dodatni Fiks: Proveri da li se otvara prvi odgovor unutar kategorije.
                if (subcategories.length > 0) {
                     // Otvori PRVU potkategoriju u novootvorenoj grupi
                     const firstSubcategory = subcategories[0];
                     const firstAnswer = firstSubcategory.querySelector('.faq-answer');
                     
                     if (firstAnswer && !firstSubcategory.classList.contains('active')) {
                         firstSubcategory.classList.add('active');
                         // Računamo visinu odgovora + padding (koji je 20px + 15px = 35px u CSS-u)
                         firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 35 + "px";
                         // Ažuriramo visinu glavne kategorije da obuhvati i otvoreni odgovor
                         categoryContent.style.maxHeight = categoryContent.scrollHeight + firstAnswer.scrollHeight + 35 + "px"; 
                     }
                }
            }

            // OBAVEZNO: Zatvori sve ostale GLAVNE kategorije
            faqCategories.forEach(otherCategory => {
                if (otherCategory !== category) {
                    otherCategory.classList.remove('active');
                    otherCategory.querySelector('.category-content').style.maxHeight = '0';
                    
                    // Zatvori i sve potkategorije unutar zatvorene glavne kategorije
                    otherCategory.querySelectorAll('.faq-subcategory').forEach(sub => {
                        sub.classList.remove('active');
                        sub.querySelector('.faq-answer').style.maxHeight = '0';
                    });
                }
            });
        });

        // FUNKCIJA ZA KONTROLU POTKATEGORIJE (PITANJA)
        subcategories.forEach(subcategory => {
            const subcategoryHeader = subcategory.querySelector('.subcategory-header');
            const subcategoryAnswer = subcategory.querySelector('.faq-answer');

            subcategoryHeader.addEventListener('click', (e) => {
                e.stopPropagation(); // Sprečava da klik 'probije' i aktivira otvaranje/zatvaranje cele kategorije
                
                // 2. ZATVARANJE/OTVARANJE ODGOVORA
                const isSubActive = subcategory.classList.contains('active');
                let answerHeightChange = 0; // Promena visine koju treba preneti na roditeljsku kategoriju

                if (isSubActive) {
                    // ZATVARANJE ODGOVORA
                    subcategory.classList.remove('active');
                    subcategoryAnswer.style.maxHeight = '0';
                    answerHeightChange = -(subcategoryAnswer.scrollHeight + 35); // Oduzimamo visinu + padding
                } else {
                    // OTVARANJE ODGOVORA
                    
                    // Pre zatvaranja, zatvaramo sve ostale ODGOVORE unutar ISTE KATEGORIJE
                    subcategories.forEach(otherSubcategory => {
                        if (otherSubcategory !== subcategory && otherSubcategory.classList.contains('active')) {
                            otherSubcategory.classList.remove('active');
                            const otherAnswer = otherSubcategory.querySelector('.faq-answer');
                            // Smanjujemo visinu glavne kategorije za visinu odgovora koji se zatvara
                            categoryContent.style.maxHeight = (categoryContent.scrollHeight - (otherAnswer.scrollHeight + 35)) + "px";
                            otherAnswer.style.maxHeight = '0';
                        }
                    });
                    
                    // OTVARANJE TRENUTNOG ODGOVORA
                    subcategory.classList.add('active');
                    subcategoryAnswer.style.maxHeight = subcategoryAnswer.scrollHeight + 35 + "px"; // Dodajemo padding (35px)
                    answerHeightChange = subcategoryAnswer.scrollHeight + 35; // Dodajemo visinu + padding
                }
                
                // 3. AŽURIRANJE VISINE GLAVNE KATEGORIJE (KLJUČ ZA SLIDE EFEKAT)
                if (category.classList.contains('active')) {
                    // Samo ako je glavna kategorija već aktivna, ažuriramo njenu visinu
                    const currentMaxHeight = parseInt(categoryContent.style.maxHeight);
                    categoryContent.style.maxHeight = (currentMaxHeight + answerHeightChange) + "px";
                }
            });
        });
    });

    // =======================================================
    // 5. Logika za Optometrijski Rečnik Modal
    // =======================================================
    
    const optometryModal = document.getElementById("optometry-modal");
    const openOptometryBtn = document.getElementById("open-optometry-modal");
    const closeOptometryBtn = optometryModal ? optometryModal.querySelector(".close-btn") : null;

    // Funkcija za otvaranje modala
    function openOptometryModal(e) {
        if (e) e.preventDefault();
        if (optometryModal) {
            optometryModal.style.display = "block";
            document.body.style.overflow = 'hidden'; 
            // Inicijalizacija akordeona unutar modala
            initModalFaq();
        }
    }

    // Funkcija za zatvaranje modala
    function closeOptometryModal() {
        if (optometryModal) {
            optometryModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    // Povezivanje dugmadi
    if (openOptometryBtn) {
        openOptometryBtn.addEventListener('click', openOptometryModal);
    }
    if (closeOptometryBtn) {
        closeOptometryBtn.addEventListener('click', closeOptometryModal);
    }

    // Zatvaranje modala klikom van njega
    window.addEventListener('click', function(event) {
        if (event.target === optometryModal) {
            closeOptometryModal();
        }
    });

    // =======================================================
    // 6. Prilagođena Logika za FAQ/Akordeon Unutar Modala
    //    (Ovo obezbeđuje da Pitanja/Odgovori klize unutar Modala)
    // =======================================================
    
    function initModalFaq() {
        // Selektujemo samo FAQ elemente UNUTAR modala
        const modalFaqCategories = optometryModal.querySelectorAll('.faq-category');
        
        modalFaqCategories.forEach(category => {
            const subcategories = category.querySelectorAll('.faq-subcategory');

            // Dodavanje event listenera za svaku potkategoriju (pitanje)
            subcategories.forEach(subcategory => {
                const subcategoryHeader = subcategory.querySelector('.subcategory-header');
                const subcategoryAnswer = subcategory.querySelector('.faq-answer');

                // Uklanjamo prethodne slušatelje da izbegnemo dupliranje
                const clone = subcategoryHeader.cloneNode(true);
                subcategoryHeader.parentNode.replaceChild(clone, subcategoryHeader);
                
                clone.addEventListener('click', (e) => {
                    
                    const isSubActive = subcategory.classList.contains('active');
                    
                    // Zatvori sve ostale ODGOVORE unutar ISTOG RODITELJA (kategorije)
                    subcategories.forEach(otherSubcategory => {
                        if (otherSubcategory !== subcategory && otherSubcategory.classList.contains('active')) {
                            otherSubcategory.classList.remove('active');
                            otherSubcategory.querySelector('.faq-answer').style.maxHeight = '0';
                        }
                    });

                    // OTVARANJE/ZATVARANJE TRENUTNOG ODGOVORA
                    if (isSubActive) {
                        // ZATVARANJE
                        subcategory.classList.remove('active');
                        subcategoryAnswer.style.maxHeight = '0';
                    } else {
                        // OTVARANJE
                        subcategory.classList.add('active');
                        // Postavljanje maxHeight-a na osnovu scrollHeight + padding
                        // U ovom slučaju ne moramo da menjamo visinu roditeljske kategorije jer imamo fiksiranu visinu modala
                        subcategoryAnswer.style.maxHeight = subcategoryAnswer.scrollHeight + 35 + "px"; 
                    }
                });
            });
            
            // Postavljamo da su SVE GLAVNE KATEGORIJE OTVORENE unutar ovog modala za jednostavnost
            category.classList.add('active'); 
        });
    }

    // POKREĆEMO JEDNOM PRILIKOM UČITAVANJA DA BI SE I KLASIČAN FAQ INICIRAO
    // (Ovo bi trebalo da bude deo Vaše postojeće FAQ logike, ali ga dupliramo za sigurnost ako je potrebno)
    // initModalFaq();
});