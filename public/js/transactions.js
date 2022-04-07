const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

let data = {
  transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.getElementById("date-input").value;
    const value = parseFloat(document.getElementById("value-input").value);
    const type = document.querySelector('input[name="type-input"]:checked').value;
    const description = document.getElementById("description-input").value;

    data.transactions.unshift({
      date: date,
      value: value,
      type: type,
      description: description,
    });

    saveDate(data);
    e.target.reset();
    myModal.hide();

    getTransactionss();

    alert("Lançamento adicionado!");
  });

checkLogged();

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }
  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

getTransactionss();

function getTransactionss() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if (transactions.length) {
    transactions.forEach((item) => {
      let type = "Entrada";

      if (item.type === "2") {
        type = "Saida";
      }

      transactionsHtml +=
        `<tr>
          <th scope="row">${item.date}</th>
          <td>${type}</td>
          <td>${item.value}</td>
          <td>${item.description}</td>
        </tr>`;
    });
  }

  document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveDate(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
