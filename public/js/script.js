(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// const myNavbar = document.getElementById('myNavbar');
// const navbarCollapse = document.getElementById('navbar-nav');

// // Jab menu open hona shuru ho
// navbarCollapse.addEventListener('show.bs.collapse', () => {
//     myNavbar.classList.add('bg-navbar-dark');
//     myNavbar.classList.remove('navbar'); // Default light class hatayein
// });

// // Jab menu close hona shuru ho
// navbarCollapse.addEventListener('hide.bs.collapse', () => {
//     myNavbar.classList.remove('bg-navbar-dark');
//     myNavbar.classList.add('navbar'); // Wapas light class lagayein
// });

