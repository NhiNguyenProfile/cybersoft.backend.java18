$(document).ready(function () {
  // DÙNG GET ĐỂ LẤY ROLE TỪ DATABASE (TƯƠNG TỰ role.js)
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/roles",
    method: "GET",
  }).done(function (result) {
    $("#roleOptions").empty();
    $.each(result, function (index, value) {
      // THAY ĐỔI PHẦN CODE THÊM VÀO
      var option = `<option role-id=${value.id}>${value.name}</option>`;
      // Đưa lên localStorage
      localStorage.setItem(`${value.name}`, `${value.id}`);
      localStorage.setItem(`${value.id}`, `${value.name}`);
      $("#roleOptions").append(option);
    });
  });

  // ================================ ADD ================================
  $("#btn-save-user").click(function () {
    var fullname = document.getElementById("nameUser").value;
    var email = document.getElementById("example-email").value;
    var password = document.getElementById("passUser").value;
    var roleName = document.getElementById("roleOptions").value;
    var roleId = localStorage.getItem(`${roleName}`);

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: `http://localhost:8081/cybersoft.backend.java18/api/users`,
          data: { fullname, email, password, roleId },
        }).done((result) => {
          //   console.log(typeof result);

          if (result.isSuccess == true) {
            console.log("Update successfully!");
            Swal.fire("Saved!", "", "success");
          } else {
            console.log("delete failed!");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  });
  // ================================ SHOW ================================

  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/users",
    method: "GET",
  }).done(function (result) {
    console.log(result);
    $("#example-user tbody").empty(); // xóa dữ liệu

    $.each(result, function (index, value) {
      var roleName = localStorage.getItem(`${value.roleId}`);

      // Tách tên
      let fullnameSplit = `${value.fullname}`.split(" ");
      let arrLength = fullnameSplit.length;
      var lastName = fullnameSplit[0];
      var firstName = fullnameSplit[arrLength - 1];

      // Tách email
      let emailSplit = `${value.email}`.split("@");
      var username = "@" + emailSplit[0];

      console.log(arrLength);
      var row = `<tr>
        <td>${value.id}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${username}</td>
        <td>${roleName}</td>
        <td>
            <a href="#" class="btn btn-sm btn-primary btn-changeUser" user-id=${value.id}>Sửa</a>
            <a href="#" class="btn btn-sm btn-danger btn-deleteUser" user-id=${value.id} user-fullname=${value.fullname}>Xóa</a>
            <a href="#" class="btn btn-sm btn-info btn-viewUser" user-id=${value.id} user-fullname=${value.fullname} user-email=${value.email}>Xem</a>
        </td>
    </tr>`;
      $("#example-user tbody").append(row);
    });
  });

  // ================================ UPDATE ================================
  $("body").on("click", ".btn-changeUser", function () {
    const userId = $(this).attr("user-id");
    localStorage.setItem("userId", userId);
    window.location.href = "user-update.html";
  });

  $("body").on("click", "#updateUser", function () {
    var userId = localStorage.getItem("userId");
    var userEmail = document.getElementById("upUserEmail").value;
    var userPassword = document.getElementById("upPassUser").value;
    var userFullname = document.getElementById("upFullname").value;
    var userRoleId = localStorage.getItem(
      `${document.getElementById("roleOptions").value}`
    );
    var obj = {
      email: `${userEmail}`,
      password: `${userPassword}`,
      fullname: `${userFullname}`,
      roleId: Number(`${userRoleId}`),
      id: Number(`${userId}`),
    };

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        $.ajax({
          type: "PUT",
          url: `http://localhost:8081/cybersoft.backend.java18/api/users`,
          data: JSON.stringify(obj),
          contentType: "json;charset=utf-8",
        }).done((result) => {
          //   console.log(typeof result);

          if (result.isSuccess == true) {
            console.log("Update successfully!");
            Swal.fire("Saved!", "", "success");
          } else {
            console.log("delete failed!");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  });

  // ================================ DELETE ================================
  $("body").on("click", ".btn-deleteUser", function () {
    // alert('click button delete')
    const userFullname = $(this).attr("user-fullname");
    const userId = $(this).attr("user-id");
    const This = $(this);
    console.log(`Role id ${userId}`);
    // $(this).closest('tr').remove()
    //location.reload()

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `http://localhost:8081/cybersoft.backend.java18/api/users?id=${userId}`,
          method: "DELETE",
          dataType: "json",
        }).done((result) => {
          //   console.log(typeof result);

          if (result.isSuccess == true) {
            console.log("delete successfully!");
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            location.reload();
          } else {
            console.log("delete failed!");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe", "error");
      }
    });
  });
});
