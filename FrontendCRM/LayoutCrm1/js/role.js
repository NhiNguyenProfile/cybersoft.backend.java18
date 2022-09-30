$(document).ready(function () {
  // ================================ SHOW ================================
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/roles",
    method: "GET",
  }).done(function (result) {
    $("#example tbody").empty(); // xóa dữ liệu
    $.each(result, function (index, value) {
      let row = `<tr>
                <td>${value.id}</td>
                <td>${value.name}</td>
                <td>${value.description}</td>
                <td> 
                    <a href="#" class="btn btn-sm btn-primary btn-change" role-id =${value.id}>sửa</a>
                    <a href="#" class="btn btn-sm btn-danger btn-delete" role-id =${value.id} role-name=${value.name}>xoá</a>
                </td>
                </tr>`;
      $("#example tbody").append(row);
    });
  });

  // ================================ DELETE ================================
  $("body").on("click", ".btn-delete", function () {
    // alert('click button delete')
    const roleName = $(this).attr("role-name");
    const roleId = $(this).attr("role-id");
    const This = $(this);

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
          url: `http://localhost:8081/cybersoft.backend.java18/api/roles?id=${roleId}`,
          method: "DELETE",
          dataType: "json",
        }).done((result) => {
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

  // ================================ UPDATE ================================
  $("body").on("click", ".btn-change", function () {
    const roleId = $(this).attr("role-id");
    localStorage.setItem("roleid", roleId);
    window.location.href = "role-update.html";
  });

  $("body").on("click", "#updateRole", function () {
    let roleId = localStorage.getItem("roleid");
    let roleName = document.getElementById("roleName").value;
    let roleDescription = document.getElementById("roleDescription").value;
    let obj = {
      id: `${roleId}`,
      name: `${roleName}`,
      description: `${roleDescription}`,
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
          url: `http://localhost:8081/cybersoft.backend.java18/api/roles`,
          data: JSON.stringify(obj),
          contentType: "json;charset=utf-8",
        }).done((result) => {
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

  // ================================ ADD ================================
  $("#btn-save-role").click(function () {
    let role = document.getElementById("addRole").value;
    let description = document.getElementById("addRoleDescription").value;

    let obj = {
      role: `${role}`,
      description: `${description}`,
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
          type: "POST",
          url: `http://localhost:8081/cybersoft.backend.java18/api/roles`,
          data: { role, description },
        }).done((result) => {
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
});
