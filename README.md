# Task


https://user-images.githubusercontent.com/75335966/204816882-1e3fc2ad-e09f-4ae3-ac2c-86294a382d29.mov




Šios užduoties tikslas įprasminti ir praplėsti jau turimas vue.js žinias praktiškai ir teoriškai.

Užduočiai atlikti naudokite vue.js 2 karkasą ir vue router 3 versiją.

Užduoties metu bus kuriama paprasta straipsnių sistema.

API imitavimui reikės naudoti json-server, kurio dokumentaciją galite rasti čia.

Json-server duomenų bazė turės susidėti iš šių lentelių:

· Autoriai

· Straipsniai

Autorių lentelė turės susidėti iš šių laukų:

· id

· name

· created_at

Straipsnių lentelė turės susidėti iš šių laukų:

· id

· title

· body

· author

· created_at

· updated_at

Sistema susidės iš dviejų puslapių. Pirmajame puslapyje bus pateiktas visas sąrašas straipsnių, kuria bus matoma tik ši informacija apie straipsnį:

· Pavadinimas

· Autorius

· Data kada sukurtas arba redaguotas straipsnis, jei redagavimo data bus naujesnė nei sukūrimo data

Straipsnių sąrašas turi būti puslapiuojamas. Skaičių, kas kiek bus puslapiuojami straipsniai pasirinkite savo nuožiūra. Puslapiavimas turi būti sudarytas kaip atskiras komponentas.

Jeigu dar nėra sukurta jokių straipsnių, turi būti rodomas informacinis pranešimas apie tai, kad dar nėra jokių straipsnių.

Straipsnių puslapyje turi veikti paieškos funkcionalumas leidžiantis atrasti tuos straipsnius ar su jais susiję informaciją, pagal pateiktą paieškos žodį. Paieška turi veikti kartu su puslapiavimu.

Antrajame puslapyje bus rodoma detalesnė informacija apie straipsnį. Šiame puslapyje bus rodoma ši informacija:

· Pavadinimas

· Autorius

· Straipsnio turinys

· Data kada sukurtas arba redaguotas straipsnis, jei redagavimo data bus naujesnė nei sukūrimo data

Jeigu patenkame į puslapyje, kuriame straipsnio nėra, turi būti rodomas informacinis pranešimas apie tai, kad straipsnis neegzistuoja.

Naujam straipsniui sukurti, turi būti naudojamas modalinis langas. Jame įvedama tik ši informacija:

· Pavadinimas

· Autorius

· Turinys

Visa kita informacija turi būti generuojama automatiškai.

Straipsnio sukūrimo forma turi būti validuojama. Negalima palikti nei vieno tuščio įvesties lauko. Jeigu, kuris nors laukas yra paliktas tuščias, vartotojas turi būti apie tai informuotas.

Vartotojas gali redaguoti kiekvieną straipsnį. Straipsnio redagavimo metu galima redaguoti tik šiuos laukus:

· Pavadinimas

· Turinys

Paredagavus straipsnį, turi pasikeisti updated_at lauko reikšmė duomenų bazėje.

Straipsnio redagavimo forma turi būti validuojama. Negalima palikti nei vieno tuščio įvesties lauko. Jeigu, kuris nors laukas yra paliktas tuščias, vartotojas turi būti apie tai informuotas.

Vartotojas gali ištrinti bet kurį straipsnį. Prieš trinant straipsnį, vartotojas turi būti paklaustas ar tikrai nori atlikti šį veiksmą.

Redagavimą ir ištrinimą turi būti galima atlikti iš bet kurio puslapio. Tiek iš bendro, tiek iš konkretaus straipsnio puslapio. Jeigu straipsnis ištrinamas būnant konkrečio straipsnio puslapyje, vartotojas turi būti grąžintas į visų straipsnių sąrašo puslapį.

Vartotojas apie kiekvieną atlikta veiksmą, ar pavyko jį atlikti ar ne, turi būti informuojamas sėkmės arba nesėkmės pranešimu. Pranešimas turi būti atvaizduojamas kaip atskiras komponentas. Pranešimas turi būti sukurtas kaip atskiras komponentas ir turi turėti savo mixin’ą, kuriame surašyti metodai jo valdymui.

Apsilankius puslapyje, kurio nėra, vartotojas turi būti nukreiptas į 404 puslapį.

Sukurti minimalų dizainą, kad visi sistemos elementai būtų tvarkingai išdėstyti. Rekomenduojama naudoti BULMA CSS karkasą, bet galite naudoti ir savo pasirinktą.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
