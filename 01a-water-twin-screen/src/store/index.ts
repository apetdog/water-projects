import { create } from 'zustand'
import { RendererType } from 'echarts/types/src/util/types.js'

interface State {
  renderer: RendererType
  activeTab: 'overview' | 'structure' | 'generator'
}

interface Action {
  setRenderer: (renderer: RendererType) => void
  setActiveTab: (tab: 'overview' | 'structure' | 'generator') => void
}

const useConfigStore = create<State & Action>(set => ({
  renderer: 'canvas',
  activeTab: 'overview',
  setRenderer: renderer => set({ renderer }),
  setActiveTab: activeTab => set({ activeTab })
}))

export default useConfigStore
