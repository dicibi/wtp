function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// start with darkmode default
function convertpdf() {
  return {
    form: {
      link: "",
    },
    result: "",
    loading: false,
    success: false,
    submitUrl() {
      this.loading = true;
      this.result = "please wait...";
      fetch("/convertpdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `link=${this.form.link}`,
      }).then((res) => res.text()).then( (data) => {
        // waiting 1s
        setTimeout(() => {
          try {
            this.result = JSON.parse(data).result;
            this.success = true;
          } catch {
            this.result = data;
          }
        }, 1000)
      }).catch((e) => {
        console.log(e);
        this.result = "Something went wrong.";
      }).finally(() => {
        this.loading = false;
      });
    },
  };
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
