import { URL_BACK } from "@/config/config";
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

// Llamada a la API para obtener el historial general
export async function getData(data) {
  // Fetch History by the filters applied
  let params = new URLSearchParams();
  params.append("data", data);

  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${authStore.authToken}`,
    },
    redirect: 'follow',
    body: params,
  }
  
  const data = await fetch(URL_BACK + ``, options)
  .then(res => {
    // Controlar respuesta
    if (res.ok) return res.json()
    else {
      console.log('Error al llamar al servidor: ', res)
      return { error: 'Error al realizar la consulta al servidor. Por favor, inténtelo de nuevo o contacte al administrador.\n\nError: Bad Response' }
    }
  })
  .then(data => {
    if (data) {
      // Manipular respuesta
      return data
    }
  })
  .catch(error => {
    console.log('ERROR: ', error)
    return { error: 'Error al realizar la consulta al servidor. Por favor, inténtelo de nuevo o contacte al administrador.\n\nError: ' + error }
  })
  return data
}