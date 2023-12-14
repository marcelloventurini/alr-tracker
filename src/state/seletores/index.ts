import { selector } from 'recoil'
import { IEvento } from '../../interfaces/IEvento'
import { fitltroDeEventos, listaDeEventosState } from '../atom'

export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  get: ({ get }) => {
    const filtro = get(fitltroDeEventos)
    const todosOsEventos = get(listaDeEventosState)
    const eventosFiltrados = todosOsEventos.filter(event => {
      if (!filtro.data) return true

      const mesmoDia =
        filtro.data.toISOString().slice(0, 10) ===
        event.inicio.toISOString().slice(0, 10)

      return mesmoDia
    })
    return eventosFiltrados
  },
})

export const eventosAsync = selector({
  key: 'eventosAsync',
  get: async () => {
    const respostaHttp = await fetch('http://localhost:8080/eventos')
    const eventosJson: IEvento[] = await respostaHttp.json()
    return eventosJson.map(evento => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim)
    }))
  },
})
