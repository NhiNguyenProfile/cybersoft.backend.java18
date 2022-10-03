$(document).ready(function () {
  $("body").on("click", ".btn-viewGroupwork", function () {
    const jobId = $(this).attr("job-id");
    localStorage.setItem("jobId", jobId);

    window.location.href = "groupwork-details.html";
  });

  $.ajax({
    url: "http://localhost:8081/cybersoft.backend.java18/api/tasks",
    method: "GET",
  }).done(function (result) {
    var jobId = localStorage.getItem("jobId");
    console.log(jobId);
    var notYet = 0;
    var processing = 0;
    var done = 0;
    var sum = 0;
    $.each(result, function (index, value) {
      var statusId = value.statusId;
      if (statusId == 1) {
        notYet++;
        sum++;
      }
      if (statusId == 2) {
        processing++;
        sum++;
      }
      if (statusId == 3) {
        done++;
        sum++;
      }
    });

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
