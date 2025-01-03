import { ref } from "vue";

export function useActions(props: any, emit: any) {
  const openActionData = ref<any | null>(null);
  const menuPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });

  function openActionMenu(rowData: any, evt: MouseEvent) {
    const OFFSET_LEFT = 150;
    const xPos = evt.clientX - OFFSET_LEFT;
    let finalX = xPos < 0 ? 0 : xPos;

    const menuWidth = 200;
    if (finalX + menuWidth > window.innerWidth) {
      finalX = window.innerWidth - menuWidth;
    }
    menuPosition.value = {
      x: finalX,
      y: evt.clientY,
    };
    openActionData.value = rowData;
  }

  function closeActionMenu() {
    openActionData.value = null;
  }

  function handleActionClick(
    act: { onClick: (item: any) => void },
    row: any
  ) {
    act.onClick(row);
    closeActionMenu();
  }

  function itemUniqueKey(rowData: any, idx: number) {
    return props.itemKey ? rowData[props.itemKey] : String(idx);
  }

  return {
    openActionData,
    menuPosition,
    openActionMenu,
    closeActionMenu,
    handleActionClick,
    itemUniqueKey,
  };
}
