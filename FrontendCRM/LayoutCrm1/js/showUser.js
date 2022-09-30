$(document).ready(function () {
  $("body").on("click", ".btn-viewUser", function () {
    const userIdd = $(this).attr("user-id");
    localStorage.setItem("userId", userIdd);

    window.location.href = "user-details.html";
  });

  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/users",
    method: "GET",
  }).done(function (result) {
    let userIdd = localStorage.getItem("userId");
    $("#getInfo").empty();
    $.each(result, function (index, value) {
      if (Number(userIdd) == value.id) {
        let info = `
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
    let userId = localStorage.getItem("userId");
    // let length = localStorage.getItem("length");
    // let userFullname = "";
    // count = 0;
    // do {
    //   localStorage.getItem(`fullname${count}`);
    //   userFullname =
    //     userFullname + localStorage.getItem(`fullname${count}`) + " ";
    //   count++;
    // } while (count <= length);
    // let userEmail = localStorage.getItem("userEmail");
    // console.log(userId, userFullname, userEmail);
    // let info = `
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
    let notYet = 0;
    let processing = 0;
    let done = 0;
    let sum = 0;
    $.each(result, function (index, value) {
      let id = `${value.userId}`;
      let statusId = Number(`${value.statusId}`);
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

      if (Number(id) == Number(userId)) {
        if (statusId == 1) {
          let status = `<a href="#">
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
          let status = `<a href="#">
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
          let status = `<a href="#">
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
    // let notYet = localStorage.getItem("notYet");
    // let processing = localStorage.getItem("processing");
    // let done = localStorage.getItem("done");
    // let sum = localStorage.getItem("sum");
    let nResult = 0;
    if (notYet == 0) {
      nResult = 0;
    } else {
      nResult = ((notYet / sum) * 100).toFixed(1);
    }

    let pResult = 0;
    if (processing == 0) {
      pResult = 0;
    } else {
      pResult = ((processing / sum) * 100).toFixed(1);
    }

    let dResult = 0;
    if (done == 0) {
      dResult = 0;
    } else {
      dResult = ((done / sum) * 100).toFixed(1);
    }

    let result1 = `<h3 class="counter1 text-right m-t-15 text-danger" rate=${nResult}>
    ${nResult}%
  </h3>`;
    $("#result1").append(result1);

    let result2 = `<h3 class="counter2 text-right m-t-15 text-danger" rate=${pResult}>
    ${pResult}%
  </h3>`;
    $("#result2").append(result2);

    let result3 = `<h3 class="counter3 text-right m-t-15 text-danger" rate=${dResult}>
    ${dResult}%
  </h3>`;
    $("#result3").append(result3);
  });
});
