import { create } from 'zustand'
import { RendererType } from 'echarts/types/src/util/types.js'

interface State {
  renderer: RendererType
  activeTab: string
}

interface Action {
  setRenderer: (renderer: RendererType) => void
  setActiveTab: (tab: string) => void
}

const useConfigStore = create<State & Action>(set => ({
  renderer: 'canvas',
  activeTab: 'comprehensive',
  setRenderer: renderer => set({ renderer }),
  setActiveTab: activeTab => set({ activeTab })
}))

export default useConfigStore
