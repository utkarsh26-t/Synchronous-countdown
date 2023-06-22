const socket = io();

$("#set-timer").click(() => {
    const hrs = $("#hours").val();
    const mins = $("#minutes").val();
    const sec = $("#seconds").val();

    socket.emit("countdown-set", {
        hrs:hrs,
        mins:mins,
        sec:sec
    })
});

socket.on("current-timer", (data) => {

    let currentTimer = data.currentTimer;

    let hh = 0;
    let mm = 0;
    let ss = 0;

    hh = Math.floor(currentTimer / 3600);
    currentTimer = currentTimer - (3600 * hh);

    mm = Math.floor(currentTimer / 60);
    currentTimer = currentTimer - (60 * mm);

    ss = currentTimer;

    $("#timer-hrs").html(`<b>${hh}:</b>`);
    $("#timer-mins").html(`<b>${mm}:</b>`);
    $("#timer-sec").html(`<b>${ss}</b>`)
})

$("#reset-timer").click(() => {
    socket.emit("reset-timer",{});
})





