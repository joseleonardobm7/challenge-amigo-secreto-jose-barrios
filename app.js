// Solución del challenge amigo secreto

const friends = [];
const unselectedFriends = [];

const inputName = document.getElementById("friend");
const friendList = document.getElementById("friendList");
const message = document.getElementById("message");

// Función para agregar amigos
const agregarAmigo = () => {
  let friendName = inputName.value.trim();
  if (friendName) {
    if (friends.includes(friendName)) {
      inputName.value = "";
      alert(`Ya existe un amigo llamado ${friendName}`);
      return;
    }
    friends.push(inputName.value);
    unselectedFriends.push({ nombre: inputName.value, elegido: false });
    inputName.value = "";
    actualizarListaAmigos();
    return;
  }
  alert("Por favor, inserte un nombre");
};

// Función para actualizar la lista de amigos
const actualizarListaAmigos = () => {
  friendList.innerHTML = "";
  unselectedFriends.forEach((amigo) => {
    const li = document.createElement("li");
    const eliminarButton = createDeleteButton(amigo);

    li.textContent = amigo.nombre;
    li.appendChild(eliminarButton);

    friendList.appendChild(li);
  });
  // Limpiar el resultado anterior
  if (message.textContent) {
    message.textContent = "";
  }
};

// Función para sortear amigos
const sortearAmigo = () => {
  if (unselectedFriends.some((amigo) => amigo.elegido === false)) {
    startConfetti();
    const indiceAmigo = Math.floor(Math.random() * friends.length);
    const [amigoElegido] = friends.splice(indiceAmigo, 1);
    const indiceAmigoElegido = unselectedFriends.findIndex(
      (amigo) => amigo.nombre === amigoElegido
    );
    unselectedFriends[indiceAmigoElegido].elegido = true;
    mostrarResultado(`El amigo elegido es ${amigoElegido}`);
  } else {
    mostrarResultado(
      !unselectedFriends.length
        ? "No hay amigos para sortear"
        : "Todos los amigos ya han sido elegidos"
    );
  }
};

// Función para reiniciar el sorteo
const reiniciarSorteo = () => {
  if (
    !unselectedFriends.length ||
    unselectedFriends.every((amigo) => !amigo.elegido)
  ) {
    return;
  }

  if (window.confirm("¿Está seguro de que desea reiniciar el sorteo?")) {
    friends.splice();
    unselectedFriends.forEach((amigo) => {
      friends.push(amigo.nombre);
      amigo.elegido = false;
    });

    mostrarResultado("De nuevo todos los amigos son elegibles en el sorteo");
  }
};

// Función para mostrar el resultado del sorteo
const mostrarResultado = (mensaje) => {
  message.innerHTML = mensaje;
  setTimeout(() => {
    message.innerHTML = "";
  }, 3000);
};

// Función para eliminar un amigo
const eliminarAmigo = (nombre) => {
  const indiceAmigo = friends.findIndex((amigo) => amigo === nombre);
  if (indiceAmigo !== -1) {
    if (
      window.confirm(
        `¿Está seguro de que desea remover a ${nombre} del sorteo?`
      )
    ) {
      const [amigoEliminado] = friends.splice(indiceAmigo, 1);
      const indiceAmigoEliminado = unselectedFriends.findIndex(
        (amigo) => amigo.nombre === amigoEliminado
      );
      unselectedFriends.splice(indiceAmigoEliminado, 1);
      actualizarListaAmigos();
      mostrarResultado(`${nombre} se remueve del sorteo`);
    }
  } else {
    if (
      window.confirm(
        `No se puede eliminar a ${nombre} porque ya se ha sorteado, ¿Desea reiniciar el sorteo?`
      )
    ) {
      reiniciarSorteo();
    }
  }
};

function createDeleteButton(amigo) {
  const eliminarButton = document.createElement("button");
  const eliminarButtonIcon = document.createElement("img");

  eliminarButtonIcon.src = "assets/delete.svg";
  eliminarButtonIcon.alt = "Ícono para eliminar";

  eliminarButton.appendChild(eliminarButtonIcon);
  eliminarButton.onclick = () => eliminarAmigo(amigo.nombre);
  eliminarButton.classList.add("button-eliminar");
  return eliminarButton;
}

function startConfetti() {
  // Crear confeti usando la librería canvas-confetti
  confetti({
    particleCount: 500, // Número de partículas de confeti
    spread: 75, // Ángulo de dispersión
    origin: { y: 0.8 }, // Origen del confeti (en este caso, un poco hacia abajo desde el borde superior)
    colors: ["#b2aa8e", "#0c1b33", "#7a306c", "#03b5aa", "#dbfe87"], // Colores del confeti
  });
}
