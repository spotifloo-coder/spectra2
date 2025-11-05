document.addEventListener('DOMContentLoaded', () => {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizResult = document.getElementById('quiz-result');
    const resultContent = document.getElementById('result-content');
    const restartButton = document.getElementById('restart-quiz');
    const options = document.querySelectorAll('.option-card');

    let currentQuestionIndex = 0;
    let userAnswers = {}; // Skladišti odgovore korisnika

    // Funkcija za prikaz pitanja
    function showQuestion(index) {
        quizQuestions.forEach((q, i) => {
            q.classList.remove('active-question');
            if (i === index) {
                q.classList.add('active-question');
            }
        });
    }

    // Funkcija za obradu odabira opcije
    options.forEach(option => {
        option.addEventListener('click', () => {
            const questionElement = option.closest('.quiz-question');
            const questionNumber = questionElement.dataset.question;
            const selectedValue = option.dataset.value;

            // Ukloni "selected" klasu sa svih opcija u trenutnom pitanju
            questionElement.querySelectorAll('.option-card').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Dodaj "selected" klasu samo odabranoj opciji
            option.classList.add('selected');

            userAnswers[`question${questionNumber}`] = selectedValue;

            // Prelazak na sledeće pitanje ili prikaz rezultata
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    displayResult();
                }
            }, 500); // Kratko kašnjenje za vizuelni efekat
        });
    });

    // Funkcija za prikaz rezultata
    function displayResult() {
        quizQuestions.forEach(q => q.style.display = 'none'); // Sakrij sva pitanja
        quizResult.style.display = 'block'; // Prikazi rezultat

        const faceShape = userAnswers.question1;
        const style = userAnswers.question2;
        let resultHTML = '';

        // Logika za preporuku na osnovu odgovora
        // Ovo možete proširiti sa više detalja i preporuka
        switch (`${faceShape}-${style}`) {
            case 'okruglo-klasicno':
                resultHTML = `
                    <h4>Za Vaše Okruglo lice i Klasičan stil:</h4>
                    <p>Preporučujemo Vam <strong>ugaone, pravougaone ili cat-eye ramove</strong>. Oni će vizuelno izdužiti Vaše lice i dodati mu definiciju, a klasičan dizajn će naglasiti eleganciju.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Pravougaoni i kvadratni ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Cat-eye oblici</li>
                        <li><i class="fas fa-check-circle"></i> Tamnije boje za sofisticiranost</li>
                    </ul>
                `;
                break;
            case 'okruglo-moderno':
                resultHTML = `
                    <h4>Za Vaše Okruglo lice i Moderan stil:</h4>
                    <p>Istražite trendi <strong>geometrijske ramove, oversized modele ili tanke metalne okvire</strong> koji će Vašem licu dati urbani šmek, istovremeno vizuelno izdužujući crte.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Geometrijski i asimetrični oblici</li>
                        <li><i class="fas fa-check-circle"></i> Oversized ili "bold" ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Transparentni ili pastelni tonovi</li>
                    </ul>
                `;
                break;
            case 'okruglo-sportski':
                resultHTML = `
                    <h4>Za Vaše Okruglo lice i Sportski stil:</h4>
                    <p>Idealni su <strong>pravougaoni sportski ramovi</strong>, često napravljeni od laganih i izdržljivih materijala. Oni će Vam pružiti stabilnost i jasan vid tokom aktivnosti, dok će vizuelno izbalansirati obline lica.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Pravougaoni sportski ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Ramovi od otpornih materijala</li>
                        <li><i class="fas fa-check-circle"></i> Avijatičarski oblici (ako su blago uglati)</li>
                    </ul>
                `;
                break;
            case 'okruglo-kreativno':
                resultHTML = `
                    <h4>Za Vaše Okruglo lice i Kreativan stil:</h4>
                    <p>Eksperimentišite sa <strong>jedinstvenim oblicima, dvobojnim ramovima ili neobičnim cat-eye varijantama</strong>. Vaše lice može izneti smela dizajnerska rešenja koja će istaknuti Vašu individualnost.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Unikatni, artistički oblici</li>
                        <li><i class="fas fa-check-circle"></i> Debeli, statement ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Ramovi sa zanimljivim detaljima i bojama</li>
                    </ul>
                `;
                break;

            case 'ovalno-klasicno':
                resultHTML = `
                    <h4>Za Vaše Ovalno lice i Klasičan stil:</h4>
                    <p>Ovalno lice je najuniverzalnije! Odlično Vam stoje <strong>bilo koji klasični ramovi</strong> – pravougaoni, okrugli, ili cat-eye. Birajte one koji su širi od najšireg dela Vašeg lica.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Gotovo svi oblici ramova</li>
                        <li><i class="fas fa-check-circle"></i> Klasični pravougaoni i okrugli</li>
                        <li><i class="fas fa-check-circle"></i> Cat-eye za suptilan šik</li>
                    </ul>
                `;
                break;
            case 'ovalno-moderno':
                resultHTML = `
                    <h4>Za Vaše Ovalno lice i Moderan stil:</h4>
                    <p>Iskoristite univerzalnost Vašeg lica da eksperimentišete sa najnovijim trendovima. <strong>Oversized, geometrijski, ili tanki, minimalistički ramovi</strong> će Vam pristajati savršeno.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Geometrijski oblici</li>
                        <li><i class="fas fa-check-circle"></i> Oversized modeli</li>
                        <li><i class="fas fa-check-circle"></i> Tanki metalni ramovi</li>
                    </ul>
                `;
                break;
            case 'ovalno-sportski':
                resultHTML = `
                    <h4>Za Vaše Ovalno lice i Sportski stil:</h4>
                    <p>Ovalno lice je idealno za <strong>sportski dizajn</strong>. Birajte lagane, izdržljive i udobne ramove koji čvrsto stoje na licu, kao što su poluokviri ili avijatičarski oblici.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Lagani i fleksibilni materijali</li>
                        <li><i class="fas fa-check-circle"></i> Poluokviri</li>
                        <li><i class="fas fa-check-circle"></i> Avijatičarski oblici</li>
                    </ul>
                `;
                break;
            case 'ovalno-kreativno':
                resultHTML = `
                    <h4>Za Vaše Ovalno lice i Kreativan stil:</h4>
                    <p>Sa ovalnim licem, možete biti veoma smeli. Birajte <strong>unikatne boje, neobične oblike ili ramove sa smelim detaljima</strong> da izrazite svoju kreativnost. Granica je samo Vaša mašta!</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Neobični i asimetrični oblici</li>
                        <li><i class="fas fa-check-circle"></i> Ramovi sa smelim šarama ili bojama</li>
                        <li><i class="fas fa-check-circle"></i> Vintage inspirisani modeli</li>
                    </ul>
                `;
                break;

            case 'kvadratno-klasicno':
                resultHTML = `
                    <h4>Za Vaše Kvadratno lice i Klasičan stil:</h4>
                    <p>Preporučujemo <strong>zaobljene ili ovalne ramove</strong>. Oni će omekšati oštre crte lica i dodati eleganciju, stvarajući izbalansiraniji izgled. Klasični ovalni i okrugli oblici su idealni.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Okrugli i ovalni ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Tanki metalni ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Blago zaobljeni pravougaoni ramovi</li>
                    </ul>
                `;
                break;
            case 'kvadratno-moderno':
                resultHTML = `
                    <h4>Za Vaše Kvadratno lice i Moderan stil:</h4>
                    <p>Izaberite <strong>oversized okrugle ramove, moderne avijatičarke ili delikatne cat-eye oblike</strong>. Ove opcije će omekšati Vaše crte lica i dodati notu modernog šarma.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Oversized okrugli ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Moderne avijatičarske naočare</li>
                        <li><i class="fas fa-check-circle"></i> Blago podignuti cat-eye oblici</li>
                    </ul>
                `;
                break;
            case 'kvadratno-sportski':
                resultHTML = `
                    <h4>Za Vaše Kvadratno lice i Sportski stil:</h4>
                    <p>Za sportske aktivnosti, birajte <strong>zaobljene, aerodinamične ramove</strong>. Oni će smanjiti oštrinu lica i pružiti udobnost i funkcionalnost. Preporučuju se i sportski avijatičarski modeli.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Zaobljeni sportski ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Avijatičarski oblici</li>
                        <li><i class="fas fa-check-circle"></i> Lagani materijali kao što je TR90</li>
                    </ul>
                `;
                break;
            case 'kvadratno-kreativno':
                resultHTML = `
                    <h4>Za Vaše Kvadratno lice i Kreativan stil:</h4>
                    <p>Iskoristite kontrast! Odvažite se na <strong>nepravilne, asimetrične ili umetničke oblike</strong> koji će omekšati Vaše crte lica i istovremeno istaći Vašu jedinstvenost. Ne plašite se boja!</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Neobični okrugli ili ovalni oblici</li>
                        <li><i class="fas fa-check-circle"></i> Ramovi sa gornjim delom naglašenim bojom ili oblikom</li>
                        <li><i class="fas fa-check-circle"></i> Kombinacija materijala i tekstura</li>
                    </ul>
                `;
                break;

            case 'srcoliko-klasicno':
                resultHTML = `
                    <h4>Za Vaše Srcoliko lice i Klasičan stil:</h4>
                    <p>Idealni su <strong>okrugli, ovalni ili ramovi u obliku D</strong>. Oni će omekšati širinu gornjeg dela lica i izbalansirati ga sa užom vilicom, dodajući suptilnu eleganciju.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Okrugli ili ovalni ramovi</li>
                        <li><i class="fas fa-check-circle"></i> Poluokviri</li>
                        <li><i class="fas fa-check-circle"></i> Svetlije boje ramova</li>
                    </ul>
                `;
                break;
            case 'srcoliko-moderno':
                resultHTML = `
                    <h4>Za Vaše Srcoliko lice i Moderan stil:</h4>
                    <p>Birajte <strong>blage cat-eye ramove, modernizovane avijatičarke ili tanje okvire</strong> koji su širi na dnu. Ovo će privući pažnju na donji deo lica i stvoriti balans, uz moderan izgled.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Moderni poluokviri</li>
                        <li><i class="fas fa-check-circle"></i> Ramovi širi pri dnu</li>
                        <li><i class="fas fa-check-circle"></i> Providni ili metalni ramovi</li>
                    </ul>
                `;
                break;
            case 'srcoliko-sportski':
                resultHTML = `
                    <h4>Za Vaše Srcoliko lice i Sportski stil:</h4>
                    <p>Fokusirajte se na <strong>lagane, izdržljive ramove sa blagim oblinama</strong>. Sportski poluokviri ili blago zaobljeni sportski ramovi će Vam pružiti udobnost i stabilnost bez dodavanja volumena gornjem delu lica.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Sportski poluokviri</li>
                        <li><i class="fas fa-check-circle"></i> Lagani i fleksibilni materijali</li>
                        <li><i class="fas fa-check-circle"></i> Blago zaobljeni oblici</li>
                    </ul>
                `;
                break;
            case 'srcoliko-kreativno':
                resultHTML = `
                    <h4>Za Vaše Srcoliko lice i Kreativan stil:</h4>
                    <p>Iskoristite **ramove sa naglašenim donjim delom, unikatne poluokvire ili svetle, transparentne materijale**. Ovo će omekšati gornji deo lica i dodati dozu umetničkog izraza vašem stilu.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Neobični poluokviri</li>
                        <li><i class="fas fa-check-circle"></i> Ramovi sa ukrasima na donjoj ivici</li>
                        <li><i class="fas fa-check-circle"></i> Transparentni ramovi u boji</li>
                    </ul>
                `;
                break;
            default:
                resultHTML = `
                    <h4>Nismo pronašli specifičnu preporuku, ali evo opštih saveta:</h4>
                    <p>Uvek je najbolje isprobati različite stilove! Povedite računa da ramovi izbalansiraju Vaše crte lica.</p>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Širina rama bi trebalo da odgovara širini Vašeg lica.</li>
                        <li><i class="fas fa-check-circle"></i> Ramovi bi trebalo da se nalaze iznad obrva.</li>
                        <li><i class="fas fa-check-circle"></i> Posetite nas za personalizovane konsultacije!</li>
                    </ul>
                `;
                break;
        }
        resultContent.innerHTML = resultHTML;
    }

    // Restartovanje kviza
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        userAnswers = {};
        quizQuestions.forEach(q => q.style.display = 'block'); // Ponovo prikaži pitanja
        quizResult.style.display = 'none'; // Sakrij rezultat
        options.forEach(opt => opt.classList.remove('selected')); // Ukloni selekciju
        showQuestion(currentQuestionIndex); // Pokaži prvo pitanje
    });

    // Prikazi prvo pitanje na početku
    showQuestion(currentQuestionIndex);
});