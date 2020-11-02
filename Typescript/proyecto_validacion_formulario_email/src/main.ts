import { Gui } from './GUI/Gui'
export let guiInstance: Gui;

function main(): void {
    guiInstance = new Gui()
}
main()