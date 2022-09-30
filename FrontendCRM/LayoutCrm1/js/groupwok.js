$(document).ready(function () {
  // ================================ SHOW ================================
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/jobs",
    method: "GET",
  }).done(function (result) {
    console.log(result);
    $("#example-job tbody").empty(); // xóa dữ liệu
    $.each(result, function (index, value) {
      let startDateClone = `${value.startDate}`;
      let endDateClone = `${value.endDate}`;
      let startDateFormat = new Date(startDateClone);
      let dd = String(startDateFormat.getDate()).padStart(2, "0");
      let mm = String(startDateFormat.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = startDateFormat.getFullYear();

      startDateFormat = dd + "/" + mm + "/" + yyyy;
      let endDateFormat = new Date(endDateClone);
      let dd = String(endDateFormat.getDate()).padStart(2, "0");
      let mm = String(endDateFormat.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = endDateFormat.getFullYear();

      endDateFormat = dd + "/" + mm + "/" + yyyy;

      let row = `<tr>
        <td>${value.id}</td>
        <td>${value.job}</td>
        <td>${startDateFormat}</td>
        <td>${endDateFormat}</td>
        <td>
            <a href="#" class="btn btn-sm btn-primary btn-change-job" job-id =${value.id}>Sửa</a>
            <a href="#" class="btn btn-sm btn-danger btn-deleteJob" job-id =${value.id} job-name=${value.job}>Xóa</a>
            <a href="#" class="btn btn-sm btn-info btn-viewGroupwork" job-id =${value.id}>Xem</a>
        </td>
    </tr>`;
      $("#example-job tbody").append(row);
    });
  });

  // ================================ ADD ================================
  $("#btn-save-job").click(function () {
    let job = document.getElementById("addNameJob").value;
    let startDateClone = document.getElementById("addStartDateJob").value;
    let endDateClone = document.getElementById("addEndDateJob").value;

    let startDateSplit = startDateClone.split("/");
    let endDateSplit = endDateClone.split("/");
    let startDate =
      startDateSplit[2] + "-" + startDateSplit[1] + "-" + startDateSplit[0];
    let endDate =
      endDateSplit[2] + "-" + endDateSplit[1] + "-" + endDateSplit[0];
    let date1 = new Date(
      startDateSplit[1] + "-" + startDateSplit[0] + "-" + startDateSplit[2]
    );
    let date2 = new Date(
      endDateSplit[1] + "-" + endDateSplit[0] + "-" + endDateSplit[2]
    );

    let flag = 0;
    if (date1 > date2) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date!",
        text: "Ngày bắt đầu và ngày kết thúc không hợp lệ!",
      });
      flag = 0;
    } else {
      flag = 1;
    }

    if (flag == 1) {
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
            url: `http://localhost:8081/cybersoft.backend.java18/api/jobs`,
            data: { job, startDate, endDate },
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
    }
  });

  // ================================ UPDATE ================================
  $("body").on("click", ".btn-change-job", function () {
    const jobId = $(this).attr("job-id");
    localStorage.setItem("jobId", jobId);
    window.location.href = "groupwork-update.html";
  });

  $("body").on("click", "#updateJob", function () {
    let id = localStorage.getItem("jobId");
    let job = document.getElementById("upNameJob").value;
    let startDateClone = document.getElementById("upStartDateJob").value;
    let endDateClone = document.getElementById("upEndDateJob").value;
    let startDateSplit = startDateClone.split("/");
    let endDateSplit = endDateClone.split("/");
    let startDate =
      startDateSplit[2] + "-" + startDateSplit[1] + "-" + startDateSplit[0];
    let endDate =
      endDateSplit[2] + "-" + endDateSplit[1] + "-" + endDateSplit[0];

    let date1 = new Date(
      startDateSplit[1] + "-" + startDateSplit[0] + "-" + startDateSplit[2]
    );
    let date2 = new Date(
      endDateSplit[1] + "-" + endDateSplit[0] + "-" + endDateSplit[2]
    );

    let flag = 0;
    if (date1 > date2) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date!",
        text: "Ngày bắt đầu và ngày kết thúc không hợp lệ!",
      });
      flag = 0;
    } else {
      flag = 1;
    }

    // let obj = {
    //   job: `${job}`,
    //   startDate: `${startDate}`,
    //   endDate: `${endDate}`,
    //   id: Number(`${jobId}`),
    // };

    // console.log(obj);
    if (flag == 1) {
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
            url: `http://localhost:8081/cybersoft.backend.java18/api/jobs?id=${id}&job=${job}&startDate=${startDate}&endDate=${endDate}`,
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
    }
  });

  // ================================ DELETE ================================
  $("body").on("click", ".btn-deleteJob", function () {
    // alert('click button delete')
    const jobId = $(this).attr("job-id");
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
          url: `http://localhost:8081/cybersoft.backend.java18/api/jobs?id=${jobId}`,
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
