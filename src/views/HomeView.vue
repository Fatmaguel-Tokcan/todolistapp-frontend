<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <section class="vh-100">


    <div class="p-3 mb-2 bg-dark text-light">
      <div class="home m-5 h-100 d-flex justify-content-center"  style="background-color: #a2baf2">
      </div>
      <div class="m-5">
        <h1>Glaube an dich, du schaffst das!</h1>
      </div>
      <div class="m-5">
        <p class="text-center">Hallo, mit dieser Webseite kannst du deine To-Dos auflisten und sie nach Fälligkeit prüfen. Wenn du sie erledigt hast kannst du es abhacken.</p>
      </div>
      <div class="container">
        <div class="center-container">
          <a href="CreateList" class="btn btn-info square-button" role="button">
            <div class="button-content">
              <br>
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </div>
              <span>Neu</span>
            </div>
          </a>

          <div class="gap"></div>

          <a href="List" class="btn btn-info square-button" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-list-task" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
              <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
              <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
            </svg>
            <br>
            List anschauen
          </a>
        </div>
      </div>



      <div class="row d-flex justify-content-center">
        <p class="text-start col-sm-2">1. Sammle To-Dos!
          Schreibe auf was du in dieser Woche/Monat alles für To-Dos hast. Achte darauf das du deine deine To-Dos in kleinere Aufgaben unterteilst.</p>
        <p class="col-sm-2">2. Fälligkeitsdatum!
          Somit kannst du die Zeit im Auge behalten und kannst dir ein Fälligkeitsdatum vermerken.</p>
        <p class="text-center col-sm-2">3. Abhaken! Um dich selbst zu motivieren, kannst du die erledigten To-Dos abhaken.</p>
      </div>
    </div>
  </section>
</template>

<script>

</script>
<style>
.container {
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
</style>



