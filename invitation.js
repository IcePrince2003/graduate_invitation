let customer = sessionStorage.getItem("customer");
let me;
if (!customer) window.location = "index.html";
else {
  customer = JSON.parse(customer);
}

if (customer["yearOfBirth"] >= 2003) {
  document.querySelector("#dear").innerText = " thân ";
  if (customer["yearOfBirth"] == 2003) {
    document.querySelector("#customer_name").innerHTML = "Bạn ";
    me = "mình";
  } else {
    document.querySelector("#customer_name").innerHTML = "Em ";
    me = "anh";
  }
} else {
  document.querySelector("#dear").innerText = " kính ";
  if (customer["gender"] == "male")
    document.querySelector("#customer_name").innerHTML = "Anh ";
  else document.querySelector("#customer_name").innerHTML = "Chị ";
  me = "em";
}

let mes = document.getElementsByClassName("me");
for (let i = 0; i < mes.length; i++) {
  mes[i].innerHTML = me;
}
function showModal(text)
{
  document.getElementById("text_result").innerText = text;
  var modal_result = new bootstrap.Modal(document.getElementById("confirmModal"));
  modal_result.show();
}
document.querySelector("#customer_name").innerHTML += customer["name"];

async function sendData(customer, attend) {
  const phone = document.querySelector("#phone").value;
  if (phone === "" && attend === "Yes") {
    alert("Số điện thoại bị thiếu");
    return;
  }

  const data = {
    name: customer.name,
    phone: phone,
    gender: customer.gender,
    yearOfBirth: customer.yearOfBirth,
    attend: attend,
  };

  const url = "https://script.google.com/macros/s/AKfycbyPCUUN_yJdqzOxeKZ71-Am6FIi_EUDrtVEb1fnTwitPL8PQnDPoIQfgt4UvIGrX1_m/exec?" + new URLSearchParams(data) + "&t=" + Date.now();

  try {
    const start = performance.now();
    const response = await fetch(url);
    const result = await response.text();
    console.log("Response time:", performance.now() - start, "ms");

    if (result.includes("Success")) {
      var text = "";
      if (attend == "Yes") {
        bootstrap.Modal.getInstance(document.getElementById("acceptModal")).hide();
        text = "Oke. Vậy hẹn " + (customer.yearOfBirth > 2003 ? "thằng em" : (customer.yearOfBirth == 2003 ? "bạn" : (gender == "male" ? "anh" : "chị"))) + " hôm đấy nhé.";
      }
      else {
        customer.phone = "NULL";
        bootstrap.Modal.getInstance(document.getElementById("denyModal")).hide();
        text = "Tiếc thế nhỉ."
        if (customer.gender == "male") text += " Thôi hẹn hôm nào rảnh anh em mình hẹn kèo nhá.";
      }
      showModal(text);
    } else {
      showModal("Lỗi không xác định:" + result);
    }
  } catch (err) {
    showModal("Lỗi kết nối tới server. Thử lại sau nhé!");
  }
}
document.getElementById("btn_accept").addEventListener("click", function () {
  sendData(customer, "Yes");
});

document.getElementById("btn_deny").addEventListener("click", function () {
  sendData(customer, "No");
});
