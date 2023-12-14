import { useSetRecoilState } from 'recoil'
import { IEvento } from '../../interfaces/IEvento'
import { obterId } from '../../util'
import { listaDeEventosState } from '../atom'

const useAdicionarEvento = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)

  return (event: IEvento) => {
    const today = new Date()

    if (event.inicio < today) {
      throw new Error('Eventos não podem ser cadastrados com datas passadas.')
    }

    event.id = obterId()
    return setListaDeEventos(listaAntiga => [...listaAntiga, event])
  }
}

export default useAdicionarEvento
