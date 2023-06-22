const express = require("express");
const app = express();
//Getting http module
const http = require("http");
//forming http server and passing express app as request handler
const server = http.createServer(app);
const path = require("path");
const socketio = require("socket.io");
const io = socketio(server);

app.use("/", express.static(path.join(__dirname, "public")));


let timer;

io.on("connection", (socket) => {

    // console.log(`Someone got connected with the id - ${socket.id}`);


    //when user sends request with event type: countdown-set
    socket.on("countdown-set", (data) => {
      // console.log(`${data.hrs}:${data.mins}:${data.sec}`);
      timer = parseInt(data.hrs) * 3600 + parseInt(data.mins) * 60 + parseInt(data.sec);
      // console.log(`${timer} seconds`);

      // console.log(timer);

      startCountdown();

      function startCountdown() {

          const id = setInterval(countdown, 1000);
          function countdown() {

              //If timer up
              if (timer === -1) {
                clearInterval(id);
              } 
              else{
                
                //emit countdown status to all users currently connected to server
                io.emit("current-timer", {
                  currentTimer: timer
                })
                
                //reduce timer for each second passing
                timer = timer - 1;
              }
          }
      }  
    
  });

  //when user sends request (for resetting timer) of event type: reset-timer
  //Then setting timer to zero(0)
  socket.on("reset-timer", (data) => {
    timer = 0;
  })
  
});


const port = 3000;

//method provided by node js http module
server.listen(port, () => {
  console.log(`server started at port ${port}`);
});

