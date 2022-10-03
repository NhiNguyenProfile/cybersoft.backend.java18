$(document).ready(function () {
  $("body").on("click", ".btn-viewUser", function () {
    const userIdd = $(this).attr("user-id");
    localStorage.setItem("userId", userIdd);
    console.log(userIdd);

    window.location.href = "user-details.html";
  });

  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/users",
    method: "GET",
  }).done(function (result) {
    var userIdd = localStorage.getItem("userId");
    $("#getInfo").empty();
    $.each(result, function (index, value) {
      console.log(value);
      if (Number(userIdd) == value.id) {
        var info = `
            <div>
            <a href="javascript:void(0)"
                          ><img
                            src="plugins/images/users/genu.jpg"
                            class="thumb-lg img-circle"
                            alt="img"
                        /></a>
            <h4 class="text-white">${value.fullname}</h4>
          <h5 class="text-white">${value.email}</h5>
          </div>`;

        $("#getInfo").append(info);
      }
    });
  });
  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/tasks",
    method: "GET",
  }).done(function (result) {
    var userId = localStorage.getItem("userId");
    // var length = localStorage.getItem("length");
    // var userFullname = "";
    // count = 0;
    // do {
    //   localStorage.getItem(`fullname${count}`);
    //   userFullname =
    //     userFullname + localStorage.getItem(`fullname${count}`) + " ";
    //   count++;
    // } while (count <= length);
    // var userEmail = localStorage.getItem("userEmail");
    // console.log(userId, userFullname, userEmail);
    // var info = `
    //         <div>
    //         <a href="javascript:void(0)"
    //                       ><img
    //                         src="plugins/images/users/genu.jpg"
    //                         class="thumb-lg img-circle"
    //                         alt="img"
    //                     /></a>
    //         <h4 class="text-white">${userFullname}</h4>
    //       <h5 class="text-white">${userEmail}</h5>
    //       </div>`;

    // $("#getInfo").append(info);

    // xóa dữ liệu
    $("#status1").empty();
    $("#status2").empty();
    $("#status3").empty();
    var notYet = 0;
    var processing = 0;
    var done = 0;
    var sum = 0;
    $.each(result, function (index, value) {
      var id = `${value.userId}`;
      var statusId = Number(`${value.statusId}`);
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

      if (Number(id) == Number(userId)) {
        // console.log(id, userId);
        // console.log(statusId);
        if (statusId == 1) {
          var status = `<a href="#">
            <div class="mail-contnet">
              <h5>${value.task}</h5>
              <span class="mail-desc"></span>
              <span class="time">Bắt đầu: ${startDateFormat}</span>
              <span class="time">Kết thúc: ${endDateFormat}</span>
            </div>
          </a>`;
          $("#status1").append(status);
          notYet++;
          sum++;
        }
        if (statusId == 2) {
          var status = `<a href="#">
              <div class="mail-contnet">
                <h5>${value.task}</h5>
                <span class="mail-desc"></span>
                <span class="time">Bắt đầu: ${startDateFormat}</span>
                <span class="time">Kết thúc: ${endDateFormat}</span>
              </div>
            </a>`;
          $("#status2").append(status);
          processing++;
          sum++;
        }
        if (statusId == 3) {
          var status = `<a href="#">
              <div class="mail-contnet">
                <h5>${value.task}</h5>
                <span class="mail-desc"></span>
                <span class="time">Bắt đầu: ${startDateFormat}</span>
                <span class="time">Kết thúc: ${endDateFormat}</span>
              </div>
            </a>`;
          $("#status3").append(status);
          done++;
          sum++;
        }
        // console.log(notYet, processing, done, sum);
        // localStorage.setItem("notYet", notYet);
        // localStorage.setItem("processing", processing);
        // localStorage.setItem("done", done);
        // localStorage.setItem("sum", sum);
      }
    });
    // var notYet = localStorage.getItem("notYet");
    // var processing = localStorage.getItem("processing");
    // var done = localStorage.getItem("done");
    // var sum = localStorage.getItem("sum");
    var nResult = 0;
    if (notYet == 0) {
      nResult = 0;
    } else {
      nResult = ((notYet / sum) * 100).toFixed(1);
    }

    var pResult = 0;
    if (processing == 0) {
      pResult = 0;
    } else {
      pResult = ((processing / sum) * 100).toFixed(1);
    }

    var dResult = 0;
    if (done == 0) {
      dResult = 0;
    } else {
      dResult = ((done / sum) * 100).toFixed(1);
    }

    var result1 = `<h3 class="counter1 text-right m-t-15 text-danger" rate=${nResult}>
    ${nResult}%
  </h3>`;
    $("#result1").append(result1);

    var result2 = `<h3 class="counter2 text-right m-t-15 text-danger" rate=${pResult}>
    ${pResult}%
  </h3>`;
    $("#result2").append(result2);

    var result3 = `<h3 class="counter3 text-right m-t-15 text-danger" rate=${dResult}>
    ${dResult}%
  </h3>`;
    $("#result3").append(result3);
  });
});
