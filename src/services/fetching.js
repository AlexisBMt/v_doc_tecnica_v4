export function getAllContratos(API_URL) {
  return fetch(API_URL)
  .then( res => res.json() )
}

export function getAllTrabajos(API_URL) {
  return fetch(API_URL)
  .then( res => res.json() )
}

export function getDetalleExplosion(API_URL) {
  return fetch(API_URL)
    .then( res => res.json() )
}