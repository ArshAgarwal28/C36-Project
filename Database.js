var userCount, userRefPoint;

function fetchInfo() {
  var refPlayers = database.ref('paintings');
  refPlayers.on("value", async (data) => {
    if (data.val() !== undefined) {
      allPaintings = data.val();
    }
  });

  var refCount = database.ref('paintCount');
  refCount.on("value", async (data) => {
    if (data.val() !== undefined) {
      userCount = data.val();
    }
  });

}

function nameCheck() {
  if (username === "") {
    alert("Invalid Username");
    username = prompt("Please enter your username")
  } else {
    addUser();
    appState = "drawState"
  }
}

function addUser() {
  var temp = userCount;
  if (temp > 0) {
    for (var user in allPaintings) {
      console.log(allPaintings[user].name)
      if (allPaintings[user].name === username) {
        alert("Username found! Loading last save!");
        userRefPoint = "paintings/" + username;
        getData();
        appState = "getDrawing";
        //getData();
        temp = -1;
      } else {
        temp -= 1;
      }
    }
  }

  if (temp === 0) {
    userRefPoint = "paintings/" + username;

    database.ref(userRefPoint).set({
      name: username,
      save1: 0
    });

    alert("No account found! New account has been made!");
    userCount += 1;
    temp = -1;
    updateCount();
  }
}

function updateCount() {
  database.ref('/').update({
    paintCount: userCount
  });
}

function savePressed() {
  database.ref(userRefPoint).update({
    save1: drawing
  });
}

function getData() {
  database.ref(userRefPoint + '/save1').on("value", (data) => {
    if (data.val() !== undefined) {
      drawing = data.val();
    }
  });
}
