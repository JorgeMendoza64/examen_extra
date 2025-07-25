const API_URL = "/pacientes";
const btn_guardar = document.getElementById("btn_guardar");
const formulario = document.getElementById("formulario");
const tabla = document.getElementById("tabla_pacientes");


btn_guardar.onclick = async (event) => {
    event.preventDefault();
    const paciente = {
        numero_paciente: document.getElementById("numero_paciente").value,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        fecha_cita: document.getElementById("fecha_cita").value,
        tipo_cita: document.getElementById("tipo_cita").value,
        costo: document.getElementById("costo").value,
        proxima_cita: document.getElementById("proxima_cita").value
    };
    //console.log(paciente)
   
    await fetch(
        API_URL, 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(paciente)
        }
    ).then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    console.log("Paciente guardado:", paciente);
    formulario.reset();
    await cargar_pacientes();
}


async function cargar_pacientes() {
  try {
    const res = await fetch(API_URL);
    console.log("Fetch response:", res);
    if (!res.ok) throw new Error("Error al obtener los pacientes");

    const pacientes  = await res.json();
    console.log("Huéspedes recibidos:", pacientes);

    tabla.innerHTML = "";

    pacientes.forEach(paciente => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="text-left align-middle">${paciente.numero_paciente || ""}</td>
        <td class="text-left align-middle">${paciente.nombre || ""}</td>
        <td class="text-left align-middle">${paciente.apellidos || ""}</td>
        <td class="text-left align-middle">${paciente.fecha_cita || ""}</td>
        <td class="text-left align-middle">${paciente.tipo_cita || ""}</td>
        <td class="text-left align-middle">${paciente.costo || ""}</td>
        <td class="text-left align-middle">${paciente.proxima_cita || ""}</td>
        <td class="text-left align-middle"><i class="bi bi-pencil-square editar" data-id="${paciente.numero_paciente}" role= "button" style="font-size: 1.2rem;"></i></td>
        <td class="text-left align-middle"><i class="bi bi-trash text-danger eliminar" data-id="${paciente.numero_paciente}" role="button" style="font-size: 1.2rem;"></i></td>
      `;
      tabla.appendChild(tr);
    });

    eventoEliminar(); 
  } catch (error) {
    console.error(error);
    tabla.innerHTML = "<tr><td colspan='9'>Error al cargar pacientes</td></tr>";
  }
  
}

document.addEventListener("DOMContentLoaded", () => {
  cargar_pacientes();
});

function eventoEliminar() {
  const botonEliminar = document.querySelectorAll(".eliminar");
  botonEliminar.forEach(boton => {
    boton.addEventListener("click", async () => {
      const id = boton.getAttribute("data-id");
      if (confirm("¿Deseas eliminar este paciente?")) {
        try {
          const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Error al eliminar paciente");
          cargar_pacientes();
        } catch (error) {
          console.error(error);
        }
      }
    });
  });
}
