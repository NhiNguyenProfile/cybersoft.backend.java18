$(document).ready(function () {
  // ================================ SHOW JOB ================================
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/jobs",
    method: "GET",
  }).done(function (result) {
    console.log(result);
    $("#jobOptions").empty(); // xóa dữ liệu
    $.each(result, function (index, value) {
      var row = `<option>${value.job}</option>`;
      $("#jobOptions").append(row);
      localStorage.setItem(`${value.job}`, `${value.id}`);
      localStorage.setItem(`${value.job}StartDate`, `${value.startDate}`);
      localStorage.setItem(`${value.job}EndDate`, `${value.endDate}`);
    });
  });

  // ================================ SHOW & GET USER ================================
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/users",
    method: "GET",
  }).done(function (result) {
    console.log(result);
    $("#userOptions").empty(); // xóa dữ liệu
    $.each(result, function (index, value) {
      var row = `<option>${value.fullname}</option>`;
      $("#userOptions").append(row);
      localStorage.setItem(`${value.fullname}`, `${value.id}`);
      localStorage.setItem(`User${value.id}`, `${value.fullname}`);
    });
  });

  // ================================ GET STASTUS ================================
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/status",
    method: "GET",
  }).done(function (result) {
    $.each(result, function (index, value) {
      localStorage.setItem(`Status${value.id}`, `${value.status}`);
    });
  });

  // ================================ GET JOB ================================
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/jobs",
    method: "GET",
  }).done(function (result) {
    $.each(result, function (index, value) {
      localStorage.setItem(`Job${value.id}`, `${value.job}`);
    });
  });

  // ================================ ADD ================================
  $("#btn-save-task").click(function () {
    var job = document.getElementById("jobOptions").value;
    var jobId = localStorage.getItem(job);
    var task = document.getElementById("addTask").value;
    var user = document.getElementById("userOptions").value;
    var userId = localStorage.getItem(user);
    var statusId;
    var startDateClone = document.getElementById("addStartDateTask").value;
    var endDateClone = document.getElementById("addEndDateTask").value;
    let startDateSplit = startDateClone.split("/");
    let endDateSplit = endDateClone.split("/");
    let dateData1 =
      startDateSplit[1] + "-" + startDateSplit[0] + "-" + startDateSplit[2];
    let dateData2 =
      endDateSplit[1] + "-" + endDateSplit[0] + "-" + endDateSplit[2];
    let startDate =
      startDateSplit[2] + "-" + startDateSplit[1] + "-" + startDateSplit[0];
    let endDate =
      endDateSplit[2] + "-" + endDateSplit[1] + "-" + endDateSplit[0];

    let jobDate1Clone = localStorage.getItem(`${job}StartDate`);
    let jobDate2Clone = localStorage.getItem(`${job}EndDate`);
    console.log(jobDate1Clone, jobDate2Clone);
    var dateJob1 = new Date(jobDate1Clone);
    var dd = String(dateJob1.getDate()).padStart(2, "0");
    var mm = String(dateJob1.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = dateJob1.getFullYear();

    dateJob1 = yyyy + "-" + mm + "-" + dd;

    var dateJob2 = new Date(jobDate2Clone);
    var dd = String(dateJob2.getDate()).padStart(2, "0");
    var mm = String(dateJob2.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = dateJob2.getFullYear();

    dateJob2 = yyyy + "-" + mm + "-" + dd;
    var flag = 0;

    let date1 = new Date(dateData1);
    let date2 = new Date(dateData2);
    let jobDate1 = new Date(dateJob1);
    let jobDate2 = new Date(dateJob2);

    if (task === "") {
      Swal.fire({
        icon: "error",
        title: "Invalid task!",
        text: "Vui lòng không để trống!",
      });
      flag = 0;
    } else if (
      dateData1.toString() === "undefined--undefined" ||
      dateData2.toString() === "undefined--undefined"
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date!",
        text: "Vui lòng không để trống!",
      });
      flag = 0;
    } else {
      if (date1 > date2) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date!",
          text: "Ngày bắt đầu và ngày kết thúc không hợp lệ!",
        });
        flag = 0;
      } else {
        if (date1 < jobDate1 || date1 > jobDate2) {
          Swal.fire({
            icon: "error",
            title: "Invalid Date!",
            text: `Ngày bắt đầu không hợp lệ! - ${job} Ngày bắt đầu: ${dateJob1} Ngày kết thúc: ${dateJob2}`,
          });
          flag = 0;
        } else {
          if (date2 < jobDate1 || date2 > jobDate2) {
            Swal.fire({
              icon: "error",
              title: "Invalid Date!",
              text: `Ngày kết thúc không hợp lệ! - ${job} Ngày bắt đầu: ${dateJob1} Ngày kết thúc: ${dateJob2}`,
            });
            flag = 0;
          } else {
            flag = 1;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + "-" + dd + "-" + yyyy;
            let currentDate = new Date(today);
            if (currentDate < date1) {
              statusId = 1;
            } else if (currentDate >= date1 && currentDate <= date2) {
              statusId = 2;
            } else if (currentDate > date2) {
              statusId = 3;
            }
          }
        }
      }
    }

    if (flag == 1) {
      console.log(task, startDate, endDate, userId, jobId, statusId);
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
            url: `http://localhost:8081/cybersoft.backend.java18/api/tasks`,
            data: { task, startDate, endDate, userId, jobId, statusId },
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

  // ================================ SHOW ================================
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/tasks",
    method: "GET",
  }).done(function (result) {
    console.log(result);
    $("#example-task tbody").empty(); // xóa dữ liệu
    $.each(result, function (index, value) {
      var startDateClone = `${value.startDate}`;
      var endDateClone = `${value.endDate}`;
      var startDateFormat = new Date(startDateClone);
      var dd = String(startDateFormat.getDate()).padStart(2, "0");
      var mm = String(startDateFormat.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = startDateFormat.getFullYear();

      startDateFormat = dd + "/" + mm + "/" + yyyy;
      var endDateFormat = new Date(endDateClone);
      var dd = String(endDateFormat.getDate()).padStart(2, "0");
      var mm = String(endDateFormat.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = endDateFormat.getFullYear();

      endDateFormat = dd + "/" + mm + "/" + yyyy;

      var job = localStorage.getItem(`Job${value.jobId}`);
      var user = localStorage.getItem(`User${value.userId}`);
      var status = localStorage.getItem(`Status${value.statusId}`);

      var row = `<tr>
      <td>${value.id}</td>
      <td>${value.task}</td>
      <td>${job}</td>
      <td>${user}</td>
      <td>${startDateFormat}</td>
      <td>${endDateFormat}</td>
      <td>${status}</td>
      <td>
        <a href="#" class="btn btn-sm btn-primary btn-change-task" task-id=${value.id} task=${value.task} job=${job} user=${user} startDate=${startDateFormat} endDate=${endDateFormat}=${status}>Sửa</a>
        <a href="#" class="btn btn-sm btn-danger btn-deleteTask" task-id=${value.id}>Xóa</a>
        <a href="#" class="btn btn-sm btn-info btn-view">Xem</a>
      </td>
    </tr>`;
      $("#example-task tbody").append(row);
      localStorage;
    });
  });

  // ================================ ADD ================================
  $("body").on("click", ".btn-change-task", function () {
    const taskId = $(this).attr("task-id");
    localStorage.setItem("taskId", taskId);
    window.location.href = "task-update.html";
  });

  $("#btn-update-task").click(function () {
    var id = localStorage.getItem("taskId");
    var job = document.getElementById("jobOptions").value;
    var jobId = localStorage.getItem(job);
    var task = document.getElementById("updateTask").value;
    var user = document.getElementById("userOptions").value;
    var userId = localStorage.getItem(user);
    var statusId;
    var startDateClone = document.getElementById("updateStartDateTask").value;
    var endDateClone = document.getElementById("updateEndDateTask").value;
    let startDateSplit = startDateClone.split("/");
    let endDateSplit = endDateClone.split("/");
    let dateData1 =
      startDateSplit[1] + "-" + startDateSplit[0] + "-" + startDateSplit[2];
    let dateData2 =
      endDateSplit[1] + "-" + endDateSplit[0] + "-" + endDateSplit[2];
    let startDate =
      startDateSplit[2] + "-" + startDateSplit[1] + "-" + startDateSplit[0];
    let endDate =
      endDateSplit[2] + "-" + endDateSplit[1] + "-" + endDateSplit[0];

    let jobDate1Clone = localStorage.getItem(`${job}StartDate`);
    let jobDate2Clone = localStorage.getItem(`${job}EndDate`);
    console.log(jobDate1Clone, jobDate2Clone);
    var dateJob1 = new Date(jobDate1Clone);
    var dd = String(dateJob1.getDate()).padStart(2, "0");
    var mm = String(dateJob1.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = dateJob1.getFullYear();

    dateJob1 = yyyy + "-" + mm + "-" + dd;

    var dateJob2 = new Date(jobDate2Clone);
    var dd = String(dateJob2.getDate()).padStart(2, "0");
    var mm = String(dateJob2.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = dateJob2.getFullYear();

    dateJob2 = yyyy + "-" + mm + "-" + dd;
    var flag = 0;

    let date1 = new Date(dateData1);
    let date2 = new Date(dateData2);
    let jobDate1 = new Date(dateJob1);
    let jobDate2 = new Date(dateJob2);

    if (task === "") {
      Swal.fire({
        icon: "error",
        title: "Invalid task!",
        text: "Vui lòng không để trống!",
      });
      flag = 0;
    } else if (
      dateData1.toString() === "undefined--undefined" ||
      dateData2.toString() === "undefined--undefined"
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date!",
        text: "Vui lòng không để trống!",
      });
      flag = 0;
    } else {
      if (date1 > date2) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date!",
          text: "Ngày bắt đầu và ngày kết thúc không hợp lệ!",
        });
        flag = 0;
      } else {
        if (date1 < jobDate1 || date1 > jobDate2) {
          Swal.fire({
            icon: "error",
            title: "Invalid Date!",
            text: `Ngày bắt đầu không hợp lệ! - ${job} Ngày bắt đầu: ${dateJob1} Ngày kết thúc: ${dateJob2}`,
          });
          flag = 0;
        } else {
          if (date2 < jobDate1 || date2 > jobDate2) {
            Swal.fire({
              icon: "error",
              title: "Invalid Date!",
              text: `Ngày kết thúc không hợp lệ! - ${job} Ngày bắt đầu: ${dateJob1} Ngày kết thúc: ${dateJob2}`,
            });
            flag = 0;
          } else {
            flag = 1;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + "-" + dd + "-" + yyyy;
            let currentDate = new Date(today);
            if (currentDate < date1) {
              statusId = 1;
            } else if (currentDate >= date1 && currentDate <= date2) {
              statusId = 2;
            } else if (currentDate > date2) {
              statusId = 3;
            }
          }
        }
      }
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
            type: "PUT",
            url: `http://localhost:8081/cybersoft.backend.java18/api/tasks?id=${id}&task=${task}&startDate=${startDate}&endDate=${endDate}&userId=${userId}&jobId=${jobId}&statusId=${statusId}`,
            data: { task, startDate, endDate, userId, jobId, statusId },
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
  $("body").on("click", ".btn-deleteTask", function () {
    // alert('click button delete')
    const taskId = $(this).attr("task-id");

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
          url: `http://localhost:8081/cybersoft.backend.java18/api/tasks?id=${taskId}`,
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
