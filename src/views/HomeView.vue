<template>
  <div class="container1" style="background-color: #ffffff">
    <div class="p-3 mb-2" style="background-color: #fffefe; color : #6b8de7">
      <div class="home m-5 h-100 d-flex justify-content-center">
      </div>
      <div class="m-5" style="display: flex; align-items: center;">
        <img src="../assets/logo.png" alt="Humble" width="60" height="60" class="align-baseline" style="margin-top: -450px;  margin-left: -250px;">
        <h1 class="text-center" style="margin-top: -450px; margin-left: -0px;" >Willkommen zu Humble!</h1>
      </div>
      <div class="m-5">
        <p class="text-center" style="margin-top: -200px;">
          Mit Humble kannst du eine ToDoListe erstellen. Du kannst Prioritäten hinzufügen und Fälligkeitsdaten hinzufügen.Erledigte Aufgaben<br>
          hinzufügen und Fälligkeitsdaten hinzufügen. Erledigte Aufgaben kannst du abhaken und du kannst sie löschen.Im Tab Suche<br>
          sind die Fälligkeitsdaten im Kalender dargestellt.Sie können außerdem nach den Aufgabentiteln suchen.
           </p>
      </div>
      <div class="container">
        <div class="center-container">
          <div class="text-next-to-button">
            <p>Wenn Sie auf "Liste anschauen" klicken, können Sie<br> sich ihre bisher erstellte ToDoListe anschauen. </p>
          </div>
          <a href="CreateList" class="btn btn-info square-button" style="background-color:#a2baf2 " role="button">
            <div class="button-content">
              <br>
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </div>
              <span style="font-size: 18px; font-weight: bold;">Neu</span>
            </div>
          </a>

          <div class="gap"></div>
          <div class="text-next-to-button2">
            <p>Wenn Sie auf "Neu" klicken, können <br>Sie eine neue ToDoListe erstellen. </p>
          </div>
          <a href="List" class="btn btn-info square-button" style="background-color: #a2baf2" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-list-task" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
              <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
              <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
            </svg>
            <br>
            <span style="font-size: 18px; font-weight: bold;">Liste anschauen</span>
          </a>
        </div>
      </div>
    </div>
    <figure class="strichmann">
      <img src="../assets/strichmann.png">
    </figure>
  </div>
</template>

<script>

</script>
<style>

.container1{
  color: #a2baf2ff;
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.square-button {
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.gap {
  height: 20px;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.text-next-to-button {
  position: relative;
  top: 100px;
  left: -300px;
  font-size: 18px;
  font-weight: bold;
}

.text-next-to-button2 {
  position: relative;
  top: 100px;
  right: -250px;
  font-size: 18px;
  font-weight: bold;
}


.text-next-to-button p {
  text-align: left;
}
.strichmann {
  position: absolute;
  bottom: 300px;
  left: -10px;
  width: 40px;
  height: 40px;
}
</style>
