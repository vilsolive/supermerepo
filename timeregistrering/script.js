const tabell = document.getElementById("registrerteTimer").getElementsByTagName("tbody")[0];
const skjema = document.getElementById("skjema");
const totalSum = document.getElementById("totalt");
const registrerteTimer = [];

let radId = 1;
let sumTimer = 0;

function sjekkTotalt(timer) {
  timer = Number(timer);

  if (!registrerteTimer.length){
    totalSum.innerHTML = '0';
  }

  const varsel = document.createElement("p");

  if ((sumTimer + timer) > 100)
  {
    varsel.innerHTML = "Dine registrerte timer (" + (sumTimer + timer) + ") overstiger tillatt totalsum av alle registrerte timer (100).";
    varsel.setAttribute("id", "varsel");
    varsel.setAttribute("class", "class='p-10'");
    document.getElementById("varselBoks").appendChild(varsel);
    sjekkTotalt(0);
  } else {
    varsel.style.visibility = "hidden";
  }

  sumTimer += timer;
}

function lagNyRad(timer, kommentar) {

  registrerteTimer.push({id: radId, timer: timer, kommentar: kommentar});

  const nyRad = tabell.insertRow();
  const nyDato = nyRad.insertCell(0);
  const nyTidCelle = nyRad.insertCell(1);
  const nyKommentarCelle = nyRad.insertCell(2);
  const nyKnappCelle = nyRad.insertCell(3);
  const nyKnapp = document.createElement("button");

  nyDato.innerHTML = new Date().toLocaleString();
  nyTidCelle.innerHTML = timer;
  nyKommentarCelle.innerHTML = kommentar;
  nyKnapp.innerHTML = "SLETT";
  nyKnapp.setAttribute("id", radId);
  nyKnapp.setAttribute("onClick", "slettRegistrering(this)");
  nyKnapp.setAttribute("class", "btn btn-info");
  nyKnappCelle.appendChild(nyKnapp);

  radId++;

  totalSum.innerHTML = sumTimer;

  document.getElementById("timer").value = "";
  document.getElementById("kommentar").value = "";
}

function slettRegistrering(knapp) {
  const temp = knapp.parentNode.parentNode;

  for (let i = 0; i < registrerteTimer.length; i++) {
    if (registrerteTimer[i].id === Number(knapp.id)) {
      sumTimer -= Number(registrerteTimer[i].timer);
      registrerteTimer.splice(i, 1);
    }
  }

  const slettVarsel = document.getElementById("varsel");
  if (sumTimer < 101 && slettVarsel) {
    slettVarsel.remove();
  }

  totalSum.innerHTML = sumTimer;
  temp.remove();
}

function nyTimeregistrering() {
  const timer = document.getElementById("timer").value;
  const kommentar = document.getElementById("kommentar").value;

  sjekkTotalt(timer);
  lagNyRad(timer, kommentar);
}
