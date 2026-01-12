var form = document.getElementById("form");
var btn = form.querySelector("button");
btn.addEventListener("click", function () {
    let error = "";
    const fieldName = {
        name: "Họ tên",
        gender: "Giới tính",
        yearOfBirth: "Ngày sinh"
    }
    const customer = {
        name: form.querySelector("#name").value,
        gender: form.querySelector("#gender").value,
        yearOfBirth: form.querySelector("#yearOfBirth").value
    }
    for (let key in customer)
    {
        if (!customer[key]||customer[key]=="none") {
            error += fieldName[key] + " bị thiếu thông tin\n";
        }
    }
    if (error != "") alert(error);
    else
    {
        sessionStorage.setItem("customer", JSON.stringify(customer));
        window.location = "invitation.html";
    }
})