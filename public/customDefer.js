// start with darkmode default
halfmoon.toggleDarkMode();

function toggleDemo() {
  halfmoon.toggleDarkMode();
}

// document.addEventListener("alpine:init", () => {
//   Alpine.data("formData", () => ({
//     name: "",
//     email: "",
//   }));

//   Alpine.data("submitForm", () => {
//     const form = document.getElementById("my-form");
//     const data = new FormData(form);
//     console.log("test");

//     fetch("/convertpdf", {
//       method: "POST",
//       body: data,
//     }).then((response) => {
//       // handle response
//       console.log(response);
//     }).catch((error) => {
//       // handle error
//     });
//   });
// });
