import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  //Modificando el Nombre y Apellido
  let name = variables.name || "'Nombre'";
  let lastName = variables.lastName || "'Apellido'";

  // Posicion de la Social Media
  document
    .querySelector(".picker[for='socialMediaPosition']")
    .addEventListener("change", function(e) {
      const socialMediaPosition = this.value; // Obtiene el valor seleccionado
      const socialMediaIcons = document.querySelector(".widget ul"); // Selecciona el elemento <ul>

      // Elimina la clase existente y agrega la nueva clase basada en la selección del usuario
      socialMediaIcons.classList.remove("position-left", "position-right");
      socialMediaIcons.classList.add(socialMediaPosition);
    });

  // variable para obtener url de Twitter
  let twitterURL = variables.twitter || "https://twitter.com/4geeksacademy";

  // variable para obtener url de Github
  let githubURL = variables.github || "https://github.com/4geeksacademy";

  // variable para obtener url de Linkedin
  let linkedinURL =
    variables.linkedin || "https://linkedin.com/school/4geeksacademy";

  // variable para obtener url de Instagram
  let instagramURL =
    variables.instagram || "https://instagram.com/4geeksacademy";

  // Seleccionar el Rol
  document
    .querySelector(".picker[for='role']")
    .addEventListener("change", function() {
      const selectedRole = this.value; //obtener el valor del elemento select
      const h2Element = document.querySelector(".widget h2");
      h2Element.textContent = selectedRole; // Actualiza el contenido de h2 con el rol seleccionado
    });

  //Ciudad y Pais
  // Seleccionar el City y el Country
  document
    .querySelectorAll(".picker[for='city'], .picker[for='country']")
    .forEach(function(elm) {
      elm.addEventListener("change", function(e) {
        const selectedCity = document.querySelector(".picker[for='city']")
          .value; // Obtener la ciudad seleccionada
        const selectedCountry = document.querySelector(".picker[for='country']")
          .value; // Obtener el país seleccionado

        // Actualizar el contenido del elemento <h3> correspondiente al City y Country
        document.querySelector(
          ".widget h3"
        ).textContent = `${selectedCity}, ${selectedCountry}`;
      });
    });

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${name} ${lastName}</h1>
          <h2>Web Developer</h2>
          <h3>Miami, USA</h3>
          <ul class="position-right">
            <li><a href="${twitterURL}"><i class="fab fa-twitter"></i></a></li>
            <li><a href="${githubURL}"><i class="fab fa-github"></i></a></li>
            <li><a href="${linkedinURL}"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="${instagramURL}"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
