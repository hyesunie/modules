export default class Login {
  constructor() {
    this.subscribeEvent();
  }

  subscribeEvent() {
    const loginForm = document.querySelector(".login-container");
    const idInput = loginForm.querySelector("#id");
    const passwordInput = loginForm.querySelector("#password");

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = idInput.value;
      const password = passwordInput.value;

      idInput.value = "";
      passwordInput.value = "";
      this.postData("http://localhost:8080/login", {
        id,
        password,
      }).then((data) => {
        if (data.redirected) {
          window.location.href = data.url;
        }
      });
    });
  }

  async postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  }
}
